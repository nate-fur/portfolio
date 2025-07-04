import { RiTwitterLine, RiShieldCheckLine, RiEyeLine, RiTimeLine } from "react-icons/ri";

interface AuthPromptProps {
	onSignIn: () => void;
	isLoading?: boolean;
	error?: string | null;
}

export const AuthPrompt = ({ onSignIn, isLoading = false, error }: AuthPromptProps) => {
	return (
		<div className="bg-card border border-border rounded-lg p-8 text-center">
			<div className="flex justify-center mb-6">
				<div className="bg-blue-500/10 rounded-full p-4">
					<RiTwitterLine className="text-blue-500 text-4xl" />
				</div>
			</div>
			
			<h3 className="text-xl font-semibold text-foreground mb-2">
				Connect Your X Account
			</h3>
			
			<p className="text-muted-foreground mb-6 max-w-md mx-auto">
				Sign in to your X account to view your recent posts and activity in your portfolio.
			</p>
			
			{error && (
				<div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 mb-6">
					<p className="text-destructive text-sm">
						{error}
					</p>
				</div>
			)}
			
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
				<div className="bg-muted/50 rounded-lg p-4">
					<div className="flex justify-center mb-2">
						<RiShieldCheckLine className="text-green-500 text-2xl" />
					</div>
					<h4 className="font-medium text-sm mb-1">Secure OAuth</h4>
					<p className="text-xs text-muted-foreground">
						Safe and secure authentication through X's official OAuth flow
					</p>
				</div>
				
				<div className="bg-muted/50 rounded-lg p-4">
					<div className="flex justify-center mb-2">
						<RiEyeLine className="text-blue-500 text-2xl" />
					</div>
					<h4 className="font-medium text-sm mb-1">Read-Only Access</h4>
					<p className="text-xs text-muted-foreground">
						Only reads your posts and profile information
					</p>
				</div>
				
				<div className="bg-muted/50 rounded-lg p-4">
					<div className="flex justify-center mb-2">
						<RiTimeLine className="text-purple-500 text-2xl" />
					</div>
					<h4 className="font-medium text-sm mb-1">Latest Posts</h4>
					<p className="text-xs text-muted-foreground">
						Shows your 10 most recent posts
					</p>
				</div>
			</div>
			
			<button
				onClick={onSignIn}
				disabled={isLoading}
				className="inline-flex items-center gap-3 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-500/50 text-white px-6 py-3 rounded-lg font-medium transition-colors"
			>
				<RiTwitterLine className="text-lg" />
				{isLoading ? "Signing In..." : "Sign In with X"}
			</button>
			
			<p className="text-xs text-muted-foreground mt-4">
				This will open a secure popup window for authentication
			</p>
		</div>
	);
};