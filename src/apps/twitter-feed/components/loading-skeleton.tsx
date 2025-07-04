interface LoadingSkeletonProps {
	count?: number;
}

export const LoadingSkeleton = ({ count = 3 }: LoadingSkeletonProps) => {
	return (
		<div className="space-y-4">
			{Array.from({ length: count }).map((_, index) => (
				<div key={index} className="bg-card border border-border rounded-lg p-4 space-y-3">
					{/* Author Info Skeleton */}
					<div className="flex items-center gap-3">
						<div className="w-10 h-10 bg-muted rounded-full animate-pulse" />
						<div className="flex-1 space-y-2">
							<div className="h-4 bg-muted rounded w-32 animate-pulse" />
							<div className="h-3 bg-muted rounded w-24 animate-pulse" />
						</div>
					</div>
					
					{/* Content Skeleton */}
					<div className="space-y-2">
						<div className="h-4 bg-muted rounded w-full animate-pulse" />
						<div className="h-4 bg-muted rounded w-3/4 animate-pulse" />
						<div className="h-4 bg-muted rounded w-1/2 animate-pulse" />
					</div>
					
					{/* Media Skeleton (sometimes) */}
					{index % 2 === 0 && (
						<div className="h-48 bg-muted rounded-lg animate-pulse" />
					)}
					
					{/* Engagement Skeleton */}
					<div className="flex items-center gap-6 pt-2 border-t border-border">
						<div className="flex items-center gap-2">
							<div className="w-5 h-5 bg-muted rounded animate-pulse" />
							<div className="h-3 bg-muted rounded w-6 animate-pulse" />
						</div>
						<div className="flex items-center gap-2">
							<div className="w-5 h-5 bg-muted rounded animate-pulse" />
							<div className="h-3 bg-muted rounded w-6 animate-pulse" />
						</div>
						<div className="flex items-center gap-2">
							<div className="w-5 h-5 bg-muted rounded animate-pulse" />
							<div className="h-3 bg-muted rounded w-6 animate-pulse" />
						</div>
					</div>
				</div>
			))}
		</div>
	);
};