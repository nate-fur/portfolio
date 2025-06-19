declare namespace Spotify {
	interface Track {
		uri: string;
		id: string;
		type: string;
		media_type: string;
		name: string;
		is_playable: boolean;
		album: {
			uri: string;
			name: string;
			images: Array<{ url: string; height: number; width: number }>;
		};
		artists: Array<{
			uri: string;
			name: string;
		}>;
	}

	interface PlayerState {
		context: {
			uri: string;
			metadata: Record<string, unknown>;
		};
		disallows: {
			pausing: boolean;
			peeking_next: boolean;
			peeking_prev: boolean;
			resuming: boolean;
			seeking: boolean;
			skipping_next: boolean;
			skipping_prev: boolean;
		};
		duration: number;
		paused: boolean;
		position: number;
		repeat_mode: number;
		shuffle: boolean;
		track_window: {
			current_track: Track;
			previous_tracks: Track[];
			next_tracks: Track[];
		};
	}

	interface Player {
		connect(): Promise<boolean>;
		disconnect(): void;
		addListener(event: string, callback: (state: any) => void): void;
		removeListener(event: string): void;
		getCurrentState(): Promise<PlayerState | null>;
		getName(): Promise<string>;
		getVolume(): Promise<number>;
		isConnected(): Promise<boolean>;
		pause(): Promise<void>;
		resume(): Promise<void>;
		seek(position_ms: number): Promise<void>;
		setVolume(volume: number): Promise<void>;
	}
}
