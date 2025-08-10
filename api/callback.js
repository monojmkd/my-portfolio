// /api/callback.js
export default async function handler(req, res) {
  const code = req.query.code;
  if (!code) {
    return res.status(400).json({ error: "Missing code from Spotify" });
  }

  const redirect_uri = `${process.env.VERCEL_URL}/api/callback`;

  // Exchange code for tokens
  const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(
          process.env.SPOTIFY_CLIENT_ID +
            ":" +
            process.env.SPOTIFY_CLIENT_SECRET
        ).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code: code,
      redirect_uri: redirect_uri,
    }),
  });

  const tokenData = await tokenRes.json();

  if (!tokenData.refresh_token || !tokenData.access_token) {
    console.error("Spotify token exchange failed", tokenData);
    return res.status(500).json({ error: "Failed to get tokens from Spotify" });
  }

  // Save to Vercel environment variables
  await fetch(`${process.env.VERCEL_URL}/api/save-tokens`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.VERCEL_TOKEN}`,
    },
    body: JSON.stringify({
      SPOTIFY_REFRESH_TOKEN: tokenData.refresh_token,
      SPOTIFY_ACCESS_TOKEN: tokenData.access_token,
    }),
  });

  res.send(" Spotify tokens saved! You can now call /api/spotify");
}
