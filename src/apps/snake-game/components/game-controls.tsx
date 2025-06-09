import { GameState } from "../types";

interface GameControlsProps {
	gameState: GameState;
	onStart: () => void;
	onPause: () => void;
	onResume: () => void;
	onReset: () => void;
}

export const GameControls = ({
	gameState,
	onStart,
	onPause,
	onResume,
	onReset,
}: GameControlsProps) => {
	const isPlaying = gameState === GameState.PLAYING;
	const isPaused = gameState === GameState.PAUSED;
	const isGameOver = gameState === GameState.GAME_OVER;
	const isReady = gameState === GameState.READY;

	return (
		<div className="flex flex-wrap gap-2">
			{/* Start/Resume Button */}
			{(isReady || isGameOver) && (
				<button
					type="button"
					onClick={onStart}
					className="rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground text-sm transition-colors hover:bg-primary/90 focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
				>
					{isGameOver ? "Play Again" : "Start Game"}
				</button>
			)}

			{isPaused && (
				<button
					type="button"
					onClick={onResume}
					className="rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground text-sm transition-colors hover:bg-primary/90 focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
				>
					Resume
				</button>
			)}

			{/* Pause Button */}
			{isPlaying && (
				<button
					type="button"
					onClick={onPause}
					className="rounded-md bg-secondary px-4 py-2 font-medium text-secondary-foreground text-sm transition-colors hover:bg-secondary/90 focus:ring-2 focus:ring-secondary focus:ring-offset-2 focus:ring-offset-background"
				>
					Pause
				</button>
			)}

			{/* Reset Button */}
			<button
				type="button"
				onClick={onReset}
				className="rounded-md bg-destructive px-4 py-2 font-medium text-destructive-foreground text-sm transition-colors hover:bg-destructive/90 focus:ring-2 focus:ring-destructive focus:ring-offset-2 focus:ring-offset-background"
			>
				Reset
			</button>
		</div>
	);
};
