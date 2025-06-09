import { useCallback, useRef, useState } from "react";
import { Direction, GameState, type Position } from "../types";
import {
	INITIAL_SPEED,
	LEVEL_UP_THRESHOLD,
	MIN_SPEED,
	POINTS_PER_FOOD,
	SPEED_INCREASE,
	getInitialSnake,
} from "../utils/constants";
import {
	checkFoodCollision,
	checkSelfCollision,
	checkWallCollision,
	generateRandomFood,
	getNextPosition,
	isOppositeDirection,
	moveSnake,
} from "../utils/game-logic";
import { useGameLoop } from "./use-game-loop";
import { useKeyboardControls } from "./use-keyboard-controls";
import { useHighScore } from "./use-local-storage";

interface UseSnakeGameProps {
	gridWidth: number;
	gridHeight: number;
}

export const useSnakeGame = ({ gridWidth, gridHeight }: UseSnakeGameProps) => {
	const initialSnake = getInitialSnake(gridWidth, gridHeight);
	const [snake, setSnake] = useState<Position[]>(initialSnake);
	const [food, setFood] = useState<Position>(() =>
		generateRandomFood(initialSnake, gridWidth, gridHeight),
	);
	const [direction, setDirection] = useState<Direction>(Direction.RIGHT);
	const [gameState, setGameState] = useState<GameState>(GameState.READY);
	const [score, setScore] = useState(0);
	const [speed, setSpeed] = useState(INITIAL_SPEED);
	const [highScore, setHighScore] = useHighScore();

	// Use ref to store the current direction to avoid stale closures
	const currentDirectionRef = useRef(direction);
	currentDirectionRef.current = direction;

	const level = Math.floor(score / LEVEL_UP_THRESHOLD) + 1;

	const handleDirectionChange = useCallback((newDirection: Direction) => {
		// Prevent reversing into the snake's body
		if (!isOppositeDirection(currentDirectionRef.current, newDirection)) {
			setDirection(newDirection);
		}
	}, []);

	const resetGame = useCallback(() => {
		const newInitialSnake = getInitialSnake(gridWidth, gridHeight);
		setSnake(newInitialSnake);
		setFood(generateRandomFood(newInitialSnake, gridWidth, gridHeight));
		setDirection(Direction.RIGHT);
		setScore(0);
		setSpeed(INITIAL_SPEED);
		setGameState(GameState.READY);
	}, [gridWidth, gridHeight]);

	const startGame = useCallback(() => {
		if (gameState === GameState.READY || gameState === GameState.GAME_OVER) {
			resetGame();
		}
		setGameState(GameState.PLAYING);
	}, [gameState, resetGame]);

	const pauseGame = useCallback(() => {
		setGameState(GameState.PAUSED);
	}, []);

	const resumeGame = useCallback(() => {
		setGameState(GameState.PLAYING);
	}, []);

	const gameOver = useCallback(() => {
		setGameState(GameState.GAME_OVER);
		if (score > highScore) {
			setHighScore(score);
		}
	}, [score, highScore, setHighScore]);

	const gameTick = useCallback(() => {
		setSnake((currentSnake) => {
			if (currentSnake.length === 0) return currentSnake;

			const head = currentSnake[0];
			if (!head) return currentSnake;

			const nextPosition = getNextPosition(head, currentDirectionRef.current);

			// Check for wall collision
			if (checkWallCollision(nextPosition, gridWidth, gridHeight)) {
				gameOver();
				return currentSnake;
			}

			// Check for self collision
			if (checkSelfCollision(nextPosition, currentSnake)) {
				gameOver();
				return currentSnake;
			}

			// Check for food collision
			const ateFood = checkFoodCollision(nextPosition, food);

			if (ateFood) {
				// Generate new food
				const newSnake = moveSnake(
					currentSnake,
					currentDirectionRef.current,
					true,
				);
				setFood(generateRandomFood(newSnake, gridWidth, gridHeight));

				// Update score and potentially speed
				setScore((prevScore) => {
					const newScore = prevScore + POINTS_PER_FOOD;
					const newLevel = Math.floor(newScore / LEVEL_UP_THRESHOLD) + 1;
					const currentLevel = Math.floor(prevScore / LEVEL_UP_THRESHOLD) + 1;

					// Increase speed when leveling up
					if (newLevel > currentLevel) {
						setSpeed((prevSpeed) =>
							Math.max(MIN_SPEED, prevSpeed - SPEED_INCREASE),
						);
					}

					return newScore;
				});

				return newSnake;
			}

			return moveSnake(currentSnake, currentDirectionRef.current, false);
		});
	}, [food, gameOver, gridWidth, gridHeight]);

	// Set up game loop
	useGameLoop({
		isPlaying: gameState === GameState.PLAYING,
		speed,
		onGameTick: gameTick,
	});

	// Set up keyboard controls
	useKeyboardControls({
		onDirectionChange: handleDirectionChange,
		isPlaying: gameState === GameState.PLAYING,
	});

	return {
		// Game state
		snake,
		food,
		direction,
		gameState,
		score,
		highScore,
		level,
		speed,

		// Game controls
		startGame,
		pauseGame,
		resumeGame,
		resetGame,
		handleDirectionChange,

		// Utilities
		isPlaying: gameState === GameState.PLAYING,
		isPaused: gameState === GameState.PAUSED,
		isGameOver: gameState === GameState.GAME_OVER,
		isReady: gameState === GameState.READY,
	};
};
