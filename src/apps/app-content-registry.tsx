import type { ReactNode } from "react";
import { BaseAppContent } from "~/apps/base-app-content";
import { ChatbotApp } from "~/apps/chatbot";
import { SnakeGameApp } from "~/apps/snake-game-app";
import { SpotifyApp } from "~/apps/spotify-app";

// Default app content for apps that don't have specific implementations yet
const DefaultAppContent = ({ appName }: { appName: string }) => (
	<BaseAppContent
		title={`${appName} Application`}
		description={`This is where the ${appName.toLowerCase()} application content would go. You can build out each app's unique interface here.`}
		technologies={["React", "TypeScript", "Tailwind CSS"]}
	>
		<div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
			<div className="rounded-xl bg-white/10 p-4">
				<h4 className="mb-2 font-medium text-sm text-white">Feature 1</h4>
				<p className="text-sm text-white/70">
					Detailed description of this feature and its capabilities.
				</p>
			</div>
			<div className="rounded-xl bg-white/10 p-4">
				<h4 className="mb-2 font-medium text-sm text-white">Feature 2</h4>
				<p className="text-sm text-white/70">
					Another feature with comprehensive details.
				</p>
			</div>
		</div>
	</BaseAppContent>
);

// Registry mapping app IDs to their content components
const APP_CONTENT_REGISTRY: Record<string, () => ReactNode> = {
	chatbot: () => <ChatbotApp />,
	snake: () => <SnakeGameApp />,
	spotify: () => <SpotifyApp />,
	// Add more app content components here as they are created
	"tech-stack": () => <DefaultAppContent appName="Tech Stack" />,
	"video-playlist": () => <DefaultAppContent appName="Videos" />,
	minesweeper: () => <DefaultAppContent appName="Minesweeper" />,
	blog: () => <DefaultAppContent appName="Blog" />,
	"twitter-feed": () => <DefaultAppContent appName="X Feed" />,
	"code-inspector": () => <DefaultAppContent appName="Code Inspector" />,
	"github-analyzer": () => <DefaultAppContent appName="GitHub Analyzer" />,
	"mcp-tool": () => <DefaultAppContent appName="MCP Tool" />,
	"url-shortener": () => <DefaultAppContent appName="URL Shortener" />,
	"stock-simulator": () => <DefaultAppContent appName="Stock Simulator" />,
};

/**
 * Get the content component for a specific app ID
 * @param appId - The ID of the app
 * @returns The content component for the app, or null if not found
 */
export const getAppContent = (appId: string): ReactNode => {
	const contentFactory = APP_CONTENT_REGISTRY[appId];
	return contentFactory ? contentFactory() : null;
};

/**
 * Check if an app has custom content implemented
 * @param appId - The ID of the app
 * @returns True if the app has custom content, false otherwise
 */
export const hasCustomContent = (appId: string): boolean => {
	return (
		appId in APP_CONTENT_REGISTRY &&
		APP_CONTENT_REGISTRY[appId] !==
			(() => <DefaultAppContent appName={appId} />)
	);
};

export { APP_CONTENT_REGISTRY };
