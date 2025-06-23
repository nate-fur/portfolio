import { RiLineChartLine } from "react-icons/ri";
import { BaseThumbnail } from "~/apps/base-thumbnail";
import type { AppThumbnailProps } from "~/apps/types";

export const StockSimulatorThumbnail = (props: AppThumbnailProps) => {
	return (
		<BaseThumbnail
			name="Stock Simulator"
			icon={RiLineChartLine}
			className="bg-gradient-to-br from-emerald-500/20 to-green-600/20"
			{...props}
		/>
	);
};
