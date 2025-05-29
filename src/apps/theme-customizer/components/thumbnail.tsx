import { motion } from "framer-motion";
import { Brush, Palette, Pipette } from "lucide-react";
import type { AppThumbnailProps } from "~/apps/types";
import { cn } from "~/lib/utils";

export const ThemeCustomizerThumbnail = ({
	size = "medium",
}: AppThumbnailProps) => {
	return (
		<motion.div
			className="relative flex h-full flex-col items-center justify-center p-2"
			layout
		>
			{/* Color-changing background */}
			<motion.div
				className="absolute inset-0 overflow-hidden"
				initial={false}
				animate={{
					background: [
						"radial-gradient(circle at 30% 30%, rgba(168, 85, 247, 0.1) 0%, transparent 60%)",
						"radial-gradient(circle at 70% 70%, rgba(244, 63, 94, 0.1) 0%, transparent 60%)",
						"radial-gradient(circle at 50% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 60%)",
						"radial-gradient(circle at 20% 80%, rgba(34, 197, 94, 0.1) 0%, transparent 60%)",
					],
				}}
				transition={{
					duration: 4,
					repeat: Number.POSITIVE_INFINITY,
					ease: "easeInOut",
				}}
			/>

			<motion.div
				className="relative flex h-16 w-16 items-center justify-center"
				layout
				transition={{ layout: { duration: 0.4 } }}
			>
				<motion.div layout className="relative">
					<Palette className="h-8 w-8 text-purple-400" />

					{/* Floating design tools */}
					<motion.div
						className="-top-2 -right-2 absolute"
						animate={{
							rotate: [0, 15, -15, 0],
							opacity: [0.6, 1, 0.6],
						}}
						transition={{
							duration: 3,
							repeat: Number.POSITIVE_INFINITY,
							ease: "easeInOut",
						}}
					>
						<Brush className="h-3 w-3 text-pink-300" />
					</motion.div>

					<motion.div
						className="-bottom-1 -left-2 absolute"
						animate={{
							scale: [0.8, 1.1, 0.8],
							opacity: [0.4, 0.9, 0.4],
						}}
						transition={{
							duration: 2.5,
							repeat: Number.POSITIVE_INFINITY,
							ease: "easeInOut",
							delay: 1.2,
						}}
					>
						<Pipette className="h-3 w-3 text-blue-300" />
					</motion.div>
				</motion.div>
			</motion.div>

			<motion.span
				className="mt-2 text-center font-medium text-primary"
				layout
				transition={{ layout: { duration: 0.4 } }}
			>
				Theme Customizer
			</motion.span>
		</motion.div>
	);
};
