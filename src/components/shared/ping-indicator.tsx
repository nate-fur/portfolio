import { motion } from "framer-motion";
import { cn } from "~/lib/utils";

export interface PingIndicatorProps {
	/** Custom className for styling */
	className?: string;
	/** Color variant (default: 'primary') */
	variant?: "primary" | "secondary" | "accent" | "destructive";
	/** Animation duration in seconds (default: 2) */
	duration?: number;
	/** Whether the indicator is visible (default: true) */
	visible?: boolean;
}

const variantClasses = {
	primary: "bg-primary",
	secondary: "bg-secondary",
	accent: "bg-accent",
	destructive: "bg-destructive",
};

export const PingIndicator = ({
	className,
	variant = "primary",
	duration = 2,
	visible = true,
}: PingIndicatorProps) => {
	if (!visible) return null;

	return (
		<motion.div
			className={cn("relative", className)}
			animate={{
				scale: [1, 1.2, 1],
				opacity: [1, 0.7, 1],
			}}
			transition={{
				duration,
				repeat: Number.POSITIVE_INFINITY,
				ease: "easeInOut",
			}}
		>
			<div className="relative">
				<div
					className={cn(
						"absolute inset-0 animate-ping rounded-full",
						variantClasses[variant],
					)}
				/>
				<div
					className={cn("relative rounded-full p-1", variantClasses[variant])}
				/>
			</div>
		</motion.div>
	);
};
