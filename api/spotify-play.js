// api/spotify-play.js
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
  // Accept uri from both query params and POST body
  const uri = req.query.uri || req.body?.uri;
  
  if (!uri) {
    return res.status(400).json({ 
      error: "Track URI is required",
      usage: "GET /api/spotify-play?uri=spotify:track:xxxxx OR POST with {\"uri\": \"spotify:track:xxxxx\"}"
    });
  }

  // Validate URI format
  if (!uri.startsWith("spotify:track:")) {
    return res.status(400).json({ 
      error: "Invalid track URI format",
      expected: "spotify:track:xxxxx"
    });
  }

  try {
    const access_token = await getAccessToken();

    const response = await fetch("https://api.spotify.com/v1/me/player/play", {
      method: "PUT",
      headers: { 
        Authorization: `Bearer ${access_token}`, 
        "Content-Type": "application/json" 
      },
      body: JSON.stringify({ uris: [uri] }),
    });

    if (response.status === 204) {
      return res.status(200).json({ 
        success: true,
        message: "Playing selected track",
        trackUri: uri
      });
    }

    if (response.status === 404) {
      return res.status(404).json({ 
        error: "No active device found",
        message: "Please open Spotify on a device first"
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
    console.error("Playback Error:", err);
    res.status(500).json({ 
      error: "Failed to start playback", 
      details: err.message 
    });
  }
}