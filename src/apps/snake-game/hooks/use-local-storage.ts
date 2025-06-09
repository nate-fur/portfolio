import { useState } from "react";
import { HIGH_SCORE_KEY } from "../utils/constants";

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

export const useHighScore = () => {
	return useLocalStorage(HIGH_SCORE_KEY, 0);
};
