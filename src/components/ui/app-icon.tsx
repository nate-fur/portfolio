import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { cn } from "~/lib/utils";

interface AppIconProps {
	icon: LucideIcon;
	name: string;
	gradient: string;
	onClick: () => void;
	isExpanded?: boolean;
	size?: "small" | "medium" | "large" | "wide" | "tall" | "fill";
}

export const AppIcon = ({
	icon: Icon,
	name,
	gradient,
	onClick,
	isExpanded = false,
	size = "small",
}: AppIconProps) => {
	// Get size-specific styling
	const getSizeStyles = () => {
		if (isExpanded) return {};

		switch (size) {
			case "small":
				return {
					iconSize: "h-4 w-4",
					containerSize: "h-8 w-8",
				};
			case "medium":
				return {
					iconSize: "h-6 w-6",
					containerSize: "h-12 w-12",
				};
			case "large":
				return {
					iconSize: "h-8 w-8",
					containerSize: "h-16 w-16",
				};
			case "wide":
				return {
					iconSize: "h-5 w-5",
					containerSize: "h-10 w-10",
				};
			case "tall":
				return {
					iconSize: "h-5 w-5",
					containerSize: "h-10 w-10",
				};
			case "fill":
				return {
					iconSize: "h-6 w-6",
					containerSize: "h-12 w-12",
				};
			default:
				return {
					iconSize: "h-4 w-4",
					containerSize: "h-8 w-8",
				};
		}
	};

	const sizeStyles = getSizeStyles();

	return (
		<motion.div
			layoutId={`app-${name}`}
			className={cn(
				"relative h-full w-full cursor-pointer overflow-hidden shadow-lg",
				isExpanded ? "min-h-96 shadow-2xl" : "hover:shadow-xl",
			)}
			style={{
				background: gradient,
			}}
			initial={{
				borderRadius: "16px",
			}}
			animate={{
				borderRadius: isExpanded ? "24px" : "16px",
			}}
			onClick={onClick}
			whileHover={!isExpanded ? { scale: 1.02 } : {}}
			whileTap={!isExpanded ? { scale: 0.98 } : {}}
			layout
			transition={{
				layout: { duration: 0.4, ease: "easeInOut" },
				scale: { duration: 0.2 },
				borderRadius: { duration: 0.4, ease: "easeInOut" },
			}}
		>
			<motion.div
				className={cn(
					"absolute inset-0 bg-white/10",
					!isExpanded && "backdrop-blur-sm",
				)}
				initial={{
					opacity: 0.8,
					borderRadius: "16px",
				}}
				animate={{
					borderRadius: isExpanded ? "24px" : "16px",
				}}
				whileHover={{ opacity: 1 }}
				layout
				transition={{
					borderRadius: { duration: 0.4, ease: "easeInOut" },
				}}
			/>

			<motion.div
				className={cn(
					"relative flex h-full flex-col",
					isExpanded
						? "items-start justify-start p-8 pt-8"
						: "items-center justify-center p-2",
					size === "wide" &&
						!isExpanded &&
						"flex-row items-center justify-start px-4",
					size === "tall" && !isExpanded && "justify-start pt-4",
				)}
				layout
			>
				<motion.div
					className={cn(
						"flex items-center justify-center rounded-full bg-white/20",
						!isExpanded && "backdrop-blur-sm",
						isExpanded ? "mb-6 h-16 w-16" : sizeStyles.containerSize,
						size === "wide" && !isExpanded && "mr-3 mb-0",
					)}
					layout
					transition={{ layout: { duration: 0.4 } }}
				>
					<motion.div layout>
						<Icon
							className={cn(
								"text-white",
								isExpanded ? "h-8 w-8" : sizeStyles.iconSize,
							)}
						/>
					</motion.div>
				</motion.div>

				<motion.span
					className={cn(
						"font-medium text-sm text-white",
						isExpanded && "mb-8 text-left text-2xl",
						!isExpanded && "text-center",
						size === "wide" && !isExpanded && "text-left",
						(size === "small" || size === "medium") && !isExpanded && "mt-1",
					)}
					layout
					transition={{ layout: { duration: 0.4 } }}
				>
					{name}
				</motion.span>

				{isExpanded && (
					<motion.div
						className="w-full flex-1"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.3, duration: 0.4 }}
						layout
					>
						<div className="h-full min-h-64 rounded-xl bg-white/10 p-6 backdrop-blur-md">
							<h3 className="mb-4 font-semibold text-lg text-white">
								{name} Application
							</h3>
							<p className="mb-6 text-sm text-white/80 leading-relaxed">
								This is where the {name.toLowerCase()} application content would
								go. You can build out each app's unique interface here.
							</p>
							<div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
								<div className="rounded-xl bg-white/10 p-4">
									<h4 className="mb-2 font-medium text-sm text-white">
										Feature 1
									</h4>
									<p className="text-sm text-white/70">
										Detailed description of this feature and its capabilities.
									</p>
								</div>
								<div className="rounded-xl bg-white/10 p-4">
									<h4 className="mb-2 font-medium text-sm text-white">
										Feature 2
									</h4>
									<p className="text-sm text-white/70">
										Another feature with comprehensive details.
									</p>
								</div>
							</div>
							<div className="rounded-xl border border-white/10 bg-white/5 p-4">
								<h4 className="mb-2 font-medium text-sm text-white">
									Technologies
								</h4>
								<div className="flex flex-wrap gap-2">
									<span className="rounded-full bg-white/10 px-3 py-1 text-sm text-white/80">
										React
									</span>
									<span className="rounded-full bg-white/10 px-3 py-1 text-sm text-white/80">
										TypeScript
									</span>
									<span className="rounded-full bg-white/10 px-3 py-1 text-sm text-white/80">
										Tailwind CSS
									</span>
								</div>
							</div>
						</div>
					</motion.div>
				)}
			</motion.div>

			{isExpanded && (
				<motion.button
					className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm hover:bg-white/30"
					initial={{ opacity: 0, scale: 0.8 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ delay: 0.4, duration: 0.3 }}
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.9 }}
					onClick={(e) => {
						e.stopPropagation();
						onClick();
					}}
				>
					<svg
						className="h-4 w-4"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						aria-label="Close"
					>
						<title>Close</title>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</motion.button>
			)}
		</motion.div>
	);
};
