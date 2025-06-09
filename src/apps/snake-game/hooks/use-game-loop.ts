import { useEffect, useRef } from "react";

interface UseGameLoopProps {
	isPlaying: boolean;
	speed: number; // milliseconds between game updates
	onGameTick: () => void;
}

export const useGameLoop = ({
	isPlaying,
	speed,
	onGameTick,
}: UseGameLoopProps) => {
	const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

	useEffect(() => {
		if (isPlaying) {
			intervalRef.current = setInterval(onGameTick, speed);
		} else if (intervalRef.current) {
			clearInterval(intervalRef.current);
		}

		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
			}
		};
	}, [isPlaying, speed, onGameTick]);
};
