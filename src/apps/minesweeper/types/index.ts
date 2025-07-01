export interface Position {
	x: number;
	y: number;
}

export interface Cell {
	x: number;
	y: number;
	isMine: boolean;
	isRevealed: boolean;
	isFlagged: boolean;
	neighborMines: number;
	isExploded?: boolean;
}

export enum GameStatus {
	READY = "READY",
	PLAYING = "PLAYING",
	PAUSED = "PAUSED",
	WON = "WON",
	LOST = "LOST",
}

export interface GameState {
	board: Cell[][];
	gameStatus: GameStatus;
	timer: number;
	mineCount: number;
	flaggedCount: number;
	firstClick: boolean;
	revealedCount: number;
}

export interface GameStats {
	bestTime: number;
	gamesPlayed: number;
	gamesWon: number;
}

export interface MinesweeperGameState {
	board: Cell[][];
	gameStatus: GameStatus;
	timer: number;
	mineCount: number;
	flaggedCount: number;
	firstClick: boolean;
	stats: GameStats;
}