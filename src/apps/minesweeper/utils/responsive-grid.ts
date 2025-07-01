import { GRID_SIZE } from "./constants";

interface GridDimensions {
	cellSize: number;
	gridWidth: number;
	gridHeight: number;
	fontSize: number;
}

export const calculateGridDimensions = (
	containerWidth: number,
	containerHeight: number,
	isMobile: boolean,
): GridDimensions => {
	// Leave some padding around the grid
	const padding = isMobile ? 40 : 60;
	const availableWidth = containerWidth - padding;
	const availableHeight = containerHeight - padding;

	// Calculate the maximum cell size that fits in both dimensions
	const maxCellSizeByWidth = Math.floor(availableWidth / GRID_SIZE);
	const maxCellSizeByHeight = Math.floor(availableHeight / GRID_SIZE);
	
	// Use the smaller of the two to ensure the grid fits
	const cellSize = Math.min(maxCellSizeByWidth, maxCellSizeByHeight);
	
	// Ensure minimum cell size for usability
	const minCellSize = isMobile ? 24 : 32;
	const finalCellSize = Math.max(cellSize, minCellSize);

	const gridWidth = finalCellSize * GRID_SIZE;
	const gridHeight = finalCellSize * GRID_SIZE;

	// Calculate font size based on cell size
	const fontSize = Math.max(10, Math.min(16, finalCellSize * 0.4));

	return {
		cellSize: finalCellSize,
		gridWidth,
		gridHeight,
		fontSize,
	};
};