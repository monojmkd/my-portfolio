// /api/login.js
export default async function handler(req, res) {
  const scope = [
    "user-read-currently-playing",
    "user-read-playback-state",
    "user-top-read",
    "user-follow-read",
  ].join(" ");

  const redirect_uri = `${process.env.VERCEL_URL}/api/callback`;

  const params = new URLSearchParams({
    response_type: "code",
    client_id: process.env.SPOTIFY_CLIENT_ID,
    scope: scope,
    redirect_uri: redirect_uri,
  });

  res.redirect(`https://accounts.spotify.com/authorize?${params.toString()}`);
}
