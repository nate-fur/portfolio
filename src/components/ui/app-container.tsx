import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { useState } from "react";
import { cn } from "~/lib/utils";

interface AppContainerProps {
	icon: LucideIcon;
	name: string;
	onClick: () => void;
	isExpanded?: boolean;
	size?: "small" | "medium" | "large";
	children?: ReactNode;
}

export const AppContainer = ({
	icon: Icon,
	name,
	onClick,
	isExpanded = false,
	size = "small",
	children,
}: AppContainerProps) => {
	const [isFullScreen, setIsFullScreen] = useState(false);

	// Get size-specific styling
	const getSizeStyles = () => {
		if (isExpanded) return {};

		return {
			iconSize: "h-8 w-8",
			iconBgSize: "h-16 w-16",
		};
	};

	const sizeStyles = getSizeStyles();

	const handleFullScreenToggle = (e: React.MouseEvent) => {
		e.stopPropagation();
		setIsFullScreen(!isFullScreen);
	};

	const handleClose = (e: React.MouseEvent) => {
		e.stopPropagation();
		if (isFullScreen) {
			setIsFullScreen(false);
		} else {
			onClick();
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
				layoutId={`app-${name}`}
				className={cn(
					"relative overflow-hidden border-1 border-primary",
					isFullScreen && isExpanded
						? "fixed inset-0 z-90 m-auto h-[90vh] w-[90vw] cursor-default"
						: isExpanded
							? "h-auto min-h-fit w-full cursor-default"
							: "h-full w-full cursor-pointer hover:opacity-80",
				)}
				onClick={!isExpanded ? onClick : undefined}
				whileHover={!isExpanded ? { scale: 1.02 } : {}}
				whileTap={!isExpanded ? { scale: 0.98 } : {}}
				layout
				transition={{
					layout: { duration: 0.4, ease: "easeInOut" },
					scale: { duration: 0.2 },
				}}
			>
				<motion.div
					className={cn(
						"relative flex h-full flex-col",
						isExpanded
							? "items-start justify-start p-8 pt-8"
							: "items-center justify-center p-2",
					)}
					layout
				>
					<motion.div
						className={cn(
							"flex items-center justify-center",
							isExpanded ? "mb-6 h-16 w-16" : sizeStyles.iconBgSize,
						)}
						layout
						transition={{ layout: { duration: 0.4 } }}
					>
						<motion.div layout>
							<Icon
								className={cn(
									"text-primary",
									isExpanded ? "h-8 w-8" : sizeStyles.iconSize,
								)}
							/>
						</motion.div>
					</motion.div>

					<motion.span
						className={cn(
							"font-medium text-primary",
							isExpanded && isFullScreen && "mb-8 text-left text-3xl",
							isExpanded && !isFullScreen && "mb-8 text-left text-2xl",
							!isExpanded && "mt-2 text-center",
						)}
						layout
						transition={{ layout: { duration: 0.4 } }}
					>
						{name}
					</motion.span>

					{isExpanded && children && (
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
							{children}
						</motion.div>
					)}
				</motion.div>

				{isExpanded && (
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
				)}
			</motion.div>
		</>
	);
};
