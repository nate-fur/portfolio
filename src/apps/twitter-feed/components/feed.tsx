import { cn } from "~/lib/utils";
import type { XPost } from "../types";
import { EmptyState } from "./empty-state";
import { ErrorState } from "./error-state";
import { FeedHeader } from "./feed-header";
import { LoadingSkeleton } from "./loading-skeleton";
import { PostCard } from "./post-card";

interface FeedProps {
  posts: XPost[];
  isLoading: boolean;
  error: string | null;
  onRefresh: () => void;
  isRefreshing?: boolean;
  className?: string;
}

export const Feed = ({
  posts,
  isLoading,
  error,
  onRefresh,
  isRefreshing = false,
  className,
}: FeedProps) => {
  return (
    <div className={cn("space-y-6", className)}>
      {/* Feed Header */}
      <FeedHeader 
        onRefresh={onRefresh} 
        isRefreshing={isRefreshing}
      />

      {/* Feed Content */}
      <div className="space-y-4">
        {/* Loading State */}
        {isLoading && !isRefreshing && (
          <LoadingSkeleton />
        )}

        {/* Error State */}
        {error && !isLoading && (
          <ErrorState 
            error={error} 
            onRetry={onRefresh}
            isRetrying={isRefreshing}
          />
        )}

        {/* Empty State */}
        {!isLoading && !error && posts.length === 0 && (
          <EmptyState />
        )}

        {/* Posts */}
        {!isLoading && !error && posts.length > 0 && (
          <div className="space-y-4">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>

      {/* Instructions */}
      {!isLoading && !error && posts.length > 0 && (
        <div className="rounded-lg border bg-muted/50 p-4 text-center">
          <p className="text-muted-foreground text-sm">
            💡 This feed displays the latest posts from the portfolio owner's X account
          </p>
        </div>
      )}
    </div>
  );
};