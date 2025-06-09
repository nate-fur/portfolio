import { type RefObject, useEffect, useRef, useState } from "react";

interface ContainerDimensions {
	width: number;
	height: number;
	isMobile: boolean;
}

export const useContainerDimensions = (): [
	RefObject<HTMLDivElement | null>,
	ContainerDimensions,
] => {
	const containerRef = useRef<HTMLDivElement>(null);
	const [dimensions, setDimensions] = useState<ContainerDimensions>({
		width: 400,
		height: 400,
		isMobile: false,
	});

	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		const updateDimensions = () => {
			const rect = container.getBoundingClientRect();
			const availableWidth = rect.width;
			const availableHeight = Math.min(rect.height, window.innerHeight * 0.6);

			setDimensions({
				width: availableWidth,
				height: availableHeight,
				isMobile: window.innerWidth < 768,
			});
		};

		// Initial measurement
		updateDimensions();

		// Use ResizeObserver to watch for container size changes
		const resizeObserver = new ResizeObserver(updateDimensions);
		resizeObserver.observe(container);

		// Also listen to window resize as fallback
		window.addEventListener("resize", updateDimensions);

		return () => {
			resizeObserver.disconnect();
			window.removeEventListener("resize", updateDimensions);
		};
	}, []);

	return [containerRef, dimensions];
};
