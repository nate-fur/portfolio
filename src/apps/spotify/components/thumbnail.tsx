import { motion } from "framer-motion";
import { Music, Play, Volume2 } from "lucide-react";
import { BaseThumbnail } from "~/apps/base-thumbnail";
import type { AppThumbnailProps } from "~/apps/types";

export const SpotifyThumbnail = ({ size = "medium" }: AppThumbnailProps) => {
	return <BaseThumbnail name="Spotify" icon={Music} size={size} />;
};
