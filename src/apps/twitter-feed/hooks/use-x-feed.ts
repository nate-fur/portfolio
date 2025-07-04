import { useState, useEffect, useCallback } from "react";
import type { XFeedState, XFeedData, XPost, XUser, XMedia } from "../types";
import { STORAGE_KEYS, ERROR_MESSAGES, CACHE_DURATION } from "../utils/constants";

interface UseXFeedOptions {
	isAuthenticated: boolean;
	autoRefresh?: boolean;
	refreshInterval?: number;
}

export function useXFeed({ isAuthenticated, autoRefresh = false, refreshInterval = 5 * 60 * 1000 }: UseXFeedOptions) {
	const [feedState, setFeedState] = useState<XFeedState>({
		posts: [],
		users: {},
		media: {},
		isLoading: false,
		error: null,
		lastFetch: null,
	});

	// Load cached data on mount
	useEffect(() => {
		loadCachedFeed();
	}, []);

	// Set up auto-refresh if enabled
	useEffect(() => {
		if (!autoRefresh || !isAuthenticated) return;

		const interval = setInterval(() => {
			refreshFeed();
		}, refreshInterval);

		return () => clearInterval(interval);
	}, [autoRefresh, isAuthenticated, refreshInterval]);

	const loadCachedFeed = useCallback(() => {
		try {
			const cachedData = localStorage.getItem(STORAGE_KEYS.X_FEED_CACHE);
			if (cachedData) {
				const { data, timestamp } = JSON.parse(cachedData);
				const now = Date.now();
				
				// Check if cache is still valid
				if (now - timestamp < CACHE_DURATION) {
					setFeedState(prev => ({
						...prev,
						...data,
						lastFetch: timestamp,
					}));
				} else {
					// Cache expired, clear it
					localStorage.removeItem(STORAGE_KEYS.X_FEED_CACHE);
				}
			}
		} catch (err) {
			console.error("Error loading cached feed:", err);
			localStorage.removeItem(STORAGE_KEYS.X_FEED_CACHE);
		}
	}, []);

	const cacheFeedData = useCallback((data: Partial<XFeedState>) => {
		try {
			const cacheData = {
				data,
				timestamp: Date.now(),
			};
			localStorage.setItem(STORAGE_KEYS.X_FEED_CACHE, JSON.stringify(cacheData));
		} catch (err) {
			console.error("Error caching feed data:", err);
		}
	}, []);

	const fetchFeed = useCallback(async (force = false) => {
		if (!isAuthenticated) {
			setFeedState(prev => ({
				...prev,
				error: ERROR_MESSAGES.NOT_AUTHENTICATED,
			}));
			return;
		}

		// Check if we need to fetch (avoid unnecessary requests)
		if (!force && feedState.lastFetch && Date.now() - feedState.lastFetch < CACHE_DURATION) {
			return;
		}

		setFeedState(prev => ({
			...prev,
			isLoading: true,
			error: null,
		}));

		try {
			const response = await fetch("/api/x/feed", {
				method: "GET",
				credentials: "include", // Include cookies for authentication
			});

			if (!response.ok) {
				const errorData = await response.json().catch(() => ({}));
				throw new Error(errorData.error || ERROR_MESSAGES.API_ERROR);
			}

			const feedData: XFeedData = await response.json();
			const processedData = processFeedData(feedData);

			setFeedState(prev => ({
				...prev,
				...processedData,
				isLoading: false,
				error: null,
				lastFetch: Date.now(),
			}));

			// Cache the processed data
			cacheFeedData({
				...processedData,
				isLoading: false,
				error: null,
			});
		} catch (err) {
			console.error("Error fetching feed:", err);
			const errorMessage = err instanceof Error ? err.message : ERROR_MESSAGES.API_ERROR;
			
			setFeedState(prev => ({
				...prev,
				isLoading: false,
				error: errorMessage,
			}));
		}
	}, [isAuthenticated, feedState.lastFetch, cacheFeedData]);

	const processFeedData = useCallback((feedData: XFeedData) => {
		const posts = feedData.data || [];
		const users: { [key: string]: XUser } = {};
		const media: { [key: string]: XMedia } = {};

		// Process users
		if (feedData.includes?.users) {
			feedData.includes.users.forEach(user => {
				users[user.id] = user;
			});
		}

		// Process media
		if (feedData.includes?.media) {
			feedData.includes.media.forEach(mediaItem => {
				media[mediaItem.media_key] = mediaItem;
			});
		}

		return {
			posts,
			users,
			media,
		};
	}, []);

	const refreshFeed = useCallback(() => {
		fetchFeed(true);
	}, [fetchFeed]);

	const getPostWithAuthor = useCallback((post: XPost) => {
		const author = feedState.users[post.author_id];
		return {
			...post,
			author,
		};
	}, [feedState.users]);

	const getPostMedia = useCallback((post: XPost) => {
		if (!post.attachments?.media_keys) return [];
		
		return post.attachments.media_keys
			.map(key => feedState.media[key])
			.filter(Boolean);
	}, [feedState.media]);

	const clearCache = useCallback(() => {
		localStorage.removeItem(STORAGE_KEYS.X_FEED_CACHE);
		setFeedState({
			posts: [],
			users: {},
			media: {},
			isLoading: false,
			error: null,
			lastFetch: null,
		});
	}, []);

	return {
		...feedState,
		fetchFeed,
		refreshFeed,
		getPostWithAuthor,
		getPostMedia,
		clearCache,
	};
}