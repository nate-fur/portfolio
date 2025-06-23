import { useEffect, useRef, useState } from "react";
import { BaseAppContent } from "~/apps/base-app-content";
import { technologies } from "../data";
import { TechCard } from "./tech-card";

export const TechStackApp = () => {
	const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set());
	const [isFullscreen, setIsFullscreen] = useState(false);
	const [isMobile, setIsMobile] = useState(false);
	const carouselRef = useRef<HTMLDivElement>(null);

	const handleCardClick = (techName: string) => {
		setFlippedCards((prev) => {
			const newSet = new Set(prev);
			if (newSet.has(techName)) {
				newSet.delete(techName);
			} else {
				newSet.add(techName);
			}
			return newSet;
		});
	};

	// Check if app is in fullscreen mode and mobile
	useEffect(() => {
		const checkLayout = () => {
			if (carouselRef.current) {
				const rect = carouselRef.current.getBoundingClientRect();
				// Consider fullscreen if width is greater than 800px (typical expanded app width)
				setIsFullscreen(rect.width > 800);
				// Consider mobile if width is less than 768px
				setIsMobile(rect.width < 768);
			}
		};

		checkLayout();
		window.addEventListener("resize", checkLayout);

		return () => window.removeEventListener("resize", checkLayout);
	}, []);

	// Dynamic animation speed based on fullscreen state
	useEffect(() => {
		if (!isMobile) {
			const carouselTrack = carouselRef.current?.querySelector(
				".carousel-track",
			) as HTMLElement;
			if (carouselTrack) {
				// Slower speed for fullscreen (60s), faster for expanded mode (30s)
				const duration = isFullscreen ? 60 : 30;
				carouselTrack.style.animationDuration = `${duration}s`;
			}
		}
	}, [isFullscreen, isMobile]);

	// Duplicate technologies for seamless infinite loop (only for desktop)
	const duplicatedTechnologies = isMobile
		? technologies
		: [...technologies, ...technologies];

	return (
		<BaseAppContent
			title="Technology Stack"
			description="Click on any technology card to flip it and learn more about my expertise."
			technologies={[]}
			fullWidth
		>
			<div className="relative overflow-hidden" ref={carouselRef}>
				{isMobile ? (
					// Mobile: 2-row grid layout
					<div className="grid grid-cols-2 gap-4 p-4">
						{duplicatedTechnologies.map((tech, index) => (
							<TechCard
								key={`${tech.name}-${index}`}
								tech={tech}
								isFlipped={flippedCards.has(tech.name)}
								onClick={() => handleCardClick(tech.name)}
							/>
						))}
					</div>
				) : (
					// Desktop: Infinite carousel
					<div className="carousel-container">
						<div className="carousel-track">
							{duplicatedTechnologies.map((tech, index) => (
								<TechCard
									key={`${tech.name}-${index}-${index >= technologies.length ? "duplicate" : "original"}`}
									tech={tech}
									isFlipped={flippedCards.has(tech.name)}
									onClick={() => handleCardClick(tech.name)}
								/>
							))}
						</div>
					</div>
				)}
			</div>
		</BaseAppContent>
	);
};
