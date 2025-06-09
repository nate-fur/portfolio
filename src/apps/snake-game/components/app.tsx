import { BaseAppContent } from "~/apps/base-app-content";
import { useContainerDimensions } from "../hooks/use-container-dimensions";
import { useSnakeGame } from "../hooks/use-snake-game";
import { getCanvasDimensions } from "../utils/responsive-canvas";
import { GameCanvas } from "./game-canvas";
import { GameControls } from "./game-controls";
import { GameOverModal } from "./game-over-modal";
import { MobileControls } from "./mobile-controls";
import { ScoreDisplay } from "./score-display";

export const SnakeGameApp = () => {
	const [containerRef, containerDimensions] = useContainerDimensions();
	const canvasDimensions = getCanvasDimensions(
		containerDimensions.width,
		containerDimensions.height,
		containerDimensions.isMobile,
	);

	const {
		snake,
		food,
		gameState,
		score,
		highScore,
		level,
		startGame,
		pauseGame,
		resumeGame,
		resetGame,
		handleDirectionChange,
		isPlaying,
		isGameOver,
	} = useSnakeGame({
		gridWidth: canvasDimensions.GRID_WIDTH,
		gridHeight: canvasDimensions.GRID_HEIGHT,
	});

	const isNewHighScore = score === highScore && score > 0;

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
						Progressive Difficulty
					</h4>
					<p className="text-muted-foreground text-sm">
						Game speed increases as you level up. Survive as long as you can!
					</p>
				</div>
			</div>

			<div ref={containerRef} className="mt-6 space-y-4">
				{/* Score Display */}
				<ScoreDisplay
					score={score}
					highScore={highScore}
					level={level}
					snakeLength={snake.length}
				/>

				{/* Game Controls */}
				<div className="flex items-center justify-between">
					<GameControls
						gameState={gameState}
						onStart={startGame}
						onPause={pauseGame}
						onResume={resumeGame}
						onReset={resetGame}
					/>

					<div className="text-muted-foreground text-sm">
						Use arrow keys or WASD to move
					</div>
				</div>

				{/* Game Canvas */}
				<div className="flex justify-center">
					<GameCanvas
						snake={snake}
						food={food}
						isPlaying={isPlaying}
						canvasWidth={canvasDimensions.CANVAS_WIDTH}
						canvasHeight={canvasDimensions.CANVAS_HEIGHT}
						gridSize={canvasDimensions.GRID_SIZE}
					/>
				</div>

				{/* Mobile Controls */}
				{containerDimensions.isMobile && (
					<MobileControls
						onDirectionChange={handleDirectionChange}
						isVisible={containerDimensions.isMobile}
						disabled={!isPlaying}
					/>
				)}

				{/* Game Instructions */}
				<div className="space-y-1 text-center text-muted-foreground text-sm">
					<p>🎮 Control the snake to eat food and grow</p>
					<p>⚠️ Avoid hitting walls or your own body</p>
					<p>🚀 Speed increases every 50 points</p>
				</div>
			</div>

			{/* Game Over Modal */}
			<GameOverModal
				isOpen={isGameOver}
				score={score}
				highScore={highScore}
				isNewHighScore={isNewHighScore}
				onPlayAgain={startGame}
				onReset={resetGame}
			/>
		</BaseAppContent>
	);
};
