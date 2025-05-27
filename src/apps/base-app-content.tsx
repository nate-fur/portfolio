import type { ReactNode } from "react";

interface BaseAppContentProps {
	title: string;
	description: string;
	children?: ReactNode;
	technologies?: string[];
}

export const BaseAppContent = ({
	title,
	description,
	children,
	technologies = [],
}: BaseAppContentProps) => {
	return (
		<div className="h-full min-h-64 rounded-xl bg-white/10 p-6 backdrop-blur-md">
			<h3 className="mb-4 font-semibold text-lg text-white">{title}</h3>
			<p className="mb-6 text-sm text-white/80 leading-relaxed">
				{description}
			</p>

			{children && <div className="mb-6">{children}</div>}

			{technologies.length > 0 && (
				<div className="rounded-xl border border-white/10 bg-white/5 p-4">
					<h4 className="mb-2 font-medium text-sm text-white">Technologies</h4>
					<div className="flex flex-wrap gap-2">
						{technologies.map((tech) => (
							<span
								key={tech}
								className="rounded-full bg-white/10 px-3 py-1 text-sm text-white/80"
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
