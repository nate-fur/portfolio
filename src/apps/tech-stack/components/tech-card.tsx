import { useState } from "react";
import type { Technology } from "../data";

interface TechCardProps {
	tech: Technology;
	isFlipped: boolean;
	onClick: () => void;
}

export const TechCard = ({ tech, isFlipped, onClick }: TechCardProps) => {
	const IconComponent = tech.icon;

	const handleKeyDown = (event: React.KeyboardEvent) => {
		if (event.key === "Enter" || event.key === " ") {
			event.preventDefault();
			onClick();
		}
	};

	const handleVisitClick = (event: React.MouseEvent) => {
		event.stopPropagation();
		window.open(tech.url, "_blank", "noopener,noreferrer");
	};

	return (
		<div className="py-2">
			<button
				type="button"
				className="perspective-1000 relative h-48 w-full flex-shrink-0 cursor-pointer sm:h-64 sm:w-48"
				onClick={onClick}
				onKeyDown={handleKeyDown}
				aria-label={`Flip ${tech.name} card`}
			>
				<div
					className={`transform-style-preserve-3d relative h-full w-full transition-transform duration-500 ${
						isFlipped ? "rotate-y-180" : ""
					}`}
				>
					{/* Front of card */}
					<div className="backface-hidden absolute inset-0 flex flex-col items-center justify-center gap-2 border-2 border-primary bg-background">
						<IconComponent className="h-6 w-6 text-primary sm:h-8 sm:w-8" />
						<span className="px-1 text-center font-medium text-primary text-xs sm:text-sm">
							{tech.name}
						</span>
					</div>

					{/* Back of card */}
					<div className="backface-hidden absolute inset-0 flex rotate-y-180 flex-col items-center justify-center gap-2 border-2 border-primary bg-primary p-3 sm:gap-3 sm:p-4">
						<span className="text-center font-medium text-primary-foreground text-xs sm:text-sm">
							{tech.name}
						</span>
						<p className="text-center text-primary-foreground/90 text-xs leading-relaxed">
							{tech.description}
						</p>
						<button
							type="button"
							onClick={handleVisitClick}
							className="rounded-md bg-primary-foreground px-2 py-1 font-medium text-primary text-xs transition-colors hover:bg-primary-foreground/90 sm:px-3 sm:py-1"
							aria-label={`Visit ${tech.name} official website`}
						>
							Visit Site
						</button>
					</div>
				</div>
			</button>
		</div>
	);
};
