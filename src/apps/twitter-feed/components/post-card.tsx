import { RiVerifiedBadgeFill, RiHeart3Line, RiMessage3Line, RiRepeat2Line } from "react-icons/ri";
import { motion } from "framer-motion";
import { cn } from "~/lib/utils";
import type { XPost } from "../types";
import { formatRelativeTime, formatMetricCount, formatPostUrls } from "../utils/formatters";

interface PostCardProps {
  post: XPost;
  className?: string;
}

export const PostCard = ({ post, className }: PostCardProps) => {
  const formattedText = formatPostUrls(post.text, post.entities);
  const relativeTime = formatRelativeTime(post.createdAt);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "group rounded-lg border bg-card p-4 transition-all hover:shadow-md",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-start space-x-3">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <img
            src={post.author.profileImageUrl}
            alt={`${post.author.name} avatar`}
            className="h-10 w-10 rounded-full bg-muted object-cover"
            onError={(e) => {
              // Fallback to default avatar if image fails to load
              e.currentTarget.src = '/profile.svg';
            }}
          />
        </div>

        {/* Author info */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center space-x-2">
            <h3 className="truncate font-medium text-foreground text-sm">
              {post.author.name}
            </h3>
                         {post.author.verified && (
               <RiVerifiedBadgeFill className="h-4 w-4 text-blue-500" />
             )}
          </div>
          <div className="flex items-center space-x-2 text-muted-foreground text-xs">
            <span>@{post.author.username}</span>
            <span>•</span>
            <span>{relativeTime}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mt-3">
        <p className="text-foreground text-sm leading-relaxed whitespace-pre-wrap">
          {formattedText}
        </p>

        {/* Media attachments */}
        {post.media && post.media.length > 0 && (
          <div className="mt-3 space-y-2">
            {post.media.map((media, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-lg border bg-muted"
              >
                {media.type === 'image' ? (
                  <img
                    src={media.url}
                    alt={media.altText || `Media attachment ${index + 1}`}
                    className="h-auto w-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex h-32 items-center justify-center bg-muted">
                    <p className="text-muted-foreground text-sm">
                      Video: {media.altText || 'Media attachment'}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Engagement metrics */}
      <div className="mt-4 flex items-center space-x-6 text-muted-foreground">
                 <div className="flex items-center space-x-2 text-xs transition-colors group-hover:text-red-500">
           <RiHeart3Line className="h-4 w-4" />
           <span>{formatMetricCount(post.metrics.likeCount)}</span>
         </div>
         
         <div className="flex items-center space-x-2 text-xs transition-colors group-hover:text-green-500">
           <RiRepeat2Line className="h-4 w-4" />
           <span>{formatMetricCount(post.metrics.retweetCount)}</span>
         </div>
         
         <div className="flex items-center space-x-2 text-xs transition-colors group-hover:text-blue-500">
           <RiMessage3Line className="h-4 w-4" />
           <span>{formatMetricCount(post.metrics.replyCount)}</span>
         </div>
      </div>
    </motion.div>
  );
};