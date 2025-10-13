import { useState, useEffect, useRef } from "react";
import { FaSpotify } from "react-icons/fa";
import "./SpotifyPopup.css";
import { FaHeadphones } from "react-icons/fa";

export default function SpotifyPopup() {
  const [show, setShow] = useState(false);
  const [spotifyData, setSpotifyData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [playingTrack, setPlayingTrack] = useState(null);
  const popupRef = useRef(null);

  const togglePopup = () => setShow((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShow(false);
      }
    };
    if (show) document.addEventListener("mousedown", handleClickOutside);
    else document.removeEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [show]);

  useEffect(() => {
    if (show && !spotifyData) {
      setLoading(true);
      fetch("/api/spotify")
        .then((res) => res.json())
        .then((data) => setSpotifyData(data))
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [show, spotifyData]);

  const playTrack = async (url, name) => {
    try {
      setPlayingTrack(name);
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
    <div className="spotify-wrapper" ref={popupRef}>
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
              <h4 className="spotify-header">
                <FaHeadphones style={{ color: "#1DB954" }} /> My Top 10 Tracks
              </h4>
              <ul className="spotify-list">
                {spotifyData.topTracks.map((track) => {
                  const isCurrentTrack = playingTrack === track.name;

                  return (
                    <li key={track.uri} className="spotify-track">
                                       <div className="track-info">
                        <span className="track-name">{track.name}</span>
                        <span className="track-artist">{track.artist}</span>
                      </div>
                      <div className="track-controls">
                        {!isCurrentTrack ? (
                          <button
                            onClick={() => playTrack(track.playUrl, track.name)}
                            className="spotify-btn play"
                          >
                            ▶
                          </button>
                        ) : (
                          <button
                            onClick={() =>
                              stopTrack(spotifyData.nowPlaying?.pauseUrl)
                            }
                            className="spotify-btn pause"
                          >
                            ⏸
                          </button>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
}
