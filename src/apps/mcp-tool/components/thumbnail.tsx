import { Wrench } from "lucide-react";
import { BaseThumbnail } from "~/apps/base-thumbnail";
import type { AppThumbnailProps } from "~/apps/types";

export const McpToolThumbnail = ({ size = "medium" }: AppThumbnailProps) => {
	return (
		<BaseThumbnail
			name="MCP Tool"
			icon={Wrench}
			size={size}
			backgroundImage="/apps/thumbnails/mcp.svg"
			className="bg-center bg-cover bg-no-repeat"
		/>
	);
};
