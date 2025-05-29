import type { LucideIcon } from "lucide-react";

export interface AppThumbnailProps {
	size?: "small" | "medium" | "large";
}

export interface DefaultThumbnailProps extends AppThumbnailProps {
	name: string;
	icon: LucideIcon;
}

// Re-export the App interface from the registry for consistency
export type { App } from "~/apps/app-registry";
