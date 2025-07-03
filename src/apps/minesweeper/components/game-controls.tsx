import React from "react";
import { RiPauseLine, RiPlayLine, RiRefreshLine } from "react-icons/ri";
import { Button } from "~/components/ui/button";
import { GameStatus } from "../types";

interface GameControlsProps {
	gameStatus: GameStatus;
	timer: number;
	remainingMines: number;
	formatTime: (time: number) => string;
	onNewGame: () => void;
	onPause: () => void;
	onResume: () => void;
}

export const GameControls = React.memo<GameControlsProps>(
	({
		gameStatus,
		timer,
		remainingMines,
		formatTime,
		onNewGame,
		onPause,
		onResume,
	}) => {
		const getGameStatusDisplay = () => {
			switch (gameStatus) {
				case GameStatus.WON:
					return "🎉 You Won!";
				case GameStatus.LOST:
					return "💥 Game Over";
				case GameStatus.PAUSED:
					return "⏸️ Paused";
				case GameStatus.PLAYING:
					return "🎮 Playing";
				default:
					return "🎯 Ready";
			}
		};

		const getStatusColor = () => {
			switch (gameStatus) {
				case GameStatus.WON:
					return "text-green-600 dark:text-green-400";
				case GameStatus.LOST:
					return "text-red-600 dark:text-red-400";
				case GameStatus.PAUSED:
					return "text-yellow-600 dark:text-yellow-400";
				case GameStatus.PLAYING:
					return "text-blue-600 dark:text-blue-400";
				default:
					return "text-gray-600 dark:text-gray-400";
			}
		};

		return (
			<div className="flex flex-col gap-4">
				{/* Status and Timer Row */}
				<div className="flex items-center justify-between">
					<div className={`font-semibold ${getStatusColor()}`}>
						{getGameStatusDisplay()}
					</div>
					<div className="rounded border-2 border-gray-600 bg-black px-3 py-1 font-mono text-green-400 text-lg">
						{formatTime(timer)}
					</div>
				</div>

				{/* Mine Counter and Controls Row */}
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						<span className="text-2xl">💣</span>
						<span className="font-mono font-semibold text-lg">
							{remainingMines.toString().padStart(3, "0")}
						</span>
					</div>

					<div className="flex gap-2">
						{gameStatus === GameStatus.PLAYING && (
							<Button onClick={onPause} variant="outline" size="sm">
								<RiPauseLine className="h-4 w-4" />
							</Button>
						)}

						{gameStatus === GameStatus.PAUSED && (
							<Button onClick={onResume} variant="outline" size="sm">
								<RiPlayLine className="h-4 w-4" />
							</Button>
						)}

						<Button onClick={onNewGame} variant="outline" size="sm">
							<RiRefreshLine className="h-4 w-4" />
							New Game
						</Button>
					</div>
				</div>
			</div>
		);
	},
);
