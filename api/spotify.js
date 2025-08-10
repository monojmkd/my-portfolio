// /api/spotify.js

function parseCookies(req) {
  return Object.fromEntries(
    (req.headers.cookie || "")
      .split(";")
      .map((v) => v.split("="))
      .map(([k, ...vs]) => [k.trim(), decodeURIComponent(vs.join("="))])
      .filter(([k]) => k)
  );
}

async function refreshAccessToken(refresh_token) {
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
      refresh_token,
    }),
  });
  const data = await res.json();
  if (!data.access_token) throw new Error("Unable to refresh token");
  return data.access_token;
}

async function spotifyGet(endpoint, access_token, refresh_token) {
  let res = await fetch(`https://api.spotify.com/v1/${endpoint}`, {
    headers: { Authorization: `Bearer ${access_token}` },
  });

  if (res.status === 401 && refresh_token) {
    access_token = await refreshAccessToken(refresh_token);
    res = await fetch(`https://api.spotify.com/v1/${endpoint}`, {
      headers: { Authorization: `Bearer ${access_token}` },
    });
  }

  if (res.status === 204) {
    // No content, return null safely
    return null;
  }

  if (!res.ok) {
    throw new Error(`Spotify API error: ${res.status}`);
  }

  return res.json();
}

export default async function handler(req, res) {
  const cookies = parseCookies(req);
  let access_token = cookies.spotify_access_token || "";
  let refresh_token = cookies.spotify_refresh_token || "";

  if (!access_token || !refresh_token) {
    return res
      .status(401)
      .json({ error: "Not authenticated. Please /api/login." });
  }

  try {
    const [topTracksData, nowPlayingData, followedArtistsData] =
      await Promise.all([
        spotifyGet("me/top/tracks?limit=10", access_token, refresh_token),
        spotifyGet("me/player/currently-playing", access_token, refresh_token),
        spotifyGet(
          "me/following?type=artist&limit=50",
          access_token,
          refresh_token
        ),
      ]);

    res.setHeader("Content-Type", "application/json");
    res.status(200).send(
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
          followed_artists: followedArtistsData.artists?.items?.map((a) => ({
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
