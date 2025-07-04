import Image from "next/image";
import { RiHeartLine, RiRepeatLine, RiChat1Line, RiVerifiedBadgeFill, RiExternalLinkLine } from "react-icons/ri";
import type { XPost, XUser, XMedia } from "../types";
import { formatRelativeTime, formatEngagementCount, extractTextWithEntities } from "../utils/formatters";

interface PostCardProps {
	post: XPost;
	author?: XUser;
	media?: XMedia[];
}

export const PostCard = ({ post, author, media = [] }: PostCardProps) => {
	const textEntities = extractTextWithEntities(post.text, post.entities);

	const handleLinkClick = (url: string) => {
		window.open(url, "_blank", "noopener,noreferrer");
	};

	const formatPostText = () => {
		return textEntities.map((entity, index) => {
			if (entity.type === "url") {
				return (
					<button
						key={index}
						onClick={() => handleLinkClick(entity.url!)}
						className="text-blue-500 hover:text-blue-600 hover:underline transition-colors"
					>
						{entity.content}
					</button>
				);
			}
			
			if (entity.type === "hashtag") {
				return (
					<button
						key={index}
						onClick={() => handleLinkClick(entity.url!)}
						className="text-blue-500 hover:text-blue-600 hover:underline transition-colors"
					>
						{entity.content}
					</button>
				);
			}
			
			if (entity.type === "mention") {
				return (
					<button
						key={index}
						onClick={() => handleLinkClick(entity.url!)}
						className="text-blue-500 hover:text-blue-600 hover:underline transition-colors"
					>
						{entity.content}
					</button>
				);
			}
			
			return <span key={index}>{entity.content}</span>;
		});
	};

	return (
		<div className="bg-card border border-border rounded-lg p-4 space-y-3 hover:bg-accent/50 transition-colors">
			{/* Author Info */}
			<div className="flex items-center gap-3">
				{author && (
					<>
						<div className="relative">
							<Image
								src={author.profile_image_url}
								alt={`${author.name}'s profile picture`}
								width={40}
								height={40}
								className="rounded-full"
							/>
						</div>
						<div className="flex-1 min-w-0">
							<div className="flex items-center gap-2">
								<h4 className="font-medium text-foreground truncate">
									{author.name}
								</h4>
								{author.verified && (
									<RiVerifiedBadgeFill className="text-blue-500 text-sm flex-shrink-0" />
								)}
							</div>
							<div className="flex items-center gap-2 text-sm text-muted-foreground">
								<span>@{author.username}</span>
								<span>•</span>
								<span>{formatRelativeTime(post.created_at)}</span>
							</div>
						</div>
					</>
				)}
				{!author && (
					<div className="flex items-center gap-2 text-sm text-muted-foreground">
						<span>{formatRelativeTime(post.created_at)}</span>
					</div>
				)}
			</div>

			{/* Post Content */}
			<div className="space-y-3">
				<p className="text-foreground text-sm leading-relaxed">
					{formatPostText()}
				</p>

				{/* Media Attachments */}
				{media.length > 0 && (
					<div className="space-y-2">
						{media.map((mediaItem) => (
							<div key={mediaItem.media_key} className="relative">
								{mediaItem.type === "photo" && mediaItem.url && (
									<div className="relative rounded-lg overflow-hidden border">
										<Image
											src={mediaItem.url}
											alt={mediaItem.alt_text || "Image"}
											width={mediaItem.width || 600}
											height={mediaItem.height || 400}
											className="w-full h-auto max-h-96 object-cover"
										/>
									</div>
								)}
								{mediaItem.type === "video" && mediaItem.preview_image_url && (
									<div className="relative rounded-lg overflow-hidden border">
										<Image
											src={mediaItem.preview_image_url}
											alt={mediaItem.alt_text || "Video thumbnail"}
											width={mediaItem.width || 600}
											height={mediaItem.height || 400}
											className="w-full h-auto max-h-96 object-cover"
										/>
										<div className="absolute inset-0 flex items-center justify-center bg-black/20">
											<div className="bg-black/60 rounded-full p-3">
												<svg
													className="w-8 h-8 text-white"
													fill="currentColor"
													viewBox="0 0 24 24"
												>
													<path d="M8 5v14l11-7z" />
												</svg>
											</div>
										</div>
									</div>
								)}
							</div>
						))}
					</div>
				)}
			</div>

			{/* Engagement Metrics */}
			<div className="flex items-center gap-6 pt-2 border-t border-border">
				<div className="flex items-center gap-2 text-muted-foreground">
					<RiChat1Line className="text-lg" />
					<span className="text-sm">
						{formatEngagementCount(post.public_metrics.reply_count)}
					</span>
				</div>
				<div className="flex items-center gap-2 text-muted-foreground">
					<RiRepeatLine className="text-lg" />
					<span className="text-sm">
						{formatEngagementCount(post.public_metrics.retweet_count)}
					</span>
				</div>
				<div className="flex items-center gap-2 text-muted-foreground">
					<RiHeartLine className="text-lg" />
					<span className="text-sm">
						{formatEngagementCount(post.public_metrics.like_count)}
					</span>
				</div>
				<div className="flex-1" />
				<button
					onClick={() => handleLinkClick(`https://twitter.com/i/web/status/${post.id}`)}
					className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
				>
					<RiExternalLinkLine className="text-lg" />
					<span className="text-sm">View on X</span>
				</button>
			</div>
		</div>
	);
};