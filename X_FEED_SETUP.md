# X Feed App Setup Guide

This guide will help you set up the X Feed app in your portfolio to display your recent X (Twitter) posts.

## Prerequisites

1. **X Developer Account**: You need a X Developer account to create an app and get OAuth credentials
2. **Environment Variables**: You'll need to configure OAuth credentials in your environment

## Step 1: Create X Developer App

1. Go to [X Developer Portal](https://developer.twitter.com/)
2. Sign in with your X account
3. Create a new app or use an existing one
4. Navigate to your app settings

## Step 2: Configure OAuth 2.0

1. In your X app settings, go to **User authentication settings**
2. Enable **OAuth 2.0**
3. Set the callback URL to: `http://localhost:3000/api/auth/x/callback` (for development)
4. For production, update to your actual domain: `https://yourportfolio.com/api/auth/x/callback`
5. Request the following scopes:
   - `tweet.read` - Read your tweets
   - `users.read` - Read your user information
   - `offline.access` - Refresh token support

## Step 3: Get Your Credentials

1. Copy your **Client ID** and **Client Secret**
2. Note your **Redirect URI**

## Step 4: Configure Environment Variables

Create a `.env` file in your project root (or update your existing one):

```env
# X (Twitter) OAuth Configuration
X_OAUTH_CLIENT_ID="your_client_id_here"
X_OAUTH_CLIENT_SECRET="your_client_secret_here"
X_OAUTH_REDIRECT_URI="http://localhost:3000/api/auth/x/callback"
X_API_BASE_URL="https://api.twitter.com/2"
```

**Important**: 
- Keep your Client Secret secure and never commit it to version control
- Use different credentials for development and production environments
- The redirect URI must match exactly what you configured in the X Developer Portal

## Step 5: Test the Integration

1. Start your development server: `npm run dev`
2. Navigate to your portfolio
3. Click on the X Feed app
4. Click "Sign In with X"
5. Complete the OAuth flow
6. Your recent posts should appear!

## Security Notes

- **Client Secret**: Never expose your Client Secret in client-side code
- **HTTPS**: Always use HTTPS in production
- **Secure Cookies**: The app uses HTTP-only cookies to store tokens securely
- **PKCE**: The implementation uses PKCE (Proof Key for Code Exchange) for additional security

## Troubleshooting

### Common Issues

1. **"Invalid redirect URI"**
   - Ensure the redirect URI in your .env matches exactly what's configured in the X Developer Portal
   - Check for trailing slashes and protocol (http vs https)

2. **"Invalid client credentials"**
   - Verify your Client ID and Client Secret are correct
   - Ensure there are no extra spaces or characters

3. **"Insufficient permissions"**
   - Make sure your X app has the required scopes enabled
   - Check that your X account has the necessary permissions

4. **"Rate limit exceeded"**
   - X has rate limits for API requests
   - Wait for the rate limit to reset (usually 15 minutes)
   - Consider implementing exponential backoff

### Debug Mode

To enable debug logging, set:
```env
NODE_ENV="development"
```

This will provide more detailed error messages in the console.

## Features

The X Feed app includes:

- **OAuth 2.0 Authentication**: Secure sign-in with X
- **Recent Posts**: Display your 10 most recent posts
- **Rich Media**: Support for images and videos
- **Engagement Metrics**: Show likes, retweets, and replies
- **Responsive Design**: Works on desktop and mobile
- **Caching**: 5-minute cache for better performance
- **Error Handling**: Graceful error states and retry mechanisms

## API Endpoints

The app creates the following API endpoints:

- `GET /api/auth/x` - Initiate OAuth flow
- `GET /api/auth/x/callback` - Handle OAuth callback
- `POST /api/auth/x/token` - Exchange code for token
- `GET /api/x/feed` - Fetch user's recent posts
- `GET /api/x/user` - Get user information

## Production Deployment

For production deployment:

1. Update your X app's redirect URI to your production domain
2. Set production environment variables
3. Ensure your domain uses HTTPS
4. Consider setting up a custom domain for better user experience

## Support

If you encounter issues:

1. Check the [X API documentation](https://developer.twitter.com/en/docs/twitter-api)
2. Review the error messages in your browser's developer console
3. Verify your environment variables are correctly set
4. Check that your X app has the necessary permissions

## Rate Limits

X API has the following rate limits for the endpoints used:

- **User tweets**: 75 requests per 15 minutes
- **User info**: 75 requests per 15 minutes

The app implements caching to minimize API calls and stay within these limits.