import { RiCloseLine, RiRefreshLine, RiTrophyLine } from "react-icons/ri";
import { Button } from "~/components/ui/button";
import { GameStatus } from "../types";

interface GameOverModalProps {
	isOpen: boolean;
	gameStatus: GameStatus;
	timer: number;
	formatTime: (time: number) => string;
	bestTime: number;
	isNewRecord: boolean;
	onPlayAgain: () => void;
	onClose?: () => void;
}

export const GameOverModal = ({
	isOpen,
	gameStatus,
	timer,
	formatTime,
	bestTime,
	isNewRecord,
	onPlayAgain,
	onClose,
}: GameOverModalProps) => {
	if (!isOpen || (gameStatus !== GameStatus.WON && gameStatus !== GameStatus.LOST)) {
		return null;
	}

	const isWon = gameStatus === GameStatus.WON;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
			<div className="bg-background border border-border rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
				<div className="text-center">
					{/* Header */}
					<div className="mb-4">
						{isWon ? (
							<div className="text-6xl mb-2">🎉</div>
						) : (
							<div className="text-6xl mb-2">💥</div>
						)}
						<h2 className="text-2xl font-bold">
							{isWon ? "Congratulations!" : "Game Over"}
						</h2>
						<p className="text-muted-foreground mt-1">
							{isWon ? "You cleared the minefield!" : "You hit a mine!"}
						</p>
					</div>

					{/* Stats */}
					<div className="space-y-3 mb-6">
						<div className="flex justify-between items-center py-2 px-4 bg-muted rounded">
							<span>Time:</span>
							<span className="font-mono font-semibold">{formatTime(timer)}</span>
						</div>
						
						{isWon && bestTime > 0 && (
							<div className="flex justify-between items-center py-2 px-4 bg-muted rounded">
								<span>Best Time:</span>
								<div className="flex items-center gap-2">
									{isNewRecord && <RiTrophyLine className="w-4 h-4 text-yellow-500" />}
									<span className="font-mono font-semibold">
										{formatTime(bestTime)}
									</span>
								</div>
							</div>
						)}

						{isNewRecord && isWon && (
							<div className="text-sm text-green-600 dark:text-green-400 font-semibold">
								🎊 New Personal Best!
							</div>
						)}
					</div>

					{/* Actions */}
					<div className="flex gap-3 justify-center">
						<Button onClick={onPlayAgain} size="sm">
							<RiRefreshLine className="w-4 h-4 mr-2" />
							Play Again
						</Button>
						{onClose && (
							<Button onClick={onClose} variant="outline" size="sm">
								<RiCloseLine className="w-4 h-4 mr-2" />
								Close
							</Button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};