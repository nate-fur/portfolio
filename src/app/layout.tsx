import { faSun } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Link from "next/link";
import "~/styles/globals.css";

import { TRPCReactProvider } from "~/trpc/react";

export const metadata: Metadata = {
	title: "Nate Furbeyre",
	description: "Personal portfolio and blog of Nate Furbeyre",
	icons: {
		icon: "/profile-ghibli.png",
	},
};

const geist = Geist({
	subsets: ["latin"],
	variable: "--font-geist-sans",
});

export default function RootLayout(props: { children: React.ReactNode }) {
	return (
		<html lang="en" className={`${geist.variable}`}>
			<body className="bg-base">
				<TRPCReactProvider>
					<Navbar />
					{props.children}
				</TRPCReactProvider>
			</body>
		</html>
	);
}

const Navbar = () => {
	return (
		<>
			<div className="fixed z-20 hidden w-screen items-stretch justify-between border-1 border-primary bg-base font-semibold text-primary sm:flex">
				<div className="flex w-48 items-center justify-center border-primary border-r-1 text-center">
					<span>Nate Furbeyre</span>
				</div>
				<div className="flex flex-row gap-8 p-4">
					<Link href="/">Home</Link>
					<Link href="/projects">Projects</Link>
					<Link href="/about">About</Link>
				</div>
				<div className="flex w-48 items-center justify-center border-primary border-l-1 text-center">
					<span className="flex items-center gap-2">
						<FontAwesomeIcon icon={faSun} className="h-5 w-5" />
						Theme
					</span>
				</div>
			</div>
			<div className="fixed z-20 flex w-screen flex-col items-stretch justify-evenly border-1 border-primary bg-base font-semibold text-primary sm:hidden">
				<div className="flex h-12 flex-grow flex-row justify-evenly border-primary border-b-1">
					<div className="flex flex-grow items-center justify-center border-primary border-r-1 text-center">
						<span>Nate Furbeyre</span>
					</div>
					<div className="flex flex-shrink items-center justify-center border-primary border-l-1 text-center">
						<span className="flex items-center gap-2 px-4">
							<FontAwesomeIcon icon={faSun} className="h-5 w-5" />
							Theme
						</span>
					</div>
				</div>
				<div className="flex h-12 w-full flex-row items-center justify-around p-4">
					<Link href="/">Home</Link>
					<Link href="/projects">Projects</Link>
					<Link href="/about">About</Link>
				</div>
			</div>
		</>
	);
};
