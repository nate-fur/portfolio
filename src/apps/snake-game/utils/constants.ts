// Game speeds (milliseconds between moves)
export const INITIAL_SPEED = 200;
export const MIN_SPEED = 50;
export const SPEED_INCREASE = 5; // Speed increase per level

// Scoring
export const POINTS_PER_FOOD = 10;
export const LEVEL_UP_THRESHOLD = 50; // Points needed to level up

// Function to get computed theme colors
export const getThemeColors = () => {
	if (typeof window === "undefined") {
		// Fallback colors for SSR
		return {
			BACKGROUND: "#0f172a",
			GRID_LINE: "#334155",
			SNAKE_HEAD: "#3b82f6",
			SNAKE_BODY: "#1e40af",
			FOOD: "#f59e0b",
			TEXT: "#f8fafc",
			BORDER: "#475569",
		};
	}

	const root = document.documentElement;
	const computedStyle = getComputedStyle(root);

	return {
		BACKGROUND: computedStyle.getPropertyValue("--background").trim(),
		GRID_LINE: computedStyle.getPropertyValue("--muted").trim(),
		SNAKE_HEAD: computedStyle.getPropertyValue("--primary").trim(),
		SNAKE_BODY: computedStyle.getPropertyValue("--secondary").trim(),
		FOOD: computedStyle.getPropertyValue("--accent").trim(),
		TEXT: computedStyle.getPropertyValue("--foreground").trim(),
		BORDER: computedStyle.getPropertyValue("--border").trim(),
	};
};

// Function to get initial snake position (center of grid)
export const getInitialSnake = (gridWidth: number, gridHeight: number) => [
	{ x: Math.floor(gridWidth / 2), y: Math.floor(gridHeight / 2) },
];

// Local storage key
export const HIGH_SCORE_KEY = "snake-game-high-score";
