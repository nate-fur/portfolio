import { motion } from "framer-motion";
import { Gamepad2, Target, Zap } from "lucide-react";
import type { AppThumbnailProps } from "~/apps/types";
import { cn } from "~/lib/utils";

export const SnakeGameThumbnail = ({ size = "medium" }: AppThumbnailProps) => {
	return (
		<motion.div
			className="relative flex h-full flex-col items-center justify-center p-2"
			layout
		>
			{/* Snake trail effect */}
			<motion.div className="absolute inset-0 overflow-hidden">
				{/* Moving snake segments */}
				<motion.div
					className="absolute h-2 w-2 rounded-sm bg-green-400/30"
					animate={{
						x: [10, 30, 50, 30, 10],
						y: [10, 15, 25, 35, 25],
					}}
					transition={{
						duration: 3,
						repeat: Number.POSITIVE_INFINITY,
						ease: "linear",
					}}
				/>
				<motion.div
					className="absolute h-2 w-2 rounded-sm bg-green-400/20"
					animate={{
						x: [8, 28, 48, 28, 8],
						y: [12, 17, 27, 37, 27],
					}}
					transition={{
						duration: 3,
						repeat: Number.POSITIVE_INFINITY,
						ease: "linear",
						delay: 0.1,
					}}
				/>
				<motion.div
					className="absolute h-2 w-2 rounded-sm bg-green-400/10"
					animate={{
						x: [6, 26, 46, 26, 6],
						y: [14, 19, 29, 39, 29],
					}}
					transition={{
						duration: 3,
						repeat: Number.POSITIVE_INFINITY,
						ease: "linear",
						delay: 0.2,
					}}
				/>
			</motion.div>
			<motion.div
				className="relative flex h-16 w-16 items-center justify-center"
				layout
				transition={{ layout: { duration: 0.4 } }}
			>
				<motion.div layout className="relative">
					<Gamepad2 className="h-8 w-8 text-green-400" />

					{/* Floating game elements */}
					<motion.div
						className="-top-2 -right-2 absolute"
						animate={{
							scale: [0.8, 1.3, 0.8],
							opacity: [0.5, 1, 0.5],
						}}
						transition={{
							duration: 2,
							repeat: Number.POSITIVE_INFINITY,
							ease: "easeInOut",
						}}
					>
						<Zap className="h-3 w-3 fill-current text-yellow-300" />
					</motion.div>

					<motion.div
						className="-bottom-1 -left-2 absolute"
						animate={{
							rotate: [0, 360],
							opacity: [0.4, 0.8, 0.4],
						}}
						transition={{
							duration: 4,
							repeat: Number.POSITIVE_INFINITY,
							ease: "linear",
						}}
					>
						<Target className="h-3 w-3 text-red-300" />
					</motion.div>
				</motion.div>
			</motion.div>
			<motion.span
				className="mt-2 text-center font-medium text-primary"
				layout
				transition={{ layout: { duration: 0.4 } }}
			>
				Snake
			</motion.span>
		</motion.div>
	);
};
