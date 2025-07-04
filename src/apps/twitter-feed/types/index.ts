export interface XPost {
  id: string;
  text: string;
  author: {
    id: string;
    name: string;
    username: string;
    profileImageUrl: string;
    verified: boolean;
  };
  createdAt: string;
  metrics: {
    likeCount: number;
    retweetCount: number;
    replyCount: number;
  };
  media?: {
    type: 'image' | 'video';
    url: string;
    altText?: string;
  }[];
  entities?: {
    urls: Array<{
      url: string;
      displayUrl: string;
      expandedUrl: string;
    }>;
  };
}

export interface XFeedState {
  posts: XPost[];
  isLoading: boolean;
  error: string | null;
  lastRefresh: number;
}

export interface XApiError {
  message: string;
  code?: string;
  statusCode?: number;
}

export interface XFeedHookResult {
  posts: XPost[];
  isLoading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  isRefreshing: boolean;
}