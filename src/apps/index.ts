// App registry
export {
	getAllApps,
	getApp,
	getAppContent,
	getAppThumbnail,
} from "./app-registry";

// Base components
export { BaseAppContent } from "./base-app-content";
export { BaseThumbnail } from "./base-thumbnail";

// Default components
export { DefaultThumbnail } from "./default-thumbnail";

// Individual apps
export { ChatbotApp } from "./chatbot";
export { SnakeGameApp } from "./snake-game";
export { SpotifyApp } from "./spotify";
export { ThemeCustomizerApp } from "./theme-customizer";

// Types
export type {
	App,
	AppThumbnailProps,
	BaseThumbnailProps,
	DefaultThumbnailProps,
} from "./types";
