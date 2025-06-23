import { RiGithubLine } from "react-icons/ri";
import { BaseThumbnail } from "~/apps/base-thumbnail";
import type { AppThumbnailProps } from "~/apps/types";

export const GitHubAnalyzerThumbnail = (props: AppThumbnailProps) => {
	return (
		<BaseThumbnail
			name="GitHub Analyzer"
			icon={RiGithubLine}
			className="bg-gradient-to-br from-gray-500/20 to-slate-600/20"
			{...props}
		/>
	);
};
