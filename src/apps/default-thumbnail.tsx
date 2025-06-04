import { BaseThumbnail } from "./base-thumbnail";
import type { DefaultThumbnailProps } from "./types";

export const DefaultThumbnail = ({
	name,
	icon,
	size = "medium",
}: DefaultThumbnailProps) => {
	return <BaseThumbnail name={name} icon={icon} size={size} />;
};
