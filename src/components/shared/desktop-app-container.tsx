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

type AppState = "collapsed" | "expanded" | "fullscreen";

interface DesktopAppContainerProps {
	app: App;
	size: "small" | "medium" | "large";
	isExpanded: boolean;
	onExpansionChange?: (isExpanded: boolean) => void;
}

// Shared App Header Component
const AppHeader = ({ app }: { app: App }) => (
	<motion.div
		className="flex items-center gap-3"
		initial={{ opacity: 0, y: -10 }}
		animate={{ opacity: 1, y: 0 }}
		exit={{ opacity: 0, y: -10 }}
		transition={{
			delay: ANIMATION_DELAY,
			duration: ANIMATION_DURATION,
			ease: "easeOut",
		}}
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
		>
			{app.name}
		</motion.h2>
	</motion.div>
);

// Shared App Controls Component
const AppControls = ({
	appState,
	onFullScreenToggle,
	onClose,
}: {
	appState: AppState;
	onFullScreenToggle: (e: React.MouseEvent) => void;
	onClose: () => void;
}) => (
	<motion.div
		className="flex gap-2"
		initial={{ opacity: 0, scale: 0.9 }}
		animate={{ opacity: 1, scale: 1 }}
		transition={{
			delay: ANIMATION_DELAY,
			duration: ANIMATION_DURATION,
		}}
		role="toolbar"
		aria-label="App controls"
	>
		{/* Fullscreen toggle button */}
		<motion.button
			className="flex h-8 w-8 items-center justify-center border-1 border-primary hover:opacity-70 focus:outline-none focus:ring-2 focus:ring-primary"
			whileHover={{ scale: 1.1 }}
			whileTap={{ scale: 0.9 }}
			onClick={onFullScreenToggle}
			aria-label={
				appState === "fullscreen"
					? "Exit full screen mode"
					: "Enter full screen mode"
			}
			aria-pressed={appState === "fullscreen"}
			type="button"
			transition={{
				duration: ANIMATION_DURATION,
			}}
		>
			{appState === "fullscreen" ? (
				<RiFullscreenExitLine className="h-4 w-4" />
			) : (
				<RiFullscreenLine className="h-4 w-4" />
			)}
		</motion.button>

		{/* Close button */}
		<motion.button
			className="flex h-8 w-8 items-center justify-center border-1 border-primary hover:opacity-70 focus:outline-none focus:ring-2 focus:ring-primary"
			whileHover={{ scale: 1.1 }}
			whileTap={{ scale: 0.9 }}
			onClick={onClose}
			aria-label={
				appState === "fullscreen"
					? "Exit full screen and close app"
					: "Close app"
			}
			type="button"
			transition={{
				duration: ANIMATION_DURATION,
			}}
		>
			<RiCloseLine className="h-4 w-4" />
		</motion.button>
	</motion.div>
);

// Shared App Content Component
const AppContent = ({ app }: { app: App }) => (
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
	>
		{app.contentComponent()}
	</motion.main>
);

export const DesktopAppContainer = ({
	app,
	size,
	isExpanded,
	onExpansionChange,
}: DesktopAppContainerProps) => {
	const [isFullScreen, setIsFullScreen] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);

	// Derive app state from props and local state
	const appState: AppState = !isExpanded
		? "collapsed"
		: isFullScreen
			? "fullscreen"
			: "expanded";

	// Handle keyboard events for accessibility
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (appState === "collapsed") return;

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
				appState === "fullscreen" &&
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

		if (appState !== "collapsed") {
			document.addEventListener("keydown", handleKeyDown);
			containerRef.current?.focus();
		}

		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [appState]);

	const handleAppClick = () => {
		onExpansionChange?.(!isExpanded);
	};

	const handleFullScreenToggle = (e: React.MouseEvent) => {
		e.stopPropagation();
		setIsFullScreen(!isFullScreen);
	};

	const handleClose = () => {
		if (appState === "fullscreen") {
			setIsFullScreen(false);
		} else {
			onExpansionChange?.(false);
		}
	};

	const handleDialogOpenChange = (open: boolean) => {
		if (!open) {
			setIsFullScreen(false);
		}
	};

	// Fullscreen backdrop
	const fullScreenBackdrop = appState === "fullscreen" && (
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
		/>
	);

	return (
		<>
			{fullScreenBackdrop}
			{/* Fullscreen Dialog */}
			<Dialog
				open={appState === "fullscreen"}
				onOpenChange={handleDialogOpenChange}
			>
				<DialogContent
					variant="fullscreen"
					className="border-1 border-primary shadow-2xl duration-300"
					showCloseButton={false}
					overlayClassName="bg-black/80 backdrop-blur-sm"
				>
					<motion.div
						className="flex h-full flex-col items-start justify-start p-8"
						layout
					>
						{/* App Header Row with Controls */}
						<motion.div className="mb-4 flex w-full items-center justify-between">
							<AppHeader app={app} />
							<AppControls
								appState={appState}
								onFullScreenToggle={handleFullScreenToggle}
								onClose={handleClose}
							/>
						</motion.div>

						{/* App content */}
						<AppContent app={app} />
					</motion.div>
				</DialogContent>
			</Dialog>

			{/* Main App Container */}
			<motion.div
				ref={containerRef}
				layoutId={`app-${app.id}`}
				className={cn(
					"border-1 border-primary focus:outline-none focus:ring-2 focus:ring-primary",
					appState === "expanded"
						? "h-auto min-h-fit w-full cursor-default overflow-hidden"
						: appState === "collapsed"
							? "h-full w-full cursor-pointer overflow-hidden hover:opacity-80"
							: "h-full w-full cursor-default overflow-hidden",
				)}
				onClick={appState === "collapsed" ? handleAppClick : undefined}
				onKeyDown={
					appState === "collapsed"
						? (e) => {
								if (e.key === "Enter" || e.key === " ") {
									e.preventDefault();
									handleAppClick();
								}
							}
						: undefined
				}
				whileHover={appState === "collapsed" ? { scale: 1.02 } : {}}
				whileTap={appState === "collapsed" ? { scale: 0.98 } : {}}
				layout
				transition={{
					layout: {
						duration: ANIMATION_DURATION,
						ease: [0.25, 0.46, 0.45, 0.94],
					},
					scale: { duration: ANIMATION_DURATION },
				}}
				role={appState === "collapsed" ? "button" : "dialog"}
				tabIndex={appState === "collapsed" ? 0 : -1}
				aria-label={
					appState === "collapsed" ? `Open ${app.name} app` : undefined
				}
				aria-expanded={appState !== "collapsed"}
				aria-modal={appState === "fullscreen"}
			>
				{/* Render thumbnail when collapsed, content when expanded */}
				{appState === "expanded" ? (
					<motion.div
						className="flex h-full flex-col items-start justify-start p-8"
						layout
					>
						{/* App Header Row with Controls */}
						<motion.div className="mb-4 flex w-full items-center justify-between">
							<AppHeader app={app} />
							<AppControls
								appState={appState}
								onFullScreenToggle={handleFullScreenToggle}
								onClose={handleClose}
							/>
						</motion.div>

						{/* App content */}
						<AppContent app={app} />
					</motion.div>
				) : appState === "collapsed" ? (
					<motion.div
						className="flex h-full flex-col items-stretch justify-center"
						layout
					>
						{/* Render the app's thumbnail component */}
						{app.thumbnailComponent({ size })}
					</motion.div>
				) : null}
			</motion.div>
		</>
	);
};
