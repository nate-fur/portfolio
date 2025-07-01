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
		<div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
			<div className="rounded-lg bg-muted p-4 text-center">
				<div className="mb-2 flex items-center justify-center gap-2">
					<RiTrophyLine className="h-5 w-5 text-yellow-500" />
					<span className="font-semibold text-sm">Best Time</span>
				</div>
				<div className="font-bold font-mono text-xl">
					{bestTime > 0 ? formatTime(bestTime) : "--:--"}
				</div>
			</div>

			<div className="rounded-lg bg-muted p-4 text-center">
				<div className="mb-2 flex items-center justify-center gap-2">
					<RiBarChartLine className="h-5 w-5 text-blue-500" />
					<span className="font-semibold text-sm">Win Rate</span>
				</div>
				<div className="font-bold text-xl">
					{gamesPlayed > 0 ? `${winRate.toFixed(1)}%` : "0%"}
				</div>
			</div>

			<div className="rounded-lg bg-muted p-4 text-center">
				<div className="mb-2 flex items-center justify-center gap-2">
					<RiTimeLine className="h-5 w-5 text-green-500" />
					<span className="font-semibold text-sm">Games Played</span>
				</div>
				<div className="font-bold text-xl">{gamesPlayed}</div>
				<div className="mt-1 text-muted-foreground text-xs">{gamesWon} won</div>
			</div>
		</div>
	);
};
