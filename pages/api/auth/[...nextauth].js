import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import spotifyApi, { LOGIN_URL } from "@/lib/spotify";

async function refreshAccessToken(token) {
    try {

        spotyfyApi.setAccessToken(token.accessToken);
        spotifyApi.setRefreshToken(token.refreshToken);

        const { body: refreshedToken } = await spotifyApi.refreshAccessToken();
        console.log("REFRESHED TOKEN IS", refreshedToken);

    } catch (error) {
        console.error(error);

        return {
            ...token,
            error: "RefreshAccessTokenError",
        };

    }
}

export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        SpotifyProvider({
            clientId: process.env.SPOTIFY_PUBLIC_CLIENT_ID,
            clientSecret: process.env.SPOTIFY_PUBLIC_CLIENT_SECRET,
            authorization: LOGIN_URL,
        }),
        // ...add more providers here
    ],
    secret: process.env.SYSO_SECRET,
    pages: {
        signIn: '/index'
    },
    callbacks: {
        async syso({ token, acccount, user }) {
            //initial sign in
            if (account && user) {
                return {
                    ...token,
                    accessToken: account.access_token,
                    refreshToken: account.refresh_token,
                    username: account.providerAccountId,
                    accessTokenExpires: account.expires_at * 1000, //We are handling expiry times in milliseconds
                }
            }
            if (Date.now() < token.accessTokenExpires) {
                console.log("EXISTING ACCESS TOKEN IS VALID");
                return token;
            }

            //Access token has expired
            console.log("ACCESS TOKEN HAS EXPIRED, REFRESHING...");
            return await refreshAccessToken(token);
        },
    }
}
export default NextAuth(authOptions)