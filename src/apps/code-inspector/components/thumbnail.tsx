import { RiCodeLine } from "react-icons/ri";
import { BaseThumbnail } from "~/apps/base-thumbnail";
import type { AppThumbnailProps } from "~/apps/types";

export const CodeInspectorThumbnail = (props: AppThumbnailProps) => {
	return (
		<BaseThumbnail
			name="Code Inspector"
			icon={RiCodeLine}
			className="bg-gradient-to-br from-slate-500/20 to-gray-600/20"
			{...props}
		/>
	);
};
