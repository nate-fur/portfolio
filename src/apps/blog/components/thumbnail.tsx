import { RiFileTextLine } from "react-icons/ri";
import { BaseThumbnail } from "~/apps/base-thumbnail";
import type { AppThumbnailProps } from "~/apps/types";

export const BlogThumbnail = (props: AppThumbnailProps) => {
	return (
		<BaseThumbnail
			name="Blog"
			icon={RiFileTextLine}
			className="bg-gradient-to-br from-indigo-500/20 to-purple-600/20"
			{...props}
		/>
	);
};
