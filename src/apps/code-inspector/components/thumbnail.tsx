import { Code } from "lucide-react";
import { BaseThumbnail } from "~/apps/base-thumbnail";
import type { AppThumbnailProps } from "~/apps/types";

export const CodeInspectorThumbnail = ({
	size = "medium",
}: AppThumbnailProps) => {
	return (
		<BaseThumbnail
			name="Code Inspector"
			icon={Code}
			size={size}
			backgroundImage="/apps/thumbnails/code-inspector.svg"
			className="bg-center bg-cover bg-no-repeat"
		/>
	);
};
