import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { getAccessToken, getSpotifyLikedSongs } from "./lib/spotify";

export const spotifyRouter = createTRPCRouter({
	getAccessToken: publicProcedure.query(async ({ ctx }) => {
		const token = await getAccessToken();
		return token;
	}),
	getLikedSongs: publicProcedure.query(async ({ ctx }) => {
		const token = await getAccessToken();
		const recentlyPlayed = await getSpotifyLikedSongs(token.access_token);
		return recentlyPlayed;
	}),
});
