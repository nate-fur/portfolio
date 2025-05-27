# Apps Architecture

This directory contains the full-stack applications for the portfolio OS Desktop interface.

## Architecture Overview

The apps system is organized as a top-level directory to support full-stack capabilities:

1. **App Container** (`../components/ui/app-container.tsx`) - Handles visual representation and expansion animations
2. **App Content** (this directory) - Contains the actual content and logic for each app when expanded
3. **App Registry** (`app-content-registry.tsx`) - Maps app IDs to their content components

Each app can now contain:
- Frontend components
- API routes/handlers
- Database schemas/models
- Business logic
- Types/interfaces
- Tests

## Components

### BaseAppContent
A reusable base component that provides consistent styling and layout for all app content.

**Props:**
- `title: string` - The app title
- `description: string` - App description
- `children?: ReactNode` - Custom content
- `technologies?: string[]` - Array of technology tags

### Individual App Components
Each app has its own content component:
- `ChatbotApp` - AI Assistant content
- `SnakeGameApp` - Snake game content  
- `SpotifyApp` - Spotify integration content

### App Content Registry
Central registry that maps app IDs to their content components.

**Functions:**
- `getAppContent(appId: string)` - Returns the content component for an app
- `hasCustomContent(appId: string)` - Checks if an app has custom content implemented

## Adding New App Content

1. Create a new component file (e.g., `my-new-app.tsx`)
2. Use `BaseAppContent` as the wrapper or create a completely custom component
3. Add the component to the registry in `app-content-registry.tsx`
4. Export it from `index.ts`

Example:
```tsx
// my-new-app.tsx
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

// Add to app-content-registry.tsx
const APP_CONTENT_REGISTRY: Record<string, () => ReactNode> = {
  // ... existing apps
  "my-new-app": () => <MyNewApp />,
};
```

## Benefits

- **Separation of Concerns**: Container behavior is separate from content
- **Reusability**: `BaseAppContent` provides consistent styling
- **Maintainability**: Each app's content is in its own file
- **Extensibility**: Easy to add new apps or modify existing ones
- **Type Safety**: Full TypeScript support throughout 