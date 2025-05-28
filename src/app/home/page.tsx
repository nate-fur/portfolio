"use client";

import { ArrowDown } from "lucide-react";
import type { NextPage } from "next";
import { AppsGallery } from "../../components/layout/apps-gallery";

const Home: NextPage = () => {
	const smoothScrollToAppsGallery = () => {
		const appsGalleryElement = document.getElementById("apps-gallery");
		if (!appsGalleryElement) return;

		const startPosition = window.pageYOffset;
		const targetPosition = appsGalleryElement.offsetTop - 56; // Offset for navbar and some padding
		const distance = targetPosition - startPosition;
		const duration = 1800; // 1.8 seconds for a more leisurely feel
		let startTime: number | null = null;

		// Easing function - easeOutQuart for faster start and slower end
		const easeOutQuart = (t: number): number => {
			return 1 - (1 - t) ** 5;
		};

		const animation = (currentTime: number) => {
			if (startTime === null) startTime = currentTime;
			const timeElapsed = currentTime - startTime;
			const progress = Math.min(timeElapsed / duration, 1);

			const easedProgress = easeOutQuart(progress);
			const currentPosition = startPosition + distance * easedProgress;

			window.scrollTo(0, currentPosition);

			if (progress < 1) {
				requestAnimationFrame(animation);
			}
		};

		requestAnimationFrame(animation);
	};

	return (
		<div className="flex min-h-screen flex-col items-center justify-start">
			{/* Hero Section */}
			<div className="flex min-h-screen flex-col items-center justify-center px-4 py-8">
				{/* Hero Image */}
				<div className="mb-8 flex items-center justify-center">
					<div
						className="h-[400px] w-[400px]"
						style={{
							backgroundColor: "var(--color-primary)",
							WebkitMask: "url(/hero-clipart.svg) no-repeat center/contain",
							mask: "url(/hero-clipart.svg) no-repeat center/contain",
						}}
					/>
				</div>

				{/* Hero Title */}
				<h1 className="text-center font-extrabold text-2xl text-primary tracking-tight sm:text-4xl">
					Full stack web developer, <br /> experienced with AI & web3
				</h1>

				{/* Show More Button */}
				<button
					type="button"
					onClick={smoothScrollToAppsGallery}
					className="mt-12 flex cursor-pointer items-center gap-2 border-1 border-primary px-3 py-2 font-extrabold text-primary text-xl transition-opacity hover:opacity-70"
				>
					Show me more <ArrowDown className="h-5 w-5" />
				</button>
			</div>

			{/* Apps Gallery Section */}
			<div id="apps-gallery" className="w-full border-primary ">
				<AppsGallery />
			</div>
		</div>
	);
};

export default Home;
