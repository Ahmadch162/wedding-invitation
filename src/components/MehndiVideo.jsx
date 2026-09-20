function MehndiVideo() {
  return (
    <section className="video-section section-shell">
      <div className="section-heading reveal">
        <p className="eyebrow">A Glimpse of the Celebration</p>

        <h2>Mehndi Moments</h2>

        <div className="ornamental-divider">
          <span />
          <b>✦</b>
          <span />
        </div>
      </div>

      <div className="video-frame">
        <video
          controls
          playsInline
          preload="metadata"
          poster="/images/mehndi-poster.jfif"
        >
          <source
            src="/videos/mehndi-video.mp4"
            type="video/mp4"
          />

          Your browser does not support HTML5 video.
        </video>
      </div>
    </section>
  );
}

export default MehndiVideo;