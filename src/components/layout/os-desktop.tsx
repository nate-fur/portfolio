"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
	Bot,
	Code,
	FileText,
	Gamepad2,
	Github,
	Layers,
	Link,
	Music,
	Palette,
	Search,
	TrendingUp,
	Twitter,
	Video,
	Wrench,
} from "lucide-react";
import { useState } from "react";
import { getAppContent } from "~/apps/app-content-registry";
import { AppContainer } from "../ui/app-container";

interface App {
	id: string;
	name: string;
	icon: typeof Code;
	size: "small" | "medium" | "large";
}

const apps: App[] = [
	// Column 1: starts large → small → medium → large...
	{
		id: "chatbot",
		name: "AI Assistant",
		icon: Bot,
		size: "large",
	},
	{
		id: "snake",
		name: "Snake",
		icon: Gamepad2,
		size: "small",
	},
	{
		id: "tech-stack",
		name: "Tech Stack",
		icon: Layers,
		size: "medium",
	},
	{
		id: "spotify",
		name: "Spotify",
		icon: Music,
		size: "large",
	},
	// Column 2: starts small → medium → large → small...
	{
		id: "video-playlist",
		name: "Videos",
		icon: Video,
		size: "small",
	},
	{
		id: "minesweeper",
		name: "Minesweeper",
		icon: Gamepad2,
		size: "medium",
	},
	{
		id: "blog",
		name: "Blog",
		icon: FileText,
		size: "large",
	},
	{
		id: "twitter-feed",
		name: "X Feed",
		icon: Twitter,
		size: "small",
	},
	// Column 3: starts medium → large → small → medium...
	{
		id: "code-inspector",
		name: "Code Inspector",
		icon: Code,
		size: "medium",
	},
	{
		id: "github-analyzer",
		name: "GitHub Analyzer",
		icon: Github,
		size: "large",
	},
	{
		id: "mcp-tool",
		name: "MCP Tool",
		icon: Wrench,
		size: "small",
	},
	{
		id: "theme-customizer",
		name: "Theme Customizer",
		icon: Palette,
		size: "medium",
	},
	{
		id: "url-shortener",
		name: "URL Shortener",
		icon: Link,
		size: "medium",
	},
	{
		id: "stock-simulator",
		name: "Stock Simulator",
		icon: TrendingUp,
		size: "medium",
	},
];

const getSizeClasses = (size: App["size"], isExpanded: boolean) => {
	if (isExpanded) {
		// Expanded apps take up more space in the grid flow instead of overlaying
		return "col-span-4 row-span-6 sm:col-span-4 sm:row-span-6 lg:col-span-6 lg:row-span-6";
	}

	switch (size) {
		case "small":
			return "col-span-2 row-span-2";
		case "medium":
			return "col-span-2 row-span-3";
		case "large":
			return "col-span-2 row-span-4";
		default:
			return "col-span-2 row-span-2";
	}
};

export const OSDesktop = () => {
	const [expandedApp, setExpandedApp] = useState<string | null>(null);

	const handleAppClick = (appId: string) => {
		if (expandedApp === appId) {
			setExpandedApp(null);
		} else {
			setExpandedApp(appId);
		}
	};

	return (
		<div className="relative min-h-screen overflow-hidden">
			{/* Home indicator (iPhone style) */}

			{/* App Grid */}
			<div className="flex min-h-screen items-center justify-center p-4 sm:p-6 lg:p-8">
				<motion.div
					className="grid w-full max-w-sm auto-rows-[48px] grid-cols-4 gap-2 sm:max-w-2xl sm:auto-rows-[56px] sm:grid-cols-5 sm:gap-3 lg:max-w-4xl lg:auto-rows-[64px] lg:grid-cols-6 lg:gap-4 xl:max-w-5xl"
					style={{
						gridAutoFlow: "dense",
					}}
					layout
				>
					{apps.map((app) => {
						const isExpanded = expandedApp === app.id;
						return (
							<motion.div
								key={app.id}
								className={getSizeClasses(app.size, isExpanded)}
								layout
							>
								<AppContainer
									icon={app.icon}
									name={app.name}
									onClick={() => handleAppClick(app.id)}
									isExpanded={isExpanded}
									size={app.size}
								>
									{isExpanded && getAppContent(app.id)}
								</AppContainer>
							</motion.div>
						);
					})}
				</motion.div>
			</div>
		</div>
	);
};
