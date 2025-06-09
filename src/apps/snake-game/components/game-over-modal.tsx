interface GameOverModalProps {
	isOpen: boolean;
	score: number;
	highScore: number;
	isNewHighScore: boolean;
	onPlayAgain: () => void;
	onReset: () => void;
}

export const GameOverModal = ({
	isOpen,
	score,
	highScore,
	isNewHighScore,
	onPlayAgain,
	onReset,
}: GameOverModalProps) => {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
			<div className="mx-4 w-full max-w-sm rounded-xl border border-border bg-card p-6 text-center">
				<div className="mb-4 text-3xl">💀</div>

				<h2 className="mb-2 font-bold text-2xl text-destructive">Game Over!</h2>

				{isNewHighScore && (
					<div className="mb-2 font-semibold text-accent-foreground">
						🎉 New High Score! 🎉
					</div>
				)}

				<div className="mb-6 space-y-2">
					<div>
						<span className="text-muted-foreground">Final Score: </span>
						<span className="font-bold text-lg text-primary">{score}</span>
					</div>
					<div>
						<span className="text-muted-foreground">High Score: </span>
						<span className="font-bold text-accent-foreground">
							{highScore}
						</span>
					</div>
				</div>

				<div className="flex justify-center gap-3">
					<button
						type="button"
						onClick={onPlayAgain}
						className="rounded-md bg-primary px-6 py-2 font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
					>
						Play Again
					</button>
					<button
						type="button"
						onClick={onReset}
						className="rounded-md bg-secondary px-6 py-2 font-medium text-secondary-foreground transition-colors hover:bg-secondary/90 focus:ring-2 focus:ring-secondary focus:ring-offset-2 focus:ring-offset-background"
					>
						Close
					</button>
				</div>
			</div>
		</div>
	);
};
