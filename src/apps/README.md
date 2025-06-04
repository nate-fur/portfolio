# Apps Architecture

This directory contains the full-stack applications for the portfolio OS Desktop interface.

## Architecture Overview

The apps system is organized as a top-level directory to support full-stack capabilities:

1. **App Container** (`../components/shared/app-container.tsx`) - Manages expansion state and delegates UI rendering to app components
2. **App Content** (this directory) - Contains the actual content and logic for each app when expanded
3. **Consolidated App Registry** (`app-registry.tsx`) - Single source of truth for all app data, content, and thumbnails

Each app can now contain:
- Frontend components
- API routes/handlers
- Database schemas/models
- Business logic
- Types/interfaces
- Tests

## App Container Architecture

The `AppContainer` component follows a clean separation of concerns:

### State Management
- **Manages its own expansion state** - No external state coordination needed
- **Handles fullscreen mode** - Independent fullscreen toggling per app
- **Communicates expansion changes** - Notifies parent gallery for layout adjustments

### UI Delegation
- **Thumbnail rendering** - Delegates to each app's `thumbnailComponent` when collapsed
- **Content rendering** - Delegates to each app's `contentComponent` when expanded
- **Layout orchestration** - Handles animation and positioning logic

### Benefits
- **Encapsulation** - Each app container is self-contained and independent
- **Reusability** - Container logic is app-agnostic and reusable
- **Maintainability** - Clear separation between container behavior and app-specific UI
- **Performance** - Only expanded apps render their content components

## Consolidated Registry System

The new registry system unifies app data, content components, and thumbnail components into a single source of truth.

### App Registry (`app-registry.tsx`)

The consolidated registry contains all app definitions with:
- **App metadata**: id, name, icon, size
- **Content component**: The expanded app interface
- **Thumbnail component**: The grid tile appearance

**Key Functions:**
- `getAllApps()` - Returns all registered apps as an array
- `getApp(appId)` - Returns a specific app by ID
- `getAppContent(appId)` - Returns the content component for an app
- `getAppThumbnail(appId, props)` - Returns the thumbnail component for an app

### Benefits of Consolidation

- **Single Source of Truth**: All app data is centralized in one location
- **Type Safety**: Full TypeScript support with unified App interface
- **Maintainability**: Easy to add, modify, or remove apps
- **Consistency**: Ensures all apps have the required properties
- **Developer Experience**: One place to manage all app-related data

## Components

### AppContainer
The container component that manages individual app state and rendering:

**Props:**
- `app: App` - The complete app definition from the registry
- `size: "small" | "medium" | "large"` - Size for grid layout
- `onExpansionChange?: (isExpanded: boolean) => void` - Callback for expansion state changes

**Features:**
- Self-managed expansion state
- Fullscreen mode support
- Smooth layout animations
- Control buttons (fullscreen, close)
- UI delegation to thumbnail/content components

### BaseAppContent
A reusable base component that provides consistent styling and layout for all app content.

**Props:**
- `title: string` - The app title
- `description: string` - App description
- `children?: ReactNode` - Custom content
- `technologies?: string[]` - Array of technology tags

### Individual App Components
Each app has its own content and thumbnail components:
- `ChatbotApp` & `ChatbotThumbnail` - AI Assistant
- `SnakeGameApp` & `SnakeGameThumbnail` - Snake game
- `SpotifyApp` & `SpotifyThumbnail` - Spotify integration
- `ThemeCustomizerApp` & `ThemeCustomizerThumbnail` - Theme customization

### Thumbnail Components
Each thumbnail component receives `AppThumbnailProps`:
- `size?: "small" | "medium" | "large"` - Optional size hint for responsive behavior

Both custom and default thumbnails follow the same interface, ensuring consistency.

## Creating Custom Thumbnails

### Using the BaseThumbnail Component

The `BaseThumbnail` component provides a standardized foundation for all app thumbnails, including:

- Consistent hover states and animations
- Layout structure (icon + title)
- Motion transitions
- Common styling

#### Basic Usage

```tsx
import { BaseThumbnail } from "~/apps/base-thumbnail";
import { FileText } from "lucide-react";

export const MyAppThumbnail = ({ size = "medium" }: AppThumbnailProps) => {
	return (
		<BaseThumbnail
			name="My App"
			icon={FileText}
			iconColor="text-blue-500"
			size={size}
		/>
	);
};
```

#### Advanced Usage with Custom Animations

For more sophisticated thumbnails, you can add custom background animations and floating elements as children:

```tsx
import { motion } from "framer-motion";
import { BaseThumbnail } from "~/apps/base-thumbnail";
import { Music, Play } from "lucide-react";

export const CustomThumbnail = ({ size = "medium" }: AppThumbnailProps) => {
	return (
		<BaseThumbnail
			name="Custom App"
			icon={Music}
			iconColor="text-purple-500"
			size={size}
		>
			{/* Custom background animation */}
			<motion.div
				className="absolute inset-0 overflow-hidden"
				animate={{
					background: [
						"radial-gradient(circle, rgba(168, 85, 247, 0.1) 0%, transparent 50%)",
						"radial-gradient(circle, rgba(168, 85, 247, 0.2) 0%, transparent 50%)",
					],
				}}
				transition={{
					duration: 2,
					repeat: Number.POSITIVE_INFINITY,
					ease: "easeInOut",
				}}
			/>

			{/* Floating decorative element */}
			<motion.div
				className="absolute z-10"
				style={{ left: "calc(50% + 16px)", top: "calc(50% - 40px)" }}
				animate={{
					scale: [0.8, 1.2, 0.8],
					opacity: [0.6, 1, 0.6],
				}}
				transition={{
					duration: 3,
					repeat: Number.POSITIVE_INFINITY,
					ease: "easeInOut",
				}}
			>
				<Play className="h-3 w-3 text-purple-300" />
			</motion.div>
		</BaseThumbnail>
	);
};
```

#### Props

The `BaseThumbnail` component accepts these props:

- `name` (string, required): The display name of the app
- `icon` (LucideIcon, required): The main icon for the app
- `size` (optional): "small" | "medium" | "large"
- `iconColor` (optional): Tailwind CSS color class for the icon (default: "text-primary")
- `children` (optional): Custom background animations or decorative elements
- `className` (optional): Additional CSS classes for the container

#### Best Practices

1. **Consistent Positioning**: Use calc() and percentage-based positioning for floating elements to ensure they work across different thumbnail sizes
2. **Z-Index**: Add `z-10` to floating elements to ensure they appear above the background
3. **Color Harmony**: Choose colors that complement your app's theme
4. **Performance**: Keep animations lightweight and use `ease-in-out` for smooth transitions
5. **Accessibility**: Ensure sufficient color contrast and avoid overly distracting animations

## Adding New Apps

To add a new app to the registry:

1. **Create the app components** (optional for custom implementations):
   ```tsx
   // my-new-app/app.tsx
   import { BaseAppContent } from "~/apps/base-app-content";
   
   export const MyNewApp = () => {
     return (
       <BaseAppContent
         title="My New App"
         description="Description of what this app does"
         technologies={["React", "TypeScript"]}
       >
         {/* Custom content here */}
       </BaseAppContent>
     );
   };
   
   // my-new-app/thumbnail.tsx
   import type { AppThumbnailProps } from "~/apps/types";
   
   export const MyNewAppThumbnail = ({ size }: AppThumbnailProps) => {
     return (
       <div className="relative flex h-full flex-col items-center justify-center p-2">
         {/* Custom thumbnail UI */}
       </div>
     );
   };
   ```

2. **Add to the registry** in `app-registry.tsx`:
   ```tsx
   import { MyNewApp, MyNewAppThumbnail } from "~/apps/my-new-app";
   
   const APP_REGISTRY: Record<string, App> = {
     // ... existing apps
     "my-new-app": {
       id: "my-new-app",
       name: "My New App",
       icon: SomeIcon,
       size: "medium",
       contentComponent: () => <MyNewApp />,
       thumbnailComponent: (props) => <MyNewAppThumbnail {...props} />,
     },
   };
   ```

3. **Export from index.ts** (if you created custom components):
   ```tsx
   export { MyNewApp, MyNewAppThumbnail } from "~/apps/my-new-app";
   ```

That's it! The app will automatically:
- Appear in the apps gallery with the correct size
- Handle its own expansion/collapse state
- Render your custom thumbnail when collapsed
- Render your custom content when expanded
- Support fullscreen mode

## Migration from Old System

The old separate registries (`app-content-registry.tsx` and `thumbnail-registry.tsx`) have been consolidated. The `AppContainer` now manages its own state instead of relying on external state management.

**Key Changes:**
- ✅ **Self-contained apps** - Each app manages its own expansion state
- ✅ **UI delegation** - Container delegates rendering to app-specific components  
- ✅ **Unified registry** - Single source of truth for all app data
- ✅ **Type safety** - Full TypeScript support with unified interfaces
- ✅ **Simplified gallery** - Apps gallery just renders containers, no state management

Legacy exports are maintained for backward compatibility:
- `APP_CONTENT_REGISTRY` - Legacy content registry (auto-generated from new registry)
- `APP_THUMBNAIL_REGISTRY` - Legacy thumbnail registry (auto-generated from new registry)

## Type Definitions

```tsx
interface App {
  id: string;
  name: string;
  icon: LucideIcon;
  size: "small" | "medium" | "large";
  contentComponent: () => ReactNode;
  thumbnailComponent: (props: AppThumbnailProps) => ReactNode;
}

interface AppContainerProps {
  app: App;
  size: "small" | "medium" | "large";
  onExpansionChange?: (isExpanded: boolean) => void;
}

interface AppThumbnailProps {
  size?: "small" | "medium" | "large";
}
``` 