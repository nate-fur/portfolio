import { RiErrorWarningLine, RiRefreshLine } from "react-icons/ri";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

interface ErrorStateProps {
  error: string;
  onRetry: () => void;
  isRetrying?: boolean;
  className?: string;
}

export const ErrorState = ({ 
  error, 
  onRetry, 
  isRetrying = false, 
  className 
}: ErrorStateProps) => {
  return (
    <div 
      className={cn(
        "flex flex-col items-center justify-center space-y-4 rounded-lg border bg-card p-8 text-center",
        className
      )}
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
        <RiErrorWarningLine className="h-8 w-8 text-destructive" />
      </div>
      
      <div className="space-y-2">
        <h3 className="font-medium text-foreground">
          Unable to Load Posts
        </h3>
        <p className="text-muted-foreground text-sm">
          {error}
        </p>
      </div>

      <Button 
        onClick={onRetry}
        disabled={isRetrying}
        variant="outline"
        size="sm"
        className="mt-4"
      >
        {isRetrying ? (
          <>
            <RiRefreshLine className="mr-2 h-4 w-4 animate-spin" />
            Retrying...
          </>
        ) : (
          <>
            <RiRefreshLine className="mr-2 h-4 w-4" />
            Try Again
          </>
        )}
      </Button>
    </div>
  );
};