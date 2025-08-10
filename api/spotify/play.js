// /api/play.js

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
  if (!data.access_token) throw new Error("Could not refresh token");
  return data.access_token;
}

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  const cookies = parseCookies(req);
  let access_token = cookies.spotify_access_token || "";
  let refresh_token = cookies.spotify_refresh_token || "";

  // Accept both JSON body and query param for 'uri'
  let uri =
    req.body?.uri ||
    req.query?.uri ||
    (req.body && typeof req.body === "string"
      ? JSON.parse(req.body).uri
      : null);

  if (!uri) {
    return res.status(400).json({ error: "Missing track URI" });
  }

  if (!access_token || !refresh_token) {
    return res.status(401).json({ error: "Not authenticated." });
  }

  try {
    let response = await fetch("https://api.spotify.com/v1/me/player/play", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uris: [uri] }),
    });
    if (response.status === 401) {
      access_token = await refreshAccessToken(refresh_token);
      response = await fetch("https://api.spotify.com/v1/me/player/play", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ uris: [uri] }),
      });
    }
    if (response.status === 204) {
      res.status(200).json({ message: `Playing ${uri}` });
    } else {
      const errData = await response.json();
      res.status(response.status).json(errData);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
