import { motion } from "framer-motion";
import { RiGamepadLine } from "react-icons/ri";
import { BaseThumbnail } from "~/apps/base-thumbnail";
import type { AppThumbnailProps } from "~/apps/types";

export const MinesweeperThumbnail = (props: AppThumbnailProps) => {
	return (
		<div className="relative">
			<BaseThumbnail
				name="Minesweeper"
				icon={RiGamepadLine}
				className="bg-gradient-to-br from-yellow-500/20 to-orange-600/20"
				{...props}
			/>
			{/* Pinging indicator */}
			<motion.div
				className="-top-10 absolute right-1.5 z-30"
				animate={{
					scale: [1, 1.2, 1],
					opacity: [1, 0.7, 1],
				}}
				transition={{
					duration: 2,
					repeat: Number.POSITIVE_INFINITY,
					ease: "easeInOut",
				}}
			>
				<div className="relative">
					<div className="absolute inset-0 animate-ping rounded-full bg-primary" />
					<div className="relative rounded-full bg-primary p-1" />
				</div>
			</motion.div>
		</div>
	);
};
