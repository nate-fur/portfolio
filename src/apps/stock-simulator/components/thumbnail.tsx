import { TrendingUp } from "lucide-react";
import { BaseThumbnail } from "~/apps/base-thumbnail";
import type { AppThumbnailProps } from "~/apps/types";

export const StockSimulatorThumbnail = ({
	size = "medium",
}: AppThumbnailProps) => {
	return (
		<BaseThumbnail
			name="Stock Simulator"
			icon={TrendingUp}
			size={size}
			backgroundImage="/apps/thumbnails/stocks.svg"
			className="bg-center bg-cover bg-no-repeat"
		/>
	);
};
