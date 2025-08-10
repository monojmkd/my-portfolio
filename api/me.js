async function fetchSpotify(endpoint, token) {
  const res = await fetch(`https://api.spotify.com/v1/${endpoint}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

export default async function handler(req, res) {
  let access_token = req.cookies.spotify_access_token;

  if (!access_token) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  // Try fetching profile
  let profile = await fetchSpotify("me", access_token);

  if (profile.error?.status === 401) {
    // Refresh expired token
    const refreshRes = await fetch(`${process.env.BASE_URL}/api/refresh`, {
      headers: { cookie: req.headers.cookie || "" },
    });
    const refreshData = await refreshRes.json();

    if (!refreshData.access_token) {
      return res.status(401).json({ error: "Unable to refresh token" });
    }

    access_token = refreshData.access_token;
    profile = await fetchSpotify("me", access_token);
  }

  // Get currently playing track
  const currentlyPlaying = await fetchSpotify(
    "me/player/currently-playing",
    access_token
  );

  // Get top tracks
  const topTracks = await fetchSpotify(
    "me/top/tracks?limit=5&time_range=short_term",
    access_token
  );

  res.status(200).json({
    profile,
    currentlyPlaying: currentlyPlaying || null,
    topTracks: topTracks.items || [],
  });
}
