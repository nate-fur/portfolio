"use client";

import { useTheme } from "~/contexts/theme-context";

export const ThemeCustomizerApp = () => {
	const { theme } = useTheme();

	return (
		<div className="space-y-4 rounded-lg border p-6">
			<h3 className="font-semibold text-lg">Current Theme: {theme}</h3>
			<div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
				<div className="space-y-2">
					<div className="h-12 w-full rounded bg-primary" />
					<p className="text-center text-sm">Primary</p>
				</div>
				<div className="space-y-2">
					<div className="h-12 w-full rounded bg-secondary" />
					<p className="text-center text-sm">Secondary</p>
				</div>
				<div className="space-y-2">
					<div className="h-12 w-full rounded bg-accent" />
					<p className="text-center text-sm">Accent</p>
				</div>
				<div className="space-y-2">
					<div className="h-12 w-full rounded bg-muted" />
					<p className="text-center text-sm">Muted</p>
				</div>
			</div>
			<div className="space-y-2">
				<div className="rounded border p-4">
					<p className="text-foreground">
						This is foreground text on background
					</p>
					<p className="text-muted-foreground">This is muted foreground text</p>
				</div>
			</div>
		</div>
	);
};
