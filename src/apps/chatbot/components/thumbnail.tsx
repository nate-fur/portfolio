import { RiRobotLine } from "react-icons/ri";
import { BaseThumbnail } from "~/apps/base-thumbnail";
import type { AppThumbnailProps } from "~/apps/types";

export const ChatbotThumbnail = (props: AppThumbnailProps) => {
	return (
		<BaseThumbnail
			name="AI Assistant"
			icon={RiRobotLine}
			className="bg-gradient-to-br from-blue-500/20 to-purple-600/20"
			{...props}
		/>
	);
};
