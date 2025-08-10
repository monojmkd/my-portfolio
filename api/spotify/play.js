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
    const { uri } = req.query; // track URI passed as ?uri=spotify:track:xxxx
    if (!uri) {
      return res.status(400).json({ error: "Missing track URI" });
    }

    const token = await refreshAccessToken();

    const playRes = await fetch("https://api.spotify.com/v1/me/player/play", {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify({ uris: [uri] }),
    });

    if (playRes.status === 204) {
      res.status(200).json({ message: `Playing ${uri}` });
    } else {
      const errData = await playRes.json();
      res.status(playRes.status).json(errData);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
