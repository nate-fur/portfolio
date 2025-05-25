import { ArrowLeft } from "lucide-react";
import type { NextPage } from "next";
import Link from "next/link";
import { OSDesktop } from "../../components/layout/os-desktop";

const Projects: NextPage = () => {
	return (
		<main className="relative">
			<div className="fixed top-4 left-4 z-50">
				<Link
					href="/home"
					className="flex items-center justify-center rounded-full bg-black/20 p-2 text-primary backdrop-blur-sm transition-opacity hover:opacity-70"
				>
					<ArrowLeft className="h-6 w-6" />
				</Link>
			</div>
			<OSDesktop />
		</main>
	);
};

export default Projects;
