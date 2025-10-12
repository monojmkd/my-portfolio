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

  if (!response.ok) {
    throw new Error(`Token fetch failed: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data.access_token;
}

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { uri } = req.method === 'GET' ? req.query : req.body;
  
  if (!uri) {
    return res.status(400).json({ 
      error: "Track URI is required",
      example: {
        uri: "spotify:track:3n3Ppam7vgaVa1iaRUc9Lp"
      }
    });
  }

  try {
    // Check if environment variables are set
    if (!client_id || !client_secret || !refresh_token) {
      return res.status(500).json({ 
        error: 'Spotify credentials not configured'
      });
    }

    const access_token = await getAccessToken();

    const playResponse = await fetch("https://api.spotify.com/v1/me/player/play", {
      method: "PUT",
      headers: { 
        Authorization: `Bearer ${access_token}`, 
        "Content-Type": "application/json" 
      },
      body: JSON.stringify({ uris: [uri] }),
    });

    if (playResponse.status === 204) {
      res.status(200).json({ 
        success: true,
        message: "Playing selected track",
        track_uri: uri 
      });
    } else if (playResponse.status === 404) {
      res.status(404).json({ 
        error: "No active device found",
        details: "Please open Spotify on any device and try again"
      });
    } else {
      const errorText = await playResponse.text();
      throw new Error(`Playback failed: ${playResponse.status} - ${errorText}`);
    }

  } catch (err) {
    console.error('Playback error:', err);
    res.status(500).json({ 
      error: "Failed to start playback", 
      details: err.message 
    });
  }
}