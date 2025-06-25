import { RiToolsLine } from "react-icons/ri";
import { BaseThumbnail } from "~/apps/base-thumbnail";
import type { AppThumbnailProps } from "~/apps/types";

export const McpToolThumbnail = (props: AppThumbnailProps) => {
	return (
		<BaseThumbnail
			name="MCP Tool"
			icon={RiToolsLine}
			className="bg-gradient-to-br from-orange-500/20 to-red-600/20"
			{...props}
		/>
	);
};
