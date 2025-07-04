import { cn } from "~/lib/utils";

interface LoadingSkeletonProps {
  className?: string;
}

export const LoadingSkeleton = ({ className }: LoadingSkeletonProps) => {
  return (
    <div className={cn("space-y-4", className)}>
      {/* Skeleton posts */}
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse rounded-lg border bg-card p-4"
        >
          {/* Header with avatar and name */}
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-full bg-muted" />
            <div className="space-y-1">
              <div className="h-4 w-32 rounded bg-muted" />
              <div className="h-3 w-24 rounded bg-muted" />
            </div>
          </div>

          {/* Content */}
          <div className="mt-3 space-y-2">
            <div className="h-4 w-full rounded bg-muted" />
            <div className="h-4 w-3/4 rounded bg-muted" />
            <div className="h-4 w-1/2 rounded bg-muted" />
          </div>

          {/* Metrics */}
          <div className="mt-4 flex space-x-6">
            <div className="h-4 w-12 rounded bg-muted" />
            <div className="h-4 w-12 rounded bg-muted" />
            <div className="h-4 w-12 rounded bg-muted" />
          </div>
        </div>
      ))}
    </div>
  );
};