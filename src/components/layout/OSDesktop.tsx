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
} from "lucide-react";
import { useState } from "react";
import { AppIcon } from "../ui/AppIcon";

interface App {
	id: string;
	name: string;
	icon: typeof Code;
	gradient: string;
}

const apps: App[] = [
	{
		id: "code",
		name: "Code",
		icon: Code,
		gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
	},
	{
		id: "design",
		name: "Design",
		icon: Palette,
		gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
	},
	{
		id: "music",
		name: "Music",
		icon: Music,
		gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
	},
	{
		id: "camera",
		name: "Camera",
		icon: Camera,
		gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
	},
	{
		id: "mail",
		name: "Mail",
		icon: Mail,
		gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
	},
	{
		id: "calculator",
		name: "Calculator",
		icon: Calculator,
		gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
	},
	{
		id: "maps",
		name: "Maps",
		icon: MapIcon,
		gradient: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
	},
	{
		id: "settings",
		name: "Settings",
		icon: Settings,
		gradient: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
	},
	{
		id: "notes",
		name: "Notes",
		icon: FileText,
		gradient: "linear-gradient(135deg, #a8caba 0%, #5d4e75 100%)",
	},
];

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
			{/* Dynamic background blur when app is expanded */}
			<AnimatePresence>
				{expandedApp && (
					<motion.div
						className="absolute inset-0 z-40 bg-black/20 backdrop-blur-sm"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={() => setExpandedApp(null)}
					/>
				)}
			</AnimatePresence>

			{/* Home indicator (iPhone style) */}
			<div className="-translate-x-1/2 absolute bottom-2 left-1/2 z-30 h-1 w-32 transform rounded-full bg-white/30" />

			{/* App Grid */}
			<div className="flex min-h-screen items-center justify-center p-8">
				<motion.div className="grid w-full max-w-sm grid-cols-3 gap-6" layout>
					{apps.map((app) => (
						<div key={app.id} className="relative">
							{expandedApp !== app.id && (
								<AppIcon
									icon={app.icon}
									name={app.name}
									gradient={app.gradient}
									onClick={() => handleAppClick(app.id)}
									isExpanded={false}
								/>
							)}
						</div>
					))}
				</motion.div>
			</div>

			{/* Expanded App */}
			<AnimatePresence>
				{expandedApp &&
					(() => {
						const app = apps.find((app) => app.id === expandedApp);
						if (!app) return null;
						return (
							<AppIcon
								icon={app.icon}
								name={app.name}
								gradient={app.gradient}
								onClick={() => handleAppClick(expandedApp)}
								isExpanded={true}
							/>
						);
					})()}
			</AnimatePresence>
		</div>
	);
};
