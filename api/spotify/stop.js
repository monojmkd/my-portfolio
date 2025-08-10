export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  await fetch("https://api.spotify.com/v1/me/player/pause", {
    method: "PUT",
    headers: { Authorization: `Bearer ${process.env.SPOTIFY_ACCESS_TOKEN}` },
  });

  res.json({ status: "Playback stopped" });
}
