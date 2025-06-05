import { Twitter } from "lucide-react";
import { BaseThumbnail } from "~/apps/base-thumbnail";
import type { AppThumbnailProps } from "~/apps/types";

export const TwitterFeedThumbnail = ({
	size = "medium",
}: AppThumbnailProps) => {
	return (
		<BaseThumbnail
			name="X Feed"
			icon={Twitter}
			size={size}
			backgroundImage="/apps/thumbnails/x-feed.svg"
			className="bg-center bg-cover bg-no-repeat"
		/>
	);
};
