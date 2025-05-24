import { SharedHeroImage } from "../shared/SharedHeroImage";
import { Navbar } from "./Navbar";

interface MainLayoutProps {
	children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
	return (
		<>
			<Navbar />
			<div className="fixed z-10 mt-16 flex w-full flex-col items-center justify-start px-4 py-8 pb-12">
				<SharedHeroImage />
			</div>
			{children}
		</>
	);
};
