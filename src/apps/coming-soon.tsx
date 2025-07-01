import { motion } from "framer-motion";
import { RiTimeLine } from "react-icons/ri";
import { cn } from "~/lib/utils";

interface ComingSoonProps {
	appName: string;
	className?: string;
}

export const ComingSoon = ({ appName, className }: ComingSoonProps) => {
	return (
		<motion.div
			className={cn(
				"flex min-h-64 flex-col items-center justify-center rounded-lg border bg-card p-6 text-center",
				className,
			)}
			initial={{ opacity: 0, scale: 0.95 }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{ duration: 0.3, ease: "easeOut" }}
		>
			{/* Icon */}
			<motion.div
				className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10"
				initial={{ scale: 0 }}
				animate={{ scale: 1 }}
				transition={{ delay: 0.1, duration: 0.3, ease: "easeOut" }}
			>
				<RiTimeLine className="h-8 w-8 text-primary" />
			</motion.div>

			{/* Title */}
			<motion.h2
				className="mb-2 font-semibold text-foreground text-xl"
				initial={{ y: 20, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ delay: 0.2, duration: 0.3, ease: "easeOut" }}
			>
				Coming Soon!
			</motion.h2>

			{/* Description */}
			<motion.p
				className="mb-6 max-w-md text-muted-foreground text-sm leading-relaxed"
				initial={{ y: 20, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ delay: 0.3, duration: 0.3, ease: "easeOut" }}
			>
				The {appName} application is currently under development. Check back
				soon for an amazing new experience!
			</motion.p>

			{/* Progress indicator */}
			<motion.div
				className="w-full max-w-xs"
				initial={{ y: 20, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ delay: 0.4, duration: 0.3, ease: "easeOut" }}
			>
				<div className="mb-2 flex items-center justify-between text-muted-foreground text-xs">
					<span>Development Progress</span>
					<span>25%</span>
				</div>
				<div className="h-2 w-full rounded-full bg-muted">
					<motion.div
						className="h-full rounded-full bg-primary"
						initial={{ width: 0 }}
						animate={{ width: "25%" }}
						transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
					/>
				</div>
			</motion.div>
		</motion.div>
	);
};
