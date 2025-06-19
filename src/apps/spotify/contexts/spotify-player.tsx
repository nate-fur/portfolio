"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";

interface SpotifyPlayerContextType {
	isReady: boolean;
	isPlaying: boolean;
	currentTrack: Spotify.Track | null;
	deviceId: string | null;
	accessToken: string;
}

const SpotifyPlayerContext = createContext<SpotifyPlayerContextType | null>(
	null,
);

declare global {
	interface Window {
		Spotify: {
			Player: new (config: {
				name: string;
				getOAuthToken: (cb: (token: string) => void) => void;
				volume?: number;
			}) => Spotify.Player;
		};
		onSpotifyWebPlaybackSDKReady: () => void;
	}
}

export function SpotifyPlayerProvider({
	children,
	accessToken,
}: {
	children: React.ReactNode;
	accessToken: string;
}) {
	const playerRef = useRef<Spotify.Player | null>(null);
	const [isReady, setIsReady] = useState(false);
	const [isPlaying, setIsPlaying] = useState(false);
	const [currentTrack, setCurrentTrack] = useState<Spotify.Track | null>(null);
	const [deviceId, setDeviceId] = useState<string | null>(null);

	useEffect(() => {
		if (!accessToken) return;

		let script: HTMLScriptElement | null = null;

		script = document.createElement("script");
		script.src = "https://sdk.scdn.co/spotify-player.js";
		script.async = true;

		document.body.appendChild(script);

		window.onSpotifyWebPlaybackSDKReady = () => {
			const player = new window.Spotify.Player({
				name: "Portfolio Web Player",
				getOAuthToken: (cb) => {
					cb(accessToken);
				},
				volume: 0.5,
			});

			// Error handling
			player.addListener("initialization_error", ({ message }) => {
				console.error("Failed to initialize:", message);
			});

			player.addListener("authentication_error", ({ message }) => {
				console.error("Failed to authenticate:", message);
			});

			player.addListener("account_error", ({ message }) => {
				console.error("Failed to validate Spotify account:", message);
			});

			player.addListener("playback_error", ({ message }) => {
				console.error("Failed to perform playback:", message);
			});

			// Playback status updates
			player.addListener("player_state_changed", (state) => {
				if (!state) return;

				setCurrentTrack(state.track_window.current_track);
				setIsPlaying(!state.paused);
			});

			// Ready
			player.addListener("ready", ({ device_id }) => {
				console.log("Ready with Device ID", device_id);
				setDeviceId(device_id);
				setIsReady(true);
			});

			// Not Ready
			player.addListener("not_ready", ({ device_id }) => {
				console.log("Device ID has gone offline", device_id);
				setIsReady(false);
			});

			// Connect to the player!
			player.connect();

			playerRef.current = player;
		};

		return () => {
			if (playerRef.current) {
				playerRef.current.disconnect();
				playerRef.current = null;
			}
			script?.parentNode?.removeChild(script);
		};
	}, [accessToken]);

	return (
		<SpotifyPlayerContext.Provider
			value={{
				isReady,
				isPlaying,
				currentTrack,
				deviceId,
				accessToken,
			}}
		>
			{children}
		</SpotifyPlayerContext.Provider>
	);
}

export function useSpotifyPlayer() {
	const context = useContext(SpotifyPlayerContext);
	if (!context) {
		throw new Error(
			"useSpotifyPlayer must be used within a SpotifyPlayerProvider",
		);
	}
	return context;
}
