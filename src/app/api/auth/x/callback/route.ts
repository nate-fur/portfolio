import { NextRequest, NextResponse } from "next/server";
import { env } from "~/env";
import { XApiClient } from "~/apps/twitter-feed/utils/api-client";

export async function GET(request: NextRequest) {
	try {
		const { searchParams } = new URL(request.url);
		const code = searchParams.get("code");
		const state = searchParams.get("state");
		const error = searchParams.get("error");
		
		// Handle OAuth error
		if (error) {
			const errorDescription = searchParams.get("error_description") || "OAuth authorization failed";
			return NextResponse.redirect(
				`${request.nextUrl.origin}/auth/x?error=${encodeURIComponent(errorDescription)}`
			);
		}
		
		// Validate required parameters
		if (!code || !state) {
			return NextResponse.redirect(
				`${request.nextUrl.origin}/auth/x?error=Missing authorization code or state`
			);
		}
		
		// Get stored values from cookies
		const codeVerifier = request.cookies.get("x_code_verifier")?.value;
		const storedState = request.cookies.get("x_oauth_state")?.value;
		
		if (!codeVerifier || !storedState) {
			return NextResponse.redirect(
				`${request.nextUrl.origin}/auth/x?error=Missing OAuth session data`
			);
		}
		
		// Verify state parameter
		if (state !== storedState) {
			return NextResponse.redirect(
				`${request.nextUrl.origin}/auth/x?error=Invalid OAuth state`
			);
		}
		
		// Exchange authorization code for access token
		const tokens = await exchangeCodeForToken(code, codeVerifier);
		
		// Create success response
		const response = NextResponse.redirect(
			`${request.nextUrl.origin}/auth/x?success=true`
		);
		
		// Store tokens in secure HTTP-only cookies
		response.cookies.set("x_access_token", tokens.access_token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "lax",
			maxAge: tokens.expires_in || 7200, // 2 hours default
		});
		
		if (tokens.refresh_token) {
			response.cookies.set("x_refresh_token", tokens.refresh_token, {
				httpOnly: true,
				secure: process.env.NODE_ENV === "production",
				sameSite: "lax",
				maxAge: 60 * 60 * 24 * 30, // 30 days
			});
		}
		
		// Clear temporary cookies
		response.cookies.delete("x_code_verifier");
		response.cookies.delete("x_oauth_state");
		
		return response;
	} catch (error) {
		console.error("Error handling X OAuth callback:", error);
		return NextResponse.redirect(
			`${request.nextUrl.origin}/auth/x?error=${encodeURIComponent(
				error instanceof Error ? error.message : "OAuth callback failed"
			)}`
		);
	}
}

async function exchangeCodeForToken(code: string, codeVerifier: string) {
	const response = await fetch("https://api.twitter.com/2/oauth2/token", {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
			Authorization: `Basic ${Buffer.from(
				`${env.X_OAUTH_CLIENT_ID}:${env.X_OAUTH_CLIENT_SECRET}`
			).toString("base64")}`,
		},
		body: new URLSearchParams({
			grant_type: "authorization_code",
			code,
			redirect_uri: env.X_OAUTH_REDIRECT_URI,
			code_verifier: codeVerifier,
		}).toString(),
	});
	
	if (!response.ok) {
		const errorData = await response.json().catch(() => ({}));
		throw new Error(errorData.error_description || "Token exchange failed");
	}
	
	return response.json();
}