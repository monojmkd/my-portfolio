import { getTopTracks, getNowPlaying } from '../lib/spotify';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Fetch top tracks and now playing in parallel
    const [topTracksRes, nowPlayingRes] = await Promise.all([
      getTopTracks(),
      getNowPlaying(),
    ]);

    const topTracks = await topTracksRes.json();
    
    let nowPlaying = null;
    if (nowPlayingRes.status === 200) {
      nowPlaying = await nowPlayingRes.json();
    }

    // Format the response
    const response = {
      nowPlaying: nowPlaying
        ? {
            isPlaying: nowPlaying.is_playing,
            name: nowPlaying.item?.name,
            artist: nowPlaying.item?.artists.map((a) => a.name).join(', '),
            album: nowPlaying.item?.album.name,
            albumArt: nowPlaying.item?.album.images[0]?.url,
            songUrl: nowPlaying.item?.external_urls.spotify,
            duration: nowPlaying.item?.duration_ms,
            progress: nowPlaying.progress_ms,
          }
        : null,
      topTracks: topTracks.items?.map((track, index) => ({
        rank: index + 1,
        name: track.name,
        artist: track.artists.map((a) => a.name).join(', '),
        album: track.album.name,
        albumArt: track.album.images[0]?.url,
        songUrl: track.external_urls.spotify,
        uri: track.uri,
        duration: track.duration_ms,
        popularity: track.popularity,
      })) || [],
    };

    return res.status(200).json(response);
  } catch (error) {
    console.error('Spotify API Error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
}