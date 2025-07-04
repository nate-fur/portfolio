import { RiMessage3Line } from "react-icons/ri";
import { cn } from "~/lib/utils";

interface EmptyStateProps {
  className?: string;
}

export const EmptyState = ({ className }: EmptyStateProps) => {
  return (
    <div 
      className={cn(
        "flex flex-col items-center justify-center space-y-4 rounded-lg border bg-card p-8 text-center",
        className
      )}
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
        <RiMessage3Line className="h-8 w-8 text-muted-foreground" />
      </div>
      
      <div className="space-y-2">
        <h3 className="font-medium text-foreground">
          No Posts Available
        </h3>
        <p className="text-muted-foreground text-sm">
          There are no posts to display at the moment.
        </p>
      </div>
    </div>
  );
};