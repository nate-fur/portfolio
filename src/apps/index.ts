// Base components
export { BaseAppContent } from "~/apps/base-app-content";
export { DefaultThumbnail } from "~/apps/default-thumbnail";

// App content components
export { ChatbotApp, ChatbotThumbnail } from "~/apps/chatbot";
export { SnakeGameApp, SnakeGameThumbnail } from "~/apps/snake-game";
export { SpotifyApp, SpotifyThumbnail } from "~/apps/spotify";
export {
	ThemeCustomizerApp,
	ThemeCustomizerThumbnail,
} from "~/apps/theme-customizer";

// Consolidated registry and utilities
export {
	getAllApps,
	getApp,
	getAppContent,
	getAppThumbnail,
	hasCustomContent,
	hasCustomThumbnail,
	APP_REGISTRY,
	// Legacy compatibility exports
	APP_CONTENT_REGISTRY,
	APP_THUMBNAIL_REGISTRY,
} from "~/apps/app-registry";

// Types
export type {
	AppThumbnailProps,
	DefaultThumbnailProps,
	App,
} from "~/apps/types";
