/**
 * Format a date string into a relative time string (e.g., "2h ago", "1d ago")
 */
export const formatRelativeTime = (dateString: string): string => {
  const now = new Date();
  const date = new Date(dateString);
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return 'now';
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes}m`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours}h`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays}d`;
  }

  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) {
    return `${diffInWeeks}w`;
  }

  // For dates older than 4 weeks, show the actual date
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
  });
};

/**
 * Format large numbers into compact form (e.g., 1.2K, 1.5M)
 */
export const formatMetricCount = (count: number): string => {
  if (count < 1000) {
    return count.toString();
  }

  if (count < 1000000) {
    const formatted = (count / 1000).toFixed(1);
    return `${formatted.endsWith('.0') ? formatted.slice(0, -2) : formatted}K`;
  }

  const formatted = (count / 1000000).toFixed(1);
  return `${formatted.endsWith('.0') ? formatted.slice(0, -2) : formatted}M`;
};

/**
 * Truncate text to a maximum length with ellipsis
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) {
    return text;
  }

  return text.substring(0, maxLength - 3) + '...';
};

/**
 * Extract and format URLs from post entities
 */
export const formatPostUrls = (
  text: string,
  entities?: {
    urls: Array<{
      url: string;
      displayUrl: string;
      expandedUrl: string;
    }>;
  }
): string => {
  if (!entities?.urls) {
    return text;
  }

  let formattedText = text;

  entities.urls.forEach((urlEntity) => {
    formattedText = formattedText.replace(
      urlEntity.url,
      urlEntity.displayUrl
    );
  });

  return formattedText;
};