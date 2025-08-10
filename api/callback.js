let usedCodes = new Set(); // temporary, resets on redeploy

export default async function handler(req, res) {
  const code = req.query.code || null;

  if (!code) {
    return res.status(400).json({ error: "missing_code" });
  }

  if (usedCodes.has(code)) {
    return res.status(400).json({ error: "code_already_used" });
  }

  const redirectUri = process.env.SPOTIFY_REDIRECT_URI;

  try {
    const tokenResponse = await fetch(
      "https://accounts.spotify.com/api/token",
      {
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
          grant_type: "authorization_code",
          code,
          redirect_uri: redirectUri, // must match Spotify exactly
        }),
      }
    );

    const data = await tokenResponse.json();

    if (data.error) {
      return res.status(400).json({ error: data.error, details: data });
    }

    // Mark code as used
    usedCodes.add(code);

    // Store tokens
    res.setHeader("Set-Cookie", [
      `spotify_access_token=${data.access_token}; Path=/; HttpOnly; Secure; SameSite=Lax`,
      `spotify_refresh_token=${data.refresh_token}; Path=/; HttpOnly; Secure; SameSite=Lax`,
    ]);

    return res.redirect("/");
  } catch (err) {
    console.error("Callback error:", err);
    return res.status(500).json({ error: "server_error" });
  }
}
