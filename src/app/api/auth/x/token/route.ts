import { NextRequest, NextResponse } from "next/server";
import { env } from "~/env";

export async function POST(request: NextRequest) {
	try {
		const { code, code_verifier, redirect_uri } = await request.json();
		
		if (!code || !code_verifier || !redirect_uri) {
			return NextResponse.json(
				{ error: "Missing required parameters" },
				{ status: 400 }
			);
		}
		
		// Exchange authorization code for access token
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
				redirect_uri,
				code_verifier,
			}).toString(),
		});
		
		if (!response.ok) {
			const errorData = await response.json().catch(() => ({}));
			return NextResponse.json(
				{ error: errorData.error_description || "Token exchange failed" },
				{ status: response.status }
			);
		}
		
		const tokens = await response.json();
		return NextResponse.json(tokens);
	} catch (error) {
		console.error("Error exchanging code for token:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}