"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { getAllApps } from "~/apps";
import type { App } from "~/apps/types";
import { AppContainer } from "./app-container";

const getSizeClasses = (size: App["size"], isExpanded = false) => {
	if (isExpanded) {
		// Expanded apps take up more space in the grid flow with natural height
		return "col-span-4 sm:col-span-4 lg:col-span-6";
	}

	switch (size) {
		case "small":
			return "col-span-2 row-span-2 min-h-[96px] sm:min-h-[112px] lg:min-h-[128px]";
		case "medium":
			return "col-span-2 row-span-3 min-h-[144px] sm:min-h-[168px] lg:min-h-[192px]";
		case "large":
			return "col-span-2 row-span-4 min-h-[192px] sm:min-h-[224px] lg:min-h-[256px]";
		default:
			return "col-span-2 row-span-2 min-h-[96px] sm:min-h-[112px] lg:min-h-[128px]";
	}
};

export const AppsGallery = () => {
	const apps = getAllApps();
	const [expandedApps, setExpandedApps] = useState<Set<string>>(new Set());

	const handleExpansionChange = (appId: string, isExpanded: boolean) => {
		setExpandedApps((prev) => {
			const newSet = new Set(prev);
			if (isExpanded) {
				newSet.add(appId);
			} else {
				newSet.delete(appId);
			}
			return newSet;
		});
	};

	return (
		<div className="relative min-h-screen overflow-hidden">
			{/* App Grid */}
			<div className="flex min-h-screen items-center justify-center p-4 sm:p-6 lg:p-8">
				<motion.div
					className="grid w-full max-w-sm auto-rows-min grid-cols-4 gap-2 sm:max-w-2xl sm:auto-rows-min sm:grid-cols-5 sm:gap-3 lg:max-w-4xl lg:auto-rows-min lg:grid-cols-6 lg:gap-4 xl:max-w-5xl"
					style={{
						gridAutoFlow: "dense",
					}}
					layout
				>
					{apps.map((app) => {
						const isExpanded = expandedApps.has(app.id);
						return (
							<motion.div
								key={app.id}
								className={getSizeClasses(app.size, isExpanded)}
								layout
							>
								<AppContainer
									app={app}
									size={app.size}
									onExpansionChange={(expanded: boolean) =>
										handleExpansionChange(app.id, expanded)
									}
								/>
							</motion.div>
						);
					})}
				</motion.div>
			</div>
		</div>
	);
};
