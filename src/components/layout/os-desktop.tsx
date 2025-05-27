"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
	Calculator,
	Camera,
	Code,
	FileText,
	Mail,
	Map as MapIcon,
	Music,
	Palette,
	Settings,
	Terminal,
} from "lucide-react";
import { useState } from "react";
import { AppIcon } from "../ui/app-icon";

interface App {
	id: string;
	name: string;
	icon: typeof Code;
	gradient: string;
	size: "small" | "medium" | "large" | "wide" | "tall" | "fill";
}

const apps: App[] = [
	{
		id: "code",
		name: "Code",
		icon: Code,
		gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
		size: "large",
	},
	{
		id: "design",
		name: "Design",
		icon: Palette,
		gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
		size: "medium",
	},
	{
		id: "terminal",
		name: "Terminal",
		icon: Terminal,
		gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
		size: "tall",
	},
	{
		id: "music",
		name: "Music",
		icon: Music,
		gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
		size: "wide",
	},
	{
		id: "camera",
		name: "Camera",
		icon: Camera,
		gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
		size: "medium",
	},
	{
		id: "mail",
		name: "Mail",
		icon: Mail,
		gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
		size: "tall",
	},
	{
		id: "calculator",
		name: "Calculator",
		icon: Calculator,
		gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
		size: "small",
	},
	{
		id: "maps",
		name: "Maps",
		icon: MapIcon,
		gradient: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
		size: "fill",
	},
	{
		id: "settings",
		name: "Settings",
		icon: Settings,
		gradient: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
		size: "small",
	},
	{
		id: "notes",
		name: "Notes",
		icon: FileText,
		gradient: "linear-gradient(135deg, #a8caba 0%, #5d4e75 100%)",
		size: "wide",
	},
];

const getSizeClasses = (size: App["size"], isExpanded: boolean) => {
	if (isExpanded) return "col-span-full row-span-full";

	switch (size) {
		case "small":
			return "col-span-1 row-span-2";
		case "medium":
			return "col-span-2 row-span-3";
		case "large":
			return "col-span-3 row-span-4";
		case "wide":
			return "col-span-3 row-span-2";
		case "tall":
			return "col-span-1 row-span-3";
		case "fill":
			return "col-span-2 row-span-4";
		default:
			return "col-span-1 row-span-2";
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
			<div className="flex min-h-screen items-start justify-center p-8 pt-16">
				<motion.div
					className="grid w-full max-w-4xl auto-rows-[64px] gap-4"
					style={{
						gridTemplateColumns: "repeat(6, 1fr)",
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
								style={{
									zIndex: isExpanded ? 50 : 1,
								}}
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
