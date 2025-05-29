import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "~/styles/globals.css";

import { SideLayout } from "~/components/layout";
import { ThemeProvider } from "~/contexts/theme-context";
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
			<body>
				<ThemeProvider
					attribute="class"
					defaultTheme="dark"
					storageKey="portfolio-theme"
					enableSystem
					themes={["light", "dark", "forest", "blood", "system"]}
				>
					<TRPCReactProvider>
						<SideLayout>{props.children}</SideLayout>
					</TRPCReactProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
