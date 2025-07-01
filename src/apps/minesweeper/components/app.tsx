import { BaseAppContent } from "~/apps/base-app-content";
import { useContainerDimensions } from "../hooks/use-container-dimensions";
import { useMinesweeperGame } from "../hooks/use-minesweeper-game";
import { calculateGridDimensions } from "../utils/responsive-grid";
import { GameBoard } from "./game-board";
import { GameControls } from "./game-controls";
import { GameOverModal } from "./game-over-modal";
import { Statistics } from "./statistics";

export const MinesweeperApp = () => {
	const [containerRef, containerDimensions] = useContainerDimensions();
	const gridDimensions = calculateGridDimensions(
		containerDimensions.width,
		containerDimensions.height,
		containerDimensions.isMobile,
	);

	const {
		board,
		gameStatus,
		timer,
		remainingMines,
		handleCellClick,
		handleCellRightClick,
		startNewGame,
		pauseGame,
		resumeGame,
		gameStats,
		formatTime,
		isGameOver,
		isWon,
	} = useMinesweeperGame();

	const isNewRecord = isWon && timer > 0 && (gameStats.bestTime === 0 || timer < gameStats.bestTime);

	return (
		<BaseAppContent
			title="Minesweeper"
			description="Classic minesweeper game with modern design. Left click to reveal cells, right click to flag mines. Clear all non-mine cells to win!"
			technologies={["React", "TypeScript", "Game Logic", "Local Storage"]}
		>
			<div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
				<div className="rounded-xl bg-white/10 p-4">
					<h4 className="mb-2 font-medium text-foreground text-sm">
						Classic Rules
					</h4>
					<p className="text-muted-foreground text-sm">
						Left click to reveal cells, right click to flag potential mines. Numbers show adjacent mine count.
					</p>
				</div>
				<div className="rounded-xl bg-white/10 p-4">
					<h4 className="mb-2 font-medium text-foreground text-sm">
						First Click Safety
					</h4>
					<p className="text-muted-foreground text-sm">
						Your first click is always safe - the minefield adjusts to ensure you don't hit a mine.
					</p>
				</div>
			</div>

			<div ref={containerRef} className="mt-6 space-y-6">
				{/* Game Statistics */}
				<Statistics
					bestTime={gameStats.bestTime}
					gamesPlayed={gameStats.gamesPlayed}
					gamesWon={gameStats.gamesWon}
					winRate={gameStats.winRate}
					formatTime={formatTime}
				/>

				{/* Game Controls */}
				<GameControls
					gameStatus={gameStatus}
					timer={timer}
					remainingMines={remainingMines}
					formatTime={formatTime}
					onNewGame={startNewGame}
					onPause={pauseGame}
					onResume={resumeGame}
				/>

				{/* Game Board */}
				<div className="flex justify-center">
					<GameBoard
						board={board}
						cellSize={gridDimensions.cellSize}
						fontSize={gridDimensions.fontSize}
						onCellClick={handleCellClick}
						onCellRightClick={handleCellRightClick}
						disabled={isGameOver}
					/>
				</div>

				{/* Instructions */}
				<div className="space-y-1 text-center text-muted-foreground text-sm">
					<p>💡 Left click to reveal • Right click to flag</p>
					<p>🎯 Find all {remainingMines} mines to win</p>
					<p>⚠️ Numbers show adjacent mine count</p>
				</div>
			</div>

			{/* Game Over Modal */}
			<GameOverModal
				isOpen={isGameOver}
				gameStatus={gameStatus}
				timer={timer}
				formatTime={formatTime}
				bestTime={gameStats.bestTime}
				isNewRecord={isNewRecord}
				onPlayAgain={startNewGame}
			/>
		</BaseAppContent>
	);
};