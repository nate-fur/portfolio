import { useCallback, useEffect, useState } from 'react';
import type { XFeedHookResult, XPost } from '../types';
import { xApiClient } from '../utils/api-client';

/**
 * Custom hook for managing X Feed data fetching and state
 */
export const useXFeed = (): XFeedHookResult => {
  const [posts, setPosts] = useState<XPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetch posts from the API
   */
  const fetchPosts = useCallback(async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setIsRefreshing(true);
        // Clear cache for fresh data
        xApiClient.clearCache();
      } else {
        setIsLoading(true);
      }

      setError(null);

      const fetchedPosts = await xApiClient.fetchUserPosts();
      setPosts(fetchedPosts);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      console.error('X Feed fetch error:', err);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  /**
   * Refresh posts (force fetch from API)
   */
  const refresh = useCallback(async () => {
    await fetchPosts(true);
  }, [fetchPosts]);

  /**
   * Initial data fetch
   */
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return {
    posts,
    isLoading,
    error,
    refresh,
    isRefreshing,
  };
};