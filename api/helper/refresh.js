export default async function handler(req, res) {
  const refresh_token = req.cookies.spotify_refresh_token;

  if (!refresh_token) {
    return res.status(400).json({ error: "no_refresh_token" });
  }

  const response = await fetch("https://accounts.spotify.com/api/token", {
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
      grant_type: "refresh_token",
      refresh_token,
    }),
  });

  const data = await response.json();

  if (data.error) {
    return res.status(400).json(data);
  }

  res.setHeader(
    "Set-Cookie",
    `spotify_access_token=${data.access_token}; Path=/; HttpOnly; Secure; SameSite=Lax`
  );

  res.status(200).json({ access_token: data.access_token });
}
