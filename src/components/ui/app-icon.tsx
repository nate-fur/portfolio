import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { cn } from "~/lib/utils";

interface AppIconProps {
	icon: LucideIcon;
	name: string;
	gradient: string;
	onClick: () => void;
	isExpanded?: boolean;
	size?: "small" | "large";
}

export const AppIcon = ({
	icon: Icon,
	name,
	gradient,
	onClick,
	isExpanded = false,
	size = "large",
}: AppIconProps) => {
	return (
		<motion.div
			layoutId={`app-${name}`}
			className={cn(
				"relative cursor-pointer overflow-hidden shadow-lg",
				isExpanded
					? "min-h-96 w-80 shadow-2xl" // Fixed width for expanded state
					: cn(
							"aspect-square hover:shadow-xl",
							size === "large" ? "h-20 w-20" : "h-16 w-16",
						),
			)}
			style={{
				background: gradient,
			}}
			initial={{
				borderRadius: size === "large" ? "20px" : "16px",
			}}
			animate={{
				borderRadius: isExpanded ? "24px" : size === "large" ? "20px" : "16px",
			}}
			onClick={onClick}
			whileHover={!isExpanded ? { scale: 1.05 } : {}}
			whileTap={!isExpanded ? { scale: 0.95 } : {}}
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
					borderRadius: size === "large" ? "20px" : "16px",
				}}
				animate={{
					borderRadius: isExpanded
						? "24px"
						: size === "large"
							? "20px"
							: "16px",
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
						? "items-start justify-start p-4 pt-8"
						: "items-center justify-center",
					!isExpanded && (size === "large" ? "p-4" : "p-3"),
				)}
				layout
			>
				<motion.div
					className={cn(
						"flex items-center justify-center rounded-full bg-white/20",
						!isExpanded && "backdrop-blur-sm",
						isExpanded
							? "mb-6 h-16 w-16"
							: size === "large"
								? "mb-2 h-12 w-12"
								: "mb-2 h-10 w-10",
					)}
					layout
					transition={{ layout: { duration: 0.4 } }}
				>
					<motion.div layout>
						<Icon
							className={cn(
								"text-white",
								isExpanded
									? "h-8 w-8"
									: size === "large"
										? "h-6 w-6"
										: "h-5 w-5",
							)}
						/>
					</motion.div>
				</motion.div>

				<motion.span
					className={cn(
						"font-medium text-white",
						isExpanded
							? "mb-8 text-left text-2xl"
							: size === "large"
								? "text-center text-xs"
								: "text-center text-xs",
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
									<p className="text-white/70 text-xs">
										Detailed description of this feature and its capabilities.
									</p>
								</div>
								<div className="rounded-xl bg-white/10 p-4">
									<h4 className="mb-2 font-medium text-sm text-white">
										Feature 2
									</h4>
									<p className="text-white/70 text-xs">
										Another feature with comprehensive details.
									</p>
								</div>
							</div>
							<div className="rounded-xl border border-white/10 bg-white/5 p-4">
								<h4 className="mb-2 font-medium text-sm text-white">
									Technologies
								</h4>
								<div className="flex flex-wrap gap-2">
									<span className="rounded-full bg-white/10 px-3 py-1 text-white/80 text-xs">
										React
									</span>
									<span className="rounded-full bg-white/10 px-3 py-1 text-white/80 text-xs">
										TypeScript
									</span>
									<span className="rounded-full bg-white/10 px-3 py-1 text-white/80 text-xs">
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
