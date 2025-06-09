// Calculate responsive canvas dimensions based on container size
export const getCanvasDimensions = (
	containerWidth: number,
	containerHeight: number,
	isMobile: boolean,
) => {
	const GRID_SIZE = 20;

	if (isMobile) {
		// On mobile, use most of the container width with some padding
		const maxWidth = Math.min(containerWidth - 16, 360); // 16px padding, max 360px
		const maxHeight = Math.min(containerHeight - 100, 300); // Leave space for controls, max 300px

		// Ensure dimensions are multiples of GRID_SIZE
		const gridWidth = Math.max(10, Math.floor(maxWidth / GRID_SIZE)); // Minimum 10x10 grid
		const gridHeight = Math.max(10, Math.floor(maxHeight / GRID_SIZE));

		return {
			CANVAS_WIDTH: gridWidth * GRID_SIZE,
			CANVAS_HEIGHT: gridHeight * GRID_SIZE,
			GRID_WIDTH: gridWidth,
			GRID_HEIGHT: gridHeight,
			GRID_SIZE,
		};
	}

	// On desktop, use available container space more efficiently
	const maxWidth = Math.min(containerWidth - 32, 500); // 32px padding, max 500px
	const maxHeight = Math.min(containerHeight - 100, 500); // Leave space for controls, max 500px

	// Keep it square for better gameplay
	const size = Math.min(maxWidth, maxHeight);

	// Ensure dimensions are multiples of GRID_SIZE with minimum size
	const gridSize = Math.max(15, Math.floor(size / GRID_SIZE)); // Minimum 15x15 grid

	return {
		CANVAS_WIDTH: gridSize * GRID_SIZE,
		CANVAS_HEIGHT: gridSize * GRID_SIZE,
		GRID_WIDTH: gridSize,
		GRID_HEIGHT: gridSize,
		GRID_SIZE,
	};
};
