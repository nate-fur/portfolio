// Base components
export { BaseAppContent } from "~/apps/base-app-content";

// App content components
export { ChatbotApp } from "~/apps/chatbot";
export { SnakeGameApp } from "~/apps/snake-game";
export { SpotifyApp } from "~/apps/spotify";
export { ThemeCustomizerApp } from "~/apps/theme-customizer";

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
