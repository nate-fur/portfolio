import { useCallback, useState } from "react";
import { type Cell, GameStatus, type Position } from "../types";
import { MINE_COUNT } from "../utils/constants";
import {
	countFlaggedCells,
	countRevealedCells,
	explodeMine,
	generateBoard,
	isGameWon,
	revealAllMines,
	revealCell,
	toggleFlag,
} from "../utils/game-logic";
import { useGameTimer } from "./use-game-timer";
import { useGameStats } from "./use-local-storage";

export const useMinesweeperGame = () => {
	const [board, setBoard] = useState<Cell[][]>(() => generateBoard());
	const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.READY);
	const [firstClick, setFirstClick] = useState(true);
	const gameStats = useGameStats();

	const { timer, formatTime, resetTimer } = useGameTimer({
		gameStatus,
		onMaxTimeReached: () => {
			if (gameStatus === GameStatus.PLAYING) {
				handleGameLoss();
			}
		},
	});

	const mineCount = MINE_COUNT;
	const flaggedCount = countFlaggedCells(board);
	const remainingMines = Math.max(0, mineCount - flaggedCount);
	const revealedCount = countRevealedCells(board);

	const handleGameWin = useCallback(() => {
		setGameStatus(GameStatus.WON);
		gameStats.recordWin(timer);
	}, [timer, gameStats]);

	const handleGameLoss = useCallback(() => {
		setGameStatus(GameStatus.LOST);
		gameStats.recordLoss();
		setBoard((prevBoard) => revealAllMines(prevBoard));
	}, [gameStats]);

	const handleCellClick = useCallback(
		(x: number, y: number) => {
			if (
				gameStatus !== GameStatus.PLAYING &&
				gameStatus !== GameStatus.READY
			) {
				return;
			}

			setBoard((prevBoard) => {
				const cell = prevBoard[x]?.[y];
				if (!cell || cell.isRevealed || cell.isFlagged) {
					return prevBoard;
				}

				let newBoard = prevBoard;

				// Handle first click - regenerate board if clicked on mine
				if (firstClick) {
					setFirstClick(false);
					if (gameStatus === GameStatus.READY) {
						setGameStatus(GameStatus.PLAYING);
					}

					if (cell.isMine) {
						newBoard = generateBoard({ x, y });
					}
				}

				// Reveal the cell
				newBoard = revealCell(newBoard, x, y);
				const clickedCell = newBoard[x]?.[y];

				// Check if clicked on a mine
				if (clickedCell?.isMine) {
					newBoard = explodeMine(newBoard, x, y);
					setTimeout(() => handleGameLoss(), 100);
					return newBoard;
				}

				// Check for win condition
				setTimeout(() => {
					if (isGameWon(newBoard)) {
						handleGameWin();
					}
				}, 100);

				return newBoard;
			});
		},
		[gameStatus, firstClick, handleGameWin, handleGameLoss],
	);

	const handleCellRightClick = useCallback(
		(x: number, y: number) => {
			if (
				gameStatus !== GameStatus.PLAYING &&
				gameStatus !== GameStatus.READY
			) {
				return;
			}

			setBoard((prevBoard) => toggleFlag(prevBoard, x, y));
		},
		[gameStatus],
	);

	const startNewGame = useCallback(() => {
		setBoard(generateBoard());
		setGameStatus(GameStatus.READY);
		setFirstClick(true);
		resetTimer();
	}, [resetTimer]);

	const pauseGame = useCallback(() => {
		if (gameStatus === GameStatus.PLAYING) {
			setGameStatus(GameStatus.PAUSED);
		}
	}, [gameStatus]);

	const resumeGame = useCallback(() => {
		if (gameStatus === GameStatus.PAUSED) {
			setGameStatus(GameStatus.PLAYING);
		}
	}, [gameStatus]);

	return {
		// Game state
		board,
		gameStatus,
		timer,
		mineCount,
		flaggedCount,
		remainingMines,
		revealedCount,
		firstClick,

		// Game actions
		handleCellClick,
		handleCellRightClick,
		startNewGame,
		pauseGame,
		resumeGame,

		// Game stats
		gameStats,

		// Utilities
		formatTime,
		isPlaying: gameStatus === GameStatus.PLAYING,
		isPaused: gameStatus === GameStatus.PAUSED,
		isGameOver: gameStatus === GameStatus.WON || gameStatus === GameStatus.LOST,
		isWon: gameStatus === GameStatus.WON,
		isLost: gameStatus === GameStatus.LOST,
		isReady: gameStatus === GameStatus.READY,
	};
};
