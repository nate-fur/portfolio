"use client";

import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { RiArrowDownLine, RiArrowUpLine } from "react-icons/ri";
import { AppsGallery } from "../components/shared/app-gallery";

const Home: NextPage = () => {
	const [isScrolledToGallery, setIsScrolledToGallery] = useState(false);
	const [heroOpacity, setHeroOpacity] = useState(0);
	const [hasMounted, setHasMounted] = useState(false);

	// Monitor scroll position to manage button visibility and hero opacity
	useEffect(() => {
		const handleScroll = () => {
			const appsGalleryElement = document.getElementById("apps-gallery");
			if (!appsGalleryElement) return;

			const scrollPosition = window.pageYOffset;
			const galleryTop = appsGalleryElement.offsetTop;
			const threshold = galleryTop - window.innerHeight * 0.8; // Trigger earlier - when 80% of viewport away

			// Binary state for button visibility (instant)
			setIsScrolledToGallery(scrollPosition > threshold);

			// Calculate scroll progress for smooth opacity transition
			const scrollStart = 0;
			const scrollEnd = galleryTop - window.innerHeight * 0.2; // Start fading when 20% away from gallery
			const scrollProgress = Math.min(
				Math.max((scrollPosition - scrollStart) / (scrollEnd - scrollStart), 0),
				1,
			);

			// Interpolate opacity from 1 (100%) to 0.3 (30%)
			const newOpacity = 1 - scrollProgress * 0.7; // 1 - 0.7 = 0.3 at full scroll
			setHeroOpacity(newOpacity);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	// Fade in the hero clipart & title on initial mount
	useEffect(() => {
		// Allow the browser to paint with opacity 0, then animate to 1
		const id = requestAnimationFrame(() => setHeroOpacity(1));
		return () => cancelAnimationFrame(id);
	}, []);

	// Trigger initial reveal state after first paint
	useEffect(() => {
		const id = requestAnimationFrame(() => setHasMounted(true));
		return () => cancelAnimationFrame(id);
	}, []);

	const smoothScrollToAppsGallery = () => {
		const appsGalleryElement = document.getElementById("apps-gallery");
		if (!appsGalleryElement) return;

		const startPosition = window.pageYOffset;
		const targetPosition = appsGalleryElement.offsetTop + 12; // Offset to hide border of the gallery section
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

	const smoothScrollToHero = () => {
		const startPosition = window.pageYOffset;
		const targetPosition = 0;
		const distance = targetPosition - startPosition;
		const duration = 1800; // Same duration for consistency
		let startTime: number | null = null;

		// Easing function - easeOutQuart for smooth deceleration
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
			<div className="fixed z-10 flex min-h-screen w-full flex-col items-center justify-center px-4 py-8">
				{/* Hero Image */}
				<div
					className={`flex items-center justify-center transition-[opacity,transform] duration-700 ease-out md:mb-8 ${hasMounted ? "translate-y-0" : "translate-y-2"}`}
					style={{ opacity: heroOpacity }}
				>
					<div
						className="h-[320px] w-[300px] sm:h-[320px] sm:w-[320px] md:h-[400px] md:w-[400px]"
						style={{
							backgroundColor: "var(--color-primary)",
							WebkitMask: "url(/hero-clipart.svg) no-repeat center/contain",
							mask: "url(/hero-clipart.svg) no-repeat center/contain",
						}}
					/>
				</div>

				{/* Hero Title */}
				<h1
					className={`text-center font-extrabold text-2xl text-primary tracking-tight transition-[opacity,transform] duration-700 ease-out sm:text-4xl ${hasMounted ? "translate-y-0" : "translate-y-2"}`}
					style={{ opacity: heroOpacity }}
				>
					Full stack web developer, <br /> experienced with AI & web3
				</h1>

				{/* Show More Button */}
				<button
					type="button"
					onClick={smoothScrollToAppsGallery}
					className={`mt-12 flex cursor-pointer items-center gap-2 border-1 border-primary px-3 py-2 font-extrabold text-primary text-xl transition-[opacity,transform] duration-700 ease-out hover:opacity-70 ${
						hasMounted && !isScrolledToGallery
							? "translate-y-0 opacity-100"
							: "translate-y-2 opacity-0"
					}`}
				>
					Show me more <RiArrowDownLine className="h-5 w-5" />
				</button>
			</div>

			{/* Take me back button - Fixed position, appears when scrolled to gallery */}
			<div
				className={`fixed bottom-8 z-15 flex w-full justify-center px-4 transition-all ${
					isScrolledToGallery
						? "translate-y-0 opacity-100"
						: "pointer-events-none translate-y-4 opacity-0"
				}`}
			>
				<button
					type="button"
					onClick={smoothScrollToHero}
					className="flex cursor-pointer items-center gap-2 border-1 border-primary bg-background px-3 py-2 font-extrabold text-primary text-xl transition-opacity hover:opacity-70"
				>
					<RiArrowUpLine className="h-5 w-5" />
					Take me back
				</button>
			</div>

			{/* Apps Gallery Section */}
			<div
				id="apps-gallery"
				className="relative z-20 mt-[100vh] mb-36 w-full border-primary border-y bg-background py-16"
			>
				<AppsGallery />
			</div>
		</div>
	);
};

export default Home;
