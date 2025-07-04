import { BaseAppContent } from "~/apps/base-app-content";
import { useXFeed } from "../hooks/use-x-feed";
import { Feed } from "./feed";

export const XFeedApp = () => {
  const { posts, isLoading, error, refresh, isRefreshing } = useXFeed();

  return (
    <BaseAppContent
      title="X Feed"
      description="Stay updated with the latest posts and thoughts from the portfolio owner's X (Twitter) account. This feed displays the most recent posts, showcasing professional insights, project updates, and tech discussions."
      technologies={["React", "TypeScript", "X API v2", "Real-time Updates"]}
    >
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-xl bg-white/10 p-4">
          <h4 className="mb-2 font-medium text-foreground text-sm">
            Live Social Feed
          </h4>
          <p className="text-muted-foreground text-sm">
            Real-time integration with X (Twitter) API to display the latest posts and updates.
          </p>
        </div>
        <div className="rounded-xl bg-white/10 p-4">
          <h4 className="mb-2 font-medium text-foreground text-sm">
            Smart Caching
          </h4>
          <p className="text-muted-foreground text-sm">
            Optimized with intelligent caching to reduce API calls and improve performance.
          </p>
        </div>
      </div>

      <div className="mt-6">
        <Feed
          posts={posts}
          isLoading={isLoading}
          error={error}
          onRefresh={refresh}
          isRefreshing={isRefreshing}
        />
      </div>
    </BaseAppContent>
  );
};