import React from "react";
import type { Cell } from "../types";
import { FLAG_SYMBOL, MINE_SYMBOL, NUMBER_COLORS } from "../utils/constants";

interface GameCellProps {
	cell: Cell;
	cellSize: number;
	fontSize: number;
	onClick: (x: number, y: number) => void;
	onRightClick: (x: number, y: number) => void;
	disabled?: boolean;
}

export const GameCell = React.memo<GameCellProps>(
	({ cell, cellSize, fontSize, onClick, onRightClick, disabled = false }) => {
		const handleClick = () => {
			if (!disabled) {
				onClick(cell.x, cell.y);
			}
		};

		const handleRightClick = (e: React.MouseEvent) => {
			e.preventDefault();
			if (!disabled) {
				onRightClick(cell.x, cell.y);
			}
		};

		const getCellContent = () => {
			if (!cell.isRevealed && cell.isFlagged) {
				return FLAG_SYMBOL;
			}

			if (!cell.isRevealed) {
				return "";
			}

			if (cell.isMine) {
				return MINE_SYMBOL;
			}

			if (cell.neighborMines > 0) {
				return cell.neighborMines.toString();
			}

			return "";
		};

		const getCellClasses = () => {
			const baseClasses =
				"border border-gray-400 flex items-center justify-center font-semibold cursor-pointer select-none transition-all duration-150";

			if (!cell.isRevealed) {
				if (cell.isFlagged) {
					return `${baseClasses} bg-amber-200 hover:bg-amber-300 dark:bg-amber-800 dark:hover:bg-amber-700`;
				}
				return `${baseClasses} bg-gray-300 hover:bg-gray-200 dark:bg-gray-600 dark:hover:bg-gray-500 shadow-inner`;
			}

			if (cell.isMine) {
				if (cell.isExploded) {
					return `${baseClasses} bg-red-500 text-white animate-pulse`;
				}
				return `${baseClasses} bg-red-400 text-white`;
			}

			return `${baseClasses} bg-gray-100 dark:bg-gray-200 text-gray-800`;
		};

		const getNumberColor = () => {
			if (cell.isRevealed && !cell.isMine && cell.neighborMines > 0) {
				return (
					NUMBER_COLORS[cell.neighborMines as keyof typeof NUMBER_COLORS] ||
					"text-gray-600"
				);
			}
			return "";
		};

		return (
			<button
				type="button"
				className={`${getCellClasses()} ${getNumberColor()}`}
				style={{
					width: cellSize,
					height: cellSize,
					fontSize: `${fontSize}px`,
					lineHeight: 1,
				}}
				onClick={handleClick}
				onContextMenu={handleRightClick}
				onKeyDown={(e) => {
					if (e.key === "Enter" || e.key === " ") {
						e.preventDefault();
						handleClick();
					}
				}}
			>
				{getCellContent()}
			</button>
		);
	},
);
