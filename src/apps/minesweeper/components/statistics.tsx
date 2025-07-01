import { RiBarChartLine, RiTimeLine, RiTrophyLine } from "react-icons/ri";

interface StatisticsProps {
	bestTime: number;
	gamesPlayed: number;
	gamesWon: number;
	winRate: number;
	formatTime: (time: number) => string;
}

export const Statistics = ({
	bestTime,
	gamesPlayed,
	gamesWon,
	winRate,
	formatTime,
}: StatisticsProps) => {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
			<div className="bg-muted rounded-lg p-4 text-center">
				<div className="flex items-center justify-center gap-2 mb-2">
					<RiTrophyLine className="w-5 h-5 text-yellow-500" />
					<span className="font-semibold text-sm">Best Time</span>
				</div>
				<div className="text-xl font-mono font-bold">
					{bestTime > 0 ? formatTime(bestTime) : "--:--"}
				</div>
			</div>

			<div className="bg-muted rounded-lg p-4 text-center">
				<div className="flex items-center justify-center gap-2 mb-2">
					<RiBarChartLine className="w-5 h-5 text-blue-500" />
					<span className="font-semibold text-sm">Win Rate</span>
				</div>
				<div className="text-xl font-bold">
					{gamesPlayed > 0 ? `${winRate.toFixed(1)}%` : "0%"}
				</div>
			</div>

			<div className="bg-muted rounded-lg p-4 text-center">
				<div className="flex items-center justify-center gap-2 mb-2">
					<RiTimeLine className="w-5 h-5 text-green-500" />
					<span className="font-semibold text-sm">Games Played</span>
				</div>
				<div className="text-xl font-bold">
					{gamesPlayed}
				</div>
				<div className="text-xs text-muted-foreground mt-1">
					{gamesWon} won
				</div>
			</div>
		</div>
	);
};