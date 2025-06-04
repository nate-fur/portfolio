import { useState } from "react";
import { BaseAppContent } from "~/apps/base-app-content";

export const SnakeGameApp = () => {
	const [score, setScore] = useState(0);
	const [isPlaying, setIsPlaying] = useState(false);
	const [gameMessage, setGameMessage] = useState("🐍 Press Start to Play");

	const handleStart = () => {
		setIsPlaying(true);
		setScore(0);
		setGameMessage("Game Started! Use arrow keys to move");
	};

	const handlePause = () => {
		setIsPlaying(false);
		setGameMessage("Game Paused - Press Start to Resume");
	};

	const handleReset = () => {
		setIsPlaying(false);
		setScore(0);
		setGameMessage("🐍 Press Start to Play");
	};

	const incrementScore = () => {
		setScore((prev) => prev + 10);
	};

	return (
		<BaseAppContent
			title="Snake Game"
			description="Classic snake game built with modern web technologies. Control the snake to eat food and grow longer while avoiding walls and yourself."
			technologies={["React", "TypeScript", "Canvas API", "Game Logic"]}
		>
			<div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
				<div className="rounded-xl bg-white/10 p-4">
					<h4 className="mb-2 font-medium text-foreground text-sm">
						Classic Gameplay
					</h4>
					<p className="text-muted-foreground text-sm">
						Navigate the snake using arrow keys or WASD to collect food and
						grow.
					</p>
				</div>
				<div className="rounded-xl bg-white/10 p-4">
					<h4 className="mb-2 font-medium text-foreground text-sm">
						High Score System
					</h4>
					<p className="text-muted-foreground text-sm">
						Track your best scores and compete with yourself to improve.
					</p>
				</div>
			</div>

			<div className="mt-4 rounded-xl bg-white/5 p-4">
				<div className="mb-3 flex items-center justify-between">
					<span className="text-muted-foreground text-sm">Game Controls</span>
					<span className="text-muted-foreground text-sm">Score: {score}</span>
				</div>

				{/* Game Controls */}
				<div className="mb-4 flex gap-2">
					<button
						type="button"
						onClick={handleStart}
						disabled={isPlaying}
						className="rounded bg-green-600 px-4 py-2 text-sm text-white transition-colors hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
					>
						{isPlaying ? "Playing..." : "Start"}
					</button>
					<button
						type="button"
						onClick={handlePause}
						disabled={!isPlaying}
						className="rounded bg-yellow-600 px-4 py-2 text-sm text-white transition-colors hover:bg-yellow-700 disabled:cursor-not-allowed disabled:opacity-50"
					>
						Pause
					</button>
					<button
						type="button"
						onClick={handleReset}
						className="rounded bg-red-600 px-4 py-2 text-sm text-white transition-colors hover:bg-red-700"
					>
						Reset
					</button>
					<button
						type="button"
						onClick={incrementScore}
						className="rounded bg-blue-600 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-700"
					>
						+10 Points (Demo)
					</button>
				</div>

				<div className="aspect-video rounded-lg border border-green-500/30 bg-green-900/30 p-2">
					<div className="flex h-full w-full items-center justify-center rounded bg-green-900/20">
						<span className="text-center text-green-400 text-sm">
							{gameMessage}
						</span>
					</div>
				</div>
			</div>
		</BaseAppContent>
	);
};
