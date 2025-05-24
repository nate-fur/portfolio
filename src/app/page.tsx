import type { NextPage } from "next";
import Image from "next/image";
import { Row } from "~/components/Row";

const Home: NextPage = () => {
	return (
		<>
			<main className="flex min-h-screen flex-col items-center justify-start">
				<div className="container fixed mt-16 flex min-h-screen flex-col items-center justify-start px-4 py-8 pb-12">
					<Image
						src="/hero-clipart.svg"
						className="h-[400px] w-[400px]"
						alt="Hero"
						width={400}
						height={420}
					/>
					<h1 className="text-center font-extrabold text-2xl text-primary tracking-tight sm:text-4xl">
						Full stack web developer, <br /> experienced with AI & web3
					</h1>
					<h1 className="mt-auto mb-12 text-right font-extrabold text-primary text-xl">
						{"Hey! How'd you get down here?"}
					</h1>
				</div>
				<div className="z-10 mt-[650px] mb-[200px] w-screen border-primary border-y-1 bg-base opacity-100 ">
					<Grid />
				</div>
			</main>
		</>
	);
};

const Grid = () => {
	return (
		<div className="mx-auto flex max-w-4xl flex-col gap-4 py-4">
			<Row />
			<Row />
			<Row />
			<Row />
			<Row />
			<Row />
			<Row />
		</div>
	);
};

export default Home;
