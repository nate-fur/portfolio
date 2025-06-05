import { Link } from "lucide-react";
import { BaseThumbnail } from "~/apps/base-thumbnail";
import type { AppThumbnailProps } from "~/apps/types";

export const UrlShortenerThumbnail = ({
	size = "medium",
}: AppThumbnailProps) => {
	return (
		<BaseThumbnail
			name="URL Shortener"
			icon={Link}
			size={size}
			backgroundImage="/apps/thumbnails/url-shortener.svg"
			className="bg-center bg-cover bg-no-repeat"
		/>
	);
};
