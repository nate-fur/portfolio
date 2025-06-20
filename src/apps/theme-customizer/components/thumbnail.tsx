import { motion } from "framer-motion";
import { Brush, Palette, Pipette } from "lucide-react";
import { BaseThumbnail } from "~/apps/base-thumbnail";
import type { AppThumbnailProps } from "~/apps/types";

export const ThemeCustomizerThumbnail = ({
	size = "medium",
}: AppThumbnailProps) => {
	return (
		<BaseThumbnail
			name="Theme Customizer"
			icon={Palette}
			size={size}
			backgroundImage="/apps/thumbnails/color-palette.svg"
			className="bg-center bg-cover bg-no-repeat"
		/>
	);
};
