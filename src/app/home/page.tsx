"use client";

import { ArrowUp } from "lucide-react";
import type { NextPage } from "next";
import { MainLayout } from "../../components/layout/main-layout";
import { OSDesktop } from "../../components/layout/os-desktop";

const Home: NextPage = () => {
	const smoothScrollToTop = () => {
		const startPosition = window.pageYOffset;
		const targetPosition = 0;
		const distance = startPosition - targetPosition;
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
			const currentPosition = startPosition - distance * easedProgress;

			window.scrollTo(0, currentPosition);

			if (progress < 1) {
				requestAnimationFrame(animation);
			}
		};

		requestAnimationFrame(animation);
	};

	return (
		<MainLayout>
			<main className="flex min-h-screen flex-col items-center justify-start">
				<div className="container fixed mt-16 flex min-h-screen flex-col items-center justify-start px-4 py-8 pb-12">
					<h1 className="mt-[400px] text-center font-extrabold text-2xl text-primary tracking-tight sm:text-4xl">
						Full stack web developer, <br /> experienced with AI & web3
					</h1>
					<button
						type="button"
						onClick={smoothScrollToTop}
						className="mt-auto mb-12 flex cursor-pointer items-center gap-2 border-1 border-primary px-3 py-2 font-extrabold text-primary text-xl transition-opacity hover:opacity-70"
					>
						Take me to the top <ArrowUp className="h-5 w-5" />
					</button>
				</div>
				<div className="z-10 mt-[650px] mb-[200px] w-screen border-primary border-y-1 opacity-100">
					<OSDesktop />
				</div>
			</main>
		</MainLayout>
	);
};

export default Home;
