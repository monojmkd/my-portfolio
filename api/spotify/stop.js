async function refreshAccessToken() {
  const res = await fetch("https://accounts.spotify.com/api/token", {
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
      refresh_token: process.env.SPOTIFY_REFRESH_TOKEN,
    }),
  });
  const data = await res.json();
  return data.access_token;
}

export default async function handler(req, res) {
  try {
    const token = await refreshAccessToken();

    const pauseRes = await fetch("https://api.spotify.com/v1/me/player/pause", {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (pauseRes.status === 204) {
      res.status(200).json({ message: "Playback stopped" });
    } else {
      const errData = await pauseRes.json();
      res.status(pauseRes.status).json(errData);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
