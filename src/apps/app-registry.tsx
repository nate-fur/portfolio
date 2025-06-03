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
import { ChatbotApp } from "~/apps/chatbot";
import { DefaultThumbnail } from "~/apps/default-thumbnail";
import { SnakeGameApp } from "~/apps/snake-game";
import { SpotifyApp } from "~/apps/spotify";
import { ThemeCustomizerApp } from "~/apps/theme-customizer";
import type { AppThumbnailProps } from "~/apps/types";

// App interface that combines all app properties
export interface App {
	id: string;
	name: string;
	icon: LucideIcon;
	size: "small" | "medium" | "large";
	contentComponent: () => ReactNode;
	thumbnailComponent: (props: AppThumbnailProps) => ReactNode;
	hasCustomContent: boolean;
	hasCustomThumbnail: boolean;
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
		thumbnailComponent: (props) => (
			<DefaultThumbnail name="AI Assistant" icon={Bot} {...props} />
		),
		hasCustomContent: true,
		hasCustomThumbnail: false,
	},
	snake: {
		id: "snake",
		name: "Snake",
		icon: Gamepad2,
		size: "small",
		contentComponent: () => <SnakeGameApp />,
		thumbnailComponent: (props) => (
			<DefaultThumbnail name="Snake" icon={Gamepad2} {...props} />
		),
		hasCustomContent: true,
		hasCustomThumbnail: false,
	},
	spotify: {
		id: "spotify",
		name: "Spotify",
		icon: Music,
		size: "large",
		contentComponent: () => <SpotifyApp />,
		thumbnailComponent: (props) => (
			<DefaultThumbnail name="Spotify" icon={Music} {...props} />
		),
		hasCustomContent: true,
		hasCustomThumbnail: false,
	},
	"theme-customizer": {
		id: "theme-customizer",
		name: "Theme Customizer",
		icon: Palette,
		size: "medium",
		contentComponent: () => <ThemeCustomizerApp />,
		thumbnailComponent: (props) => (
			<DefaultThumbnail name="Theme Customizer" icon={Palette} {...props} />
		),
		hasCustomContent: true,
		hasCustomThumbnail: false,
	},
	"tech-stack": {
		id: "tech-stack",
		name: "Tech Stack",
		icon: Layers,
		size: "medium",
		contentComponent: () => <DefaultAppContent appName="Tech Stack" />,
		thumbnailComponent: (props) => (
			<DefaultThumbnail name="Tech Stack" icon={Layers} {...props} />
		),
		hasCustomContent: false,
		hasCustomThumbnail: false,
	},
	"video-playlist": {
		id: "video-playlist",
		name: "Videos",
		icon: Video,
		size: "small",
		contentComponent: () => <DefaultAppContent appName="Videos" />,
		thumbnailComponent: (props) => (
			<DefaultThumbnail name="Videos" icon={Video} {...props} />
		),
		hasCustomContent: false,
		hasCustomThumbnail: false,
	},
	minesweeper: {
		id: "minesweeper",
		name: "Minesweeper",
		icon: Gamepad2,
		size: "medium",
		contentComponent: () => <DefaultAppContent appName="Minesweeper" />,
		thumbnailComponent: (props) => (
			<DefaultThumbnail name="Minesweeper" icon={Gamepad2} {...props} />
		),
		hasCustomContent: false,
		hasCustomThumbnail: false,
	},
	blog: {
		id: "blog",
		name: "Blog",
		icon: FileText,
		size: "large",
		contentComponent: () => <DefaultAppContent appName="Blog" />,
		thumbnailComponent: (props) => (
			<DefaultThumbnail name="Blog" icon={FileText} {...props} />
		),
		hasCustomContent: false,
		hasCustomThumbnail: false,
	},
	"twitter-feed": {
		id: "twitter-feed",
		name: "X Feed",
		icon: Twitter,
		size: "small",
		contentComponent: () => <DefaultAppContent appName="X Feed" />,
		thumbnailComponent: (props) => (
			<DefaultThumbnail name="X Feed" icon={Twitter} {...props} />
		),
		hasCustomContent: false,
		hasCustomThumbnail: false,
	},
	"code-inspector": {
		id: "code-inspector",
		name: "Code Inspector",
		icon: Code,
		size: "medium",
		contentComponent: () => <DefaultAppContent appName="Code Inspector" />,
		thumbnailComponent: (props) => (
			<DefaultThumbnail name="Code Inspector" icon={Code} {...props} />
		),
		hasCustomContent: false,
		hasCustomThumbnail: false,
	},
	"github-analyzer": {
		id: "github-analyzer",
		name: "GitHub Analyzer",
		icon: Github,
		size: "large",
		contentComponent: () => <DefaultAppContent appName="GitHub Analyzer" />,
		thumbnailComponent: (props) => (
			<DefaultThumbnail name="GitHub Analyzer" icon={Github} {...props} />
		),
		hasCustomContent: false,
		hasCustomThumbnail: false,
	},
	"mcp-tool": {
		id: "mcp-tool",
		name: "MCP Tool",
		icon: Wrench,
		size: "small",
		contentComponent: () => <DefaultAppContent appName="MCP Tool" />,
		thumbnailComponent: (props) => (
			<DefaultThumbnail name="MCP Tool" icon={Wrench} {...props} />
		),
		hasCustomContent: false,
		hasCustomThumbnail: false,
	},
	"url-shortener": {
		id: "url-shortener",
		name: "URL Shortener",
		icon: Link,
		size: "medium",
		contentComponent: () => <DefaultAppContent appName="URL Shortener" />,
		thumbnailComponent: (props) => (
			<DefaultThumbnail name="URL Shortener" icon={Link} {...props} />
		),
		hasCustomContent: false,
		hasCustomThumbnail: false,
	},
	"stock-simulator": {
		id: "stock-simulator",
		name: "Stock Simulator",
		icon: TrendingUp,
		size: "medium",
		contentComponent: () => <DefaultAppContent appName="Stock Simulator" />,
		thumbnailComponent: (props) => (
			<DefaultThumbnail name="Stock Simulator" icon={TrendingUp} {...props} />
		),
		hasCustomContent: false,
		hasCustomThumbnail: false,
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

/**
 * Check if an app has custom content implemented
 * @param appId - The ID of the app
 * @returns True if the app has custom content, false otherwise
 */
export const hasCustomContent = (appId: string): boolean => {
	const app = APP_REGISTRY[appId];
	return app ? app.hasCustomContent : false;
};

/**
 * Check if an app has a custom thumbnail implemented
 * @param appId - The ID of the app
 * @returns True if the app has a custom thumbnail, false if it uses DefaultThumbnail
 */
export const hasCustomThumbnail = (appId: string): boolean => {
	const app = APP_REGISTRY[appId];
	return app ? app.hasCustomThumbnail : false;
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
