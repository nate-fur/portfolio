import { useCallback, useEffect, useRef, useState } from "react";
import { GameStatus } from "../types";
import { MAX_TIME, TIMER_INTERVAL } from "../utils/constants";

interface UseGameTimerProps {
	gameStatus: GameStatus;
	onMaxTimeReached?: () => void;
}

export const useGameTimer = ({
	gameStatus,
	onMaxTimeReached,
}: UseGameTimerProps) => {
	const [timer, setTimer] = useState(0);
	const intervalRef = useRef<NodeJS.Timeout | null>(null);
	const startTimeRef = useRef<number | null>(null);

	const startTimer = useCallback(() => {
		if (intervalRef.current) {
			clearInterval(intervalRef.current);
		}

		startTimeRef.current = Date.now();
		setTimer(0);

		intervalRef.current = setInterval(() => {
			if (startTimeRef.current) {
				const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);

				if (elapsed >= MAX_TIME) {
					setTimer(MAX_TIME);
					if (onMaxTimeReached) {
						onMaxTimeReached();
					}
					return;
				}

				setTimer(elapsed);
			}
		}, TIMER_INTERVAL);
	}, [onMaxTimeReached]);

	const stopTimer = useCallback(() => {
		if (intervalRef.current) {
			clearInterval(intervalRef.current);
			intervalRef.current = null;
		}
	}, []);

	const resetTimer = useCallback(() => {
		stopTimer();
		setTimer(0);
		startTimeRef.current = null;
	}, [stopTimer]);

	const pauseTimer = useCallback(() => {
		stopTimer();
	}, [stopTimer]);

	const resumeTimer = useCallback(() => {
		if (startTimeRef.current && gameStatus === GameStatus.PLAYING) {
			// Adjust start time to account for paused duration
			const currentTime = Date.now();
			const pausedDuration = currentTime - startTimeRef.current - timer * 1000;
			startTimeRef.current = currentTime - timer * 1000;

			intervalRef.current = setInterval(() => {
				if (startTimeRef.current) {
					const elapsed = Math.floor(
						(Date.now() - startTimeRef.current) / 1000,
					);

					if (elapsed >= MAX_TIME) {
						setTimer(MAX_TIME);
						if (onMaxTimeReached) {
							onMaxTimeReached();
						}
						return;
					}

					setTimer(elapsed);
				}
			}, TIMER_INTERVAL);
		}
	}, [gameStatus, timer, onMaxTimeReached]);

	// Handle game status changes
	useEffect(() => {
		switch (gameStatus) {
			case GameStatus.PLAYING:
				if (timer === 0 && !startTimeRef.current) {
					startTimer();
				} else if (startTimeRef.current) {
					resumeTimer();
				}
				break;
			case GameStatus.PAUSED:
				pauseTimer();
				break;
			case GameStatus.WON:
			case GameStatus.LOST:
				stopTimer();
				break;
			case GameStatus.READY:
				resetTimer();
				break;
		}
	}, [
		gameStatus,
		startTimer,
		stopTimer,
		resetTimer,
		pauseTimer,
		resumeTimer,
		timer,
	]);

	// Cleanup on unmount
	useEffect(() => {
		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
			}
		};
	}, []);

	const formatTime = useCallback((time: number): string => {
		const minutes = Math.floor(time / 60);
		const seconds = time % 60;
		return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
	}, []);

	return {
		timer,
		formatTime,
		startTimer,
		stopTimer,
		resetTimer,
		pauseTimer,
		resumeTimer,
	};
};
