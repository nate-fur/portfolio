import { RiRefreshLine } from "react-icons/ri";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

interface FeedHeaderProps {
  onRefresh: () => void;
  isRefreshing?: boolean;
  className?: string;
}

export const FeedHeader = ({ 
  onRefresh, 
  isRefreshing = false, 
  className 
}: FeedHeaderProps) => {
  return (
    <div className={cn("flex items-center justify-between", className)}>
      <div>
        <h2 className="font-semibold text-foreground text-lg">
          X Feed
        </h2>
        <p className="text-muted-foreground text-sm">
          Latest posts and updates
        </p>
      </div>

      <Button
        onClick={onRefresh}
        disabled={isRefreshing}
        variant="outline"
        size="sm"
        className="ml-4"
      >
        <RiRefreshLine 
          className={cn(
            "h-4 w-4",
            isRefreshing && "animate-spin"
          )} 
        />
        <span className="sr-only">Refresh posts</span>
      </Button>
    </div>
  );
};