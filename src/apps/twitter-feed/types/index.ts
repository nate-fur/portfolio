export interface XUser {
	id: string;
	name: string;
	username: string;
	profile_image_url: string;
	verified: boolean;
	description?: string;
	public_metrics: {
		followers_count: number;
		following_count: number;
		tweet_count: number;
		listed_count: number;
	};
}

export interface XPost {
	id: string;
	text: string;
	author_id: string;
	created_at: string;
	context_annotations?: Array<{
		domain: {
			id: string;
			name: string;
			description: string;
		};
		entity: {
			id: string;
			name: string;
			description: string;
		};
	}>;
	entities?: {
		urls?: Array<{
			start: number;
			end: number;
			url: string;
			expanded_url: string;
			display_url: string;
			media_key?: string;
		}>;
		hashtags?: Array<{
			start: number;
			end: number;
			tag: string;
		}>;
		mentions?: Array<{
			start: number;
			end: number;
			username: string;
			id: string;
		}>;
	};
	public_metrics: {
		retweet_count: number;
		like_count: number;
		reply_count: number;
		quote_count: number;
	};
	possibly_sensitive?: boolean;
	lang?: string;
	reply_settings?: "everyone" | "mentionedUsers" | "following";
	attachments?: {
		media_keys?: string[];
	};
}

export interface XMedia {
	media_key: string;
	type: "animated_gif" | "photo" | "video";
	url?: string;
	duration_ms?: number;
	height?: number;
	width?: number;
	preview_image_url?: string;
	public_metrics?: {
		view_count: number;
	};
	alt_text?: string;
}

export interface XFeedData {
	data: XPost[];
	includes?: {
		users?: XUser[];
		media?: XMedia[];
	};
	meta: {
		oldest_id?: string;
		newest_id?: string;
		result_count: number;
		next_token?: string;
		previous_token?: string;
	};
}

export interface XOAuthTokens {
	access_token: string;
	refresh_token?: string;
	expires_in?: number;
	token_type: "bearer";
	scope?: string;
}

export interface XAuthState {
	isAuthenticated: boolean;
	user?: XUser;
	tokens?: XOAuthTokens;
}

export interface XFeedState {
	posts: XPost[];
	users: { [key: string]: XUser };
	media: { [key: string]: XMedia };
	isLoading: boolean;
	error: string | null;
	lastFetch: number | null;
}

export interface XApiError {
	title: string;
	detail: string;
	type: string;
	status: number;
}