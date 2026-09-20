function EventDetails() {
  return (
    <section className="event-section section-shell">
      <div className="section-heading reveal">
        <p className="eyebrow">Save the Date</p>

        <h2>Join Us</h2>

        <div className="ornamental-divider">
          <span />
          <b>✦</b>
          <span />
        </div>
      </div>

      <div className="event-grid">
        <article className="event-card">
          <div className="event-icon">☼</div>

          <p className="event-label">DATE</p>

          <h3>16 October 2026</h3>

          <p>
            A beautiful evening filled with colour,
            music, laughter and celebration.
          </p>
        </article>

        <article className="event-card">
          <div className="event-icon">⌂</div>

          <p className="event-label">VENUE</p>

          <h3>Home</h3>

          <p>
            An intimate celebration surrounded by
            family, warmth and love.
          </p>
        </article>

        <article className="event-card">
          <div className="event-icon">✦</div>

          <p className="event-label">OCCASION</p>

          <h3>Mehndi</h3>

          <p>
            Come dressed in your brightest colours
            and bring your happiest smiles.
          </p>
        </article>
      </div>
    </section>
  );
}

export default EventDetails;