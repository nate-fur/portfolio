import type { NextPage } from "next";
import Image from "next/image";

const About: NextPage = () => {
	return (
		<>
			<main className="flex min-h-screen flex-col items-center justify-start">
				<div className="container fixed mt-16 flex min-h-screen flex-col items-center justify-start px-4 py-8 pb-12">
					<Image
						src="/profile.svg"
						alt="Profile"
						width={400}
						height={420}
						className={"-mt-4 mb-4 h-[400px] w-[400px] pb-6"}
					/>
					<h1 className="text-center font-extrabold text-2xl text-primary tracking-tight sm:text-4xl">
						About me
					</h1>
				</div>

				<div className="z-10 mt-[650px] mb-[200px] h-[1500px] w-screen border-primary border-y-1 bg-base opacity-100 " />
			</main>
		</>
	);
};

export default About;
