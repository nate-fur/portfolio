export const X_API_ENDPOINTS = {
	OAUTH_AUTHORIZE: "https://twitter.com/i/oauth2/authorize",
	OAUTH_TOKEN: "https://api.twitter.com/2/oauth2/token",
	USERS_ME: "https://api.twitter.com/2/users/me",
	USERS_TWEETS: "https://api.twitter.com/2/users/me/tweets",
} as const;

export const X_OAUTH_SCOPES = [
	"tweet.read",
	"users.read",
	"offline.access",
].join(" ");

export const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds
export const MAX_POSTS = 10;

export const TWEET_FIELDS = [
	"id",
	"text",
	"author_id",
	"created_at",
	"context_annotations",
	"entities",
	"public_metrics",
	"possibly_sensitive",
	"lang",
	"reply_settings",
	"attachments",
].join(",");

export const USER_FIELDS = [
	"id",
	"name",
	"username",
	"profile_image_url",
	"verified",
	"description",
	"public_metrics",
].join(",");

export const MEDIA_FIELDS = [
	"media_key",
	"type",
	"url",
	"duration_ms",
	"height",
	"width",
	"preview_image_url",
	"public_metrics",
	"alt_text",
].join(",");

export const EXPANSIONS = ["author_id", "attachments.media_keys"].join(",");

export const ERROR_MESSAGES = {
	NOT_AUTHENTICATED: "Please sign in to your X account to view your feed",
	RATE_LIMITED: "Rate limit exceeded. Please try again later",
	NETWORK_ERROR: "Network error. Please check your connection and try again",
	API_ERROR: "Failed to fetch posts. Please try again",
	OAUTH_ERROR: "Authentication failed. Please try signing in again",
	INVALID_TOKEN: "Your session has expired. Please sign in again",
	NO_POSTS: "No posts found. Try posting something on X first!",
} as const;

export const STORAGE_KEYS = {
	X_TOKENS: "x_feed_tokens",
	X_USER: "x_feed_user",
	X_FEED_CACHE: "x_feed_cache",
} as const;