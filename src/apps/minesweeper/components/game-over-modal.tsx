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
	if (
		!isOpen ||
		(gameStatus !== GameStatus.WON && gameStatus !== GameStatus.LOST)
	) {
		return null;
	}

	const isWon = gameStatus === GameStatus.WON;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
			<div className="mx-4 w-full max-w-md rounded-lg border border-border bg-background p-6 shadow-xl">
				<div className="text-center">
					{/* Header */}
					<div className="mb-4">
						{isWon ? (
							<div className="mb-2 text-6xl">🎉</div>
						) : (
							<div className="mb-2 text-6xl">💥</div>
						)}
						<h2 className="font-bold text-2xl">
							{isWon ? "Congratulations!" : "Game Over"}
						</h2>
						<p className="mt-1 text-muted-foreground">
							{isWon ? "You cleared the minefield!" : "You hit a mine!"}
						</p>
					</div>

					{/* Stats */}
					<div className="mb-6 space-y-3">
						<div className="flex items-center justify-between rounded bg-muted px-4 py-2">
							<span>Time:</span>
							<span className="font-mono font-semibold">
								{formatTime(timer)}
							</span>
						</div>

						{isWon && bestTime > 0 && (
							<div className="flex items-center justify-between rounded bg-muted px-4 py-2">
								<span>Best Time:</span>
								<div className="flex items-center gap-2">
									{isNewRecord && (
										<RiTrophyLine className="h-4 w-4 text-yellow-500" />
									)}
									<span className="font-mono font-semibold">
										{formatTime(bestTime)}
									</span>
								</div>
							</div>
						)}

						{isNewRecord && isWon && (
							<div className="font-semibold text-green-600 text-sm dark:text-green-400">
								🎊 New Personal Best!
							</div>
						)}
					</div>

					{/* Actions */}
					<div className="flex justify-center gap-3">
						<Button onClick={onPlayAgain} size="sm">
							<RiRefreshLine className="mr-2 h-4 w-4" />
							Play Again
						</Button>
						{onClose && (
							<Button onClick={onClose} variant="outline" size="sm">
								<RiCloseLine className="mr-2 h-4 w-4" />
								Close
							</Button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
