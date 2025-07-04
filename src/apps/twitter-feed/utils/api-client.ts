import type { XApiError, XPost } from "../types";
import { ERROR_MESSAGES, MOCK_POSTS, X_API_CONFIG } from "./constants";

/**
 * X API Client for fetching user posts
 * Currently uses mock data for demonstration purposes
 */
export class XApiClient {
	private bearerToken: string | null = null;
	private cache: Map<string, { data: XPost[]; timestamp: number }> = new Map();

	constructor() {
		// In a real implementation, this would come from environment variables
		this.bearerToken = process.env.X_API_BEARER_TOKEN || null;
	}

	/**
	 * Fetch posts from a user's timeline
	 * Currently returns mock data for demonstration
	 */
	async fetchUserPosts(userId?: string): Promise<XPost[]> {
		// Check cache first
		const cacheKey = `user_posts_${userId || "me"}`;
		const cached = this.cache.get(cacheKey);

		if (
			cached &&
			Date.now() - cached.timestamp < X_API_CONFIG.RATE_LIMIT.CACHE_DURATION
		) {
			return cached.data;
		}

		try {
			// Simulate API delay
			await new Promise((resolve) => setTimeout(resolve, 800));

			// For demo purposes, return mock data
			// In production, this would make actual API calls
			const posts = await this.getMockPosts();

			// Cache the results
			this.cache.set(cacheKey, {
				data: posts,
				timestamp: Date.now(),
			});

			return posts;
		} catch (error) {
			throw this.handleApiError(error);
		}
	}

	/**
	 * Get mock posts for demonstration purposes
	 */
	private async getMockPosts(): Promise<XPost[]> {
		// Simulate occasional API errors for realistic error handling
		if (Math.random() < 0.05) {
			// 5% chance of error
			throw new Error("API temporarily unavailable");
		}

		// Convert mock data to XPost format
		return MOCK_POSTS.map((post) => ({
			...post,
			entities: undefined, // No URL entities in mock data
		}));
	}

	/**
	 * Make actual API request (for future implementation)
	 */
	private async makeApiRequest(
		endpoint: string,
		params?: Record<string, string>,
	): Promise<unknown> {
		if (!this.bearerToken) {
			throw new Error("X API bearer token not configured");
		}

		const url = new URL(endpoint, X_API_CONFIG.BASE_URL);

		if (params) {
			for (const [key, value] of Object.entries(params)) {
				url.searchParams.append(key, value);
			}
		}

		const response = await fetch(url.toString(), {
			headers: {
				Authorization: `Bearer ${this.bearerToken}`,
				"Content-Type": "application/json",
			},
		});

		if (!response.ok) {
			throw new Error(`API request failed: ${response.status}`);
		}

		return response.json();
	}

	/**
	 * Handle API errors and convert to user-friendly messages
	 */
	private handleApiError(error: unknown): XApiError {
		if (error instanceof Error) {
			// Check for specific error types
			if (error.message.includes("Network")) {
				return {
					message: ERROR_MESSAGES.NETWORK_ERROR,
					code: "NETWORK_ERROR",
				};
			}

			if (error.message.includes("rate limit")) {
				return {
					message: ERROR_MESSAGES.RATE_LIMITED,
					code: "RATE_LIMITED",
				};
			}

			if (error.message.includes("API")) {
				return {
					message: ERROR_MESSAGES.API_ERROR,
					code: "API_ERROR",
				};
			}

			return {
				message: error.message,
				code: "UNKNOWN_ERROR",
			};
		}

		return {
			message: ERROR_MESSAGES.UNKNOWN_ERROR,
			code: "UNKNOWN_ERROR",
		};
	}

	/**
	 * Clear cache (useful for forced refresh)
	 */
	clearCache(): void {
		this.cache.clear();
	}
}

// Export a singleton instance
export const xApiClient = new XApiClient();
