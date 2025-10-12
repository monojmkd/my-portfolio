// pages/api/spotify/index.js
const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const SPOTIFY_REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;

const BASIC = Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64');
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const TOP_TRACKS_ENDPOINT = `https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=10`;

const getAccessToken = async () => {
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${BASIC}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: SPOTIFY_REFRESH_TOKEN,
    }),
  });

  return response.json();
};

const fetchSpotifyData = async (endpoint, access_token) => {
  const response = await fetch(endpoint, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  if (response.status === 204) {
    return null;
  }

  return response.json();
};

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle OPTIONS request for CORS
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed. Use GET.' });
  }

  try {
    const { access_token } = await getAccessToken();

    // Get now playing and top tracks
    const [nowPlaying, topTracks] = await Promise.all([
      fetchSpotifyData(NOW_PLAYING_ENDPOINT, access_token),
      fetchSpotifyData(TOP_TRACKS_ENDPOINT, access_token),
    ]);

    const response = {
      now_playing: nowPlaying && nowPlaying.item ? {
        is_playing: nowPlaying.is_playing,
        name: nowPlaying.item.name,
        artists: nowPlaying.item.artists.map(artist => artist.name),
        album: nowPlaying.item.album.name,
        preview_url: nowPlaying.item.preview_url,
        external_urls: nowPlaying.item.external_urls,
        duration_ms: nowPlaying.item.duration_ms,
        progress_ms: nowPlaying.progress_ms,
        uri: nowPlaying.item.uri,
        id: nowPlaying.item.id,
      } : null,
      top_tracks: topTracks ? topTracks.items.map(track => ({
        name: track.name,
        artists: track.artists.map(artist => artist.name),
        album: track.album.name,
        preview_url: track.preview_url,
        external_urls: track.external_urls,
        duration_ms: track.duration_ms,
        uri: track.uri,
        id: track.id,
      })) : [],
    };

    return res.status(200).json(response);

  } catch (error) {
    console.error('Spotify API error:', error);
    return res.status(500).json({ error: 'Failed to fetch Spotify data' });
  }
}