import type { ReactNode } from "react";

interface BaseAppContentProps {
	title: string;
	description: string;
	children?: ReactNode;
	technologies?: string[];
	fullWidth?: boolean;
}

export const BaseAppContent = ({
	title,
	description,
	children,
	technologies = [],
	fullWidth = false,
}: BaseAppContentProps) => {
	return (
		<div className="flex min-h-64 flex-col rounded-lg border bg-card p-6">
			<p className="mb-6 text-muted-foreground text-sm leading-relaxed">
				{description}
			</p>

			{children && (
				<div
					className={`mb-6 flex-1 overflow-auto ${fullWidth ? "-mx-6" : ""}`}
				>
					{children}
				</div>
			)}

			{technologies.length > 0 && (
				<div className="mt-auto rounded-lg border bg-muted p-4">
					<h4 className="mb-2 font-medium text-muted-foreground text-sm">
						Technologies
					</h4>
					<div className="flex flex-wrap gap-2 bg-accent">
						{technologies.map((tech) => (
							<span
								key={tech}
								className="rounded-full bg-accent px-3 py-1 text-accent-foreground text-sm"
							>
								{tech}
							</span>
						))}
					</div>
				</div>
			)}
		</div>
	);
};
