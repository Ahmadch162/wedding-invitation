import { useEffect, useRef, useState } from "react";

function MusicPlayer({ shouldPlay }) {
  const audioRef = useRef(null);

  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    if (!shouldPlay || !audioRef.current) return;

    const audio = audioRef.current;

    audio.volume = 0.45;

    const attemptPlay = async () => {
      try {
        await audio.play();
        setPlaying(true);
      } catch {
        // Autoplay blocked — user can manually start it.
        setPlaying(false);
      }
    };

    attemptPlay();
  }, [shouldPlay]);

  const togglePlay = async () => {
    const audio = audioRef.current;

    if (!audio) return;

    if (audio.paused) {
      try {
        await audio.play();
        setPlaying(true);
      } catch {
        setPlaying(false);
      }
    } else {
      audio.pause();
      setPlaying(false);
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.muted = !audio.muted;
    setMuted(audio.muted);
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/audio/mehndi-music.mp3"
        loop
        preload="auto"
      />

      <div
        className={`music-player ${
          shouldPlay ? "music-player--visible" : ""
        }`}
      >
        <button
          type="button"
          onClick={togglePlay}
          aria-label={playing ? "Pause music" : "Play music"}
          className="music-button"
        >
          {playing ? "Ⅱ" : "▶"}
        </button>

        <div className="music-label">
          <span>MEHNDI</span>
          <small>{playing ? "Playing" : "Music"}</small>
        </div>

        <button
          type="button"
          onClick={toggleMute}
          aria-label={muted ? "Unmute music" : "Mute music"}
          className="music-mute"
        >
          {muted ? "×" : "♪"}
        </button>
      </div>
    </>
  );
}

export default MusicPlayer;