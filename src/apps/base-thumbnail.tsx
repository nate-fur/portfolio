import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "~/lib/utils";
import type { AppThumbnailProps } from "./types";

export interface BaseThumbnailProps extends AppThumbnailProps {
	name: string;
	icon: LucideIcon;
	children?: ReactNode; // For custom background animations or additional elements
	className?: string;
	backgroundImage?: string; // URL or path to background image
}

export const BaseThumbnail = ({
	name,
	icon: Icon,
	children,
	className,
	backgroundImage,
}: BaseThumbnailProps) => {
	return (
		<motion.div
			className={cn(
				"group relative flex h-full flex-col items-center justify-center overflow-hidden",
				!backgroundImage && "bg-primary/10",
				className,
			)}
			// style={{
			// 	backgroundImage: backgroundImage
			// 		? `url(${backgroundImage})`
			// 		: undefined,
			// }}
			layout
			whileHover={{ scale: 1.02 }}
			whileTap={{ scale: 0.98 }}
			transition={{
				layout: { duration: 0.4 },
				scale: { duration: 0.2 },
			}}
		>
			{/* Content overlay with icon and text */}
			<div className="relative z-10 flex h-full w-full flex-col items-center justify-center">
				{/* Overlay background for better visibility */}
				{backgroundImage && (
					<div className="absolute inset-0 rounded-lg bg-background/80 backdrop-blur-xs duration-300 group-hover:backdrop-blur-none" />
				)}

				{/* Content container */}
				<div className="relative z-20 flex flex-col items-center justify-center">
					{/* Icon container */}
					<motion.div
						className="relative flex h-16 w-16 items-center justify-center"
						layout
						transition={{ layout: { duration: 0.4 } }}
					>
						<motion.div layout className="relative">
							<Icon className={cn("h-8 w-8 text-primary")} />
						</motion.div>
					</motion.div>

					{/* App name */}
					<motion.span
						className={cn("mt-2 text-center font-medium text-primary")}
						layout
						transition={{ layout: { duration: 0.4 } }}
					>
						{name}
					</motion.span>
				</div>
			</div>

			{/* Custom background/animation layer */}
			{children}
		</motion.div>
	);
};
