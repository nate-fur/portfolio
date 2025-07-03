import type { ReactNode } from "react";
import type { IconType } from "react-icons";
import {
	RiBriefcaseLine,
	RiCodeLine,
	RiFileTextLine,
	RiGamepadLine,
	RiGithubLine,
	RiLineChartLine,
	RiLink,
	RiMusicLine,
	RiPaletteLine,
	RiRobotLine,
	RiStackLine,
	RiToolsLine,
	RiTwitterLine,
	RiVideoLine,
} from "react-icons/ri";

// Import app components
import { BaseAppContent } from "~/apps/base-app-content";
import { BlogThumbnail } from "~/apps/blog";
import { ChatbotApp, ChatbotThumbnail } from "~/apps/chatbot";
import { CodeInspectorThumbnail } from "~/apps/code-inspector";
import { ComingSoon } from "~/apps/coming-soon";
import { DefaultThumbnail } from "~/apps/default-thumbnail";
import { GitHubAnalyzerThumbnail } from "~/apps/github-analyzer";
import { McpToolThumbnail } from "~/apps/mcp-tool";
import { MinesweeperApp, MinesweeperThumbnail } from "~/apps/minesweeper";
import { PastProjectsThumbnail } from "~/apps/past-projects";
import { SnakeGameApp, SnakeGameThumbnail } from "~/apps/snake-game";
import { SpotifyApp, SpotifyThumbnail } from "~/apps/spotify";
import { StockSimulatorThumbnail } from "~/apps/stock-simulator";
import { TechStackApp, TechStackThumbnail } from "~/apps/tech-stack";
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
	icon: IconType;
	size: "small" | "medium" | "large";
	isActive: boolean;
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
	"tech-stack": {
		id: "tech-stack",
		name: "Tech Stack",
		icon: RiStackLine,
		size: "medium",
		isActive: true,
		contentComponent: () => <TechStackApp />,
		thumbnailComponent: (props) => <TechStackThumbnail {...props} />,
	},
	snake: {
		id: "snake",
		name: "Snake",
		icon: RiGamepadLine,
		size: "small",
		isActive: true,
		contentComponent: () => <SnakeGameApp />,
		thumbnailComponent: (props) => <SnakeGameThumbnail {...props} />,
	},
	"past-projects": {
		id: "past-projects",
		name: "Past Projects",
		icon: RiBriefcaseLine,
		size: "large",
		isActive: false,
		contentComponent: () => <ComingSoon appName="Past Projects" />,
		thumbnailComponent: (props) => <PastProjectsThumbnail {...props} />,
	},
	"theme-customizer": {
		id: "theme-customizer",
		name: "Theme Customizer",
		icon: RiPaletteLine,
		size: "medium",
		isActive: false,
		contentComponent: () => <ComingSoon appName="Theme Customizer" />,
		thumbnailComponent: (props) => <ThemeCustomizerThumbnail {...props} />,
	},
	chatbot: {
		id: "chatbot",
		name: "AI Assistant",
		icon: RiRobotLine,
		size: "large",
		isActive: false,
		contentComponent: () => <ComingSoon appName="AI Assistant" />,
		thumbnailComponent: (props) => <ChatbotThumbnail {...props} />,
	},
	"video-playlist": {
		id: "video-playlist",
		name: "Videos",
		icon: RiVideoLine,
		size: "small",
		isActive: false,
		contentComponent: () => <ComingSoon appName="Videos" />,
		thumbnailComponent: (props) => <VideoPlaylistThumbnail {...props} />,
	},
	minesweeper: {
		id: "minesweeper",
		name: "Minesweeper",
		icon: RiGamepadLine,
		size: "medium",
		isActive: true,
		contentComponent: () => <MinesweeperApp />,
		thumbnailComponent: (props) => <MinesweeperThumbnail {...props} />,
	},
	blog: {
		id: "blog",
		name: "Blog",
		icon: RiFileTextLine,
		size: "large",
		isActive: false,
		contentComponent: () => <ComingSoon appName="Blog" />,
		thumbnailComponent: (props) => <BlogThumbnail {...props} />,
	},
	"twitter-feed": {
		id: "twitter-feed",
		name: "X Feed",
		icon: RiTwitterLine,
		size: "small",
		isActive: false,
		contentComponent: () => <ComingSoon appName="X Feed" />,
		thumbnailComponent: (props) => <TwitterFeedThumbnail {...props} />,
	},
	"code-inspector": {
		id: "code-inspector",
		name: "Code Inspector",
		icon: RiCodeLine,
		size: "medium",
		isActive: false,
		contentComponent: () => <ComingSoon appName="Code Inspector" />,
		thumbnailComponent: (props) => <CodeInspectorThumbnail {...props} />,
	},
	"github-analyzer": {
		id: "github-analyzer",
		name: "GitHub Analyzer",
		icon: RiGithubLine,
		size: "large",
		isActive: false,
		contentComponent: () => <ComingSoon appName="GitHub Analyzer" />,
		thumbnailComponent: (props) => <GitHubAnalyzerThumbnail {...props} />,
	},
	"mcp-tool": {
		id: "mcp-tool",
		name: "MCP Tool",
		icon: RiToolsLine,
		size: "small",
		isActive: false,
		contentComponent: () => <ComingSoon appName="MCP Tool" />,
		thumbnailComponent: (props) => <McpToolThumbnail {...props} />,
	},
	"url-shortener": {
		id: "url-shortener",
		name: "URL Shortener",
		icon: RiLink,
		size: "medium",
		isActive: false,
		contentComponent: () => <ComingSoon appName="URL Shortener" />,
		thumbnailComponent: (props) => <UrlShortenerThumbnail {...props} />,
	},
	"stock-simulator": {
		id: "stock-simulator",
		name: "Stock Simulator",
		icon: RiLineChartLine,
		size: "medium",
		isActive: false,
		contentComponent: () => <ComingSoon appName="Stock Simulator" />,
		thumbnailComponent: (props) => <StockSimulatorThumbnail {...props} />,
	},
	spotify: {
		id: "spotify",
		name: "Spotify",
		icon: RiMusicLine,
		size: "large",
		isActive: false,
		contentComponent: () => <ComingSoon appName="Spotify" />,
		thumbnailComponent: (props) => <SpotifyThumbnail {...props} />,
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
 * Get all active apps as an array
 */
export const getActiveApps = (): App[] => {
	return Object.values(APP_REGISTRY).filter((app) => app.isActive);
};

/**
 * Check if an app is active
 * @param appId - The ID of the app
 * @returns True if the app is active, false otherwise
 */
export const isAppActive = (appId: string): boolean => {
	const app = APP_REGISTRY[appId];
	return app ? app.isActive : false;
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
