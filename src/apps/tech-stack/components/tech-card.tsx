import { useState } from "react";
import type { IconType } from "react-icons";

interface TechCardProps {
	tech: { name: string; icon: IconType };
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

	return (
		<button
			type="button"
			className="perspective-1000 relative h-32 w-32 flex-shrink-0 cursor-pointer"
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
					<IconComponent className="h-8 w-8 text-primary" />
					<span className="px-1 text-center font-medium text-primary text-sm">
						{tech.name}
					</span>
				</div>

				{/* Back of card */}
				<div className="backface-hidden absolute inset-0 flex rotate-y-180 items-center justify-center border-2 border-primary bg-primary">
					<span className="px-2 text-center font-medium text-primary-foreground text-sm">
						back of {tech.name}
					</span>
				</div>
			</div>
		</button>
	);
};
