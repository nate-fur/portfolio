import type { LucideIcon } from "lucide-react";
import {
	Bot,
	Code,
	FileText,
	Gamepad2,
	Github,
	Layers,
	Link,
	Music,
	Palette,
	TrendingUp,
	Twitter,
	Video,
	Wrench,
} from "lucide-react";
import type { ReactNode } from "react";

// Import app components
import { BaseAppContent } from "~/apps/base-app-content";
import { BlogThumbnail } from "~/apps/blog";
import { ChatbotApp, ChatbotThumbnail } from "~/apps/chatbot";
import { CodeInspectorThumbnail } from "~/apps/code-inspector";
import { DefaultThumbnail } from "~/apps/default-thumbnail";
import { GitHubAnalyzerThumbnail } from "~/apps/github-analyzer";
import { McpToolThumbnail } from "~/apps/mcp-tool";
import { MinesweeperThumbnail } from "~/apps/minesweeper";
import { SnakeGameApp, SnakeGameThumbnail } from "~/apps/snake-game";
import { SpotifyApp, SpotifyThumbnail } from "~/apps/spotify";
import { StockSimulatorThumbnail } from "~/apps/stock-simulator";
import { TechStackThumbnail } from "~/apps/tech-stack";
import {
	ThemeCustomizerApp,
	ThemeCustomizerThumbnail,
} from "~/apps/theme-customizer";
import { TwitterFeedThumbnail } from "~/apps/twitter-feed";
import type { AppThumbnailProps } from "~/apps/types";
import { UrlShortenerThumbnail } from "~/apps/url-shortener";
import { VideoPlaylistThumbnail } from "~/apps/video-playlist";

// App interface that combines all app properties
export interface App {
	id: string;
	name: string;
	icon: LucideIcon;
	size: "small" | "medium" | "large";
	contentComponent: () => ReactNode;
	thumbnailComponent: (props: AppThumbnailProps) => ReactNode;
}

// Default app content for apps that don't have specific implementations yet
const DefaultAppContent = ({ appName }: { appName: string }) => (
	<BaseAppContent
		title={`${appName} Application`}
		description={`This is where the ${appName.toLowerCase()} application content would go. You can build out each app's unique interface here.`}
		technologies={["React", "TypeScript", "Tailwind CSS"]}
	>
		<div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
			<div className="rounded-xl bg-muted p-4">
				<h4 className="mb-2 font-medium text-foreground text-sm">Feature 1</h4>
				<p className="text-muted-foreground text-sm">
					Detailed description of this feature and its capabilities.
				</p>
			</div>
			<div className="rounded-xl bg-muted p-4">
				<h4 className="mb-2 font-medium text-foreground text-sm">Feature 2</h4>
				<p className="text-muted-foreground text-sm">
					Another feature with comprehensive details.
				</p>
			</div>
		</div>
	</BaseAppContent>
);

// Consolidated app registry
const APP_REGISTRY: Record<string, App> = {
	chatbot: {
		id: "chatbot",
		name: "AI Assistant",
		icon: Bot,
		size: "large",
		contentComponent: () => <ChatbotApp />,
		thumbnailComponent: (props) => <ChatbotThumbnail {...props} />,
	},
	snake: {
		id: "snake",
		name: "Snake",
		icon: Gamepad2,
		size: "small",
		contentComponent: () => <SnakeGameApp />,
		thumbnailComponent: (props) => <SnakeGameThumbnail {...props} />,
	},
	spotify: {
		id: "spotify",
		name: "Spotify",
		icon: Music,
		size: "large",
		contentComponent: () => <SpotifyApp />,
		thumbnailComponent: (props) => <SpotifyThumbnail {...props} />,
	},
	"theme-customizer": {
		id: "theme-customizer",
		name: "Theme Customizer",
		icon: Palette,
		size: "medium",
		contentComponent: () => <ThemeCustomizerApp />,
		thumbnailComponent: (props) => <ThemeCustomizerThumbnail {...props} />,
	},
	"tech-stack": {
		id: "tech-stack",
		name: "Tech Stack",
		icon: Layers,
		size: "medium",
		contentComponent: () => <DefaultAppContent appName="Tech Stack" />,
		thumbnailComponent: (props) => <TechStackThumbnail {...props} />,
	},
	"video-playlist": {
		id: "video-playlist",
		name: "Videos",
		icon: Video,
		size: "small",
		contentComponent: () => <DefaultAppContent appName="Videos" />,
		thumbnailComponent: (props) => <VideoPlaylistThumbnail {...props} />,
	},
	minesweeper: {
		id: "minesweeper",
		name: "Minesweeper",
		icon: Gamepad2,
		size: "medium",
		contentComponent: () => <DefaultAppContent appName="Minesweeper" />,
		thumbnailComponent: (props) => <MinesweeperThumbnail {...props} />,
	},
	blog: {
		id: "blog",
		name: "Blog",
		icon: FileText,
		size: "large",
		contentComponent: () => <DefaultAppContent appName="Blog" />,
		thumbnailComponent: (props) => <BlogThumbnail {...props} />,
	},
	"twitter-feed": {
		id: "twitter-feed",
		name: "X Feed",
		icon: Twitter,
		size: "small",
		contentComponent: () => <DefaultAppContent appName="X Feed" />,
		thumbnailComponent: (props) => <TwitterFeedThumbnail {...props} />,
	},
	"code-inspector": {
		id: "code-inspector",
		name: "Code Inspector",
		icon: Code,
		size: "medium",
		contentComponent: () => <DefaultAppContent appName="Code Inspector" />,
		thumbnailComponent: (props) => <CodeInspectorThumbnail {...props} />,
	},
	"github-analyzer": {
		id: "github-analyzer",
		name: "GitHub Analyzer",
		icon: Github,
		size: "large",
		contentComponent: () => <DefaultAppContent appName="GitHub Analyzer" />,
		thumbnailComponent: (props) => <GitHubAnalyzerThumbnail {...props} />,
	},
	"mcp-tool": {
		id: "mcp-tool",
		name: "MCP Tool",
		icon: Wrench,
		size: "small",
		contentComponent: () => <DefaultAppContent appName="MCP Tool" />,
		thumbnailComponent: (props) => <McpToolThumbnail {...props} />,
	},
	"url-shortener": {
		id: "url-shortener",
		name: "URL Shortener",
		icon: Link,
		size: "medium",
		contentComponent: () => <DefaultAppContent appName="URL Shortener" />,
		thumbnailComponent: (props) => <UrlShortenerThumbnail {...props} />,
	},
	"stock-simulator": {
		id: "stock-simulator",
		name: "Stock Simulator",
		icon: TrendingUp,
		size: "medium",
		contentComponent: () => (
			<BaseAppContent
				title="Stock Simulator"
				description="A comprehensive stock market simulation platform to practice trading strategies and learn about financial markets without real money risks."
				technologies={[
					"React",
					"TypeScript",
					"Financial APIs",
					"Real-time Data",
				]}
			/>
		),
		thumbnailComponent: (props) => <StockSimulatorThumbnail {...props} />,
	},
};

/**
 * Get all registered apps as an array
 */
export const getAllApps = (): App[] => {
	return Object.values(APP_REGISTRY);
};

/**
 * Get a specific app by its ID
 */
export const getApp = (appId: string): App | null => {
	return APP_REGISTRY[appId] || null;
};

/**
 * Get the content component for a specific app ID
 * @param appId - The ID of the app
 * @returns The content component for the app, or null if not found
 */
export const getAppContent = (appId: string): ReactNode => {
	const app = APP_REGISTRY[appId];
	return app ? app.contentComponent() : null;
};

/**
 * Get the thumbnail component for a specific app ID
 * @param appId - The ID of the app
 * @param props - Props to pass to the thumbnail component
 * @returns The thumbnail component for the app, or null if not found
 */
export const getAppThumbnail = (
	appId: string,
	props: AppThumbnailProps = {},
): ReactNode => {
	const app = APP_REGISTRY[appId];
	return app ? app.thumbnailComponent(props) : null;
};

// Export the registry for backward compatibility (if needed)
export { APP_REGISTRY };

// Legacy compatibility exports
export const APP_CONTENT_REGISTRY: Record<string, () => ReactNode> =
	Object.fromEntries(
		Object.entries(APP_REGISTRY).map(([id, app]) => [id, app.contentComponent]),
	);

export const APP_THUMBNAIL_REGISTRY: Record<
	string,
	(props: AppThumbnailProps) => ReactNode
> = Object.fromEntries(
	Object.entries(APP_REGISTRY).map(([id, app]) => [id, app.thumbnailComponent]),
);
