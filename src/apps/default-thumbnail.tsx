import { motion } from "framer-motion";
import { cn } from "~/lib/utils";
import type { DefaultThumbnailProps } from "./types";

export const DefaultThumbnail = ({
	name,
	icon: Icon,
	size = "medium",
}: DefaultThumbnailProps) => {
	return (
		<motion.div
			className="relative flex h-full flex-col items-center justify-center p-2"
			layout
		>
			<motion.div
				className="flex h-16 w-16 items-center justify-center"
				layout
				transition={{ layout: { duration: 0.4 } }}
			>
				<motion.div layout>
					<Icon className="h-8 w-8 text-primary" />
				</motion.div>
			</motion.div>

			<motion.span
				className="mt-2 text-center font-medium text-primary"
				layout
				transition={{ layout: { duration: 0.4 } }}
			>
				{name}
			</motion.span>
		</motion.div>
	);
};
