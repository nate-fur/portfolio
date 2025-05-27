import { BaseAppContent } from "~/apps/base-app-content";

export const SnakeGameApp = () => {
	return (
		<BaseAppContent
			title="Snake Game"
			description="Classic snake game built with modern web technologies. Control the snake to eat food and grow longer while avoiding walls and yourself."
			technologies={["React", "TypeScript", "Canvas API", "Game Logic"]}
		>
			<div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
				<div className="rounded-xl bg-white/10 p-4">
					<h4 className="mb-2 font-medium text-sm text-white">
						Classic Gameplay
					</h4>
					<p className="text-sm text-white/70">
						Navigate the snake using arrow keys or WASD to collect food and
						grow.
					</p>
				</div>
				<div className="rounded-xl bg-white/10 p-4">
					<h4 className="mb-2 font-medium text-sm text-white">
						High Score System
					</h4>
					<p className="text-sm text-white/70">
						Track your best scores and compete with yourself to improve.
					</p>
				</div>
			</div>

			<div className="mt-4 rounded-xl bg-white/5 p-4">
				<div className="mb-3 flex items-center justify-between">
					<span className="text-sm text-white/80">Game Preview</span>
					<span className="text-sm text-white/60">Score: 0</span>
				</div>
				<div className="aspect-square rounded-lg border border-green-500/30 bg-green-900/30 p-2">
					<div className="flex h-full w-full items-center justify-center rounded bg-green-900/20">
						<span className="text-green-400 text-sm">
							🐍 Press Space to Start
						</span>
					</div>
				</div>
			</div>
		</BaseAppContent>
	);
};
