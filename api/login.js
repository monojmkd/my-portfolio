export default function handler(req, res) {
  const scopes = [
    "user-read-email",
    "user-read-private",
    "user-top-read",
    "user-follow-read",
    "user-read-playback-state",
    "user-read-currently-playing",
  ].join(" ");

  const redirect_uri = process.env.SPOTIFY_REDIRECT_URI;

  const authUrl = new URL("https://accounts.spotify.com/authorize");
  authUrl.searchParams.set("response_type", "code");
  authUrl.searchParams.set("client_id", process.env.SPOTIFY_CLIENT_ID);
  authUrl.searchParams.set("scope", scopes);
  authUrl.searchParams.set("redirect_uri", redirect_uri);

  res.redirect(authUrl.toString());
}
