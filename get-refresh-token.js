/**
 * get-refresh-token.js
 * 
 * Run this once to generate your Spotify refresh_token.
 * Usage:
 *   1. Add your credentials in .env or directly below.
 *   2. Run: node get-refresh-token.js
 *   3. Visit the shown login URL in your browser.
 *   4. After granting permission, you’ll be redirected to http://localhost:8888/callback?code=XXXX
 *   5. Copy the "code" from the URL and paste it into the terminal.
 *   6. You’ll get your refresh_token printed — save it to your .env file.
 */

import express from "express";
import axios from "axios";
import open from "open";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 8888;

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const redirect_uri = `https://monojkumardas.in/spotify/callback`;

// Step 1: Ask for authorization
app.get("/login", (req, res) => {
  const scope = [
    "user-read-currently-playing",
    "user-read-playback-state",
    "user-top-read",
    "user-modify-playback-state",
  ].join(" ");

  const authUrl =
    "https://accounts.spotify.com/authorize?" +
    new URLSearchParams({
      response_type: "code",
      client_id,
      scope,
      redirect_uri,
    }).toString();

  res.redirect(authUrl);
});

// Step 2: Handle callback from Spotify
app.get("/callback", async (req, res) => {
  const code = req.query.code || null;

  if (!code) {
    return res.send("Missing authorization code.");
  }

  try {
    const tokenResponse = await axios.post(
      "https://accounts.spotify.com/api/token",
      new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri,
      }),
      {
        headers: {
          Authorization:
            "Basic " +
            Buffer.from(`${client_id}:${client_secret}`).toString("base64"),
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const { access_token, refresh_token } = tokenResponse.data;

    console.log("\n✅ Your refresh token:\n");
    console.log(refresh_token);
    console.log(
      "\n👉 Save this to your .env file as SPOTIFY_REFRESH_TOKEN=\n"
    );

    res.send(
      "✅ Success! Check your terminal for the refresh_token. You can now close this tab."
    );
  } catch (err) {
    console.error("Error getting tokens:", err.response?.data || err.message);
    res.send("❌ Error getting tokens. Check the terminal for details.");
  }
});

app.listen(port, () => {
  console.log(`\n🚀 Visit http://localhost:${port}/login to start the process`);
  open(`http://localhost:${port}/login`);
});
