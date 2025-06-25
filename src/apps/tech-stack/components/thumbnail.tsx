import { RiStackLine } from "react-icons/ri";
import { BaseThumbnail } from "~/apps/base-thumbnail";
import type { AppThumbnailProps } from "~/apps/types";

export const TechStackThumbnail = (props: AppThumbnailProps) => {
	return (
		<BaseThumbnail
			name="Tech Stack"
			icon={RiStackLine}
			className="bg-gradient-to-br from-blue-500/20 to-indigo-600/20"
			{...props}
		/>
	);
};
