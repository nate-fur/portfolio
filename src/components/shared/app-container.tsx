import { motion } from "framer-motion";
import { useState } from "react";
import type { App } from "~/apps/types";
import { cn } from "~/lib/utils";

interface AppContainerProps {
	app: App;
	size: "small" | "medium" | "large";
	onExpansionChange?: (isExpanded: boolean) => void;
}

export const AppContainer = ({
	app,
	size,
	onExpansionChange,
}: AppContainerProps) => {
	const [isExpanded, setIsExpanded] = useState(false);
	const [isFullScreen, setIsFullScreen] = useState(false);

	const handleAppClick = () => {
		const newExpanded = !isExpanded;
		setIsExpanded(newExpanded);
		onExpansionChange?.(newExpanded);
	};

	const handleFullScreenToggle = (e: React.MouseEvent) => {
		e.stopPropagation();
		setIsFullScreen(!isFullScreen);
	};

	const handleClose = (e: React.MouseEvent) => {
		e.stopPropagation();
		if (isFullScreen) {
			setIsFullScreen(false);
		} else {
			setIsExpanded(false);
			onExpansionChange?.(false);
		}
	};

	// Full screen overlay backdrop
	const fullScreenBackdrop = isFullScreen && isExpanded && (
		<motion.div
			className="fixed inset-0 z-80 bg-black/80 backdrop-blur-sm"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.4, ease: "easeInOut" }}
		/>
	);

	return (
		<>
			{fullScreenBackdrop}
			<motion.div
				layoutId={`app-${app.id}`}
				className={cn(
					"relative overflow-hidden border-1 border-primary",
					isFullScreen && isExpanded
						? "fixed inset-0 z-90 m-auto h-[90vh] w-[90vw] cursor-default"
						: isExpanded
							? "h-auto min-h-fit w-full cursor-default"
							: "h-full w-full cursor-pointer hover:opacity-80",
				)}
				onClick={!isExpanded ? handleAppClick : undefined}
				whileHover={!isExpanded ? { scale: 1.02 } : {}}
				whileTap={!isExpanded ? { scale: 0.98 } : {}}
				layout
				transition={{
					layout: { duration: 0.4, ease: "easeInOut" },
					scale: { duration: 0.2 },
				}}
			>
				{/* Render thumbnail when collapsed, content when expanded */}
				{isExpanded ? (
					<motion.div
						className="relative flex h-full flex-col items-start justify-start p-8 pt-8"
						layout
					>
						{/* App content */}
						<motion.div
							key={isFullScreen ? "fullscreen" : "expanded"}
							className="w-full flex-1 overflow-hidden"
							initial={{ opacity: 0, filter: "blur(4px)" }}
							animate={{
								opacity: 1,
								filter: "blur(0px)",
							}}
							exit={{
								opacity: 0,
								filter: "blur(4px)",
							}}
							transition={{
								delay: 0.1,
								duration: 0.3,
								ease: "easeInOut",
							}}
						>
							{app.contentComponent()}
						</motion.div>

						{/* Control buttons */}
						<motion.div
							className="absolute top-4 right-4 flex gap-2"
							initial={{ opacity: 0, scale: 0.8 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ delay: 0.4, duration: 0.3 }}
						>
							<motion.button
								className="flex h-8 w-8 items-center justify-center border-1 border-primary hover:opacity-70"
								whileHover={{ scale: 1.1 }}
								whileTap={{ scale: 0.9 }}
								onClick={handleFullScreenToggle}
							>
								<svg
									className="h-4 w-4"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									aria-label={isFullScreen ? "Exit Full Screen" : "Full Screen"}
								>
									<title>
										{isFullScreen ? "Exit Full Screen" : "Full Screen"}
									</title>
									{isFullScreen ? (
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M9 9V4.5M9 9H4.5M9 9L3.5 3.5M15 9h4.5M15 9V4.5M15 9l5.5-5.5M9 15v4.5M9 15H4.5M9 15l-5.5 5.5M15 15h4.5M15 15v4.5m0-4.5l5.5 5.5"
										/>
									) : (
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M3 7V4a1 1 0 011-1h3M21 7V4a1 1 0 00-1-1h-3M3 17v3a1 1 0 001 1h3M21 17v3a1 1 0 01-1 1h-3"
										/>
									)}
								</svg>
							</motion.button>
							<motion.button
								className="flex h-8 w-8 items-center justify-center border-1 border-primary hover:opacity-70"
								whileHover={{ scale: 1.1 }}
								whileTap={{ scale: 0.9 }}
								onClick={handleClose}
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
						</motion.div>
					</motion.div>
				) : (
					<motion.div
						className="relative flex h-full flex-col items-center justify-center p-2"
						layout
					>
						{/* Render the app's thumbnail component */}
						{app.thumbnailComponent({ size })}
					</motion.div>
				)}
			</motion.div>
		</>
	);
};
