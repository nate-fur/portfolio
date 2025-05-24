"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export const Row = () => {
	const [growVals, setGrowVals] = useState([1, 1, 1, 1]);
	const [opacityVals, setOpacityVals] = useState([1, 1, 1, 1]);

	const handleGrow = (index: number) => {
		// Check if the clicked box is the only one expanded
		const isOnlyExpanded =
			growVals[index] === 1 && growVals.filter((v) => v === 1).length === 1;
		if (isOnlyExpanded) {
			setGrowVals([1, 1, 1, 1]);
		} else {
			const newGrowVals = [0, 0, 0, 0];
			newGrowVals[index] = 1;
			setGrowVals(newGrowVals);
		}
	};

	// Determine if only one box is expanded
	const expandedCount = growVals.filter((v) => v === 1).length;
	const marginRight = expandedCount === 1 ? 0 : 16; // 16px = gap-4 in Tailwind

	return (
		<motion.div className="flex flex-row justify-between">
			{growVals.map((grow, index) => {
				const isExpanded = grow === 1;
				const isLastItem = index === growVals.length - 1;

				return (
					<motion.div
						key={`${
							// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
							index
						}-`}
						className="flex-grow"
						initial={{
							flexGrow: 1,
							flexBasis: "25%",
							maxWidth: "25%",
							opacity: 1,
							marginRight: isLastItem ? 0 : 16,
						}}
						animate={{
							flexGrow: isExpanded ? 1 : 0,
							flexBasis: isExpanded ? "auto" : 0,
							maxWidth: isExpanded ? "100%" : 0,
							opacity: isExpanded ? 1 : 0,
							marginRight: isLastItem ? 0 : marginRight,
						}}
						transition={{ delay: 0, duration: 0.7 }}
						style={{ overflow: "hidden" }}
					>
						{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
						<div
							onClick={() => handleGrow(index)}
							role="button"
							tabIndex={0}
							className="aspect-square flex-grow cursor-pointer border-1 border-primary"
						/>
					</motion.div>
				);
			})}
		</motion.div>
	);
};
