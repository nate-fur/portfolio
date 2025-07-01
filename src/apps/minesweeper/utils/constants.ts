// Game configuration
export const GRID_SIZE = 9;
export const MINE_COUNT = 10;
export const TOTAL_CELLS = GRID_SIZE * GRID_SIZE;
export const CELLS_TO_WIN = TOTAL_CELLS - MINE_COUNT;

// Timer
export const TIMER_INTERVAL = 1000; // 1 second
export const MAX_TIME = 999; // Maximum display time

// Local storage keys
export const BEST_TIME_KEY = "minesweeper-best-time";
export const GAMES_PLAYED_KEY = "minesweeper-games-played";
export const GAMES_WON_KEY = "minesweeper-games-won";

// Cell display constants
export const MINE_SYMBOL = "💣";
export const FLAG_SYMBOL = "🚩";
export const EMPTY_CELL = "";

// Number colors for mine count display
export const NUMBER_COLORS = {
	1: "text-blue-600",
	2: "text-green-600",  
	3: "text-red-600",
	4: "text-purple-600",
	5: "text-yellow-600",
	6: "text-pink-600",
	7: "text-black",
	8: "text-gray-600",
} as const;

// Adjacent cell offsets for checking neighbors
export const NEIGHBOR_OFFSETS = [
	[-1, -1], [-1, 0], [-1, 1],
	[0, -1],           [0, 1],
	[1, -1],  [1, 0],  [1, 1],
];

// Function to get computed theme colors
export const getThemeColors = () => {
	if (typeof window === "undefined") {
		// Fallback colors for SSR
		return {
			BACKGROUND: "#0f172a",
			BORDER: "#475569",
			CELL_REVEALED: "#f1f5f9",
			CELL_HIDDEN: "#64748b",
			CELL_FLAGGED: "#fbbf24",
			CELL_MINE: "#ef4444",
			TEXT: "#f8fafc",
		};
	}

	const root = document.documentElement;
	const computedStyle = getComputedStyle(root);

	return {
		BACKGROUND: computedStyle.getPropertyValue("--background").trim(),
		BORDER: computedStyle.getPropertyValue("--border").trim(),
		CELL_REVEALED: computedStyle.getPropertyValue("--muted").trim(),
		CELL_HIDDEN: computedStyle.getPropertyValue("--secondary").trim(),
		CELL_FLAGGED: computedStyle.getPropertyValue("--accent").trim(),
		CELL_MINE: computedStyle.getPropertyValue("--destructive").trim(),
		TEXT: computedStyle.getPropertyValue("--foreground").trim(),
	};
};