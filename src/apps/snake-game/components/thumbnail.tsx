import { RiGamepadLine, RiWifiLine } from "react-icons/ri";
import { BaseThumbnail } from "~/apps/base-thumbnail";
import type { AppThumbnailProps } from "~/apps/types";

export const SnakeGameThumbnail = (props: AppThumbnailProps) => {
	return (
		<BaseThumbnail
			name="Snake"
			icon={RiGamepadLine}
			className="bg-gradient-to-br from-green-500/20 to-emerald-600/20"
			showPingIndicator={true}
			{...props}
		/>
	);
};
