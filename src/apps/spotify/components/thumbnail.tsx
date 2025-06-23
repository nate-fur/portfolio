import { RiMusicLine, RiPlayLine, RiVolumeUpLine } from "react-icons/ri";
import { BaseThumbnail } from "~/apps/base-thumbnail";
import type { AppThumbnailProps } from "~/apps/types";

export const SpotifyThumbnail = (props: AppThumbnailProps) => {
	return (
		<BaseThumbnail
			name="Spotify"
			icon={RiMusicLine}
			className="bg-gradient-to-br from-green-500/20 to-emerald-600/20"
			{...props}
		>
			{/* Music visualization elements */}
			<div className="absolute inset-0 flex items-center justify-center opacity-20">
				<div className="flex space-x-1">
					<RiPlayLine className="h-4 w-4 text-green-500" />
					<RiVolumeUpLine className="h-4 w-4 text-green-400" />
				</div>
			</div>
		</BaseThumbnail>
	);
};
