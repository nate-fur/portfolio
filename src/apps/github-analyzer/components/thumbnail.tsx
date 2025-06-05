import { Github } from "lucide-react";
import { BaseThumbnail } from "~/apps/base-thumbnail";
import type { AppThumbnailProps } from "~/apps/types";

export const GitHubAnalyzerThumbnail = ({
	size = "medium",
}: AppThumbnailProps) => {
	return (
		<BaseThumbnail
			name="GitHub Analyzer"
			icon={Github}
			size={size}
			backgroundImage="/apps/thumbnails/github-analyzer.svg"
			className="bg-center bg-cover bg-no-repeat"
		/>
	);
};
