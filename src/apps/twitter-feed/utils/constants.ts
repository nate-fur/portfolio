export const X_API_CONFIG = {
  BASE_URL: 'https://api.twitter.com/2',
  ENDPOINTS: {
    USER_ME: '/users/me',
    USER_TWEETS: '/users/:id/tweets',
  },
  RATE_LIMIT: {
    REQUESTS_PER_MINUTE: 25,
    CACHE_DURATION: 5 * 60 * 1000, // 5 minutes
  },
  PARAMS: {
    MAX_RESULTS: 10,
    TWEET_FIELDS: 'created_at,author_id,public_metrics,entities,attachments',
    USER_FIELDS: 'name,username,profile_image_url,verified',
    EXPANSIONS: 'author_id,attachments.media_keys',
    MEDIA_FIELDS: 'type,url,alt_text',
  },
} as const;

export const MOCK_POSTS: Array<{
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
}> = [
  {
    id: '1',
    text: 'Just shipped a new feature for the portfolio! 🚀 The X Feed integration is now live and showing my latest thoughts and updates. Built with React, TypeScript, and the Twitter API v2.',
    author: {
      id: 'demo_user',
      name: 'Portfolio Owner',
      username: 'portfolioowner',
      profileImageUrl: '/profile.svg',
      verified: true,
    },
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    metrics: {
      likeCount: 42,
      retweetCount: 8,
      replyCount: 5,
    },
  },
  {
    id: '2',
    text: 'Working on some exciting new projects. Can\'t wait to share more details soon! 💻✨',
    author: {
      id: 'demo_user',
      name: 'Portfolio Owner',
      username: 'portfolioowner',
      profileImageUrl: '/profile.svg',
      verified: true,
    },
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
    metrics: {
      likeCount: 28,
      retweetCount: 3,
      replyCount: 12,
    },
  },
  {
    id: '3',
    text: 'The importance of good UX can\'t be overstated. Every pixel matters when you\'re crafting an experience that users will love and remember.',
    author: {
      id: 'demo_user',
      name: 'Portfolio Owner',
      username: 'portfolioowner',
      profileImageUrl: '/profile.svg',
      verified: true,
    },
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    metrics: {
      likeCount: 156,
      retweetCount: 23,
      replyCount: 18,
    },
  },
  {
    id: '4',
    text: 'Just discovered this amazing React pattern. The compound component pattern is perfect for building flexible, reusable UI components. Game changer! 🎯',
    author: {
      id: 'demo_user',
      name: 'Portfolio Owner',
      username: 'portfolioowner',
      profileImageUrl: '/profile.svg',
      verified: true,
    },
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    metrics: {
      likeCount: 89,
      retweetCount: 15,
      replyCount: 7,
    },
  },
  {
    id: '5',
    text: 'TypeScript continues to amaze me. The type safety it provides prevents so many runtime errors. I can\'t imagine building large applications without it anymore.',
    author: {
      id: 'demo_user',
      name: 'Portfolio Owner',
      username: 'portfolioowner',
      profileImageUrl: '/profile.svg',
      verified: true,
    },
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    metrics: {
      likeCount: 234,
      retweetCount: 45,
      replyCount: 32,
    },
  },
];

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection and try again.',
  API_ERROR: 'Unable to fetch posts. Please try again later.',
  RATE_LIMITED: 'Rate limit exceeded. Please wait before refreshing.',
  UNKNOWN_ERROR: 'An unexpected error occurred. Please try again.',
} as const;