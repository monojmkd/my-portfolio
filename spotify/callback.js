const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

export default async function handler(req, res) {
  const { code } = req.query;

  if (!code) return res.status(400).send("Missing code in query params");

  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
  const redirect_uri = process.env.SPOTIFY_REDIRECT_URI; // must match the one used in Spotify Dashboard

  const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");

  try {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${basic}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri,
      }),
    });

    const data = await response.json();

    // data.refresh_token is what you need
    console.log("Refresh token:", data.refresh_token);

    res.status(200).send(
      `✅ Success! Check console for refresh_token. Save this in your .env as SPOTIFY_REFRESH_TOKEN`
    );
  } catch (err) {
    console.error(err);
    res.status(500).send("Error exchanging code for token");
  }
}
