import type { XFeedData, XOAuthTokens, XUser, XApiError } from "../types";
import {
	X_API_ENDPOINTS,
	TWEET_FIELDS,
	USER_FIELDS,
	MEDIA_FIELDS,
	EXPANSIONS,
	MAX_POSTS,
} from "./constants";

export class XApiClient {
	private baseUrl: string;
	private tokens: XOAuthTokens | null = null;

	constructor(baseUrl: string = "https://api.twitter.com/2") {
		this.baseUrl = baseUrl;
	}

	setTokens(tokens: XOAuthTokens) {
		this.tokens = tokens;
	}

	private async makeRequest<T>(
		endpoint: string,
		options: RequestInit = {},
	): Promise<T> {
		if (!this.tokens) {
			throw new Error("No access token available");
		}

		const url = endpoint.startsWith("http")
			? endpoint
			: `${this.baseUrl}${endpoint}`;

		const response = await fetch(url, {
			...options,
			headers: {
				Authorization: `Bearer ${this.tokens.access_token}`,
				"Content-Type": "application/json",
				...options.headers,
			},
		});

		if (!response.ok) {
			const errorData = await response.json().catch(() => ({}));
			const error: XApiError = {
				title: errorData.title || "API Error",
				detail: errorData.detail || `HTTP ${response.status}`,
				type: errorData.type || "about:blank",
				status: response.status,
			};
			throw error;
		}

		return response.json();
	}

	async getUserInfo(): Promise<XUser> {
		const url = `${X_API_ENDPOINTS.USERS_ME}?user.fields=${USER_FIELDS}`;
		const response = await this.makeRequest<{ data: XUser }>(url);
		return response.data;
	}

	async getUserTweets(): Promise<XFeedData> {
		const params = new URLSearchParams({
			max_results: MAX_POSTS.toString(),
			"tweet.fields": TWEET_FIELDS,
			"user.fields": USER_FIELDS,
			"media.fields": MEDIA_FIELDS,
			expansions: EXPANSIONS,
			exclude: "retweets,replies", // Only get original tweets
		});

		const url = `${X_API_ENDPOINTS.USERS_TWEETS}?${params.toString()}`;
		return this.makeRequest<XFeedData>(url);
	}

	static async exchangeCodeForToken(
		code: string,
		codeVerifier: string,
		redirectUri: string,
	): Promise<XOAuthTokens> {
		const response = await fetch("/api/auth/x/token", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				code,
				code_verifier: codeVerifier,
				redirect_uri: redirectUri,
			}),
		});

		if (!response.ok) {
			const errorData = await response.json().catch(() => ({}));
			throw new Error(errorData.error || "Failed to exchange code for token");
		}

		return response.json();
	}

	static generateOAuthUrl(
		clientId: string,
		redirectUri: string,
		codeChallenge: string,
		state: string,
	): string {
		const params = new URLSearchParams({
			response_type: "code",
			client_id: clientId,
			redirect_uri: redirectUri,
			scope: "tweet.read users.read offline.access",
			state,
			code_challenge: codeChallenge,
			code_challenge_method: "S256",
		});

		return `${X_API_ENDPOINTS.OAUTH_AUTHORIZE}?${params.toString()}`;
	}

	static async generatePKCEChallenge(): Promise<{
		codeVerifier: string;
		codeChallenge: string;
	}> {
		// Generate a random code verifier
		const codeVerifier = generateRandomString(128);

		// Create code challenge
		const encoder = new TextEncoder();
		const data = encoder.encode(codeVerifier);
		const digest = await crypto.subtle.digest("SHA-256", data);
		const codeChallenge = base64URLEncode(digest);

		return { codeVerifier, codeChallenge };
	}
}

function generateRandomString(length: number): string {
	const charset =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
	let result = "";
	for (let i = 0; i < length; i++) {
		result += charset.charAt(Math.floor(Math.random() * charset.length));
	}
	return result;
}

function base64URLEncode(buffer: ArrayBuffer): string {
	const bytes = new Uint8Array(buffer);
	const base64 = btoa(String.fromCharCode(...bytes));
	return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}