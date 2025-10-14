// /api/spotify-search.js
import { getAccessToken } from "./spotify";
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

export default async function handler(req, res) {
  try {
    const query = req.query.q;
    if (!query) return res.status(400).json({ error: "Missing search query" });

    const access_token = await getAccessToken();

    const searchRes = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(
        query
      )}&type=track&limit=10`,
      {
        headers: { Authorization: `Bearer ${access_token}` },
      }
    );

    const data = await searchRes.json();

    const tracks = data.tracks?.items?.map((track) => ({
      name: track.name,
      artist: track.artists.map((a) => a.name).join(", "),
      album: track.album.name,
      albumCover: track.album.images?.[0]?.url,
      uri: track.uri,
      playUrl: `/api/spotify-play?uri=${track.uri}`,
      external_url: track.external_urls.spotify,
    }));

    res.status(200).json({ tracks });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Failed to search Spotify", details: err.message });
  }
}
