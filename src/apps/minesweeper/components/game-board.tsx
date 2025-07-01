import React from "react";
import type { Cell } from "../types";
import { GRID_SIZE } from "../utils/constants";
import { GameCell } from "./game-cell";

interface GameBoardProps {
	board: Cell[][];
	cellSize: number;
	fontSize: number;
	onCellClick: (x: number, y: number) => void;
	onCellRightClick: (x: number, y: number) => void;
	disabled?: boolean;
}

export const GameBoard = React.memo<GameBoardProps>(({
	board,
	cellSize,
	fontSize,
	onCellClick,
	onCellRightClick,
	disabled = false,
}) => {
	return (
		<div
			className="inline-block border-2 border-gray-600 dark:border-gray-400 bg-gray-200 dark:bg-gray-700 p-1"
			style={{
				width: cellSize * GRID_SIZE + 8, // +8 for padding
				height: cellSize * GRID_SIZE + 8,
			}}
		>
			<div
				className="grid gap-0"
				style={{
					gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
					gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`,
				}}
			>
				{board.map((row, x) =>
					row.map((cell, y) => (
						<GameCell
							key={`${x}-${y}`}
							cell={cell}
							cellSize={cellSize}
							fontSize={fontSize}
							onClick={onCellClick}
							onRightClick={onCellRightClick}
							disabled={disabled}
						/>
					))
				)}
			</div>
		</div>
	);
});