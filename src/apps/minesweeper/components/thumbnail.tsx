import { Gamepad2 } from "lucide-react";
import { BaseThumbnail } from "~/apps/base-thumbnail";
import type { AppThumbnailProps } from "~/apps/types";

export const MinesweeperThumbnail = ({
	size = "medium",
}: AppThumbnailProps) => {
	return (
		<BaseThumbnail
			name="Minesweeper"
			icon={Gamepad2}
			size={size}
			backgroundImage="/apps/thumbnails/minesweeper.svg"
			className="bg-center bg-cover bg-no-repeat"
		/>
	);
};
