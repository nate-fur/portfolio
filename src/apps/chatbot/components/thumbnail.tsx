import { motion } from "framer-motion";
import { Bot, MessageCircle, Sparkles } from "lucide-react";
import type { AppThumbnailProps } from "~/apps/types";
import { cn } from "~/lib/utils";

export const ChatbotThumbnail = ({ size = "medium" }: AppThumbnailProps) => {
	return (
		<motion.div
			className="relative flex h-full flex-col items-center justify-center p-2"
			layout
		>
			{/* Animated background elements */}
			<motion.div
				className="absolute inset-0 overflow-hidden"
				initial={false}
				animate={{
					background: [
						"radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
						"radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
						"radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
					],
				}}
				transition={{
					duration: 4,
					repeat: Number.POSITIVE_INFINITY,
					ease: "linear",
				}}
			/>

			<motion.div
				className="relative flex h-16 w-16 items-center justify-center"
				layout
				transition={{ layout: { duration: 0.4 } }}
			>
				<motion.div layout className="relative">
					<Bot className="h-8 w-8 text-blue-400" />

					{/* Floating icons for visual appeal */}
					<motion.div
						className="-top-2 -right-2 absolute"
						animate={{
							y: [-2, 2, -2],
							opacity: [0.6, 1, 0.6],
						}}
						transition={{
							duration: 2,
							repeat: Number.POSITIVE_INFINITY,
							ease: "easeInOut",
						}}
					>
						<MessageCircle className="h-3 w-3 text-blue-300" />
					</motion.div>

					<motion.div
						className="-bottom-1 -left-2 absolute"
						animate={{
							y: [2, -2, 2],
							opacity: [0.4, 0.8, 0.4],
						}}
						transition={{
							duration: 3,
							repeat: Number.POSITIVE_INFINITY,
							ease: "easeInOut",
							delay: 1,
						}}
					>
						<Sparkles className="h-3 w-3 text-blue-200" />
					</motion.div>
				</motion.div>
			</motion.div>

			<motion.span
				className="mt-2 text-center font-medium text-primary"
				layout
				transition={{ layout: { duration: 0.4 } }}
			>
				AI Assistant
			</motion.span>
		</motion.div>
	);
};
