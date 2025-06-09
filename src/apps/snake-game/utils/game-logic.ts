import { Direction, type Position } from "../types";

export const getNextPosition = (
	head: Position,
	direction: Direction,
): Position => {
	switch (direction) {
		case Direction.UP:
			return { x: head.x, y: head.y - 1 };
		case Direction.DOWN:
			return { x: head.x, y: head.y + 1 };
		case Direction.LEFT:
			return { x: head.x - 1, y: head.y };
		case Direction.RIGHT:
			return { x: head.x + 1, y: head.y };
		default:
			return head;
	}
};

export const isValidPosition = (
	position: Position,
	gridWidth: number,
	gridHeight: number,
): boolean => {
	return (
		position.x >= 0 &&
		position.x < gridWidth &&
		position.y >= 0 &&
		position.y < gridHeight
	);
};

export const checkSelfCollision = (
	head: Position,
	body: Position[],
): boolean => {
	return body.some((segment) => segment.x === head.x && segment.y === head.y);
};

export const checkWallCollision = (
	position: Position,
	gridWidth: number,
	gridHeight: number,
): boolean => {
	return !isValidPosition(position, gridWidth, gridHeight);
};

export const checkFoodCollision = (
	snakeHead: Position,
	food: Position,
): boolean => {
	return snakeHead.x === food.x && snakeHead.y === food.y;
};

export const generateRandomFood = (
	snake: Position[],
	gridWidth: number,
	gridHeight: number,
): Position => {
	let food: Position;
	do {
		food = {
			x: Math.floor(Math.random() * gridWidth),
			y: Math.floor(Math.random() * gridHeight),
		};
	} while (
		snake.some((segment) => segment.x === food.x && segment.y === food.y)
	);

	return food;
};

export const moveSnake = (
	snake: Position[],
	direction: Direction,
	shouldGrow = false,
): Position[] => {
	if (snake.length === 0) return snake;

	const head = snake[0];
	if (!head) return snake; // Additional safety check

	const newHead = getNextPosition(head, direction);
	const newSnake = [newHead, ...snake];

	if (!shouldGrow) {
		newSnake.pop(); // Remove tail if not growing
	}

	return newSnake;
};

export const getOppositeDirection = (direction: Direction): Direction => {
	switch (direction) {
		case Direction.UP:
			return Direction.DOWN;
		case Direction.DOWN:
			return Direction.UP;
		case Direction.LEFT:
			return Direction.RIGHT;
		case Direction.RIGHT:
			return Direction.LEFT;
		default:
			return direction;
	}
};

export const isOppositeDirection = (
	current: Direction,
	next: Direction,
): boolean => {
	return getOppositeDirection(current) === next;
};
