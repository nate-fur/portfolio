import { PostCard } from "./post-card";
import { LoadingSkeleton } from "./loading-skeleton";
import { ErrorState } from "./error-state";
import type { XPost, XUser, XMedia } from "../types";
import { ERROR_MESSAGES } from "../utils/constants";

interface FeedProps {
	posts: XPost[];
	users: { [key: string]: XUser };
	media: { [key: string]: XMedia };
	isLoading: boolean;
	error: string | null;
	onRetry: () => void;
}

export const Feed = ({ posts, users, media, isLoading, error, onRetry }: FeedProps) => {
	if (isLoading && posts.length === 0) {
		return <LoadingSkeleton count={5} />;
	}

	if (error) {
		return <ErrorState error={error} onRetry={onRetry} />;
	}

	if (posts.length === 0) {
		return (
			<div className="bg-card border border-border rounded-lg p-8 text-center">
				<div className="text-muted-foreground text-6xl mb-4">📝</div>
				<h3 className="text-lg font-medium text-foreground mb-2">
					No posts found
				</h3>
				<p className="text-muted-foreground mb-4">
					{ERROR_MESSAGES.NO_POSTS}
				</p>
				<button
					onClick={onRetry}
					className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg transition-colors"
				>
					Try Again
				</button>
			</div>
		);
	}

	return (
		<div className="space-y-4">
			{posts.map((post) => {
				const author = users[post.author_id];
				const postMedia = post.attachments?.media_keys
					?.map(key => media[key])
					.filter((item): item is XMedia => Boolean(item)) || [];

				return (
					<PostCard
						key={post.id}
						post={post}
						author={author}
						media={postMedia}
					/>
				);
			})}
			
			{isLoading && (
				<div className="pt-4">
					<LoadingSkeleton count={2} />
				</div>
			)}
		</div>
	);
};