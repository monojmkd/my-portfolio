export default async function handler(req, res) {
  const code = req.query.code || null;

  if (!code) {
    return res.status(400).json({ error: "Missing code parameter" });
  }

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
      redirect_uri: `${process.env.BASE_URL}/api/callback`,
    }),
  });

  const data = await tokenRes.json();

  if (data.error) {
    return res.status(400).json({ error: data.error_description });
  }

  // You should store refresh_token securely — in DB or KV storage
  console.log("Refresh Token:", data.refresh_token);

  // For now, show success message
  res.status(200).json({
    message: "Spotify auth successful. Save refresh token on server.",
    tokens: data,
  });
}
