export default function handler(req, res) {
  const scope = [
    "user-read-currently-playing",
    "user-top-read",
    "user-follow-read",
    "user-modify-playback-state",
  ].join(" ");

  const redirectUri = `${process.env.BASE_URL}/api/callback`; // must match in Spotify dashboard

  const authUrl =
    "https://accounts.spotify.com/authorize?" +
    new URLSearchParams({
      response_type: "code",
      client_id: process.env.SPOTIFY_CLIENT_ID,
      scope: scope,
      redirect_uri: redirectUri,
    });

  res.redirect(authUrl);
}
