import type { IconType } from "react-icons";

export interface AppThumbnailProps {
	size?: "small" | "medium" | "large";
}

export interface DefaultThumbnailProps extends AppThumbnailProps {
	name: string;
	icon: IconType;
}

// Re-export the App interface from the registry for consistency
export type { App } from "~/apps/app-registry";

// Re-export BaseThumbnailProps from base-thumbnail
export type { BaseThumbnailProps } from "./base-thumbnail";
