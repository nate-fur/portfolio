import { useEffect, useRef } from "react";
import type { Position } from "../types";
import { getThemeColors } from "../utils/constants";

interface GameCanvasProps {
	snake: Position[];
	food: Position;
	isPlaying: boolean;
	canvasWidth: number;
	canvasHeight: number;
	gridSize: number;
}

export const GameCanvas = ({
	snake,
	food,
	isPlaying,
	canvasWidth,
	canvasHeight,
	gridSize,
}: GameCanvasProps) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		// Get current theme colors
		const colors = getThemeColors();

		// Clear canvas
		ctx.fillStyle = colors.BACKGROUND;
		ctx.fillRect(0, 0, canvasWidth, canvasHeight);

		// Draw grid (subtle)
		ctx.strokeStyle = colors.GRID_LINE;
		ctx.lineWidth = 1;

		for (let x = 0; x <= canvasWidth; x += gridSize) {
			ctx.beginPath();
			ctx.moveTo(x, 0);
			ctx.lineTo(x, canvasHeight);
			ctx.stroke();
		}

		for (let y = 0; y <= canvasHeight; y += gridSize) {
			ctx.beginPath();
			ctx.moveTo(0, y);
			ctx.lineTo(canvasWidth, y);
			ctx.stroke();
		}

		// Draw snake
		snake.forEach((segment, index) => {
			const x = segment.x * gridSize;
			const y = segment.y * gridSize;

			// Snake head is slightly different color
			ctx.fillStyle = index === 0 ? colors.SNAKE_HEAD : colors.SNAKE_BODY;
			ctx.fillRect(x + 1, y + 1, gridSize - 2, gridSize - 2);

			// Add some visual depth with a border (darker shade)
			ctx.strokeStyle =
				index === 0 ? `${colors.SNAKE_HEAD}99` : `${colors.SNAKE_BODY}99`;
			ctx.lineWidth = 1;
			ctx.strokeRect(x + 1, y + 1, gridSize - 2, gridSize - 2);
		});

		// Draw food
		const foodX = food.x * gridSize;
		const foodY = food.y * gridSize;

		ctx.fillStyle = colors.FOOD;
		ctx.beginPath();
		ctx.arc(
			foodX + gridSize / 2,
			foodY + gridSize / 2,
			(gridSize - 4) / 2,
			0,
			Math.PI * 2,
		);
		ctx.fill();

		// Add food border (darker shade)
		ctx.strokeStyle = `${colors.FOOD}CC`;
		ctx.lineWidth = 2;
		ctx.stroke();
	}, [snake, food, canvasWidth, canvasHeight, gridSize]);

	return (
		<div className="relative">
			<canvas
				ref={canvasRef}
				width={canvasWidth}
				height={canvasHeight}
				className={`rounded-lg border-2 border-primary/30 bg-background ${isPlaying ? "" : "opacity-75"}
        `}
				style={{
					imageRendering: "pixelated", // For crisp pixel art look
				}}
			/>

			{!isPlaying && (
				<div className="absolute inset-0 flex items-center justify-center">
					<div className="text-center">
						<div className="mb-2 font-semibold text-lg text-primary">
							🐍 Snake Game
						</div>
						<div className="text-muted-foreground text-sm">
							Use arrow keys or WASD to move
						</div>
					</div>
				</div>
			)}
		</div>
	);
};
