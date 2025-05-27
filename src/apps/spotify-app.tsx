import { BaseAppContent } from "~/apps/base-app-content";

export const SpotifyApp = () => {
	return (
		<BaseAppContent
			title="Spotify Integration"
			description="Connect with Spotify to display your currently playing music, favorite tracks, and listening statistics."
			technologies={["Spotify API", "React", "OAuth 2.0", "Web Playback SDK"]}
		>
			<div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
				<div className="rounded-xl bg-white/10 p-4">
					<h4 className="mb-2 font-medium text-sm text-white">Now Playing</h4>
					<p className="text-sm text-white/70">
						Display your currently playing track with album art and controls.
					</p>
				</div>
				<div className="rounded-xl bg-white/10 p-4">
					<h4 className="mb-2 font-medium text-sm text-white">
						Listening Stats
					</h4>
					<p className="text-sm text-white/70">
						View your top artists, tracks, and listening habits over time.
					</p>
				</div>
			</div>

			<div className="mt-4 rounded-xl border border-green-500/30 bg-green-600/20 p-4">
				<div className="mb-3 flex items-center gap-3">
					<div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-pink-500">
						<span className="text-lg text-white">🎵</span>
					</div>
					<div className="flex-1">
						<h5 className="font-medium text-sm text-white">Not Connected</h5>
						<p className="text-sm text-white/70">
							Connect to Spotify to see your music
						</p>
					</div>
				</div>
				<button
					type="button"
					className="w-full rounded-lg bg-green-500 px-4 py-2 font-medium text-sm text-white transition-colors hover:bg-green-600"
				>
					Connect to Spotify
				</button>
			</div>
		</BaseAppContent>
	);
};
