"use client";

import {
	RiCloseLine,
	RiComputerLine,
	RiDropLine,
	RiGithubLine,
	RiLinkedinLine,
	RiMailLine,
	RiMenuLine,
	RiMoonLine,
	RiPlantLine,
	RiSunLine,
} from "react-icons/ri";

import { useCallback, useEffect, useRef, useState } from "react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { useTheme } from "~/contexts/theme-context";
import { cn } from "~/lib/utils";

const themeOptions = [
	{ name: "Light", icon: RiSunLine, value: "light" as const },
	{ name: "Dark", icon: RiMoonLine, value: "dark" as const },
	{ name: "Forest Green", icon: RiPlantLine, value: "forest" as const },
	{ name: "Blood Red", icon: RiDropLine, value: "blood" as const },
	{ name: "System", icon: RiComputerLine, value: "system" as const },
];

export function SideNav() {
	const [isOpen, setIsOpen] = useState(false);
	const [isHovered, setIsHovered] = useState(false);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const { theme, setTheme } = useTheme();
	const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

	const currentTheme = themeOptions.find(
		(themeOption) => themeOption.value === theme,
	);
	const CurrentThemeIcon = currentTheme?.icon || RiSunLine;

	// Clear any existing timeout
	const clearHideTimeout = useCallback(() => {
		if (hideTimeoutRef.current) {
			clearTimeout(hideTimeoutRef.current);
			hideTimeoutRef.current = null;
		}
	}, []);

	// Set a delay before hiding the sidebar
	const scheduleHide = useCallback(() => {
		clearHideTimeout();
		hideTimeoutRef.current = setTimeout(() => {
			if (!isDropdownOpen) {
				setIsHovered(false);
			}
		}, 300); // 300ms delay
	}, [clearHideTimeout, isDropdownOpen]);

	// Handle mouse movement to detect left edge hover
	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			// Show sidebar when mouse is within 50px of left edge
			if (e.clientX <= 50) {
				clearHideTimeout();
				setIsHovered(true);
			} else if (e.clientX > 80) {
				// Schedule hide when mouse moves away from left area
				if (isHovered && !isDropdownOpen) {
					scheduleHide();
				}
			}
		};

		// Only add listener on desktop
		const mediaQuery = window.matchMedia("(min-width: 640px)");
		if (mediaQuery.matches) {
			document.addEventListener("mousemove", handleMouseMove);
		}

		const handleMediaChange = (e: MediaQueryListEvent) => {
			if (e.matches) {
				document.addEventListener("mousemove", handleMouseMove);
			} else {
				document.removeEventListener("mousemove", handleMouseMove);
				clearHideTimeout();
				setIsHovered(false);
			}
		};

		mediaQuery.addEventListener("change", handleMediaChange);

		return () => {
			document.removeEventListener("mousemove", handleMouseMove);
			mediaQuery.removeEventListener("change", handleMediaChange);
			clearHideTimeout();
		};
	}, [isHovered, isDropdownOpen, clearHideTimeout, scheduleHide]);

	// Handle sidebar mouse enter/leave
	const handleSidebarMouseEnter = useCallback(() => {
		clearHideTimeout();
		setIsHovered(true);
	}, [clearHideTimeout]);

	const handleSidebarMouseLeave = useCallback(() => {
		if (!isDropdownOpen) {
			scheduleHide();
		}
	}, [isDropdownOpen, scheduleHide]);

	// Handle dropdown state changes
	const handleDropdownOpenChange = useCallback(
		(open: boolean) => {
			setIsDropdownOpen(open);
			if (!open && !isHovered) {
				scheduleHide();
			} else if (open) {
				clearHideTimeout();
			}
		},
		[isHovered, scheduleHide, clearHideTimeout],
	);

	// Obfuscated email contact handler
	const handleContactClick = () => {
		// Construct email dynamically to avoid scraping
		const user = "nmfurbearr";
		const domain = "gmail.com";
		const email = `${user}@${domain}`;
		const subject = "Checking out your portfolio";
		window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}`;
	};

	return (
		<>
			{/* Floating NF Avatar - Always visible on desktop */}
			<div className="fixed top-3 left-3 z-50 hidden rounded-full border-1 border-primary bg-background sm:block">
				<DropdownMenu onOpenChange={handleDropdownOpenChange}>
					<DropdownMenuTrigger asChild>
						<button
							type="button"
							className="flex h-10 w-10 items-center justify-center rounded-full font-bold text-primary text-sm shadow-lg transition-all hover:scale-105 hover:shadow-xl"
							title="Profile"
						>
							NF
						</button>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						side="right"
						align="start"
						className="z-50 w-56 border-1 border-primary bg-background"
					>
						<DropdownMenuLabel>Nate Furbeyre</DropdownMenuLabel>
						<DropdownMenuSeparator className="bg-primary/20" />
						<DropdownMenuItem
							className="cursor-pointer hover:bg-primary/10"
							onClick={handleContactClick}
						>
							<RiMailLine className="mr-2 h-4 w-4" />
							<span>Contact</span>
						</DropdownMenuItem>
						{/* External Links */}
						<DropdownMenuItem asChild className="hover:bg-primary/10">
							<a
								href="https://github.com/nate-fur"
								target="_blank"
								rel="noopener noreferrer"
								className="flex w-full items-center"
							>
								<RiGithubLine className="mr-2 h-4 w-4" />
								<span>GitHub</span>
							</a>
						</DropdownMenuItem>
						<DropdownMenuItem asChild className="hover:bg-primary/10">
							<a
								href="https://www.linkedin.com/in/nathaniel-furbeyre/"
								target="_blank"
								rel="noopener noreferrer"
								className="flex w-full items-center"
							>
								<RiLinkedinLine className="mr-2 h-4 w-4" />
								<span>LinkedIn</span>
							</a>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>

			{/* Mobile Menu Button */}
			<button
				type="button"
				className="fixed top-4 left-4 z-50 flex h-10 w-10 items-center justify-center border-1 border-primary bg-background text-primary transition-colors hover:opacity-70 sm:hidden"
				onClick={() => setIsOpen(!isOpen)}
			>
				{isOpen ? (
					<RiCloseLine className="h-5 w-5" />
				) : (
					<RiMenuLine className="h-5 w-5" />
				)}
			</button>

			{/* Mobile Overlay */}
			{isOpen && (
				<div
					className="fixed inset-0 z-30 bg-black/50 sm:hidden"
					onClick={() => setIsOpen(false)}
					onKeyDown={(e) => {
						if (e.key === "Escape") {
							setIsOpen(false);
						}
					}}
					role="button"
					tabIndex={0}
					aria-label="Close navigation menu"
				/>
			)}

			{/* Side Navigation - Hidden by default, shows on left edge hover */}
			<div
				className={cn(
					"fixed top-0 left-0 z-30 h-full border-primary border-r-1 bg-background font-semibold transition-all duration-300 ease-in-out",
					// Desktop: hidden by default, shows on hover
					"hidden sm:block sm:w-16",
					isHovered ? "sm:translate-x-0" : "sm:-translate-x-full",
					// Mobile: normal behavior
					isOpen ? "w-64 translate-x-0" : "-translate-x-full w-64",
				)}
				onMouseEnter={handleSidebarMouseEnter}
				onMouseLeave={handleSidebarMouseLeave}
			>
				<div className="flex h-full flex-col overflow-hidden">
					{/* Header - Hidden on desktop since we have floating avatar */}
					<div className="flex h-16 flex-shrink-0 items-center justify-center border-primary border-b-1 px-2 sm:hidden">
						<div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground text-sm">
							NF
						</div>
					</div>

					{/* Spacer */}
					<div className="flex-1" />

					{/* Theme Selector */}
					<div className="flex-shrink-0 border-primary border-t-1 p-2">
						<DropdownMenu onOpenChange={handleDropdownOpenChange}>
							<DropdownMenuTrigger asChild>
								<button
									type="button"
									className="flex w-full items-center justify-center rounded-md px-3 py-3 text-sm transition-colors hover:bg-primary/10 focus:outline-none"
									title="Theme"
								>
									<CurrentThemeIcon className="h-5 w-5" />
								</button>
							</DropdownMenuTrigger>
							<DropdownMenuContent
								side="right"
								align="center"
								className="z-50 w-48 border-1 border-primary"
							>
								<DropdownMenuLabel>Choose Theme</DropdownMenuLabel>
								<DropdownMenuSeparator className="bg-primary/20" />
								{themeOptions.map((themeOption) => (
									<DropdownMenuItem
										key={themeOption.value}
										className={cn(
											"cursor-pointer hover:bg-primary/10",
											theme === themeOption.value && "bg-primary/5",
										)}
										onClick={() => setTheme(themeOption.value)}
									>
										<themeOption.icon className="mr-2 h-4 w-4" />
										<span>{themeOption.name}</span>
										{theme === themeOption.value && (
											<span className="ml-auto text-xs">✓</span>
										)}
									</DropdownMenuItem>
								))}
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>
			</div>
		</>
	);
}
