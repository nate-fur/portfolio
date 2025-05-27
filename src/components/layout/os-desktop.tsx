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
	Search,
	TrendingUp,
	Twitter,
	Video,
	Wrench,
} from "lucide-react";
import { useState } from "react";
import { AppIcon } from "../ui/app-icon";

interface App {
	id: string;
	name: string;
	icon: typeof Code;
	gradient: string;
	size: "small" | "medium" | "large";
}

const apps: App[] = [
	// Column 1: starts large → small → medium → large...
	{
		id: "chatbot",
		name: "AI Assistant",
		icon: Bot,
		gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
		size: "large",
	},
	{
		id: "snake",
		name: "Snake",
		icon: Gamepad2,
		gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
		size: "small",
	},
	{
		id: "tech-stack",
		name: "Tech Stack",
		icon: Layers,
		gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
		size: "medium",
	},
	{
		id: "spotify",
		name: "Spotify",
		icon: Music,
		gradient: "linear-gradient(135deg, #1db954 0%, #1ed760 100%)",
		size: "large",
	},
	// Column 2: starts small → medium → large → small...
	{
		id: "video-playlist",
		name: "Videos",
		icon: Video,
		gradient: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
		size: "small",
	},
	{
		id: "minesweeper",
		name: "Minesweeper",
		icon: Gamepad2,
		gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
		size: "medium",
	},
	{
		id: "blog",
		name: "Blog",
		icon: FileText,
		gradient: "linear-gradient(135deg, #a8caba 0%, #5d4e75 100%)",
		size: "large",
	},
	{
		id: "twitter-feed",
		name: "X Feed",
		icon: Twitter,
		gradient: "linear-gradient(135deg, #1da1f2 0%, #0d8bd9 100%)",
		size: "small",
	},
	// Column 3: starts medium → large → small → medium...
	{
		id: "code-inspector",
		name: "Code Inspector",
		icon: Code,
		gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
		size: "medium",
	},
	{
		id: "github-analyzer",
		name: "GitHub Analyzer",
		icon: Github,
		gradient: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
		size: "large",
	},
	{
		id: "mcp-tool",
		name: "MCP Tool",
		icon: Wrench,
		gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
		size: "small",
	},
	{
		id: "url-shortener",
		name: "URL Shortener",
		icon: Link,
		gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
		size: "medium",
	},
	{
		id: "stock-simulator",
		name: "Stock Simulator",
		icon: TrendingUp,
		gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
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
		<div className="relative min-h-screen overflow-hidden bg-base">
			{/* Home indicator (iPhone style) */}
			<div className="-translate-x-1/2 absolute bottom-2 left-1/2 z-30 h-1 w-32 transform rounded-full bg-white/30" />

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
								<AppIcon
									icon={app.icon}
									name={app.name}
									gradient={app.gradient}
									onClick={() => handleAppClick(app.id)}
									isExpanded={isExpanded}
									size={app.size}
								/>
							</motion.div>
						);
					})}
				</motion.div>
			</div>
		</div>
	);
};
