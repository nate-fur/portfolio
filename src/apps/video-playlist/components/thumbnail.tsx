import { RiVideoLine } from "react-icons/ri";
import { BaseThumbnail } from "~/apps/base-thumbnail";
import type { AppThumbnailProps } from "~/apps/types";

export const VideoPlaylistThumbnail = (props: AppThumbnailProps) => {
	return (
		<BaseThumbnail
			name="Videos"
			icon={RiVideoLine}
			className="bg-gradient-to-br from-red-500/20 to-pink-600/20"
			{...props}
		/>
	);
};
