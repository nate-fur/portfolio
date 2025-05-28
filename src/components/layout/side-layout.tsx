import { SideNav } from "./side-nav";

interface SideLayoutProps {
	children: React.ReactNode;
}

export const SideLayout = ({ children }: SideLayoutProps) => {
	return (
		<div className="flex min-h-screen">
			<SideNav />
			{/* Main content area takes full width since sidebar is hidden by default */}
			<main className="flex-1">{children}</main>
		</div>
	);
};
