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

// Default sample tracks if user has no listening history
const SAMPLE_TRACKS = [
  {
    name: "Sample Track 1",
    artist: "Sample Artist",
    album: "Sample Album",
    uri: "spotify:track:3n3Ppam7vgaVa1iaRUc9Lp",
    playUrl: "/api/spotify-play?uri=spotify:track:3n3Ppam7vgaVa1iaRUc9Lp",
    external_url: "https://open.spotify.com/track/3n3Ppam7vgaVa1iaRUc9Lp"
  },
  {
    name: "Sample Track 2",
    artist: "Sample Artist",
    album: "Sample Album",
    uri: "spotify:track:7ouMYWpwJ422jRcDASZB7P",
    playUrl: "/api/spotify-play?uri=spotify:track:7ouMYWpwJ422jRcDASZB7P",
    external_url: "https://open.spotify.com/track/7ouMYWpwJ422jRcDASZB7P"
  }
  // Add more sample tracks if needed
];

export default async function handler(req, res) {
  try {
    const access_token = await getAccessToken();

    // Top tracks
    const topRes = await fetch("https://api.spotify.com/v1/me/top/tracks?limit=10", {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    const topData = await topRes.json();
    console.log(topData); 
    let topTracks = topData.items?.map(track => ({
      name: track.name,
      artist: track.artists.map(a => a.name).join(", "),
      album: track.album.name,
      uri: track.uri,
      playUrl: `/api/spotify-play?uri=${track.uri}`,
      external_url: track.external_urls.spotify,
    })) || SAMPLE_TRACKS;

    // Now playing
    const nowRes = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    let nowPlaying = { isPlaying: false };
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
    }

    res.status(200).json({ topTracks, nowPlaying });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch Spotify data", details: err.message });
  }
}
