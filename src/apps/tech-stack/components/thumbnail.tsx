import { Layers } from "lucide-react";
import { BaseThumbnail } from "~/apps/base-thumbnail";
import type { AppThumbnailProps } from "~/apps/types";

export const TechStackThumbnail = ({ size = "medium" }: AppThumbnailProps) => {
	return (
		<BaseThumbnail
			name="Tech Stack"
			icon={Layers}
			size={size}
			backgroundImage="/apps/thumbnails/tech-stack.svg"
			className="bg-center bg-cover bg-no-repeat"
		/>
	);
};
