// api/spotify-stop.js
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
  try {
    const access_token = await getAccessToken();

    const response = await fetch("https://api.spotify.com/v1/me/player/pause", {
      method: "PUT",
      headers: { Authorization: `Bearer ${access_token}` },
    });

    if (response.status === 204) {
      return res.status(200).json({ 
        success: true,
        message: "Playback paused successfully" 
      });
    }

    if (response.status === 404) {
      return res.status(404).json({ 
        error: "No active playback",
        message: "Nothing is currently playing"
      });
    }

    if (response.status === 403) {
      return res.status(403).json({ 
        error: "Premium required",
        message: "Playback control requires Spotify Premium"
      });
    }

    // Handle other error responses
    const errorData = await response.text();
    return res.status(response.status).json({ 
      error: "Spotify API error",
      status: response.status,
      details: errorData
    });

  } catch (err) {
    console.error("Pause Error:", err);
    res.status(500).json({ 
      error: "Failed to pause playback", 
      details: err.message 
    });
  }
}