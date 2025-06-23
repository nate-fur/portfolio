import { RiTwitterLine } from "react-icons/ri";
import { BaseThumbnail } from "~/apps/base-thumbnail";
import type { AppThumbnailProps } from "~/apps/types";

export const TwitterFeedThumbnail = (props: AppThumbnailProps) => {
	return (
		<BaseThumbnail
			name="X Feed"
			icon={RiTwitterLine}
			className="bg-gradient-to-br from-blue-500/20 to-cyan-600/20"
			{...props}
		/>
	);
};
