import type { IconType } from "react-icons";
import {
	SiAmazonwebservices,
	SiDocker,
	SiGraphql,
	SiJest,
	SiNextdotjs,
	SiNodedotjs,
	SiOpenai,
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
			"A JavaScript library for building user interfaces with reusable components and efficient rendering.",
		url: "https://react.dev",
	},
	{
		name: "Next.js",
		icon: SiNextdotjs,
		description:
			"Full-stack React framework with server-side rendering, static generation, and API routes.",
		url: "https://nextjs.org",
	},
	{
		name: "TypeScript",
		icon: SiTypescript,
		description:
			"Typed superset of JavaScript that adds static type checking and enhanced developer experience.",
		url: "https://www.typescriptlang.org",
	},
	{
		name: "Node.js",
		icon: SiNodedotjs,
		description:
			"JavaScript runtime for server-side development with event-driven, non-blocking I/O.",
		url: "https://nodejs.org",
	},
	{
		name: "tRPC",
		icon: SiTrpc,
		description:
			"End-to-end typesafe APIs without schemas or code generation for full-stack TypeScript apps.",
		url: "https://trpc.io",
	},
	{
		name: "PostgreSQL",
		icon: SiPostgresql,
		description:
			"Advanced open-source relational database with ACID compliance and extensible architecture.",
		url: "https://www.postgresql.org",
	},
	{
		name: "Docker",
		icon: SiDocker,
		description:
			"Containerization platform for developing, shipping, and running applications in isolated environments.",
		url: "https://www.docker.com",
	},
	{
		name: "AWS",
		icon: SiAmazonwebservices,
		description:
			"Cloud computing platform offering scalable infrastructure, storage, and development tools.",
		url: "https://aws.amazon.com",
	},
	{
		name: "Tailwind CSS",
		icon: SiTailwindcss,
		description:
			"Utility-first CSS framework for rapidly building custom user interfaces with pre-defined classes.",
		url: "https://tailwindcss.com",
	},
	{
		name: "GraphQL",
		icon: SiGraphql,
		description:
			"Query language and runtime for APIs that provides a complete description of data and enables powerful developer tools.",
		url: "https://graphql.org",
	},
	{
		name: "OpenAI",
		icon: SiOpenai,
		description:
			"AI research company providing powerful language models and APIs for natural language processing.",
		url: "https://openai.com",
	},
	{
		name: "Jest",
		icon: SiJest,
		description:
			"JavaScript testing framework with a focus on simplicity and support for large web applications.",
		url: "https://jestjs.io",
	},
];
