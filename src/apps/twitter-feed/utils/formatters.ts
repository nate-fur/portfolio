export function formatRelativeTime(dateString: string): string {
	const date = new Date(dateString);
	const now = new Date();
	const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

	if (diffInSeconds < 60) {
		return `${diffInSeconds}s`;
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

	// For older posts, show the actual date
	return date.toLocaleDateString("en-US", {
		month: "short",
		day: "numeric",
		year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
	});
}

export function formatEngagementCount(count: number): string {
	if (count < 1000) {
		return count.toString();
	}

	if (count < 1000000) {
		const k = count / 1000;
		return k % 1 === 0 ? `${k}K` : `${k.toFixed(1)}K`;
	}

	const m = count / 1000000;
	return m % 1 === 0 ? `${m}M` : `${m.toFixed(1)}M`;
}

export function extractTextWithEntities(
	text: string,
	entities?: {
		urls?: Array<{
			start: number;
			end: number;
			url: string;
			expanded_url: string;
			display_url: string;
		}>;
		hashtags?: Array<{
			start: number;
			end: number;
			tag: string;
		}>;
		mentions?: Array<{
			start: number;
			end: number;
			username: string;
		}>;
	},
): Array<{ type: "text" | "url" | "hashtag" | "mention"; content: string; url?: string }> {
	if (!entities) {
		return [{ type: "text", content: text }];
	}

	const allEntities = [
		...(entities.urls || []).map(e => ({
			...e,
			type: "url" as const,
			display: e.display_url,
			href: e.expanded_url,
		})),
		...(entities.hashtags || []).map(e => ({
			...e,
			type: "hashtag" as const,
			display: `#${e.tag}`,
			href: `https://twitter.com/hashtag/${e.tag}`,
		})),
		...(entities.mentions || []).map(e => ({
			...e,
			type: "mention" as const,
			display: `@${e.username}`,
			href: `https://twitter.com/${e.username}`,
		})),
	].sort((a, b) => a.start - b.start);

	if (allEntities.length === 0) {
		return [{ type: "text", content: text }];
	}

	const result: Array<{ type: "text" | "url" | "hashtag" | "mention"; content: string; url?: string }> = [];
	let lastEnd = 0;

	for (const entity of allEntities) {
		// Add text before entity
		if (entity.start > lastEnd) {
			const textContent = text.substring(lastEnd, entity.start);
			if (textContent.trim()) {
				result.push({ type: "text", content: textContent });
			}
		}

		// Add entity
		result.push({
			type: entity.type,
			content: entity.display,
			url: entity.href,
		});

		lastEnd = entity.end;
	}

	// Add remaining text
	if (lastEnd < text.length) {
		const textContent = text.substring(lastEnd);
		if (textContent.trim()) {
			result.push({ type: "text", content: textContent });
		}
	}

	return result;
}

export function truncateText(text: string, maxLength: number): string {
	if (text.length <= maxLength) {
		return text;
	}

	const truncated = text.substring(0, maxLength - 3);
	const lastSpaceIndex = truncated.lastIndexOf(" ");
	
	if (lastSpaceIndex > maxLength * 0.8) {
		return truncated.substring(0, lastSpaceIndex) + "...";
	}
	
	return truncated + "...";
}

export function generateRandomString(length: number): string {
	const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	let result = "";
	for (let i = 0; i < length; i++) {
		result += charset.charAt(Math.floor(Math.random() * charset.length));
	}
	return result;
}