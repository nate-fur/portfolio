import { useState } from "react";
import { BEST_TIME_KEY, GAMES_PLAYED_KEY, GAMES_WON_KEY } from "../utils/constants";

export const useLocalStorage = (key: string, initialValue: number) => {
	const [storedValue, setStoredValue] = useState<number>(() => {
		try {
			if (typeof window !== "undefined") {
				const item = window.localStorage.getItem(key);
				return item ? Number.parseInt(item, 10) : initialValue;
			}
			return initialValue;
		} catch (error) {
			console.warn(`Error reading localStorage key "${key}":`, error);
			return initialValue;
		}
	});

	const setValue = (value: number | ((val: number) => number)) => {
		try {
			const valueToStore =
				value instanceof Function ? value(storedValue) : value;
			setStoredValue(valueToStore);
			if (typeof window !== "undefined") {
				window.localStorage.setItem(key, valueToStore.toString());
			}
		} catch (error) {
			console.warn(`Error setting localStorage key "${key}":`, error);
		}
	};

	return [storedValue, setValue] as const;
};

export const useBestTime = () => {
	return useLocalStorage(BEST_TIME_KEY, 0);
};

export const useGamesPlayed = () => {
	return useLocalStorage(GAMES_PLAYED_KEY, 0);
};

export const useGamesWon = () => {
	return useLocalStorage(GAMES_WON_KEY, 0);
};

export const useGameStats = () => {
	const [bestTime, setBestTime] = useBestTime();
	const [gamesPlayed, setGamesPlayed] = useGamesPlayed();
	const [gamesWon, setGamesWon] = useGamesWon();

	const winRate = gamesPlayed > 0 ? (gamesWon / gamesPlayed) * 100 : 0;

	const recordWin = (time: number) => {
		setGamesPlayed(prev => prev + 1);
		setGamesWon(prev => prev + 1);
		
		if (bestTime === 0 || time < bestTime) {
			setBestTime(time);
		}
	};

	const recordLoss = () => {
		setGamesPlayed(prev => prev + 1);
	};

	const resetStats = () => {
		setBestTime(0);
		setGamesPlayed(0);
		setGamesWon(0);
	};

	return {
		bestTime,
		gamesPlayed,
		gamesWon,
		winRate,
		recordWin,
		recordLoss,
		resetStats,
	};
};