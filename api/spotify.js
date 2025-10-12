// api/spotify.js
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

    // Fetch top tracks and now playing
    const [topRes, nowRes] = await Promise.all([
      fetch("https://api.spotify.com/v1/me/top/tracks?limit=10&time_range=short_term", {
        headers: { Authorization: `Bearer ${access_token}` },
      }),
      fetch("https://api.spotify.com/v1/me/player/currently-playing", {
        headers: { Authorization: `Bearer ${access_token}` },
      })
    ]);

    // Parse top tracks
    const topData = await topRes.json();
    const topTracks = topData.items?.map((track, index) => ({
      rank: index + 1,
      name: track.name,
      artist: track.artists.map(a => a.name).join(", "),
      album: track.album.name,
      albumArt: track.album.images[0]?.url,
      uri: track.uri,
      playUrl: `/api/spotify-play?uri=${encodeURIComponent(track.uri)}`,
      spotifyUrl: track.external_urls.spotify,
      duration_ms: track.duration_ms,
      popularity: track.popularity,
    })) || [];

    // Parse now playing
    let nowPlaying = null;
    if (nowRes.status === 200) {
      const nowData = await nowRes.json();
      if (nowData && nowData.item) {
        nowPlaying = {
          name: nowData.item.name,
          artist: nowData.item.artists.map(a => a.name).join(", "),
          album: nowData.item.album.name,
          albumArt: nowData.item.album.images[0]?.url,
          isPlaying: nowData.is_playing,
          progress_ms: nowData.progress_ms,
          duration_ms: nowData.item.duration_ms,
          spotifyUrl: nowData.item.external_urls.spotify,
          stopUrl: "/api/spotify-stop",
        };
      }
    }

    res.status(200).json({ 
      topTracks, 
      nowPlaying,
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    console.error("Spotify API Error:", err);
    res.status(500).json({ 
      error: "Failed to fetch Spotify data", 
      details: err.message 
    });
  }
}