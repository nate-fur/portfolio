import { BaseThumbnail } from "./base-thumbnail";
import type { DefaultThumbnailProps } from "./types";

export const DefaultThumbnail = ({
	name,
	icon,
	size = "medium",
	hoverIconColor,
}: DefaultThumbnailProps) => {
	return <BaseThumbnail name={name} icon={icon} size={size} hoverIconColor={hoverIconColor} />;
};
