import { RiErrorWarningLine, RiRefreshLine } from "react-icons/ri";

interface ErrorStateProps {
	error: string;
	onRetry?: () => void;
	showRetry?: boolean;
}

export const ErrorState = ({ error, onRetry, showRetry = true }: ErrorStateProps) => {
	return (
		<div className="bg-card border border-border rounded-lg p-8 text-center">
			<div className="flex justify-center mb-4">
				<RiErrorWarningLine className="text-destructive text-4xl" />
			</div>
			
			<h3 className="text-lg font-medium text-foreground mb-2">
				Something went wrong
			</h3>
			
			<p className="text-muted-foreground mb-6 max-w-md mx-auto">
				{error}
			</p>
			
			{showRetry && onRetry && (
				<button
					onClick={onRetry}
					className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg transition-colors"
				>
					<RiRefreshLine className="text-lg" />
					Try Again
				</button>
			)}
		</div>
	);
};