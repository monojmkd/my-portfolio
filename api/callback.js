export default async function handler(req, res) {
  const code = req.query.code;

  if (!code) {
    return res.status(400).json({ error: "missing_code" });
  }

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
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
    }),
  });

  const data = await tokenResponse.json();

  if (data.error) {
    return res.status(400).json({ error: data.error, details: data });
  }

  res.setHeader("Set-Cookie", [
    `spotify_access_token=${data.access_token}; Path=/; HttpOnly; Secure; SameSite=Lax`,
    `spotify_refresh_token=${data.refresh_token}; Path=/; HttpOnly; Secure; SameSite=Lax`,
  ]);

  res.redirect("/");
}
