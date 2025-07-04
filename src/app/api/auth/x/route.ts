import { NextRequest, NextResponse } from "next/server";
import { env } from "~/env";
import { XApiClient } from "~/apps/twitter-feed/utils/api-client";
import { generateRandomString } from "~/apps/twitter-feed/utils/formatters";

export async function GET(request: NextRequest) {
	try {
		// Generate PKCE challenge
		const { codeVerifier, codeChallenge } = await XApiClient.generatePKCEChallenge();
		
		// Generate state parameter for security
		const state = generateRandomString(32);
		
		// Generate OAuth URL
		const authUrl = XApiClient.generateOAuthUrl(
			env.X_OAUTH_CLIENT_ID,
			env.X_OAUTH_REDIRECT_URI,
			codeChallenge,
			state
		);
		
		// Create response with redirect to X OAuth
		const response = NextResponse.redirect(authUrl);
		
		// Store code verifier and state in secure HTTP-only cookies
		response.cookies.set("x_code_verifier", codeVerifier, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "lax",
			maxAge: 600, // 10 minutes
		});
		
		response.cookies.set("x_oauth_state", state, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "lax",
			maxAge: 600, // 10 minutes
		});
		
		return response;
	} catch (error) {
		console.error("Error initiating X OAuth:", error);
		return NextResponse.json(
			{ error: "Failed to initiate OAuth flow" },
			{ status: 500 }
		);
	}
}