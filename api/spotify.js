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
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Check if environment variables are set
    if (!client_id || !client_secret || !refresh_token) {
      return res.status(500).json({ 
        error: 'Spotify credentials not configured',
        details: 'Check environment variables: SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN'
      });
    }

    const access_token = await getAccessToken();

    // Fetch top tracks
    const topRes = await fetch("https://api.spotify.com/v1/me/top/tracks?limit=10", {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    let topTracks = [];
    if (topRes.ok) {
      const topData = await topRes.json();
      topTracks = topData.items?.map(track => ({
        name: track.name,
        artist: track.artists.map(a => a.name).join(", "),
        album: track.album.name,
        uri: track.uri,
        playUrl: `/api/spotify-play?uri=${encodeURIComponent(track.uri)}`,
        external_url: track.external_urls.spotify,
      })) || [];
    } else if (topRes.status === 401) {
      throw new Error('Invalid access token');
    } else if (topRes.status !== 200) {
      console.warn(`Top tracks API returned ${topRes.status}`);
    }

    // Fetch now playing
    let nowPlaying = { isPlaying: false };
    const nowRes = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    if (nowRes.status === 200) {
      const nowData = await nowRes.json();
      nowPlaying = {
        name: nowData.item.name,
        artist: nowData.item.artists.map(a => a.name).join(", "),
        album: nowData.item.album.name,
        isPlaying: nowData.is_playing,
        pauseUrl: "/api/spotify-stop",
        external_url: nowData.item.external_urls.spotify,
      };
    } else if (nowRes.status === 204) {
      // No content - no song currently playing
      nowPlaying = { isPlaying: false };
    }

    res.status(200).json({ 
      success: true,
      topTracks, 
      nowPlaying 
    });

  } catch (err) {
    console.error('Spotify API error:', err);
    res.status(500).json({ 
      error: "Failed to fetch Spotify data", 
      details: err.message,
      debug: {
        hasClientId: !!client_id,
        hasClientSecret: !!client_secret,
        hasRefreshToken: !!refresh_token
      }
    });
  }
}