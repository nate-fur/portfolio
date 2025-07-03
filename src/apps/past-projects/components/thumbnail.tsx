import { RiBriefcaseLine } from "react-icons/ri";
import { BaseThumbnail } from "~/apps/base-thumbnail";
import type { AppThumbnailProps } from "~/apps/types";

export const PastProjectsThumbnail = (props: AppThumbnailProps) => {
	return (
		<BaseThumbnail
			name="Past Projects"
			icon={RiBriefcaseLine}
			className="bg-gradient-to-br from-amber-500/20 to-orange-600/20"
			{...props}
		/>
	);
};
