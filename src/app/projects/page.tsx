import type { NextPage } from "next";

const Projects: NextPage = () => {
	return (
		<>
			<main className="flex min-h-screen flex-col items-center justify-start">
				<div className="container fixed mt-16 flex flex-col items-center justify-start px-4 py-8 pb-12">
					<h1 className="mt-[400px] text-center font-extrabold text-4xl text-primary tracking-tight">
						Projects
					</h1>
				</div>

				<div className="z-10 mt-[650px] mb-[200px] h-[1500px] w-screen border-primary border-y-1 bg-base opacity-100 " />
			</main>
		</>
	);
};

export default Projects;
