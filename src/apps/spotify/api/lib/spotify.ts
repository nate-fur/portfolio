import { env } from "~/env";

const SPOTIFY_API_BASE = "https://api.spotify.com/v1";
const SPOTIFY_AUTH_BASE = "https://accounts.spotify.com";

export interface SpotifyToken {
	access_token: string;
	token_type: string;
	expires_in: number;
	refresh_token: string;
	expires_at?: number;
	scope: string;
}

export interface SpotifyTrack {
	artists: string[];
	album: string;
	duration_ms: number;
	popularity: number;
}

export const getAccessToken = async (): Promise<SpotifyToken> => {
	const params = new URLSearchParams({
		grant_type: "client_credentials",
		scope: "user-read-currently-playing ",
	});

	const response = await fetch(`${SPOTIFY_AUTH_BASE}/api/token`, {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
			Authorization: `Basic ${Buffer.from(
				`${env.SPOTIFY_CLIENT_ID}:${env.SPOTIFY_CLIENT_SECRET}`,
			).toString("base64")}`,
		},
		body: params.toString(),
	});

	if (!response.ok) {
		throw new Error("Failed to get Spotify token");
	}

	return response.json();
};

export const refreshSpotifyToken = async (
	refresh_token: string,
): Promise<SpotifyToken> => {
	const params = new URLSearchParams({
		grant_type: "refresh_token",
		refresh_token,
	});

	const response = await fetch(`${SPOTIFY_AUTH_BASE}/api/token`, {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
			Authorization: `Basic ${Buffer.from(
				`${env.SPOTIFY_CLIENT_ID}:${env.SPOTIFY_CLIENT_SECRET}`,
			).toString("base64")}`,
		},
		body: params.toString(),
	});

	if (!response.ok) {
		throw new Error("Failed to refresh Spotify token");
	}

	return response.json();
};

export const getSpotifyLikedSongs = async (
	access_token: string,
): Promise<{ items: SpotifyTrack[] }> => {
	const response = await fetch(`${SPOTIFY_API_BASE}/me/tracks`, {
		headers: {
			Authorization: `Bearer ${access_token}`,
		},
	});

	if (!response.ok) {
		throw new Error("Failed to get liked songs");
	}

	return response.json();
};
