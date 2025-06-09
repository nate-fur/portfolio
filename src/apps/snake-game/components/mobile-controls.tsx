import { Direction } from "../types";

interface MobileControlsProps {
	onDirectionChange: (direction: Direction) => void;
	isVisible: boolean;
	disabled?: boolean;
}

export const MobileControls = ({
	onDirectionChange,
	isVisible,
	disabled = false,
}: MobileControlsProps) => {
	if (!isVisible) return null;

	const buttonClass = `
    w-12 h-12 rounded-lg bg-primary/20 border border-primary/30 
    flex items-center justify-center text-primary text-xl
    transition-all duration-150 active:scale-95 active:bg-primary/40
    disabled:opacity-50 disabled:cursor-not-allowed
    touch-manipulation select-none
  `;

	return (
		<div className="mt-4 flex flex-col items-center gap-2">
			{/* Up button */}
			<button
				type="button"
				onClick={() => onDirectionChange(Direction.UP)}
				disabled={disabled}
				className={buttonClass}
				aria-label="Move Up"
			>
				↑
			</button>

			{/* Left and Right buttons */}
			<div className="flex gap-12">
				<button
					type="button"
					onClick={() => onDirectionChange(Direction.LEFT)}
					disabled={disabled}
					className={buttonClass}
					aria-label="Move Left"
				>
					←
				</button>

				<button
					type="button"
					onClick={() => onDirectionChange(Direction.RIGHT)}
					disabled={disabled}
					className={buttonClass}
					aria-label="Move Right"
				>
					→
				</button>
			</div>

			{/* Down button */}
			<button
				type="button"
				onClick={() => onDirectionChange(Direction.DOWN)}
				disabled={disabled}
				className={buttonClass}
				aria-label="Move Down"
			>
				↓
			</button>

			<div className="mt-2 text-center text-muted-foreground text-xs">
				Tap arrows to move
			</div>
		</div>
	);
};
