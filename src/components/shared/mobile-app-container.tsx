import { motion } from "framer-motion";
import { useState } from "react";
import type { App } from "~/apps/types";
import { cn } from "~/lib/utils";
import { AppModal } from "./app-modal";

interface MobileAppContainerProps {
	app: App;
	size: "small" | "medium" | "large";
}

export const MobileAppContainer = ({ app, size }: MobileAppContainerProps) => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleAppClick = () => {
		setIsModalOpen(true);
	};

	const handleModalClose = (open: boolean) => {
		setIsModalOpen(open);
	};

	return (
		<>
			<motion.button
				className="relative h-full w-full cursor-pointer overflow-hidden border-1 border-primary bg-primary/10 hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-primary"
				onClick={handleAppClick}
				whileHover={{ scale: 1.02 }}
				whileTap={{ scale: 0.98 }}
				type="button"
				aria-label={`Open ${app.name} app`}
			>
				<div className="relative flex h-full flex-col items-stretch justify-center">
					{/* Render the app's thumbnail component */}
					{app.thumbnailComponent({ size })}
				</div>
			</motion.button>

			{/* Modal for app content */}
			<AppModal
				app={app}
				isOpen={isModalOpen}
				onOpenChange={handleModalClose}
			/>
		</>
	);
};
