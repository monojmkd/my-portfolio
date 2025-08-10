// /api/spotify.js
export async function refreshAccessToken() {
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

  if (!data.access_token) {
    console.error("Failed to refresh Spotify token", data);
    throw new Error("Failed to refresh Spotify token");
  }

  // Save to Vercel env vars
  await fetch(`${process.env.VERCEL_URL}/api/save-tokens`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.VERCEL_TOKEN}`,
    },
    body: JSON.stringify({
      SPOTIFY_ACCESS_TOKEN: data.access_token,
    }),
  });

  return data.access_token;
}

async function spotifyGet(endpoint) {
  let token = process.env.SPOTIFY_ACCESS_TOKEN;

  let res = await fetch(`https://api.spotify.com/v1/${endpoint}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  // If token expired, refresh and retry
  if (res.status === 401) {
    token = await refreshAccessToken();
    res = await fetch(`https://api.spotify.com/v1/${endpoint}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  return res.json();
}

export default async function handler(req, res) {
  if (!process.env.SPOTIFY_ACCESS_TOKEN) {
    return res.status(401).json({
      error: "Not authenticated. Visit /api/login first to get tokens.",
    });
  }

  try {
    const topTracksData = await spotifyGet("me/top/tracks?limit=10");
    const nowPlayingData = await spotifyGet("me/player/currently-playing");
    const followedArtistsData = await spotifyGet(
      "me/following?type=artist&limit=50"
    );

    res.setHeader("Content-Type", "application/json");
    res.send(
      JSON.stringify(
        {
          top_tracks: topTracksData.items?.map((t) => ({
            name: t.name,
            id: t.id,
            artists: t.artists.map((a) => a.name),
            play_uri: t.uri,
          })),
          now_playing: nowPlayingData?.item
            ? {
                track: {
                  name: nowPlayingData.item.name,
                  id: nowPlayingData.item.id,
                  artists: nowPlayingData.item.artists.map((a) => a.name),
                },
                is_playing: nowPlayingData.is_playing,
              }
            : null,
          followed_artists: followedArtistsData.artists.items?.map((a) => ({
            name: a.name,
            id: a.id,
          })),
        },
        null,
        2
      )
    );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
