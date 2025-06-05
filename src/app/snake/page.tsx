'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
type Position = { x: number; y: number };

const BOARD_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_FOOD = { x: 15, y: 15 };
const INITIAL_DIRECTION: Direction = 'RIGHT';
const GAME_SPEED = 150;

export default function SnakeGame() {
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE);
  const [food, setFood] = useState<Position>(INITIAL_FOOD);
  const [direction, setDirection] = useState<Direction>(INITIAL_DIRECTION);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const gameLoopRef = useRef<ReturnType<typeof setInterval>>();

  // Load high score from localStorage on component mount
  useEffect(() => {
    const savedHighScore = localStorage.getItem('snakeHighScore');
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore, 10));
    }
  }, []);

  // Save high score to localStorage
  const saveHighScore = useCallback((newScore: number) => {
    if (newScore > highScore) {
      setHighScore(newScore);
      localStorage.setItem('snakeHighScore', newScore.toString());
    }
  }, [highScore]);

  // Generate random food position
  const generateFood = useCallback((): Position => {
    let newFood: Position;
    do {
      newFood = {
        x: Math.floor(Math.random() * BOARD_SIZE),
        y: Math.floor(Math.random() * BOARD_SIZE),
      };
    } while (snake.some((segment: Position) => segment.x === newFood.x && segment.y === newFood.y));
    return newFood;
  }, [snake]);

  // Check collision with walls or self
  const checkCollision = useCallback((head: Position, snakeBody: Position[]): boolean => {
    // Wall collision
    if (head.x < 0 || head.x >= BOARD_SIZE || head.y < 0 || head.y >= BOARD_SIZE) {
      return true;
    }
    // Self collision
    return snakeBody.some((segment: Position) => segment.x === head.x && segment.y === head.y);
  }, []);

  // Move snake
  const moveSnake = useCallback(() => {
    if (gameOver || !isPlaying) return;

    setSnake((currentSnake: Position[]) => {
      const newSnake = [...currentSnake];
      const head = { ...newSnake[0]! };

      // Move head based on direction
      switch (direction) {
        case 'UP':
          head.y -= 1;
          break;
        case 'DOWN':
          head.y += 1;
          break;
        case 'LEFT':
          head.x -= 1;
          break;
        case 'RIGHT':
          head.x += 1;
          break;
      }

      // Check collision
      if (checkCollision(head, newSnake)) {
        setGameOver(true);
        setIsPlaying(false);
        saveHighScore(score);
        return currentSnake;
      }

      newSnake.unshift(head);

      // Check if food is eaten
      if (head.x === food.x && head.y === food.y) {
        setScore((prev: number) => prev + 10);
        setFood(generateFood());
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food, gameOver, isPlaying, checkCollision, saveHighScore, score, generateFood]);

  // Game loop
  useEffect(() => {
    if (isPlaying && !gameOver) {
      gameLoopRef.current = setInterval(moveSnake, GAME_SPEED);
    } else {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    }

    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    };
  }, [isPlaying, gameOver, moveSnake]);

  // Handle keyboard input
  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (!isPlaying) return;

    switch (event.key) {
      case 'ArrowUp':
      case 'w':
      case 'W':
        if (direction !== 'DOWN') setDirection('UP');
        break;
      case 'ArrowDown':
      case 's':
      case 'S':
        if (direction !== 'UP') setDirection('DOWN');
        break;
      case 'ArrowLeft':
      case 'a':
      case 'A':
        if (direction !== 'RIGHT') setDirection('LEFT');
        break;
      case 'ArrowRight':
      case 'd':
      case 'D':
        if (direction !== 'LEFT') setDirection('RIGHT');
        break;
    }
  }, [direction, isPlaying]);

  // Keyboard event listener
  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  // Reset game
  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setFood(INITIAL_FOOD);
    setDirection(INITIAL_DIRECTION);
    setGameOver(false);
    setScore(0);
    setIsPlaying(false);
  };

  // Start game
  const startGame = () => {
    resetGame();
    setIsPlaying(true);
  };

  // Pause/Resume game
  const togglePause = () => {
    setIsPlaying((prev: boolean) => !prev);
  };

  // Mobile touch controls
  const handleTouchControl = (newDirection: Direction) => {
    if (!isPlaying) return;
    
    switch (newDirection) {
      case 'UP':
        if (direction !== 'DOWN') setDirection('UP');
        break;
      case 'DOWN':
        if (direction !== 'UP') setDirection('DOWN');
        break;
      case 'LEFT':
        if (direction !== 'RIGHT') setDirection('LEFT');
        break;
      case 'RIGHT':
        if (direction !== 'LEFT') setDirection('RIGHT');
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-green-400">Snake Game</h1>
        
        {/* Score Display */}
        <div className="flex justify-between items-center mb-6 text-lg">
          <div>Score: <span className="text-yellow-400 font-bold">{score}</span></div>
          <div>High Score: <span className="text-red-400 font-bold">{highScore}</span></div>
        </div>

        {/* Game Board */}
        <div className="relative mx-auto mb-6" style={{ width: '400px', height: '400px' }}>
          <div 
            className="grid gap-0 border-2 border-green-400 bg-gray-800"
            style={{ 
              gridTemplateColumns: `repeat(${BOARD_SIZE}, 1fr)`,
              width: '400px',
              height: '400px'
            }}
          >
            {Array.from({ length: BOARD_SIZE * BOARD_SIZE }).map((_, index) => {
              const x = index % BOARD_SIZE;
              const y = Math.floor(index / BOARD_SIZE);
              const isSnakeHead = snake[0]?.x === x && snake[0]?.y === y;
              const isSnakeBody = snake.slice(1).some((segment: Position) => segment.x === x && segment.y === y);
              const isFood = food.x === x && food.y === y;

              return (
                <div
                  key={index}
                  className={`w-full h-full ${
                    isSnakeHead
                      ? 'bg-green-300'
                      : isSnakeBody
                      ? 'bg-green-500'
                      : isFood
                      ? 'bg-red-500 rounded-full'
                      : 'bg-gray-800'
                  }`}
                />
              );
            })}
          </div>

          {/* Game Over Overlay */}
          {gameOver && (
            <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-red-400 mb-4">Game Over!</h2>
                <p className="text-xl mb-4">Final Score: {score}</p>
                {score === highScore && score > 0 && (
                  <p className="text-yellow-400 mb-4">🎉 New High Score! 🎉</p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="flex flex-col items-center space-y-4">
          <div className="flex space-x-4">
            {!isPlaying && !gameOver && (
              <button
                onClick={startGame}
                className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg font-semibold transition-colors"
              >
                Start Game
              </button>
            )}
            
            {isPlaying && (
              <button
                onClick={togglePause}
                className="px-6 py-3 bg-yellow-600 hover:bg-yellow-700 rounded-lg font-semibold transition-colors"
              >
                Pause
              </button>
            )}
            
            {gameOver && (
              <button
                onClick={startGame}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors"
              >
                Play Again
              </button>
            )}
            
            <button
              onClick={resetGame}
              className="px-6 py-3 bg-gray-600 hover:bg-gray-700 rounded-lg font-semibold transition-colors"
            >
              Reset
            </button>
          </div>

          {/* Mobile Touch Controls */}
          <div className="md:hidden">
            <div className="grid grid-cols-3 gap-2 w-48">
              <div></div>
              <button
                onTouchStart={() => handleTouchControl('UP')}
                className="p-4 bg-gray-700 hover:bg-gray-600 rounded-lg text-center font-bold text-xl"
              >
                ↑
              </button>
              <div></div>
              <button
                onTouchStart={() => handleTouchControl('LEFT')}
                className="p-4 bg-gray-700 hover:bg-gray-600 rounded-lg text-center font-bold text-xl"
              >
                ←
              </button>
              <div></div>
              <button
                onTouchStart={() => handleTouchControl('RIGHT')}
                className="p-4 bg-gray-700 hover:bg-gray-600 rounded-lg text-center font-bold text-xl"
              >
                →
              </button>
              <div></div>
              <button
                onTouchStart={() => handleTouchControl('DOWN')}
                className="p-4 bg-gray-700 hover:bg-gray-600 rounded-lg text-center font-bold text-xl"
              >
                ↓
              </button>
              <div></div>
            </div>
          </div>

          {/* Instructions */}
          <div className="text-center text-sm text-gray-400 max-w-md">
            <p className="mb-2">
              <span className="hidden md:inline">Use arrow keys or WASD to control the snake.</span>
              <span className="md:hidden">Use the touch controls to move the snake.</span>
            </p>
            <p>Eat the red food to grow and increase your score!</p>
          </div>
        </div>
      </div>
    </div>
  );
}