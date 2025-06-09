interface ScoreDisplayProps {
	score: number;
	highScore: number;
	level: number;
	snakeLength: number;
}

export const ScoreDisplay = ({
	score,
	highScore,
	level,
	snakeLength,
}: ScoreDisplayProps) => {
	return (
		<div className="grid grid-cols-2 gap-4 rounded-lg border border-border bg-card/50 p-4">
			<div className="text-center">
				<div className="font-bold text-2xl text-primary">{score}</div>
				<div className="text-muted-foreground text-xs uppercase tracking-wide">
					Score
				</div>
			</div>

			<div className="text-center">
				<div className="font-bold text-2xl text-accent-foreground">
					{highScore}
				</div>
				<div className="text-muted-foreground text-xs uppercase tracking-wide">
					High Score
				</div>
			</div>

			<div className="text-center">
				<div className="font-bold text-2xl text-secondary-foreground">
					{level}
				</div>
				<div className="text-muted-foreground text-xs uppercase tracking-wide">
					Level
				</div>
			</div>

			<div className="text-center">
				<div className="font-bold text-2xl text-foreground">{snakeLength}</div>
				<div className="text-muted-foreground text-xs uppercase tracking-wide">
					Length
				</div>
			</div>
		</div>
	);
};
