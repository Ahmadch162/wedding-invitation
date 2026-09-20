import { useState } from "react";

function DoorEntrance({ onOpened }) {
  const [opening, setOpening] = useState(false);

  const openDoor = () => {
    if (opening) return;

    setOpening(true);

    window.setTimeout(() => {
      onOpened();
    }, 1900);
  };

  return (
    <section
      className={`door-screen ${opening ? "door-screen--opening" : ""}`}
      aria-label="Mehndi invitation entrance"
    >
      <div className="door-background-pattern" />

      <div className="door-arch">
        <div className="arch-decoration arch-decoration--top">
          <span>✦</span>
          <span>❈</span>
          <span>✦</span>
        </div>

        <div className="door-frame">
          <div className="door-panel door-panel--left">
            <div className="door-carving">
              <span className="carving-flower">✿</span>
              <span className="carving-paisley">❧</span>
              <span className="carving-flower">✿</span>
            </div>

            <div className="door-knob" />
          </div>

          <div className="door-panel door-panel--right">
            <div className="door-carving">
              <span className="carving-flower">✿</span>
              <span className="carving-paisley">❧</span>
              <span className="carving-flower">✿</span>
            </div>

            <div className="door-knob" />
          </div>

          <div className="door-light">
            <div className="door-light-content">
              <span className="mini-ornament">✦</span>
              <span>مہندی</span>
              <span className="mini-ornament">✦</span>
            </div>
          </div>
        </div>
      </div>

      <div className="door-copy">
        <p className="eyebrow">A Celebration of Love & Togetherness</p>

        <h1>
          <span>MEHNDI</span>
          <small>THE CELEBRATION BEGINS</small>
        </h1>

        <button
          className="gold-button"
          onClick={openDoor}
          disabled={opening}
        >
          <span>Open the Door</span>
          <span className="button-arrow">→</span>
        </button>

        <p className="door-date">16 · 10 · 2026</p>
      </div>
    </section>
  );
}

export default DoorEntrance;