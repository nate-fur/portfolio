import { motion } from "framer-motion";
import { Music, Play, Volume2 } from "lucide-react";
import type { AppThumbnailProps } from "~/apps/types";
import { cn } from "~/lib/utils";

export const SpotifyThumbnail = ({ size = "medium" }: AppThumbnailProps) => {
	return (
		<motion.div
			className="relative flex h-full flex-col items-center justify-center p-2"
			layout
		>
			{/* Spotify-inspired background gradient */}
			<motion.div
				className="absolute inset-0 overflow-hidden"
				initial={false}
				animate={{
					background: [
						"linear-gradient(135deg, rgba(29, 185, 84, 0.1) 0%, rgba(29, 185, 84, 0.05) 50%, transparent 100%)",
						"linear-gradient(135deg, rgba(29, 185, 84, 0.15) 0%, rgba(29, 185, 84, 0.08) 50%, transparent 100%)",
						"linear-gradient(135deg, rgba(29, 185, 84, 0.1) 0%, rgba(29, 185, 84, 0.05) 50%, transparent 100%)",
					],
				}}
				transition={{
					duration: 3,
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
					<Music className="h-8 w-8 text-green-400" />

					{/* Floating music-related icons */}
					<motion.div
						className="-top-2 -right-2 absolute"
						animate={{
							scale: [0.8, 1.2, 0.8],
							opacity: [0.6, 1, 0.6],
						}}
						transition={{
							duration: 2.5,
							repeat: Number.POSITIVE_INFINITY,
							ease: "easeInOut",
						}}
					>
						<Play className="h-3 w-3 fill-current text-green-300" />
					</motion.div>

					<motion.div
						className="-bottom-1 -left-2 absolute"
						animate={{
							x: [-1, 1, -1],
							y: [1, -1, 1],
							opacity: [0.4, 0.8, 0.4],
						}}
						transition={{
							duration: 3.5,
							repeat: Number.POSITIVE_INFINITY,
							ease: "easeInOut",
							delay: 0.5,
						}}
					>
						<Volume2 className="h-3 w-3 text-green-200" />
					</motion.div>
				</motion.div>
			</motion.div>

			<motion.span
				className="mt-2 text-center font-medium text-primary"
				layout
				transition={{ layout: { duration: 0.4 } }}
			>
				Spotify
			</motion.span>
		</motion.div>
	);
};
