import { useState, useEffect } from "react";
import { FaSpotify } from "react-icons/fa";
import "./SpotifyPopup.css";

export default function SpotifyPopup() {
  const [show, setShow] = useState(false);
  const [spotifyData, setSpotifyData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [playingTrack, setPlayingTrack] = useState(null);

  const togglePopup = () => setShow(prev => !prev);

  // Fetch Spotify data when popup opens
  useEffect(() => {
    if (show && !spotifyData) {
      setLoading(true);
      fetch("/api/spotify")
        .then(res => res.json())
        .then(data => setSpotifyData(data))
        .catch(err => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [show, spotifyData]);

  const playTrack = async (url, name) => {
    try {
      setPlayingTrack(name); // optional visual feedback
      await fetch(url);
    } catch (err) {
      console.error("Failed to play track:", err);
    }
  };

  const stopTrack = async (url) => {
    try {
      setPlayingTrack(null);
      await fetch(url);
    } catch (err) {
      console.error("Failed to pause track:", err);
    }
  };

  return (
    <div className="spotify-wrapper">
      <FaSpotify
        className="spotify-icon"
        size={25}
        onClick={togglePopup}
        style={{ cursor: "pointer", color: "#1DB954" }}
      />
      {show && (
        <div className="spotify-popup">
          {loading && <p>Loading Spotify...</p>}

          {spotifyData && (
            <>
              <h4>🎵 Top Tracks</h4>
              <ul className="spotify-list">
                {spotifyData.topTracks.map((track) => (
                  <li key={track.uri}>
                    <span className="track-name">{track.name} — {track.artist}</span>
                    <div className="spotify-buttons">
                      <button
                        className={playingTrack === track.name ? "playing" : ""}
                        onClick={() => playTrack(track.playUrl, track.name)}
                      >
                        ▶
                      </button>
                      <a
                        href={track.external_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="spotify-link"
                      >
                        🔗
                      </a>
                    </div>
                  </li>
                ))}
              </ul>

              {spotifyData.nowPlaying.isPlaying && (
                <div className="now-playing">
                  <h5>🎧 Now Playing</h5>
                  <span className="track-name">{spotifyData.nowPlaying.name} — {spotifyData.nowPlaying.artist}</span>
                  <div className="spotify-buttons">
                    <button onClick={() => stopTrack(spotifyData.nowPlaying.pauseUrl)}>⏸ Pause</button>
                    <a
                      href={spotifyData.nowPlaying.external_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="spotify-link"
                    >
                      🔗
                    </a>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
