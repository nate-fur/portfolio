import type { App } from "~/apps/types";
import { useViewport } from "~/lib/hooks/use-viewport";
import { DesktopAppContainer } from "./desktop-app-container";
import { MobileAppContainer } from "./mobile-app-container";

interface AppContainerProps {
	app: App;
	size: "small" | "medium" | "large";
	isExpanded: boolean;
	onExpansionChange?: (isExpanded: boolean) => void;
}

export const AppContainer = ({
	app,
	size,
	isExpanded,
	onExpansionChange,
}: AppContainerProps) => {
	const { isMobile } = useViewport();

	// On mobile, use the simple modal-based approach
	if (isMobile) {
		return <MobileAppContainer app={app} size={size} />;
	}

	// On desktop, use the more complex expansion approach
	return (
		<DesktopAppContainer
			app={app}
			size={size}
			isExpanded={isExpanded}
			onExpansionChange={onExpansionChange}
		/>
	);
};
