import { FileText } from "lucide-react";
import { BaseThumbnail } from "~/apps/base-thumbnail";
import type { AppThumbnailProps } from "~/apps/types";

export const BlogThumbnail = ({ size = "medium" }: AppThumbnailProps) => {
	return (
		<BaseThumbnail
			name="Blog"
			icon={FileText}
			size={size}
			backgroundImage="/apps/thumbnails/blog.svg"
			className="bg-center bg-cover bg-no-repeat"
		/>
	);
};
