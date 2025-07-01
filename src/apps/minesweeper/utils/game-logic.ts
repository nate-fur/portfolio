import type { Cell, Position } from "../types";
import { GRID_SIZE, MINE_COUNT, NEIGHBOR_OFFSETS } from "./constants";

export const createEmptyBoard = (): Cell[][] => {
	const board: Cell[][] = [];
	for (let x = 0; x < GRID_SIZE; x++) {
		board[x] = [];
		for (let y = 0; y < GRID_SIZE; y++) {
			board[x]![y] = {
				x,
				y,
				isMine: false,
				isRevealed: false,
				isFlagged: false,
				neighborMines: 0,
			};
		}
	}
	return board;
};

export const isValidPosition = (x: number, y: number): boolean => {
	return x >= 0 && x < GRID_SIZE && y >= 0 && y < GRID_SIZE;
};

export const getNeighbors = (x: number, y: number): Position[] => {
	const neighbors: Position[] = [];

	for (const offset of NEIGHBOR_OFFSETS) {
		const [dx, dy] = offset;
		if (dx !== undefined && dy !== undefined) {
			const newX = x + dx;
			const newY = y + dy;

			if (isValidPosition(newX, newY)) {
				neighbors.push({ x: newX, y: newY });
			}
		}
	}

	return neighbors;
};

export const placeMines = (
	board: Cell[][],
	excludePosition?: Position,
): Cell[][] => {
	const newBoard = board.map((row) =>
		row.map((cell) => ({ ...cell, isMine: false })),
	);
	let minesPlaced = 0;

	while (minesPlaced < MINE_COUNT) {
		const x = Math.floor(Math.random() * GRID_SIZE);
		const y = Math.floor(Math.random() * GRID_SIZE);

		// Don't place mine on the excluded position (first click) or if already has a mine
		const cell = newBoard[x]?.[y];
		if (
			cell &&
			!cell.isMine &&
			(!excludePosition || x !== excludePosition.x || y !== excludePosition.y)
		) {
			cell.isMine = true;
			minesPlaced++;
		}
	}

	return newBoard;
};

export const calculateNeighborMines = (board: Cell[][]): Cell[][] => {
	const newBoard = board.map((row) => row.map((cell) => ({ ...cell })));

	for (let x = 0; x < GRID_SIZE; x++) {
		for (let y = 0; y < GRID_SIZE; y++) {
			const cell = newBoard[x]?.[y];
			if (cell && !cell.isMine) {
				const neighbors = getNeighbors(x, y);
				const mineCount = neighbors.reduce((count, { x: nx, y: ny }) => {
					const neighborCell = newBoard[nx]?.[ny];
					return count + (neighborCell?.isMine ? 1 : 0);
				}, 0);
				cell.neighborMines = mineCount;
			}
		}
	}

	return newBoard;
};

export const generateBoard = (firstClickPosition?: Position): Cell[][] => {
	let board = createEmptyBoard();
	board = placeMines(board, firstClickPosition);
	board = calculateNeighborMines(board);
	return board;
};

export const revealCell = (board: Cell[][], x: number, y: number): Cell[][] => {
	const newBoard = board.map((row) => row.map((cell) => ({ ...cell })));

	if (
		!isValidPosition(x, y) ||
		newBoard[x]?.[y]?.isRevealed ||
		newBoard[x]?.[y]?.isFlagged
	) {
		return newBoard;
	}

	if (newBoard[x]?.[y]) {
		newBoard[x][y].isRevealed = true;
	}

	// If the cell has no neighboring mines, reveal all adjacent cells (flood fill)
	if (newBoard[x]?.[y]?.neighborMines === 0 && !newBoard[x]?.[y]?.isMine) {
		const neighbors = getNeighbors(x, y);
		for (const { x: nx, y: ny } of neighbors) {
			if (
				newBoard[nx]?.[ny] &&
				!newBoard[nx][ny].isRevealed &&
				!newBoard[nx][ny].isFlagged
			) {
				// Recursively reveal all neighbors
				const updatedBoard = revealCell(newBoard, nx, ny);
				// Copy over any new reveals from the recursive call
				for (let i = 0; i < GRID_SIZE; i++) {
					for (let j = 0; j < GRID_SIZE; j++) {
						if (updatedBoard[i]?.[j]?.isRevealed) {
							if (newBoard[i]?.[j]) {
								newBoard[i][j].isRevealed = true;
							}
						}
					}
				}
			}
		}
	}

	return newBoard;
};

export const toggleFlag = (board: Cell[][], x: number, y: number): Cell[][] => {
	const newBoard = board.map((row) => row.map((cell) => ({ ...cell })));

	if (!isValidPosition(x, y) || newBoard[x][y].isRevealed) {
		return newBoard;
	}

	newBoard[x][y].isFlagged = !newBoard[x][y].isFlagged;
	return newBoard;
};

export const revealAllMines = (board: Cell[][]): Cell[][] => {
	const newBoard = board.map((row) => row.map((cell) => ({ ...cell })));

	for (let x = 0; x < GRID_SIZE; x++) {
		for (let y = 0; y < GRID_SIZE; y++) {
			if (newBoard[x][y].isMine) {
				newBoard[x][y].isRevealed = true;
			}
		}
	}

	return newBoard;
};

export const countRevealedCells = (board: Cell[][]): number => {
	let count = 0;
	for (let x = 0; x < GRID_SIZE; x++) {
		for (let y = 0; y < GRID_SIZE; y++) {
			if (board[x][y].isRevealed && !board[x][y].isMine) {
				count++;
			}
		}
	}
	return count;
};

export const countFlaggedCells = (board: Cell[][]): number => {
	let count = 0;
	for (let x = 0; x < GRID_SIZE; x++) {
		for (let y = 0; y < GRID_SIZE; y++) {
			if (board[x][y].isFlagged) {
				count++;
			}
		}
	}
	return count;
};

export const isGameWon = (board: Cell[][]): boolean => {
	for (let x = 0; x < GRID_SIZE; x++) {
		for (let y = 0; y < GRID_SIZE; y++) {
			const cell = board[x][y];
			// If there's a non-mine cell that's not revealed, game is not won
			if (!cell.isMine && !cell.isRevealed) {
				return false;
			}
		}
	}
	return true;
};

export const explodeMine = (
	board: Cell[][],
	x: number,
	y: number,
): Cell[][] => {
	const newBoard = board.map((row) => row.map((cell) => ({ ...cell })));
	if (isValidPosition(x, y) && newBoard[x][y].isMine) {
		newBoard[x][y].isExploded = true;
	}
	return newBoard;
};
