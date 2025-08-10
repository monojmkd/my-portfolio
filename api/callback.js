import querystring from "querystring";

export default async function handler(req, res) {
  const code = req.query.code || null;

  const tokenResponse = await fetch("https://accounts.spotify.com/api/token", {
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
    body: querystring.stringify({
      grant_type: "authorization_code",
      code,
      redirect_uri: process.env.SPOTIFY_REDIRECT_URI, // must match
    }),
  });

  const data = await tokenResponse.json();

  if (data.error) {
    return res.status(400).json({ error: data.error_description });
  }

  // For now, just send tokens as JSON (later, store securely)
  res.status(200).json({
    access_token: data.access_token,
    refresh_token: data.refresh_token,
  });
}
