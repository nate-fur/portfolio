import { useCallback, useEffect } from "react";
import { Direction } from "../types";

interface UseKeyboardControlsProps {
	onDirectionChange: (direction: Direction) => void;
	isPlaying: boolean;
}

export const useKeyboardControls = ({
	onDirectionChange,
	isPlaying,
}: UseKeyboardControlsProps) => {
	const handleKeyPress = useCallback(
		(event: KeyboardEvent) => {
			if (!isPlaying) return;

			// Prevent default behavior for game keys
			if (
				[
					"ArrowUp",
					"ArrowDown",
					"ArrowLeft",
					"ArrowRight",
					"w",
					"a",
					"s",
					"d",
				].includes(event.key)
			) {
				event.preventDefault();
			}

			switch (event.key.toLowerCase()) {
				case "arrowup":
				case "w":
					onDirectionChange(Direction.UP);
					break;
				case "arrowdown":
				case "s":
					onDirectionChange(Direction.DOWN);
					break;
				case "arrowleft":
				case "a":
					onDirectionChange(Direction.LEFT);
					break;
				case "arrowright":
				case "d":
					onDirectionChange(Direction.RIGHT);
					break;
			}
		},
		[onDirectionChange, isPlaying],
	);

	useEffect(() => {
		document.addEventListener("keydown", handleKeyPress);
		return () => {
			document.removeEventListener("keydown", handleKeyPress);
		};
	}, [handleKeyPress]);
};
