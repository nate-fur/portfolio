import { useEffect, useState } from "react";

interface ViewportSize {
	width: number;
	height: number;
	isMobile: boolean;
	isSmall: boolean;
}

export const useViewport = (): ViewportSize => {
	const [viewport, setViewport] = useState<ViewportSize>(() => {
		if (typeof window === "undefined") {
			return { width: 1024, height: 768, isMobile: false, isSmall: false };
		}

		const width = window.innerWidth;
		const height = window.innerHeight;
		return {
			width,
			height,
			isMobile: width < 768,
			isSmall: width < 640,
		};
	});

	useEffect(() => {
		const handleResize = () => {
			const width = window.innerWidth;
			const height = window.innerHeight;
			setViewport({
				width,
				height,
				isMobile: width < 768,
				isSmall: width < 640,
			});
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return viewport;
};
