// /api/save-tokens.js
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (req.headers.authorization !== `Bearer ${process.env.VERCEL_TOKEN}`) {
    return res.status(403).json({ error: "Unauthorized" });
  }

  const body = req.body;

  if (!body || typeof body !== "object") {
    return res.status(400).json({ error: "Invalid body" });
  }

  const updates = Object.entries(body);

  try {
    for (const [key, value] of updates) {
      await fetch(
        `https://api.vercel.com/v9/projects/${process.env.VERCEL_PROJECT_ID}/env/${key}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${process.env.VERCEL_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            value,
            target: ["production"],
          }),
        }
      );
    }

    res.status(200).json({ success: true, updated: updates.map(([k]) => k) });
  } catch (error) {
    console.error("Error updating env vars:", error);
    res.status(500).json({ error: "Failed to update environment variables" });
  }
}
