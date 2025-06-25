import { RiLink } from "react-icons/ri";
import { BaseThumbnail } from "~/apps/base-thumbnail";
import type { AppThumbnailProps } from "~/apps/types";

export const UrlShortenerThumbnail = (props: AppThumbnailProps) => {
	return (
		<BaseThumbnail
			name="URL Shortener"
			icon={RiLink}
			className="bg-gradient-to-br from-teal-500/20 to-cyan-600/20"
			{...props}
		/>
	);
};
