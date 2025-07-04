import { NextRequest, NextResponse } from "next/server";
import { XApiClient } from "~/apps/twitter-feed/utils/api-client";
import type { XOAuthTokens } from "~/apps/twitter-feed/types";

export async function GET(request: NextRequest) {
	try {
		// Get access token from cookies or headers
		const accessToken = request.cookies.get("x_access_token")?.value ||
			request.headers.get("Authorization")?.replace("Bearer ", "");
		
		if (!accessToken) {
			return NextResponse.json(
				{ error: "No access token provided" },
				{ status: 401 }
			);
		}
		
		// Create API client with tokens
		const apiClient = new XApiClient();
		const tokens: XOAuthTokens = {
			access_token: accessToken,
			token_type: "bearer",
		};
		apiClient.setTokens(tokens);
		
		// Fetch user tweets
		const feedData = await apiClient.getUserTweets();
		
		return NextResponse.json(feedData);
	} catch (error) {
		console.error("Error fetching X feed:", error);
		
		if (error && typeof error === "object" && "status" in error) {
			const apiError = error as { status: number; detail?: string };
			return NextResponse.json(
				{ error: apiError.detail || "Failed to fetch feed" },
				{ status: apiError.status }
			);
		}
		
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}

export async function POST(request: NextRequest) {
	try {
		const { access_token } = await request.json();
		
		if (!access_token) {
			return NextResponse.json(
				{ error: "No access token provided" },
				{ status: 401 }
			);
		}
		
		// Create API client with tokens
		const apiClient = new XApiClient();
		const tokens: XOAuthTokens = {
			access_token,
			token_type: "bearer",
		};
		apiClient.setTokens(tokens);
		
		// Fetch user tweets
		const feedData = await apiClient.getUserTweets();
		
		return NextResponse.json(feedData);
	} catch (error) {
		console.error("Error fetching X feed:", error);
		
		if (error && typeof error === "object" && "status" in error) {
			const apiError = error as { status: number; detail?: string };
			return NextResponse.json(
				{ error: apiError.detail || "Failed to fetch feed" },
				{ status: apiError.status }
			);
		}
		
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}