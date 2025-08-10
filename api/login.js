import querystring from "querystring";

export default function handler(req, res) {
  const scopes = [
    "user-top-read",
    "user-follow-read",
    "user-read-currently-playing",
    "user-modify-playback-state",
    "user-read-playback-state",
  ].join(" ");

  const queryParams = querystring.stringify({
    response_type: "code",
    client_id: process.env.SPOTIFY_CLIENT_ID,
    scope: scopes,
    redirect_uri: process.env.SPOTIFY_REDIRECT_URI, // must match Spotify dashboard exactly
  });

  res.redirect(`https://accounts.spotify.com/authorize?${queryParams}`);
}
