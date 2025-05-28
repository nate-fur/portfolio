import { Navbar } from "./nav-bar";

interface MainLayoutProps {
	children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
	return (
		<>
			<Navbar />
			{children}
		</>
	);
};
