import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { cn } from "~/lib/utils";

interface AppIconProps {
	icon: LucideIcon;
	name: string;
	gradient: string;
	onClick: () => void;
	isExpanded?: boolean;
}

export const AppIcon = ({
	icon: Icon,
	name,
	gradient,
	onClick,
	isExpanded = false,
}: AppIconProps) => {
	return (
		<motion.div
			layoutId={`app-${name}`}
			className={cn(
				"relative cursor-pointer overflow-hidden shadow-lg",
				isExpanded ? "min-h-96 shadow-2xl" : "aspect-square hover:shadow-xl",
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
					"relative flex h-full flex-col p-4",
					isExpanded
						? "items-start justify-start pt-8"
						: "items-center justify-center",
				)}
				layout
			>
				<motion.div
					className={cn(
						"flex items-center justify-center rounded-full bg-white/20",
						!isExpanded && "backdrop-blur-sm",
						isExpanded ? "mb-6 h-16 w-16" : "mb-2 h-12 w-12",
					)}
					layout
					transition={{ layout: { duration: 0.4 } }}
				>
					<motion.div layout>
						<Icon
							className={cn("text-white", isExpanded ? "h-8 w-8" : "h-6 w-6")}
						/>
					</motion.div>
				</motion.div>

				<motion.span
					className={cn(
						"font-medium text-white",
						isExpanded ? "mb-8 text-left text-2xl" : "text-center text-xs",
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
