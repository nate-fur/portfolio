import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { App } from "~/apps/types";
import { cn } from "~/lib/utils";

interface DesktopAppContainerProps {
	app: App;
	size: "small" | "medium" | "large";
	isExpanded: boolean;
	onExpansionChange?: (isExpanded: boolean) => void;
}

export const DesktopAppContainer = ({
	app,
	size,
	isExpanded,
	onExpansionChange,
}: DesktopAppContainerProps) => {
	const [isFullScreen, setIsFullScreen] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);

	// Handle keyboard events for accessibility
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (!isExpanded) return;

			// Only handle escape if this app container is focused or contains the focused element
			if (
				e.key === "Escape" &&
				containerRef.current &&
				(document.activeElement === containerRef.current ||
					containerRef.current.contains(document.activeElement))
			) {
				e.preventDefault();
				handleClose();
				return;
			}

			// Handle Tab key for focus trapping when in fullscreen
			if (
				e.key === "Tab" &&
				isFullScreen &&
				containerRef.current &&
				containerRef.current.contains(document.activeElement)
			) {
				const focusableElements = containerRef.current.querySelectorAll(
					'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
				);

				if (focusableElements && focusableElements.length > 0) {
					const firstElement = focusableElements[0] as HTMLElement;
					const lastElement = focusableElements[
						focusableElements.length - 1
					] as HTMLElement;

					if (e.shiftKey && document.activeElement === firstElement) {
						e.preventDefault();
						lastElement.focus();
					} else if (!e.shiftKey && document.activeElement === lastElement) {
						e.preventDefault();
						firstElement.focus();
					}
				}
			}
		};

		if (isExpanded) {
			document.addEventListener("keydown", handleKeyDown);
			containerRef.current?.focus();
		}

		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [isExpanded, isFullScreen]);

	const handleAppClick = () => {
		onExpansionChange?.(!isExpanded);
	};

	const handleFullScreenToggle = (e: React.MouseEvent) => {
		e.stopPropagation();
		setIsFullScreen(!isFullScreen);
	};

	const handleClose = () => {
		if (isFullScreen) {
			setIsFullScreen(false);
		} else {
			onExpansionChange?.(false);
		}
	};

	// Fullscreen backdrop
	const fullScreenBackdrop = isFullScreen && isExpanded && (
		<motion.div
			className="fixed inset-0 z-50 bg-black/80"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.2, ease: "easeOut" }}
			aria-hidden="true"
			style={{ willChange: "opacity" }}
		/>
	);

	return (
		<>
			{fullScreenBackdrop}
			<motion.div
				ref={containerRef}
				layoutId={`app-${app.id}`}
				className={cn(
					"relative border-1 border-primary bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary",
					isFullScreen && isExpanded
						? "fixed inset-0 z-50 m-auto h-[90vh] w-[90vw] cursor-default overflow-hidden bg-background"
						: isExpanded
							? "h-auto min-h-fit w-full cursor-default overflow-hidden"
							: "h-full w-full cursor-pointer overflow-hidden hover:opacity-80",
				)}
				onClick={!isExpanded ? handleAppClick : undefined}
				onKeyDown={
					!isExpanded
						? (e) => {
								if (e.key === "Enter" || e.key === " ") {
									e.preventDefault();
									handleAppClick();
								}
							}
						: undefined
				}
				whileHover={!isExpanded ? { scale: 1.02 } : {}}
				whileTap={!isExpanded ? { scale: 0.98 } : {}}
				layout
				transition={{
					layout: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] },
					scale: { duration: 0.15 },
				}}
				role={!isExpanded ? "button" : "dialog"}
				tabIndex={!isExpanded ? 0 : -1}
				aria-label={!isExpanded ? `Open ${app.name} app` : undefined}
				aria-expanded={isExpanded}
				aria-modal={isExpanded && isFullScreen}
				style={{
					willChange: isExpanded ? "transform, opacity" : "transform",
				}}
			>
				{/* Render thumbnail when collapsed, content when expanded */}
				{isExpanded ? (
					<motion.div
						className="relative flex h-full flex-col items-start justify-start p-8"
						layout
						style={{ willChange: "transform" }}
					>
						{/* App Header */}
						<motion.div
							className="mb-4 flex items-center gap-3 self-stretch"
							initial={{ opacity: 0, y: -10 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -10 }}
							transition={{ delay: 0.1, duration: 0.25, ease: "easeOut" }}
							style={{ willChange: "transform, opacity" }}
						>
							{app.icon && (
								<motion.div
									initial={{ opacity: 0, scale: 0.8 }}
									animate={{ opacity: 1, scale: 1 }}
									exit={{ opacity: 0, scale: 0.8 }}
									transition={{ delay: 0.15, duration: 0.2, ease: "easeOut" }}
									style={{ willChange: "transform, opacity" }}
								>
									<app.icon className="h-7 w-7 text-primary" />
								</motion.div>
							)}
							<motion.h2
								className="font-semibold text-primary text-xl"
								initial={{ opacity: 0, x: -10 }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: -10 }}
								transition={{ delay: 0.2, duration: 0.25, ease: "easeOut" }}
								style={{ willChange: "transform, opacity" }}
							>
								{app.name}
							</motion.h2>
						</motion.div>

						{/* App content - simplified animation for Firefox performance */}
						<motion.main
							className="w-full flex-1 overflow-hidden"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ delay: 0.05, duration: 0.2, ease: "easeOut" }}
							style={{ willChange: "opacity" }}
						>
							{app.contentComponent()}
						</motion.main>

						{/* Control buttons */}
						<motion.div
							className="absolute top-4 right-4 flex gap-2"
							initial={{ opacity: 0, scale: 0.9 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ delay: 0.25, duration: 0.2 }}
							role="toolbar"
							aria-label="App controls"
							style={{ willChange: "transform, opacity" }}
						>
							{/* Fullscreen toggle button */}
							<motion.button
								className="flex h-8 w-8 items-center justify-center border-1 border-primary hover:opacity-70 focus:outline-none focus:ring-2 focus:ring-primary"
								whileHover={{ scale: 1.1 }}
								whileTap={{ scale: 0.9 }}
								onClick={handleFullScreenToggle}
								aria-label={
									isFullScreen
										? "Exit full screen mode"
										: "Enter full screen mode"
								}
								aria-pressed={isFullScreen}
								type="button"
								transition={{ duration: 0.15 }}
								style={{ willChange: "transform" }}
							>
								<svg
									className="h-4 w-4"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									aria-hidden="true"
								>
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

							{/* Close button */}
							<motion.button
								className="flex h-8 w-8 items-center justify-center border-1 border-primary hover:opacity-70 focus:outline-none focus:ring-2 focus:ring-primary"
								whileHover={{ scale: 1.1 }}
								whileTap={{ scale: 0.9 }}
								onClick={handleClose}
								aria-label={
									isFullScreen ? "Exit full screen and close app" : "Close app"
								}
								type="button"
								transition={{ duration: 0.15 }}
								style={{ willChange: "transform" }}
							>
								<svg
									className="h-4 w-4"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									aria-hidden="true"
								>
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
						className="relative flex h-full flex-col items-stretch justify-center"
						layout
						style={{ willChange: "transform" }}
					>
						{/* Render the app's thumbnail component */}
						{app.thumbnailComponent({ size })}
					</motion.div>
				)}
			</motion.div>
		</>
	);
};
