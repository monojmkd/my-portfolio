export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const { uri } = req.body;
  if (!uri) return res.status(400).json({ error: "Track URI required" });

  await fetch("https://api.spotify.com/v1/me/player/play", {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${process.env.SPOTIFY_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ uris: [uri] }),
  });

  res.json({ status: `Playing track: ${uri}` });
}
