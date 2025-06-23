import { RiBrushLine, RiDropLine, RiPaletteLine } from "react-icons/ri";
import { BaseThumbnail } from "~/apps/base-thumbnail";
import type { AppThumbnailProps } from "~/apps/types";

export const ThemeCustomizerThumbnail = (props: AppThumbnailProps) => {
	return (
		<BaseThumbnail
			name="Theme Customizer"
			icon={RiPaletteLine}
			className="bg-gradient-to-br from-purple-500/20 to-pink-600/20"
			{...props}
		>
			{/* Color palette elements */}
			<div className="absolute inset-0 flex items-center justify-center opacity-20">
				<div className="flex space-x-1">
					<RiBrushLine className="h-4 w-4 text-purple-500" />
					<RiDropLine className="h-4 w-4 text-pink-400" />
				</div>
			</div>
		</BaseThumbnail>
	);
};
