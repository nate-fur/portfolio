import type { IconType } from "react-icons";
import {
	SiAmazonwebservices,
	SiCypress,
	SiDocker,
	SiGraphql,
	SiNextdotjs,
	SiNodedotjs,
	SiPostgresql,
	SiReact,
	SiTailwindcss,
	SiTrpc,
	SiTypescript,
} from "react-icons/si";

export interface Technology {
	name: string;
	icon: IconType;
	description: string;
	url: string;
}

export const technologies: Technology[] = [
	{
		name: "React",
		icon: SiReact,
		description:
			"My preferred library for building user interfaces with reusable components and efficient rendering.",
		url: "https://react.dev",
	},
	{
		name: "Next.js",
		icon: SiNextdotjs,
		description:
			"One of my go-to frameworks for building full-stack applications with React. When deployed with Vercel, it provides a great developer experience. (This site is built with Next.js)",
		url: "https://nextjs.org",
	},
	{
		name: "TypeScript",
		icon: SiTypescript,
		description:
			"To be honest, I don't know how developers got by without type safety. Too many easy bugs are avoided with this tech.",
		url: "https://www.typescriptlang.org",
	},
	{
		name: "Node.js",
		icon: SiNodedotjs,
		description:
			"My preferred runtime for server-side development. This, along with TypeScript, is the backbone of my backend development.",
		url: "https://nodejs.org",
	},
	{
		name: "tRPC",
		icon: SiTrpc,
		description:
			"Introduced to me by Theo (T3 Stack) and I've been using it ever since. It's a great way to build type-safe APIs with React and TypeScript.",
		url: "https://trpc.io",
	},
	{
		name: "PostgreSQL",
		icon: SiPostgresql,
		description:
			"A highly performant database that has integrated seamlessly with Prisma and Drizzle ORM in my projects. The reliability and feature set make it my go-to choice for relational data.",
		url: "https://www.postgresql.org",
	},
	{
		name: "Docker",
		icon: SiDocker,
		description:
			"While I stick to serverless deployments for most things these days, Docker is a no-brainer when working with long-running applications. It's been essential for consistent development environments.",
		url: "https://www.docker.com",
	},
	{
		name: "AWS",
		icon: SiAmazonwebservices,
		description:
			"My cloud platform of choice, primarily using EC2, S3, and IAM. The breadth of services and reliability have made it the foundation for most of my production deployments.",
		url: "https://aws.amazon.com",
	},
	{
		name: "Tailwind CSS",
		icon: SiTailwindcss,
		description:
			"Tailwind is what you use if you don't want to reinvent the wheel (incorrectly, that is) and want maintainable style systems that don't fight your developers. It's transformed how I approach CSS.",
		url: "https://tailwindcss.com",
	},
	{
		name: "GraphQL",
		icon: SiGraphql,
		description:
			"Not my preferred choice for smaller teams and projects, but a lifesaver for building APIs on larger scale applications. The flexibility and type safety really shine when dealing with complex data requirements.",
		url: "https://graphql.org",
	},
	{
		name: "Cypress",
		icon: SiCypress,
		description:
			"Although not always needed for every project, Cypress is my go-to testing tool for insights into the health of my full-stack applications. The real-time feedback and debugging capabilities are invaluable.",
		url: "https://www.cypress.io",
	},
];
