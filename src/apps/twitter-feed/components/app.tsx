"use client";

import { useEffect } from "react";
import { BaseAppContent } from "~/apps/base-app-content";
import { useXAuth } from "../hooks/use-x-auth";
import { useXFeed } from "../hooks/use-x-feed";
import { AuthPrompt } from "./auth-prompt";
import { FeedHeader } from "./feed-header";
import { Feed } from "./feed";
import { ERROR_MESSAGES } from "../utils/constants";

export const XFeedApp = () => {
	const { authState, isLoading: authLoading, error: authError, initiateAuth, logout } = useXAuth();
	const { 
		posts, 
		users, 
		media, 
		isLoading: feedLoading, 
		error: feedError, 
		lastFetch,
		fetchFeed, 
		refreshFeed 
	} = useXFeed({ 
		isAuthenticated: authState.isAuthenticated,
		autoRefresh: true,
		refreshInterval: 10 * 60 * 1000 // 10 minutes
	});

	// Fetch feed when authenticated
	useEffect(() => {
		if (authState.isAuthenticated && !feedLoading && !feedError && posts.length === 0) {
			fetchFeed();
		}
	}, [authState.isAuthenticated, feedLoading, feedError, posts.length, fetchFeed]);

	const handleSignIn = () => {
		initiateAuth();
	};

	const handleSignOut = () => {
		logout();
	};

	const handleRetry = () => {
		if (authState.isAuthenticated) {
			refreshFeed();
		} else {
			initiateAuth();
		}
	};

	return (
		<BaseAppContent
			title="X Feed"
			description="View your recent posts from X (formerly Twitter) directly in your portfolio. Connect your X account to showcase your latest thoughts and professional updates."
			technologies={["React", "TypeScript", "X API v2", "OAuth 2.0"]}
		>
			<div className="space-y-6">
				{!authState.isAuthenticated ? (
					<AuthPrompt
						onSignIn={handleSignIn}
						isLoading={authLoading}
						error={authError}
					/>
				) : (
					<>
						<FeedHeader
							user={authState.user}
							onRefresh={refreshFeed}
							onSignOut={handleSignOut}
							isLoading={feedLoading}
							lastFetch={lastFetch}
						/>
						
						<Feed
							posts={posts}
							users={users}
							media={media}
							isLoading={feedLoading}
							error={feedError}
							onRetry={handleRetry}
						/>
					</>
				)}
			</div>
		</BaseAppContent>
	);
};