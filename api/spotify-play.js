const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");
const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";

async function getAccessToken() {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token,
    }),
  });
  const data = await response.json();
  return data.access_token;
}

export default async function handler(req, res) {
  const { uri } = req.query;
  if (!uri) return res.status(400).json({ error: "Track URI is required" });

  try {
    const access_token = await getAccessToken();

    await fetch("https://api.spotify.com/v1/me/player/play", {
      method: "PUT",
      headers: { Authorization: `Bearer ${access_token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ uris: [uri] }),
    });

    res.status(200).json({ message: "Playing selected track" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to start playback", details: err.message });
  }
}
