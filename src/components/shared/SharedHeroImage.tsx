"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface ImageConfig {
	src: string;
	alt: string;
	className?: string;
}

const imageConfigs: Record<string, ImageConfig> = {
	"/": {
		src: "/hero-clipart.svg",
		alt: "Hero",
		className: "h-[400px] w-[400px]",
	},
	"/projects": {
		src: "/hero-clipart.svg",
		alt: "Profile",
		className: "h-[400px] w-[400px]",
	},
	"/about": {
		src: "/profile.svg",
		alt: "Profile",
		className: "-mt-4 mb-4 h-[400px] w-[400px] pb-6",
	},
};

const defaultConfig: ImageConfig = {
	src: "/hero-clipart.svg",
	alt: "Hero",
	className: "h-[400px] w-[400px]",
};

export const SharedHeroImage = () => {
	const pathname = usePathname();

	// Get the correct initial config based on the current pathname
	const getInitialConfig = () => {
		return imageConfigs[pathname] || defaultConfig;
	};

	const [currentConfig, setCurrentConfig] =
		useState<ImageConfig>(getInitialConfig);
	const [isVisible, setIsVisible] = useState(true);

	useEffect(() => {
		const newConfig = imageConfigs[pathname] || defaultConfig;

		if (newConfig.src !== currentConfig.src) {
			// Fade out
			setIsVisible(false);

			// After fade out completes, change image and fade in
			setTimeout(() => {
				setCurrentConfig(newConfig);
				setIsVisible(true);
			}, 300);
		} else {
			// Same image, just update className if needed
			setCurrentConfig(newConfig);
		}
	}, [pathname, currentConfig.src]);

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: isVisible ? 1 : 0 }}
			transition={{ duration: 0.3, ease: "easeInOut" }}
			className={`flex items-center justify-center ${currentConfig.className}`}
		>
			<Image
				src={currentConfig.src}
				alt={currentConfig.alt}
				width={400}
				height={420}
				className="h-full w-full object-contain"
			/>
		</motion.div>
	);
};
