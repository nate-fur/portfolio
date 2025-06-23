import { useEffect, useRef, useState } from "react";
import type { IconType } from "react-icons";
import {
	SiAmazonwebservices,
	SiDocker,
	SiGraphql,
	SiJest,
	SiNextdotjs,
	SiNodedotjs,
	SiOpenai,
	SiPostgresql,
	SiReact,
	SiTailwindcss,
	SiTrpc,
	SiTypescript,
} from "react-icons/si";
import { BaseAppContent } from "~/apps/base-app-content";
import { TechCard } from "./tech-card";

const technologies = [
	{ name: "React", icon: SiReact },
	{ name: "Next.js", icon: SiNextdotjs },
	{ name: "TypeScript", icon: SiTypescript },
	{ name: "Node.js", icon: SiNodedotjs },
	{ name: "tRPC", icon: SiTrpc },
	{ name: "PostgreSQL", icon: SiPostgresql },
	{ name: "Docker", icon: SiDocker },
	{ name: "AWS", icon: SiAmazonwebservices },
	{ name: "Tailwind CSS", icon: SiTailwindcss },
	{ name: "GraphQL", icon: SiGraphql },
	{ name: "OpenAI", icon: SiOpenai },
	{ name: "Jest", icon: SiJest },
];

export const TechStackApp = () => {
	const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set());
	const [isFullscreen, setIsFullscreen] = useState(false);
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

	// Check if app is in fullscreen mode
	useEffect(() => {
		const checkFullscreen = () => {
			if (carouselRef.current) {
				const rect = carouselRef.current.getBoundingClientRect();
				// Consider fullscreen if width is greater than 800px (typical expanded app width)
				setIsFullscreen(rect.width > 800);
			}
		};

		checkFullscreen();
		window.addEventListener("resize", checkFullscreen);

		return () => window.removeEventListener("resize", checkFullscreen);
	}, []);

	// Dynamic animation speed based on fullscreen state
	useEffect(() => {
		const carouselTrack = carouselRef.current?.querySelector(
			".carousel-track",
		) as HTMLElement;
		if (carouselTrack) {
			// Slower speed for fullscreen (60s), faster for expanded mode (30s)
			const duration = isFullscreen ? 60 : 30;
			carouselTrack.style.animationDuration = `${duration}s`;
		}
	}, [isFullscreen]);

	// Duplicate technologies for seamless infinite loop
	const duplicatedTechnologies = [...technologies, ...technologies];

	return (
		<BaseAppContent
			title="Technology Stack"
			description="Click on any technology card to flip it and learn more about my expertise."
			technologies={[]}
		>
			<div className="relative overflow-hidden" ref={carouselRef}>
				<div className="carousel-container">
					<div className="carousel-track -mx-8">
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
			</div>
		</BaseAppContent>
	);
};
