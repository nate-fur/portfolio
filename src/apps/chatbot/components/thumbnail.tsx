import { Bot } from "lucide-react";
import { BaseThumbnail } from "~/apps/base-thumbnail";
import type { AppThumbnailProps } from "~/apps/types";

export const ChatbotThumbnail = ({ size = "medium" }: AppThumbnailProps) => {
	return (
		<BaseThumbnail
			name="AI Assistant"
			icon={Bot}
			size={size}
			backgroundImage="/apps/thumbnails/chatbot.svg"
			className="bg-center bg-cover bg-no-repeat"
		/>
	);
};
