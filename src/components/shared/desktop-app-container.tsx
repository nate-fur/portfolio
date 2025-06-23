import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
	RiCloseLine,
	RiFullscreenExitLine,
	RiFullscreenLine,
} from "react-icons/ri";
import type { App } from "~/apps/types";
import { cn } from "~/lib/utils";
import { Dialog, DialogContent } from "../ui/dialog";

// Animation constants
const ANIMATION_DURATION = 0.3;
const ANIMATION_DELAY = 0.3;

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
			transition={{
				duration: ANIMATION_DURATION,
				ease: "easeOut",
			}}
			aria-hidden="true"
			style={{ willChange: "opacity" }}
		/>
	);
	const handleDialogOpenChange = (open: boolean) => {
		if (!open) {
			setIsFullScreen(false);
		}
	};

	return (
		<>
			{fullScreenBackdrop}
			{/* Fullscreen Dialog */}
			<Dialog
				open={isFullScreen && isExpanded}
				onOpenChange={handleDialogOpenChange}
			>
				<DialogContent
					variant="fullscreen"
					className="border-1 border-primary shadow-2xl duration-300"
					showCloseButton={false}
					overlayClassName="bg-black/80 backdrop-blur-sm"
				>
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
							transition={{
								delay: ANIMATION_DELAY,
								duration: ANIMATION_DURATION,
								ease: "easeOut",
							}}
							style={{ willChange: "transform, opacity" }}
						>
							{app.icon && (
								<motion.div
									initial={{ opacity: 0, scale: 0.8 }}
									animate={{ opacity: 1, scale: 1 }}
									exit={{ opacity: 0, scale: 0.8 }}
									transition={{
										delay: ANIMATION_DELAY,
										duration: ANIMATION_DURATION,
										ease: "easeOut",
									}}
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
								transition={{
									delay: ANIMATION_DELAY,
									duration: ANIMATION_DURATION,
									ease: "easeOut",
								}}
								style={{ willChange: "transform, opacity" }}
							>
								{app.name}
							</motion.h2>
						</motion.div>

						{/* App content */}
						<motion.main
							className="w-full flex-1 overflow-hidden"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{
								delay: ANIMATION_DELAY,
								duration: ANIMATION_DURATION,
								ease: "easeOut",
							}}
							style={{ willChange: "opacity" }}
						>
							{app.contentComponent()}
						</motion.main>

						{/* Control buttons */}
						<motion.div
							className="absolute top-4 right-4 flex gap-2"
							initial={{ opacity: 0, scale: 0.9 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{
								delay: ANIMATION_DELAY,
								duration: ANIMATION_DURATION,
							}}
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
								aria-label="Exit full screen mode"
								aria-pressed={true}
								type="button"
								transition={{
									duration: ANIMATION_DURATION,
								}}
								style={{ willChange: "transform" }}
							>
								<RiFullscreenExitLine className="h-4 w-4" />
							</motion.button>

							{/* Close button */}
							<motion.button
								className="flex h-8 w-8 items-center justify-center border-1 border-primary hover:opacity-70 focus:outline-none focus:ring-2 focus:ring-primary"
								whileHover={{ scale: 1.1 }}
								whileTap={{ scale: 0.9 }}
								onClick={handleClose}
								aria-label="Exit full screen and close app"
								type="button"
								transition={{
									duration: ANIMATION_DURATION,
								}}
								style={{ willChange: "transform" }}
							>
								<RiCloseLine className="h-4 w-4" />
							</motion.button>
						</motion.div>
					</motion.div>
				</DialogContent>
			</Dialog>

			{/* Main App Container */}
			<motion.div
				ref={containerRef}
				layoutId={`app-${app.id}`}
				className={cn(
					"relative border-1 border-primary focus:outline-none focus:ring-2 focus:ring-primary",
					isExpanded && !isFullScreen
						? "h-auto min-h-fit w-full cursor-default overflow-hidden"
						: !isExpanded
							? "h-full w-full cursor-pointer overflow-hidden hover:opacity-80"
							: "h-full w-full cursor-default overflow-hidden",
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
					layout: {
						duration: ANIMATION_DURATION,
						ease: [0.25, 0.46, 0.45, 0.94],
					},
					scale: { duration: ANIMATION_DURATION },
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
				{/* Render thumbnail when collapsed, content when expanded (but not fullscreen) */}
				{isExpanded && !isFullScreen ? (
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
							transition={{
								delay: ANIMATION_DELAY,
								duration: ANIMATION_DURATION,
								ease: "easeOut",
							}}
							style={{ willChange: "transform, opacity" }}
						>
							{app.icon && (
								<motion.div
									initial={{ opacity: 0, scale: 0.8 }}
									animate={{ opacity: 1, scale: 1 }}
									exit={{ opacity: 0, scale: 0.8 }}
									transition={{
										delay: ANIMATION_DELAY,
										duration: ANIMATION_DURATION,
										ease: "easeOut",
									}}
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
								transition={{
									delay: ANIMATION_DELAY,
									duration: ANIMATION_DURATION,
									ease: "easeOut",
								}}
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
							transition={{
								delay: ANIMATION_DELAY,
								duration: ANIMATION_DURATION,
								ease: "easeOut",
							}}
							style={{ willChange: "opacity" }}
						>
							{app.contentComponent()}
						</motion.main>

						{/* Control buttons */}
						<motion.div
							className="absolute top-4 right-4 flex gap-2"
							initial={{ opacity: 0, scale: 0.9 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{
								delay: ANIMATION_DELAY,
								duration: ANIMATION_DURATION,
							}}
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
								aria-label="Enter full screen mode"
								aria-pressed={isFullScreen}
								type="button"
								transition={{
									duration: ANIMATION_DURATION,
								}}
								style={{ willChange: "transform" }}
							>
								<RiFullscreenLine className="h-4 w-4" />
							</motion.button>

							{/* Close button */}
							<motion.button
								className="flex h-8 w-8 items-center justify-center border-1 border-primary hover:opacity-70 focus:outline-none focus:ring-2 focus:ring-primary"
								whileHover={{ scale: 1.1 }}
								whileTap={{ scale: 0.9 }}
								onClick={handleClose}
								aria-label="Close app"
								type="button"
								transition={{
									duration: ANIMATION_DURATION,
								}}
								style={{ willChange: "transform" }}
							>
								<RiCloseLine className="h-4 w-4" />
							</motion.button>
						</motion.div>
					</motion.div>
				) : !isExpanded ? (
					<motion.div
						className="relative flex h-full flex-col items-stretch justify-center"
						layout
						style={{ willChange: "transform" }}
					>
						{/* Render the app's thumbnail component */}
						{app.thumbnailComponent({ size })}
					</motion.div>
				) : null}
			</motion.div>
		</>
	);
};
