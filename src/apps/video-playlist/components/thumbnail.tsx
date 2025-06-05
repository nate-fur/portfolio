import { Video } from "lucide-react";
import { BaseThumbnail } from "~/apps/base-thumbnail";
import type { AppThumbnailProps } from "~/apps/types";

export const VideoPlaylistThumbnail = ({
	size = "medium",
}: AppThumbnailProps) => {
	return (
		<BaseThumbnail
			name="Videos"
			icon={Video}
			size={size}
			backgroundImage="/apps/thumbnails/videos.svg"
			className="bg-center bg-cover bg-no-repeat"
		/>
	);
};
