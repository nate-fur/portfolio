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
				"relative cursor-pointer overflow-clip",
				isExpanded
					? "fixed inset-x-4 top-16 bottom-8 z-50 overflow-y-auto rounded-3xl"
					: "aspect-square rounded-2xl shadow-lg hover:shadow-xl",
			)}
			style={{
				background: gradient,
			}}
			onClick={onClick}
			whileHover={!isExpanded ? { scale: 1.05 } : {}}
			whileTap={!isExpanded ? { scale: 0.95 } : {}}
			layout
			transition={{
				layout: { duration: 0.4, ease: "easeInOut" },
				scale: { duration: 0.2 },
			}}
		>
			<motion.div
				className={cn(
					"absolute inset-0 rounded-inherit bg-white/10",
					!isExpanded && "backdrop-blur-sm",
				)}
				initial={{ opacity: 0.8 }}
				whileHover={{ opacity: 1 }}
				layout
			/>

			<motion.div
				className={cn(
					"relative flex h-full flex-col items-center p-4",
					isExpanded ? "justify-start pt-8" : "justify-center",
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
						"text-center font-medium text-white",
						isExpanded ? "mb-8 text-xl" : "text-xs",
					)}
					layout
					transition={{ layout: { duration: 0.4 } }}
				>
					{name}
				</motion.span>

				{isExpanded && (
					<motion.div
						className="w-full max-w-4xl flex-1"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.3, duration: 0.4 }}
						layout
					>
						<div className="h-full min-h-96 rounded-2xl bg-white/10 p-6 backdrop-blur-md">
							<h3 className="mb-6 font-semibold text-2xl text-white">
								{name} Application
							</h3>
							<p className="mb-8 text-lg text-white/80 leading-relaxed">
								This is where the {name.toLowerCase()} application content would
								go. You can build out each app's unique interface here. This
								expanded view gives you plenty of space to showcase your
								projects and create engaging interactive experiences.
							</p>
							<div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
								<div className="rounded-xl bg-white/10 p-6">
									<h4 className="mb-3 font-medium text-lg text-white">
										Feature 1
									</h4>
									<p className="text-white/70">
										Detailed description of this feature and its capabilities.
										You can add images, links, or interactive elements here.
									</p>
								</div>
								<div className="rounded-xl bg-white/10 p-6">
									<h4 className="mb-3 font-medium text-lg text-white">
										Feature 2
									</h4>
									<p className="text-white/70">
										Another feature with comprehensive details. This layout
										provides excellent space for showcasing your work.
									</p>
								</div>
							</div>
							<div className="rounded-xl border border-white/10 bg-white/5 p-6">
								<h4 className="mb-3 font-medium text-lg text-white">
									Project Details
								</h4>
								<p className="mb-4 text-white/70">
									Add more specific information about this project, including
									technologies used, challenges overcome, and results achieved.
								</p>
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
					className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm hover:bg-white/30"
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
