import type { NextPage } from "next";
import { MainLayout } from "../../components/layout/main-layout";

const About: NextPage = () => {
	return (
		<MainLayout>
			<main className="flex min-h-screen flex-col items-center justify-start">
				<div className="container fixed mt-16 flex min-h-screen flex-col items-center justify-start px-4 py-8 pb-12">
					<h1 className="mt-[400px] text-center font-extrabold text-2xl text-primary tracking-tight sm:text-4xl">
						About me
					</h1>
				</div>

				<div className="z-10 mt-[650px] mb-[200px] h-[1500px] w-screen border-primary border-y-1 opacity-100" />
			</main>
		</MainLayout>
	);
};

export default About;
