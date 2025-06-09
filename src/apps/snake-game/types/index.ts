export interface Position {
	x: number;
	y: number;
}

export enum Direction {
	UP = "UP",
	DOWN = "DOWN",
	LEFT = "LEFT",
	RIGHT = "RIGHT",
}

export enum GameState {
	READY = "READY",
	PLAYING = "PLAYING",
	PAUSED = "PAUSED",
	GAME_OVER = "GAME_OVER",
}

export interface GameStats {
	score: number;
	highScore: number;
	level: number;
}

export interface SnakeGameState {
	snake: Position[];
	food: Position;
	direction: Direction;
	gameState: GameState;
	stats: GameStats;
	speed: number;
}
