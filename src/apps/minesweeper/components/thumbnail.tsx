import { RiGamepadLine } from "react-icons/ri";
import { BaseThumbnail } from "~/apps/base-thumbnail";
import type { AppThumbnailProps } from "~/apps/types";

export const MinesweeperThumbnail = (props: AppThumbnailProps) => {
	return (
		<BaseThumbnail
			name="Minesweeper"
			icon={RiGamepadLine}
			className="bg-gradient-to-br from-yellow-500/20 to-orange-600/20"
			showPingIndicator={true}
			{...props}
		/>
	);
};
