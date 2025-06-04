import { Gamepad2, Target, Zap } from "lucide-react";
import { BaseThumbnail } from "~/apps/base-thumbnail";
import type { AppThumbnailProps } from "~/apps/types";

export const SnakeGameThumbnail = ({ size = "medium" }: AppThumbnailProps) => {
	return <BaseThumbnail name="Snake" icon={Gamepad2} size={size} />;
};
