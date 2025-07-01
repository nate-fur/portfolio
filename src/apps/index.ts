// App registry
export {
	getAllApps,
	getApp,
	getAppContent,
	getAppThumbnail,
	getActiveApps,
	isAppActive,
} from "./app-registry";

// Base components
export { BaseAppContent } from "./base-app-content";
export { BaseThumbnail } from "./base-thumbnail";
export { ComingSoon } from "./coming-soon";

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
