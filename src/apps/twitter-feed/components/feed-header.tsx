import Image from "next/image";
import { RiRefreshLine, RiLogoutBoxLine, RiVerifiedBadgeFill } from "react-icons/ri";
import type { XUser } from "../types";
import { formatEngagementCount } from "../utils/formatters";

interface FeedHeaderProps {
	user?: XUser;
	onRefresh: () => void;
	onSignOut: () => void;
	isLoading?: boolean;
	lastFetch?: number | null;
}

export const FeedHeader = ({ 
	user, 
	onRefresh, 
	onSignOut, 
	isLoading = false,
	lastFetch 
}: FeedHeaderProps) => {
	const formatLastUpdate = () => {
		if (!lastFetch) return "Never";
		
		const now = Date.now();
		const diffInSeconds = Math.floor((now - lastFetch) / 1000);
		
		if (diffInSeconds < 60) {
			return "Just now";
		}
		
		const diffInMinutes = Math.floor(diffInSeconds / 60);
		if (diffInMinutes < 60) {
			return `${diffInMinutes} minutes ago`;
		}
		
		const diffInHours = Math.floor(diffInMinutes / 60);
		if (diffInHours < 24) {
			return `${diffInHours} hours ago`;
		}
		
		const diffInDays = Math.floor(diffInHours / 24);
		return `${diffInDays} days ago`;
	};

	return (
		<div className="bg-card border border-border rounded-lg p-4 mb-6">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					{user && (
						<>
							<div className="relative">
								<Image
									src={user.profile_image_url}
									alt={`${user.name}'s profile picture`}
									width={48}
									height={48}
									className="rounded-full"
								/>
							</div>
							<div>
								<div className="flex items-center gap-2">
									<h2 className="text-lg font-semibold text-foreground">
										{user.name}
									</h2>
									{user.verified && (
										<RiVerifiedBadgeFill className="text-blue-500 text-lg" />
									)}
								</div>
								<div className="flex items-center gap-4 text-sm text-muted-foreground">
									<span>@{user.username}</span>
									<span>•</span>
									<span>{formatEngagementCount(user.public_metrics.followers_count)} followers</span>
								</div>
							</div>
						</>
					)}
					{!user && (
						<div>
							<h2 className="text-lg font-semibold text-foreground">
								X Feed
							</h2>
							<p className="text-sm text-muted-foreground">
								Your recent posts
							</p>
						</div>
					)}
				</div>
				
				<div className="flex items-center gap-2">
					<button
						onClick={onRefresh}
						disabled={isLoading}
						className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 disabled:bg-primary/50 text-primary-foreground px-3 py-2 rounded-lg transition-colors text-sm"
					>
						<RiRefreshLine className={`text-lg ${isLoading ? 'animate-spin' : ''}`} />
						{isLoading ? "Refreshing..." : "Refresh"}
					</button>
					
					<button
						onClick={onSignOut}
						className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary/80 text-secondary-foreground px-3 py-2 rounded-lg transition-colors text-sm"
					>
						<RiLogoutBoxLine className="text-lg" />
						Sign Out
					</button>
				</div>
			</div>
			
			{lastFetch && (
				<div className="mt-3 pt-3 border-t border-border">
					<p className="text-xs text-muted-foreground">
						Last updated: {formatLastUpdate()}
					</p>
				</div>
			)}
		</div>
	);
};