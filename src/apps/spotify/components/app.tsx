"use client";

import { useEffect, useState } from "react";
import { BaseAppContent } from "~/apps/base-app-content";
import {
	SpotifyPlayerProvider,
	useSpotifyPlayer,
} from "~/apps/spotify/contexts/spotify-player";
import { api } from "~/trpc/react";

function SpotifyContent() {
	const player = useSpotifyPlayer();

	return (
		<BaseAppContent
			title="Spotify Integration"
			description="Connect with Spotify to display your currently playing music, favorite tracks, and listening statistics."
			technologies={["Spotify API", "React", "OAuth 2.0", "Web Playback SDK"]}
		>
			{/* TODO: Add Spotify integration */}
			<pre>{JSON.stringify(player.accessToken, null, 2)}</pre>
		</BaseAppContent>
	);
}

export const SpotifyApp = () => {
	const { data: userAccessToken, isLoading: isLoadingAccessToken } =
		api.spotify.getAccessToken.useQuery();

	if (isLoadingAccessToken) {
		return (
			<div className="flex items-center justify-center p-8">
				<div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
			</div>
		);
	}

	if (!userAccessToken) {
		return (
			<div className="flex items-center justify-center p-8">
				<p>No access token</p>
			</div>
		);
	}

	return (
		<SpotifyPlayerProvider accessToken={userAccessToken.access_token}>
			<SpotifyContent />
		</SpotifyPlayerProvider>
	);
};
