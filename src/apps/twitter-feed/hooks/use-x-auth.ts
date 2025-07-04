import { useState, useEffect, useCallback } from "react";
import type { XAuthState, XUser, XOAuthTokens } from "../types";
import { STORAGE_KEYS, ERROR_MESSAGES } from "../utils/constants";

export function useXAuth() {
	const [authState, setAuthState] = useState<XAuthState>({
		isAuthenticated: false,
		user: undefined,
		tokens: undefined,
	});
	
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	// Load stored auth data on mount
	useEffect(() => {
		loadStoredAuth();
	}, []);

	const loadStoredAuth = useCallback(async () => {
		try {
			setIsLoading(true);
			setError(null);

			// Check if we have stored tokens
			const storedTokens = localStorage.getItem(STORAGE_KEYS.X_TOKENS);
			const storedUser = localStorage.getItem(STORAGE_KEYS.X_USER);

			if (storedTokens && storedUser) {
				const tokens: XOAuthTokens = JSON.parse(storedTokens);
				const user: XUser = JSON.parse(storedUser);

				// Verify tokens are still valid by making a test API call
				const isValid = await verifyTokens(tokens);
				
				if (isValid) {
					setAuthState({
						isAuthenticated: true,
						user,
						tokens,
					});
				} else {
					// Clear invalid tokens
					clearStoredAuth();
				}
			}
		} catch (err) {
			console.error("Error loading stored auth:", err);
			clearStoredAuth();
		} finally {
			setIsLoading(false);
		}
	}, []);

	const verifyTokens = async (tokens: XOAuthTokens): Promise<boolean> => {
		try {
			const response = await fetch("/api/x/user", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					access_token: tokens.access_token,
				}),
			});

			return response.ok;
		} catch {
			return false;
		}
	};

	const initiateAuth = useCallback(() => {
		setError(null);
		
		// Open OAuth flow in a popup window
		const authWindow = window.open(
			"/api/auth/x",
			"x-auth",
			"width=600,height=700,scrollbars=yes,resizable=yes"
		);

		if (!authWindow) {
			setError("Failed to open authentication window. Please allow popups.");
			return;
		}

		// Poll for authentication completion
		const checkAuthStatus = setInterval(async () => {
			try {
				// Check if the window is closed
				if (authWindow.closed) {
					clearInterval(checkAuthStatus);
					// Check if authentication was successful
					await checkAuthResult();
					return;
				}

				// Try to access the window to see if it's on our domain
				// If it throws an error, it's still on the OAuth provider's domain
				try {
					const url = authWindow.location.href;
					if (url.includes("/auth/x")) {
						// Window is back on our domain, authentication flow is complete
						clearInterval(checkAuthStatus);
						setTimeout(() => {
							authWindow.close();
							checkAuthResult();
						}, 1000);
					}
				} catch {
					// Still on OAuth provider's domain, continue polling
				}
			} catch (err) {
				console.error("Error checking auth status:", err);
				clearInterval(checkAuthStatus);
				authWindow.close();
				setError("Authentication failed. Please try again.");
			}
		}, 1000);

		// Set a timeout to close the window if it takes too long
		setTimeout(() => {
			if (!authWindow.closed) {
				clearInterval(checkAuthStatus);
				authWindow.close();
				setError("Authentication timed out. Please try again.");
			}
		}, 5 * 60 * 1000); // 5 minutes timeout
	}, []);

	const checkAuthResult = useCallback(async () => {
		try {
			setIsLoading(true);
			
			// Check if we have authentication cookies by making a test request
			const response = await fetch("/api/x/user", {
				method: "GET",
				credentials: "include", // Include cookies
			});

			if (response.ok) {
				const { data: userData } = await response.json();
				
				// Store user data in localStorage for persistence
				localStorage.setItem(STORAGE_KEYS.X_USER, JSON.stringify(userData));
				
				// We don't store the actual tokens on the client side for security
				// The tokens are stored in HTTP-only cookies
				setAuthState({
					isAuthenticated: true,
					user: userData,
					tokens: { access_token: "stored-in-cookie", token_type: "bearer" },
				});
			} else {
				setError(ERROR_MESSAGES.OAUTH_ERROR);
			}
		} catch (err) {
			console.error("Error checking auth result:", err);
			setError(ERROR_MESSAGES.OAUTH_ERROR);
		} finally {
			setIsLoading(false);
		}
	}, []);

	const logout = useCallback(() => {
		clearStoredAuth();
		setAuthState({
			isAuthenticated: false,
			user: undefined,
			tokens: undefined,
		});
		setError(null);
	}, []);

	const clearStoredAuth = useCallback(() => {
		localStorage.removeItem(STORAGE_KEYS.X_TOKENS);
		localStorage.removeItem(STORAGE_KEYS.X_USER);
	}, []);

	return {
		authState,
		isLoading,
		error,
		initiateAuth,
		logout,
		checkAuthResult,
	};
}