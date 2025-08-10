import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import querystring from "querystring";
import fs from "fs";

dotenv.config();

const app = express();
app.use(cookieParser());
app.use(express.json());

const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REDIRECT_URI, PORT } =
  process.env;

const TOKEN_FILE = "./spotify_tokens.json";

let tokens = { access_token: null, refresh_token: null };
if (fs.existsSync(TOKEN_FILE)) {
  tokens = JSON.parse(fs.readFileSync(TOKEN_FILE, "utf-8"));
}

function saveTokens() {
  fs.writeFileSync(TOKEN_FILE, JSON.stringify(tokens, null, 2));
}

app.get("/login", (req, res) => {
  const scopes = [
    "user-top-read",
    "user-follow-read",
    "user-read-currently-playing",
    "user-modify-playback-state",
    "user-read-playback-state",
  ].join(" ");

  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: SPOTIFY_CLIENT_ID,
        scope: scopes,
        redirect_uri: SPOTIFY_REDIRECT_URI,
      })
  );
});

app.get("/callback", async (req, res) => {
  const code = req.query.code || null;

  const tokenResponse = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(SPOTIFY_CLIENT_ID + ":" + SPOTIFY_CLIENT_SECRET).toString(
          "base64"
        ),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: querystring.stringify({
      grant_type: "authorization_code",
      code: code,
      redirect_uri: SPOTIFY_REDIRECT_URI,
    }),
  });

  const data = await tokenResponse.json();
  tokens.access_token = data.access_token;
  tokens.refresh_token = data.refresh_token;
  saveTokens();

  res.redirect("/spotify");
});

async function refreshAccessToken() {
  if (!tokens.refresh_token) return;
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(SPOTIFY_CLIENT_ID + ":" + SPOTIFY_CLIENT_SECRET).toString(
          "base64"
        ),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: querystring.stringify({
      grant_type: "refresh_token",
      refresh_token: tokens.refresh_token,
    }),
  });
  const data = await response.json();
  tokens.access_token = data.access_token;
  saveTokens();
}

async function spotifyGet(endpoint) {
  const res = await fetch(`https://api.spotify.com/v1/${endpoint}`, {
    headers: { Authorization: `Bearer ${tokens.access_token}` },
  });
  if (res.status === 401) {
    await refreshAccessToken();
    return spotifyGet(endpoint);
  }
  return res.json();
}

app.get("/spotify", async (req, res) => {
  if (!tokens.access_token) {
    return res
      .status(401)
      .json({ error: "Not authenticated. Visit /login first." });
  }

  try {
    const topTracksData = await spotifyGet("me/top/tracks?limit=10");
    const nowPlayingData = await spotifyGet("me/player/currently-playing");
    const followedArtistsData = await spotifyGet(
      "me/following?type=artist&limit=50"
    );

    res.setHeader("Content-Type", "application/json");
    res.send(
      JSON.stringify(
        {
          top_tracks: topTracksData.items.map((t) => ({
            name: t.name,
            id: t.id,
            artists: t.artists.map((a) => a.name),
            play_uri: t.uri,
          })),
          now_playing: nowPlayingData?.item
            ? {
                track: {
                  name: nowPlayingData.item.name,
                  id: nowPlayingData.item.id,
                  artists: nowPlayingData.item.artists.map((a) => a.name),
                },
                is_playing: nowPlayingData.is_playing,
              }
            : null,
          followed_artists: followedArtistsData.artists.items.map((a) => ({
            name: a.name,
            id: a.id,
          })),
        },
        null,
        2
      )
    );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/spotify/stop", async (req, res) => {
  await fetch("https://api.spotify.com/v1/me/player/pause", {
    method: "PUT",
    headers: { Authorization: `Bearer ${tokens.access_token}` },
  });
  res.json({ status: "Playback stopped" });
});

app.post("/spotify/play", async (req, res) => {
  const { uri } = req.body;
  if (!uri) return res.status(400).json({ error: "Track URI required" });

  await fetch("https://api.spotify.com/v1/me/player/play", {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${tokens.access_token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ uris: [uri] }),
  });
  res.json({ status: `Playing track: ${uri}` });
});

app.listen(PORT, () => {
  console.log(`Spotify API running on port ${PORT}`);
});
