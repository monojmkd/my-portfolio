const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

export default async function handler(req, res) {
  const { code } = req.query;

  if (!code) {
    return res.status(400).send(`
      <h1>Missing authorization code!</h1>
      <p>Make sure you opened the Spotify authorize URL correctly.</p>
    `);
  }

  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
  const redirect_uri = process.env.SPOTIFY_REDIRECT_URI; 
  const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');

  try {
    
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${basic}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri,
      }),
    });

    const data = await response.json();

    if (!data.refresh_token) {
      return res.status(500).send(`
        <h1>No refresh token returned!</h1>
        <p>Make sure your redirect URI matches exactly and add <code>show_dialog=true</code> to your authorize URL.</p>
        <pre>${JSON.stringify(data, null, 2)}</pre>
      `);
    }

    
    res.status(200).send(`
      <h1> Spotify Refresh Token</h1>
      <p>Copy this token and save it in your .env / Vercel environment as <code>SPOTIFY_REFRESH_TOKEN</code></p>
      <pre style="word-wrap: break-word; white-space: pre-wrap;">${data.refresh_token}</pre>
    `);
  } catch (err) {
    console.error(err);
    res.status(500).send(`<h1>Error exchanging code for token</h1><pre>${err}</pre>`);
  }
}
