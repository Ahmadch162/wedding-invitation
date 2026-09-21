import React, { useEffect, useRef, useState } from "react";

/* ============================================================
   BACKGROUND IMAGES
   Put both files in your project's /public folder:
     public/mobile.jpeg   (portrait phones)
     public/desktop.jpeg  (landscape screens)
   ============================================================ */

const HERO_MOBILE = "/mobile.jpeg";
const HERO_DESKTOP = "/desktop.jpeg";

/* ============================================================
   MUSIC + VIDEO
   Put your files in the /public folder:
     public/music.mp3   background music (plays after the envelope is tapped)
     public/video.mp4   the video shown after the second page
   Or set VIDEO.youtubeId (e.g. "dQw4w9WgXcQ") to embed a YouTube video.
   ============================================================ */

const MUSIC_SRC = "/music.mp3";

const VIDEO = {
  src: "/video.mp4",
  poster: "", // optional thumbnail, e.g. "/video-poster.jpg"
  youtubeId: "", // if set, this is used instead of src
  title: "A little glimpse",
  caption: "Watch a short message from our family before the big day.",
};

/* ============================================================
   EDIT YOUR DETAILS HERE
   ============================================================ */

const EVENT = {
  host: "Abid Farooq",
  hostCouple: "Mr. & Mrs. Abid Farooq",
  dateLong: "Saturday, 17 October 2026",
  dateShort: "17 October 2026",
  weekday: "Saturday",
  timeLabel: "6:00 PM – 10:00 PM",
  // Pakistan Standard Time (+05:00) so the countdown is right for every visitor
  start: "2026-10-17T18:00:00+05:00",
  end: "2026-10-17T22:00:00+05:00",
};

const VENUE = {
  name: "Eden Royal Marquee",
  // Full postal / street address shown as plain text under the venue heading.
  address: "Shahbazpur Road, Opposite Grid Station, Rahim Yar Khan",
  lat: 28.4254938,
  lng: 70.2810724,
  placeId: "ChIJZXBHXABbNzkRFlKqxrdt5UE",
  // Leaving "origin" out makes Google Maps start from the visitor's location.
  directionsLink:
    "https://www.google.com/maps/dir/?api=1&destination=28.4254938,70.2810724&destination_place_id=ChIJZXBHXABbNzkRFlKqxrdt5UE&travelmode=driving",
  embedSrc:
    "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d224562.7702245561!2d69.99268128671875!3d28.425493699999986!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39375b005c477065%3A0x41e56db7c6aa5216!2sEden%20Royal%20Marquee!5e0!3m2!1sen!2sus!4v1789853122161!5m2!1sen!2sus",
};

const COUPLES = [
  {
    id: "one",
    label: "First Barat",
    tone: "wine",
    bride: { name: "Sarosh Abid", parent: "Daughter of Abid Farooq" },
    groom: { name: "Sohaib Asif", parent: "Son of Asif Saleem" },
  },
  {
    id: "two",
    label: "Second Barat",
    tone: "emerald",
    bride: { name: "Zoya Abid", parent: "Daughter of Abid Farooq" },
    groom: { name: "Abdul-Hannan Amir", parent: "Son of Amir Zubair" },
  },
];

// Phone number, international format, digits only (country code + number, no
// "+", spaces or dashes), e.g. "923001234567". Each one below is a RANDOM
// PLACEHOLDER — swap in the real numbers before you publish this page.
// Call / WhatsApp buttons appear automatically on any card that has a number.
const RSVP = [
  { name: "Mr. Abid Farooq", phone: "923009677782" },
  { name: "Mr. Sajid Farooq", phone: "971553220687" },
  { name: "Mr. Ahmad Bin Abid", phone: "923117458141" },
  { name: "Mr. Usman Jameel", phone: "923366606207" },
  { name: "Mr. Owais Shafqat", phone: "923002345652" },
  { name: "Mr. Mubashir Sajid", phone: "923041660032" },
  { name: "Mr. Muhammad Bin Abid", phone: "923335628569" },
];

const TARGET = new Date(EVENT.start).getTime();

/* ============================================================
   SMALL HELPERS
   ============================================================ */

const initials = (name) =>
  name
    .split(" ")
    .filter((w) => w && w.toLowerCase() !== "Bin")
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");

const downloadCalendar = () => {
  const fmt = (v) =>
    new Date(v).toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  const esc = (s) => s.replace(/[,;]/g, (m) => "\\" + m);

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Barat Invitation//EN",
    "BEGIN:VEVENT",
    "UID:barat-2026-10-17@invitation",
    `DTSTAMP:${fmt(new Date().toISOString())}`,
    `DTSTART:${fmt(EVENT.start)}`,
    `DTEND:${fmt(EVENT.end)}`,
    `SUMMARY:${esc("Barat Ceremony - Sarosh & Sohaib | Zoya & Abdul-Hannan")}`,
    `LOCATION:${esc(VENUE.name)}`,
    `DESCRIPTION:${esc("Map: " + VENUE.directionsLink)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];

  const blob = new Blob([lines.join("\r\n")], {
    type: "text/calendar;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "barat-ceremony.ics";
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
};

/* ============================================================
   ORNAMENTS (inline SVG)
   ============================================================ */

function Khatam({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 200"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      aria-hidden="true"
    >
      <rect x="40" y="40" width="120" height="120" />
      <rect x="40" y="40" width="120" height="120" transform="rotate(45 100 100)" />
      <rect x="70" y="70" width="60" height="60" transform="rotate(22.5 100 100)" />
      <circle cx="100" cy="100" r="46" />
      <circle cx="100" cy="100" r="30" />
    </svg>
  );
}

function Divider() {
  return (
    <div className="divider" aria-hidden="true">
      <span />
      <i />
      <span />
    </div>
  );
}

const Icon = ({ children }) => (
  <svg
    viewBox="0 0 24 24"
    width="22"
    height="22"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {children}
  </svg>
);

const CalendarIcon = () => (
  <Icon>
    <rect x="3" y="4.5" width="18" height="16" rx="2" />
    <path d="M3 9.5h18M8 2.5v4M16 2.5v4" />
  </Icon>
);
const ClockIcon = () => (
  <Icon>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3.5 2" />
  </Icon>
);
const PinIcon = () => (
  <Icon>
    <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </Icon>
);
const PhoneIcon = () => (
  <Icon>
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
  </Icon>
);
const ChatIcon = () => (
  <Icon>
    <path d="M21 12a8 8 0 0 1-11.7 7L4 20l1.1-5A8 8 0 1 1 21 12z" />
  </Icon>
);

/* ============================================================
   REVEAL ON SCROLL
   ============================================================ */

function Reveal({ children, delay = 0, className = "", as: Tag = "div" }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${shown ? "in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

/* ============================================================
   COUNTDOWN
   ============================================================ */

function Countdown() {
  const calc = () => {
    const diff = TARGET - Date.now();
    if (diff <= 0) return null;

    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff / 3600000) % 24),
      minutes: Math.floor((diff / 60000) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };

  const [time, setTime] = useState(calc);

  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  }, []);

  const pad = (n) => String(n).padStart(2, "0");

  if (!time) {
    return (
      <p className="count-done">
        The day has arrived — we can’t wait to celebrate with you.
      </p>
    );
  }

  return (
    <div className="count-grid" role="timer" aria-live="off">
      {[
        ["Days", time.days],
        ["Hours", time.hours],
        ["Minutes", time.minutes],
        ["Seconds", time.seconds],
      ].map(([label, value]) => (
        <div className="count-cell" key={label}>
          <div className="count-num">{pad(value)}</div>
          <div className="count-label">{label}</div>
        </div>
      ))}
    </div>
  );
}

/* ============================================================
   COUPLE CARD
   ============================================================ */

function CoupleCard({ couple, delay }) {
  return (
    <Reveal delay={delay} className="couple-wrap">
      <article className={`couple couple--${couple.tone}`}>
        <div className="couple-badge">{couple.label}</div>

        <p className="person-role">The Bride</p>
        <h3 className="person-name">{couple.bride.name}</h3>
        <p className="person-parent">{couple.bride.parent}</p>

        <div className="weds" aria-hidden="true">
          <span />
          <em>weds</em>
          <span />
        </div>

        <p className="person-role">The Groom</p>
        <h3 className="person-name">{couple.groom.name}</h3>
        <p className="person-parent">{couple.groom.parent}</p>
      </article>
    </Reveal>
  );
}

/* ============================================================
   ENVELOPE OPENER + MUSIC / VIDEO PIECES
   ============================================================ */

function Envelope({ phase, onOpen }) {
  return (
    <div className={`env-overlay env--${phase}`} aria-hidden={phase !== "closed"}>
      <p className="env-title">Wedding Invitation</p>

      <button
        type="button"
        className="env-button"
        onClick={onOpen}
        disabled={phase !== "closed"}
        aria-label="Tap to open the invitation"
      >
        <span className="env">
          <span className="env-back" />

          <span className="env-card">
            <span className="env-card-urdu" lang="ur" dir="rtl">
              بسم اللہ الرحمٰن الرحیم
            </span>
            <span className="env-card-line">You are invited</span>
          </span>

          <span className="env-left" />
          <span className="env-right" />
          <span className="env-bottom" />

          <span className="env-flap">
            <span className="env-flap-out" />
            <span className="env-flap-in" />
          </span>

          <span className="env-seal">
            <span>
              Tap to
              <br />
              open
            </span>
          </span>
        </span>
      </button>
    </div>
  );
}

function SoundOnIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 9v6h4l5 4V5L8 9H4z" />
      <path d="M16.5 8.5a5 5 0 0 1 0 7" />
      <path d="M19 6a8.5 8.5 0 0 1 0 12" />
    </svg>
  );
}

function SoundOffIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 9v6h4l5 4V5L8 9H4z" />
      <path d="M17 9.5l5 5M22 9.5l-5 5" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <circle cx="32" cy="32" r="28" />
      <path d="M26 21l18 11-18 11z" fill="currentColor" stroke="none" />
    </svg>
  );
}

function VideoSection() {
  return (
    <section id="video" className="section video">
      <div className="wide">
        <Reveal className="heading heading--light">
          <p className="kicker">Watch</p>
          <h2 className="title">{VIDEO.title}</h2>
          {VIDEO.caption && <p className="lead">{VIDEO.caption}</p>}
        </Reveal>

        <Reveal className="video-frame" delay={120}>
          {VIDEO.youtubeId ? (
            <iframe
              title={VIDEO.title}
              src={`https://www.youtube-nocookie.com/embed/${VIDEO.youtubeId}?autoplay=1&mute=1&loop=1&playlist=${VIDEO.youtubeId}&controls=0&rel=0&modestbranding=1&playsinline=1&disablekb=1`}
              loading="lazy"
              allow="autoplay; encrypted-media"
              taBindex={-1}
            />
          ) : VIDEO.src ? (
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              disablePictureInPicture
              controlsList="nodownload noplaybackrate nofullscreen"
              poster={VIDEO.poster || undefined}
            >
              <source src={VIDEO.src} type="video/mp4" />
              Your browser can’t play this video.
            </video>
          ) : (
            <div className="video-empty">
              <PlayIcon />
              <p>Video coming soon</p>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}

/* ============================================================
   APP
   ============================================================ */

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Envelope: "closed" -> "opening" -> "leaving" -> "done"
  const [phase, setPhase] = useState("closed");
  const [muted, setMuted] = useState(false);
  const [musicOk, setMusicOk] = useState(true);
  const audioRef = useRef(null);
  const phaseRef = useRef("closed");
  const timersRef = useRef([]);
  phaseRef.current = phase;

  // Keep the page still while the envelope is showing
  useEffect(() => {
    const locked = phase === "closed" || phase === "opening";
    document.body.style.overflow = locked ? "hidden" : "";
    if (phase === "leaving") window.scrollTo(0, 0);
    return () => { document.body.style.overflow = ""; };
  }, [phase]);

  useEffect(() => () => timersRef.current.forEach(clearTimeout), []);

  // Pause music when the tab is hidden, resume when it comes back
  useEffect(() => {
    const onVisibility = () => {
      const a = audioRef.current;
      if (!a || phaseRef.current === "closed") return;
      if (document.hidden) a.pause();
      else a.play().catch(() => {});
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  const openInvite = () => {
    if (phaseRef.current !== "closed") return;
    setPhase("opening");

    // The tap is the user gesture browsers require before audio can start
    const a = audioRef.current;
    if (a) {
      a.volume = 0.6;
      a.play().catch(() => {});
    }

    const reduce =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    timersRef.current = [
      setTimeout(() => setPhase("leaving"), reduce ? 200 : 2000),
      setTimeout(() => setPhase("done"), reduce ? 600 : 3100),
    ];
  };

  const toggleMute = () => {
    const next = !muted;
    setMuted(next);
    if (audioRef.current) audioRef.current.muted = next;
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = () => setMenuOpen(false);
  const navSolid = scrolled || menuOpen;

  return (
    <>
      <style>{css}</style>

      {MUSIC_SRC && (
        <audio
          ref={audioRef}
          src={MUSIC_SRC}
          loop
          preload="auto"
          onError={() => setMusicOk(false)}
        />
      )}

      {phase !== "done" && <Envelope phase={phase} onOpen={openInvite} />}

      <div className={phase === "closed" || phase === "opening" ? "page-wait" : undefined}>

      {/* NAVIGATION — transparent over the hero art, solid once you scroll */}
      <nav className={`nav ${navSolid ? "nav--solid" : ""}`}>
        <a href="#top" className="nav-brand" onClick={go}>
          Wedding
        </a>

        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          <a href="#video" onClick={go}>Video</a>
          <a href="#couples" onClick={go}>The Couples</a>
          <a href="#details" onClick={go}>Details</a>
          <a href="#venue" onClick={go}>Venue</a>
          <a href="#rsvp" onClick={go}>RSVP</a>
        </div>

        <button
          className="menu-button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          {menuOpen ? "×" : "☰"}
        </button>
      </nav>

      {/* HERO — illustrated card fills the viewport exactly, text sits between the couples */}
      <header id="top" className="hero">
        <picture className="hero-bg">
          <source media="(max-aspect-ratio: 1/1)" srcSet={HERO_MOBILE} />
          <img src={HERO_DESKTOP} alt="" />
        </picture>

        <div className="hero-inner">
          <p className="hero-bismillah" lang="ur" dir="rtl">
            بسم اللہ الرحمٰن الرحیم
          </p>
                    <p className="hero-eyebrow">{EVENT.hostCouple} invite you to celebrate</p>
          <p className="hero-script">the weddings of their two beloved daughters</p>

          <div className="hero-names" role="heading" aria-level={1}>
            <span>
              <span>Sarosh</span> <i>&amp;</i> <span>Sohaib</span>
            </span>
            <em aria-hidden="true">&amp;</em>
            <span>
              <span>Zoya</span> <i>&amp;</i> <span>Abdul-Hannan</span>
            </span>
          </div>

          <div className="hero-actions">
            <a href="#details" className="btn btn-gold">View details</a>
            <a href="#rsvp" className="btn btn-ghost">RSVP</a>
          </div>
        </div>
      </header>

            {/* HOST INVITATION */}
      <section className="section host">
        <div className="narrow">
          <Reveal>
            <p className="kicker">With the blessings of Allah</p>
            <h2 className="host-name">{EVENT.hostCouple}</h2>
            <p className="host-sub">along with their family</p>
            <Divider />
            <p className="host-copy">
              cordially request the pleasure of your company, and that of your
              family, at the Barat ceremony of their beloved daughters
              <strong> Sarosh </strong>
              and
              <strong> Zoya</strong> — two sisters, celebrated together on one
              joyous evening.
            </p>
          </Reveal>
        </div>
      </section>

      {/* VIDEO — after the second page */}
      <VideoSection />

      {/* THE COUPLES */}
      <section id="couples" className="section couples">
        <div className="wide">
          <Reveal className="heading">
            <p className="kicker">Two sisters · Two Barats · One evening</p>
            <h2 className="title">The Couples</h2>
            <p className="lead">
              Both Barat ceremonies take place together on {EVENT.dateShort},
              at {VENUE.name}.
            </p>
          </Reveal>

          <div className="couples-grid">
            {COUPLES.map((couple, i) => (
              <CoupleCard key={couple.id} couple={couple} delay={i * 140} />
            ))}
          </div>
        </div>
      </section>

      {/* DETAILS */}
      <section id="details" className="section details">
        <div className="wide">
          <Reveal className="heading heading--light">
            <p className="kicker">Mark your calendar</p>
            <h2 className="title">The Details</h2>
          </Reveal>

          <div className="details-grid">
            <Reveal className="detail">
              <div className="detail-icon"><CalendarIcon /></div>
              <p className="detail-label">Date</p>
              <p className="detail-value">{EVENT.dateShort}</p>
              <p className="detail-sub">{EVENT.weekday}</p>
            </Reveal>

            <Reveal className="detail" delay={120}>
              <div className="detail-icon"><ClockIcon /></div>
              <p className="detail-label">Time</p>
              <p className="detail-value">{EVENT.timeLabel}</p>
              <p className="detail-sub">Evening</p>
            </Reveal>

            <Reveal className="detail" delay={240}>
              <div className="detail-icon"><PinIcon /></div>
              <p className="detail-label">Venue</p>
              <p className="detail-value">{VENUE.name}</p>
              <p className="detail-sub">Map below</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* VENUE + MAP */}
      <section id="venue" className="section venue">
        <div className="wide venue-grid">
          <Reveal className="venue-info">
            <p className="kicker">Where to find us</p>
            <h2 className="title">{VENUE.name}</h2>
            <p className="venue-address">{VENUE.address}</p>
            <p className="lead">
              We’ll be gathering here on {EVENT.dateLong}, from{" "}
              {EVENT.timeLabel}. Tap below for exact directions.
            </p>

            <a
              className="btn btn-wine"
              href={VENUE.directionsLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Get directions
            </a>
          </Reveal>

          <Reveal className="map-frame" delay={140}>
            <iframe
              title={`Map showing ${VENUE.name}`}
              src={VENUE.embedSrc}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Reveal>
        </div>
      </section>

      {/* COUNTDOWN */}
      <section className="section countdown">
        <div className="narrow">
          <Reveal>
            <p className="kicker kicker--gold">Counting down to the Barat</p>
            <Countdown />
          </Reveal>
        </div>
      </section>

      {/* RSVP */}
      <section id="rsvp" className="section rsvp">
        <div className="wide">
          <Reveal className="heading">
            <p className="kicker">Kindly reply</p>
            <h2 className="title">RSVP</h2>
            <p className="lead">
              Please confirm your presence with any of the family members
              below.
            </p>
          </Reveal>

          <div className="rsvp-grid">
            {RSVP.map((person, i) => (
              <Reveal className="rsvp-card" key={person.name} delay={(i % 3) * 100}>
                <div className="rsvp-avatar">{initials(person.name)}</div>
                <p className="rsvp-name">{person.name}</p>

                {person.phone && (
                  <>
                    <p className="rsvp-phone">{person.phone}</p>
                    <div className="rsvp-actions">
                      <a href={`tel:+${person.phone}`} aria-label={`Call ${person.name}`}>
                        <PhoneIcon /> Call
                      </a>
                      <a
                        href={`https://wa.me/${person.phone}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`WhatsApp ${person.name}`}
                      >
                        <ChatIcon /> WhatsApp
                      </a>
                    </div>
                  </>
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
            <footer className="footer">
        <Khatam className="footer-star" />
        <p className="footer-script">With warm regards</p>
        <p className="footer-host">{EVENT.hostCouple}</p>
        <p className="footer-meta">
          17 · 10 · 2026 &nbsp;•&nbsp; {VENUE.name}
        </p>
        <p className="footer-fine">
          Sarosh &amp; Sohaib &nbsp;|&nbsp; Zoya &amp; Abdul-Hannan
        </p>
      </footer>
      </div>

      {/* MUSIC CONTROL — appears once the card is open */}
      {(phase === "leaving" || phase === "done") && MUSIC_SRC && musicOk && (
        <button
          type="button"
          className="music-btn"
          onClick={toggleMute}
          aria-label={muted ? "Unmute music" : "Mute music"}
          aria-pressed={muted}
        >
          {muted ? <SoundOffIcon /> : <SoundOnIcon />}
        </button>
      )}
    </>
  );
}

/* ============================================================
   STYLES
   ============================================================ */

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500;1,600&family=Jost:wght@300;400;500;600&family=Pinyon+Script&family=Noto+Nastaliq+Urdu:wght@400;500;600&display=swap');

  :root {
    --wine-900: #2e0812;
    --wine-800: #4a0f21;
    --wine-700: #6b1730;
    --crimson: #8f1f3c;
    --emerald: #0f4a3f;
    --emerald-deep: #0a332c;
    --ivory: #fbf3e3;
    --ivory-2: #f3e6ca;
    --gold: #c8a25a;
    --gold-light: #e8d095;
    --gold-dark: #8f6f2e;
    --ink: #2a1a1f;
    --muted: #7a6a66;

    --serif: "Cormorant Garamond", Georgia, serif;
    --sans: "Jost", system-ui, sans-serif;
    --script: "Pinyon Script", cursive;
    --urdu: "Noto Nastaliq Urdu", serif;

    --pattern: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='72' height='72' viewBox='0 0 72 72'%3E%3Cg fill='none' stroke='%23c8a25a' stroke-opacity='.22'%3E%3Crect x='18' y='18' width='36' height='36'/%3E%3Crect x='18' y='18' width='36' height='36' transform='rotate(45 36 36)'/%3E%3C/g%3E%3C/svg%3E");

    /* Hero palette — matches the red / rose / marigold of the card art */
    --paper: #fffdf8;
    --rani: #b81e50;
    --rani-deep: #7a1338;
    --marigold: #d9822b;

    /* Hero text colours */
    --hero-ink: #4a0f21;
    --hero-accent: #8f6f2e;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  html { scroll-behavior: smooth; -webkit-text-size-adjust: 100%; }

  body {
    background: var(--ivory);
    color: var(--ink);
    font-family: var(--sans);
    font-weight: 400;
    line-height: 1.6;
    overflow-x: hidden;
  }

  a { color: inherit; text-decoration: none; }
  button { font: inherit; cursor: pointer; }

  section[id], header[id] { scroll-margin-top: 76px; }

  :focus-visible { outline: 2px solid var(--gold); outline-offset: 3px; }

  /* ---------- Layout helpers ---------- */

  .section { position: relative; padding: 100px 6vw; }
  .wide { width: min(1100px, 100%); margin: 0 auto; }
  .narrow { width: min(760px, 100%); margin: 0 auto; text-align: center; }
  .heading { text-align: center; margin-bottom: 56px; }

  .kicker {
    color: var(--crimson);
    font-size: 11px;
    font-weight: 500;
    letter-spacing: .3em;
    text-transform: uppercase;
    margin-bottom: 14px;
    text-wrap: balance;
  }

  .kicker--gold, .heading--light .kicker { color: var(--gold-light); }

  .title {
    font-family: var(--serif);
    font-size: clamp(36px, 5.4vw, 66px);
    font-weight: 600;
    line-height: 1.08;
    color: var(--wine-800);
  }

  .heading--light .title { color: var(--ivory); }

  .lead {
    max-width: 560px;
    margin: 16px auto 0;
    color: var(--muted);
    font-size: 16px;
  }

  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 15px 30px;
    border: 1px solid transparent;
    border-radius: 999px;
    font-size: 12px;
    font-weight: 500;
    letter-spacing: .2em;
    text-transform: uppercase;
    transition: transform .25s ease, background .25s ease, color .25s ease;
  }

  .btn:hover { transform: translateY(-2px); }

  .btn-gold { background: var(--gold); color: var(--wine-900); }
  .btn-gold:hover { background: var(--gold-light); }

  .btn-ghost { border-color: rgba(232, 208, 149, .6); color: var(--gold-light); }
  .btn-ghost:hover { background: rgba(232, 208, 149, .12); }

  .btn-wine { background: var(--wine-800); color: var(--ivory); }
  .btn-wine:hover { background: var(--wine-700); }

  .divider {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 14px;
    margin: 26px auto;
    max-width: 260px;
  }

  .divider span { flex: 1; height: 1px; background: linear-gradient(90deg, transparent, var(--gold)); }
  .divider span:last-child { background: linear-gradient(270deg, transparent, var(--gold)); }
  .divider i { width: 9px; height: 9px; background: var(--gold); transform: rotate(45deg); }

  /* ---------- Reveal ---------- */

  .reveal {
    opacity: 0;
    transform: translateY(26px);
    transition: opacity .9s cubic-bezier(.2, .7, .2, 1),
                transform .9s cubic-bezier(.2, .7, .2, 1);
  }
  .reveal.in { opacity: 1; transform: none; }

  /* ---------- Nav ---------- */

  .nav {
    position: fixed;
    z-index: 100;
    top: 0; left: 0; right: 0;
    height: 70px;
    padding: 0 6vw;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: transparent;
    border-bottom: 1px solid transparent;
    transition: background .35s ease, border-color .35s ease;
  }

  .nav--solid {
    background: rgba(46, 8, 18, .95);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    border-bottom-color: rgba(200, 162, 90, .28);
  }

  .nav-brand {
    color: var(--ivory);
    font-family: var(--serif);
    font-size: 24px;
    font-weight: 600;
    letter-spacing: .02em;
    opacity: 0;
    pointer-events: none;
    transition: opacity .35s ease;
  }

  .nav--solid .nav-brand { opacity: 1; pointer-events: auto; }
  .nav-brand span { color: var(--gold); margin: 0 4px; }

  .nav-links { display: flex; gap: 32px; }

  .nav-links a {
    color: var(--rani-deep);
    font-size: 12px;
    font-weight: 500;
    letter-spacing: .16em;
    text-transform: uppercase;
    transition: color .25s ease, opacity .25s ease;
  }

  .nav--solid .nav-links a { color: var(--ivory); opacity: .82; }
  .nav--solid .nav-links a:hover { color: var(--gold-light); opacity: 1; }

  .menu-button {
    display: none;
    width: 42px;
    height: 42px;
    border: 1px solid rgba(122, 19, 56, .45);
    border-radius: 50%;
    background: rgba(255, 253, 248, .85);
    color: var(--rani-deep);
    font-size: 20px;
    line-height: 1;
    transition: background .3s ease, color .3s ease, border-color .3s ease;
  }

  .nav--solid .menu-button {
    background: transparent;
    border-color: rgba(232, 208, 149, .5);
    color: var(--gold-light);
  }

  /* ---------- Hero ---------- */

  .hero {
    position: relative;
    width: 100%;
    height: 100vh;
    height: 100svh;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--paper);
    color: var(--hero-ink);
    font-weight: 500;

    /* Landscape: the centre column is clear of both couples */
    padding: 11svh 6vw 7svh;
  }

  /* Artwork is exactly the viewport size and is cropped with object-fit,
     so it can never stretch or overflow. */
  .hero-bg {
    position: absolute;
    inset: 0;
    z-index: 0;
    display: block;
    width: 100%;
    height: 100%;
  }

  .hero-bg img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center 70%;
  }

  .hero-inner {
    position: relative;
    z-index: 1;
    width: min(760px, 48vw);
    min-width: 340px;
    align-self: stretch;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    animation: fadeUp 1.1s cubic-bezier(.2, .7, .2, 1) both;
  }

  .hero-bismillah {
    color: var(--hero-ink);
    font-family: var(--urdu);
    font-weight: 500;
    font-size: clamp(30px, min(4.6vw, 8.4svh), 76px);
    line-height: 1.9;
  }

  .hero-eyebrow {
    color: var(--hero-accent);
    font-size: clamp(15px, min(1.7vw, 3svh), 26px);
    font-weight: 500;
    letter-spacing: .1em;
  }

  .hero-script {
    color: var(--hero-ink);
    font-family: var(--serif);
    font-style: italic;
    font-weight: 500;
    font-size: clamp(22px, min(2.8vw, 5svh), 44px);
    line-height: 1.3;
  }

  .hero .hero-names {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: clamp(4px, 1svh, 12px);
    font-family: var(--serif);
    font-size: clamp(30px, min(4.2vw, 8svh), 68px);
    font-weight: 500;
    line-height: 1.2;
    letter-spacing: 0;
    color: var(--hero-ink);
    text-shadow: none;
    opacity: 1;
  }

  .hero .hero-names > span { display: block; white-space: nowrap; }

  .hero .hero-names span,
  .hero .hero-names i {
    font-family: var(--serif);
    font-size: inherit;
    font-weight: 500;
    line-height: inherit;
    color: var(--hero-ink);
    text-shadow: none;
    opacity: 1;
  }

  .hero .hero-names i {
    color: var(--hero-accent);
    font-style: italic;
    padding: 0 .2em;
  }

  .hero .hero-names em {
    display: block;
    font-family: var(--serif);
    font-style: normal;
    font-size: .6em;
    line-height: 1;
    color: var(--hero-accent);
    text-shadow: none;
  }

  .hero-when {
    margin-top: clamp(12px, 2.4svh, 26px);
    padding-top: clamp(10px, 2svh, 20px);
    border-top: 1px solid rgba(74, 15, 33, .25);
    display: flex;
    flex-direction: column;
    gap: 4px;
    font-size: clamp(11px, min(1vw, 1.8svh), 13px);
    font-weight: 500;
    letter-spacing: .14em;
    text-transform: uppercase;
    color: var(--hero-ink);
  }

  .hero-when strong {
    color: var(--hero-ink);
    font-weight: 500;
    font-size: 1.15em;
  }

  .hero-actions {
    display: flex;
    gap: 12px;
    justify-content: center;
    flex-wrap: wrap;
  }

  .hero .btn { padding: 14px 30px; font-size: 13px; font-weight: 500; }
  .hero .btn-gold { background: var(--hero-ink); color: var(--paper); }
  .hero .btn-gold:hover { background: var(--crimson); }
  .hero .btn-ghost { border-color: rgba(74, 15, 33, .45); color: var(--hero-ink); }
  .hero .btn-ghost:hover { background: rgba(74, 15, 33, .08); }

  /* Portrait: florals across the top, couples along the bottom.
     Keep the text in the clear band between them. */
  @media (max-aspect-ratio: 1/1) {
    .hero {
      align-items: flex-start;
      padding: 11svh 7vw 33svh;
    }

    .hero-bg img { object-position: center bottom; }

    .hero-inner { width: 100%; max-width: 480px; min-width: 0; }
    .hero-bismillah { font-size: clamp(30px, min(10vw, 6svh), 56px); line-height: 1.8; }
    .hero-eyebrow { font-size: clamp(14px, min(4.4vw, 2.6svh), 22px); }
    .hero-script { font-size: clamp(20px, min(6.6vw, 3.8svh), 34px); }
    .hero .hero-names { font-size: clamp(24px, min(8.4vw, 4.6svh), 42px); }
    .hero-actions { display: none; }
  }

  /* ---------- Host ---------- */

  .host { background: var(--ivory); }

  .host-name {
    font-family: var(--serif);
    font-size: clamp(34px, 7vw, 74px);
    font-weight: 600;
    line-height: 1.05;
    color: var(--wine-800);
  }

  .host-sub { margin-top: 10px; font-family: var(--script); font-size: 30px; color: var(--gold-dark); }

  .host-copy {
    font-family: var(--serif);
    font-size: clamp(20px, 2.6vw, 28px);
    line-height: 1.55;
    color: var(--ink);
  }

  .host-copy strong { color: var(--crimson); font-weight: 600; }

  /* ---------- Couples ---------- */

  .couples { background: var(--ivory-2); background-image: var(--pattern); }

  .couples-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 34px; }
  .couple-wrap { display: flex; }

  .couple {
    --accent: var(--wine-700);
    position: relative;
    flex: 1;
    padding: 108px 36px 62px;
    text-align: center;
    background: var(--ivory);
    border: 1px solid rgba(200, 162, 90, .6);
    border-radius: 260px 260px 22px 22px;
    box-shadow: 0 34px 60px -34px rgba(46, 8, 18, .45);
    transition: transform .4s ease, box-shadow .4s ease;
  }

  .couple:hover { transform: translateY(-6px); box-shadow: 0 44px 70px -34px rgba(46, 8, 18, .5); }
  .couple--emerald { --accent: var(--emerald); }

  .couple::before {
    content: "";
    position: absolute;
    inset: 10px;
    border: 1px solid rgba(200, 162, 90, .38);
    border-radius: 250px 250px 14px 14px;
    pointer-events: none;
  }

  .couple-badge {
    position: absolute;
    top: 46px;
    left: 50%;
    transform: translateX(-50%);
    padding: 8px 22px;
    border-radius: 999px;
    background: var(--accent);
    color: var(--ivory);
    font-size: 11px;
    font-weight: 500;
    letter-spacing: .26em;
    text-transform: uppercase;
    white-space: nowrap;
  }

  .person-role {
    color: var(--gold-dark);
    font-size: 11px;
    font-weight: 500;
    letter-spacing: .3em;
    text-transform: uppercase;
    margin-bottom: 8px;
  }

  .person-name {
    font-family: var(--serif);
    font-size: clamp(32px, 4.4vw, 50px);
    font-weight: 600;
    line-height: 1.1;
    color: var(--accent);
  }

  .person-parent {
    margin-top: 8px;
    font-family: var(--serif);
    font-style: italic;
    font-size: 19px;
    color: var(--muted);
  }

  .weds { display: flex; align-items: center; gap: 16px; margin: 32px auto; max-width: 300px; }
  .weds span { flex: 1; height: 1px; background: linear-gradient(90deg, transparent, var(--gold)); }
  .weds span:last-child { background: linear-gradient(270deg, transparent, var(--gold)); }
  .weds em { font-family: var(--script); font-style: normal; font-size: 36px; line-height: 1; color: var(--gold-dark); }

  /* ---------- Details ---------- */

  .details {
    color: var(--ivory);
    background:
      linear-gradient(rgba(74, 15, 33, .96), rgba(46, 8, 18, .98)),
      var(--pattern);
    background-color: var(--wine-800);
  }

  .details-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }

  .detail {
    padding: 40px 24px;
    text-align: center;
    border: 1px solid rgba(200, 162, 90, .4);
    background: rgba(251, 243, 227, .04);
  }

  .detail-icon {
    width: 52px;
    height: 52px;
    margin: 0 auto 18px;
    display: grid;
    place-items: center;
    border: 1px solid var(--gold);
    border-radius: 50%;
    color: var(--gold-light);
  }

  .detail-label {
    color: var(--gold-light);
    font-size: 11px;
    font-weight: 500;
    letter-spacing: .3em;
    text-transform: uppercase;
    margin-bottom: 8px;
  }

  .detail-value { font-family: var(--serif); font-size: clamp(26px, 3vw, 34px); font-weight: 600; line-height: 1.2; }
  .detail-sub { margin-top: 8px; color: rgba(251, 243, 227, .6); font-size: 13px; }
  .details-cta { margin-top: 50px; text-align: center; }

  /* ---------- Venue ---------- */

  .venue { background: var(--ivory); }

  .venue-grid { display: grid; grid-template-columns: .85fr 1.4fr; gap: 50px; align-items: center; }
  .venue-info .lead { margin-left: 0; margin-bottom: 30px; }
  .venue-info .title { font-size: clamp(34px, 4.4vw, 56px); }

  .venue-address {
    margin-top: 10px;
    color: var(--muted);
    font-family: var(--sans);
    font-size: 14px;
    letter-spacing: .04em;
  }

  .map-frame {
    position: relative;
    height: 420px;
    padding: 10px;
    background: var(--ivory);
    border: 1px solid rgba(200, 162, 90, .7);
    box-shadow: 0 34px 60px -34px rgba(46, 8, 18, .45);
    overflow: hidden;
  }

  .map-frame iframe {
    display: block;
    width: 100%;
    height: 100%;
    border: 0;
    filter: saturate(.85);
  }

  /* ---------- Countdown ---------- */

  .countdown {
    padding: 80px 6vw;
    color: var(--ivory);
    background:
      radial-gradient(ellipse at 50% 0%, rgba(232, 208, 149, .12), transparent 65%),
      var(--emerald-deep);
  }

  .count-grid { margin: 26px auto 0; width: min(560px, 100%); display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; }
  .count-cell { padding: 20px 6px 16px; border: 1px solid rgba(232, 208, 149, .35); }

  .count-num {
    font-family: var(--serif);
    font-size: clamp(30px, 7vw, 56px);
    font-weight: 500;
    line-height: 1;
    font-variant-numeric: tabular-nums;
  }

  .count-label { margin-top: 8px; color: rgba(251, 243, 227, .6); font-size: 10px; letter-spacing: .2em; text-transform: uppercase; }
  .count-done { margin-top: 20px; font-family: var(--serif); font-size: 28px; color: var(--gold-light); }

  /* ---------- RSVP ---------- */

  .rsvp { background: var(--ivory-2); background-image: var(--pattern); }
  .rsvp-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }

  .rsvp-card {
    padding: 32px 20px 28px;
    text-align: center;
    background: var(--ivory);
    border: 1px solid rgba(200, 162, 90, .45);
    border-radius: 6px;
  }

  .rsvp-avatar {
    width: 62px;
    height: 62px;
    margin: 0 auto 14px;
    display: grid;
    place-items: center;
    border-radius: 50%;
    border: 1px solid var(--gold);
    box-shadow: 0 0 0 5px var(--ivory), 0 0 0 6px rgba(200, 162, 90, .4);
    background: var(--wine-800);
    color: var(--gold-light);
    font-family: var(--serif);
    font-size: 22px;
    font-weight: 600;
    letter-spacing: .04em;
  }

  .rsvp-name { font-family: var(--serif); font-size: 24px; font-weight: 600; line-height: 1.2; color: var(--wine-800); }

  .rsvp-phone {
    margin-top: 6px;
    color: var(--muted);
    font-size: 13px;
    letter-spacing: .04em;
  }

  .rsvp-actions { margin-top: 16px; display: flex; justify-content: center; gap: 10px; flex-wrap: wrap; }

  .rsvp-actions a {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 9px 16px;
    border: 1px solid var(--gold);
    border-radius: 999px;
    color: var(--wine-800);
    font-size: 11px;
    font-weight: 500;
    letter-spacing: .14em;
    text-transform: uppercase;
    transition: background .25s ease, color .25s ease;
  }

  .rsvp-actions a svg { width: 16px; height: 16px; }
  .rsvp-actions a:hover { background: var(--wine-800); color: var(--gold-light); }

  /* ---------- Footer ---------- */

  .footer {
    position: relative;
    overflow: hidden;
    padding: 90px 6vw 50px;
    text-align: center;
    color: var(--ivory);
    background: var(--wine-900);
  }

  .footer-star {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 520px;
    height: 520px;
    margin: -260px 0 0 -260px;
    color: var(--gold);
    opacity: .1;
    pointer-events: none;
    animation: spin 160s linear infinite;
  }

  .footer > p { position: relative; }

  .footer-script { font-family: var(--script); font-size: clamp(38px, 7vw, 60px); color: var(--gold-light); line-height: 1.3; }
  .footer-host { margin-top: 12px; font-family: var(--serif); font-size: clamp(28px, 5vw, 42px); font-weight: 600; }
  .footer-meta { margin-top: 20px; color: rgba(251, 243, 227, .7); font-size: 12px; letter-spacing: .24em; text-transform: uppercase; }

  .footer-fine {
    margin-top: 50px;
    padding-top: 22px;
    border-top: 1px solid rgba(255, 255, 255, .1);
    color: rgba(251, 243, 227, .4);
    font-size: 11px;
    letter-spacing: .12em;
  }

  /* ---------- Motion ---------- */

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: none; }
  }

  @keyframes spin { to { transform: rotate(360deg); } }

  @media (prefers-reduced-motion: reduce) {
    html { scroll-behavior: auto; }
    .hero-inner, .footer-star { animation: none; }
    .reveal { opacity: 1; transform: none; transition: none; }
  }

  /* ---------- Video ---------- */

  .video {
    color: var(--ivory);
    background:
      linear-gradient(rgba(46, 8, 18, .97), rgba(46, 8, 18, .99)),
      var(--pattern);
    background-color: var(--wine-900);
  }

  .heading--light .lead { color: rgba(251, 243, 227, .78); }

  .video-frame {
    position: relative;
    width: min(880px, 100%);
    aspect-ratio: 16 / 9;
    margin: 0 auto;
    padding: 10px;
    background: var(--ivory);
    border: 1px solid rgba(200, 162, 90, .7);
    box-shadow: 0 34px 60px -30px rgba(0, 0, 0, .6);
    overflow: hidden;
  }

  .video-frame video,
  .video-frame iframe {
    display: block;
    width: 100%;
    height: 100%;
    border: 0;
    object-fit: cover;
    background: #000;
    pointer-events: none;
  }

  .video-empty {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
    color: var(--wine-700);
    background: var(--ivory-2);
    font-family: var(--serif);
    font-size: 22px;
    font-weight: 500;
  }

  .video-empty svg { width: 64px; height: 64px; }

  /* ---------- Music control ---------- */

  .music-btn {
    position: fixed;
    right: max(16px, env(safe-area-inset-right, 0px));
    bottom: max(16px, env(safe-area-inset-bottom, 0px));
    z-index: 90;
    width: 48px;
    height: 48px;
    display: grid;
    place-items: center;
    padding: 0;
    border-radius: 50%;
    border: 1px solid rgba(232, 208, 149, .7);
    background: rgba(74, 15, 33, .92);
    color: var(--gold-light);
    box-shadow: 0 10px 24px -8px rgba(46, 8, 18, .55);
    transition: transform .25s ease, background .25s ease;
    animation: fadeUp .6s ease both;
  }

  .music-btn:hover { transform: scale(1.06); background: var(--wine-700); }
  .music-btn svg { width: 22px; height: 22px; }

  /* ---------- Envelope opener ---------- */

  .env-overlay {
    position: fixed;
    inset: 0;
    z-index: 200;
    height: 100vh;
    height: 100svh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: clamp(24px, 5svh, 44px);
    overflow: hidden;
    touch-action: none;
    background:
      radial-gradient(ellipse at 50% 40%, #fffdf8 0%, var(--ivory) 55%, var(--ivory-2) 100%);
    opacity: 1;
    transition: opacity .9s ease;
  }

  .env-overlay::before {
    content: "";
    position: absolute;
    inset: 0;
    background-image: var(--pattern);
    opacity: .7;
    pointer-events: none;
  }

  .env--leaving { opacity: 0; pointer-events: none; }

  .env-title {
    position: relative;
    font-family: var(--script);
    font-size: clamp(40px, min(10vw, 7.5svh), 68px);
    line-height: 1.1;
    text-align: center;
    color: var(--wine-800);
    transition: opacity .4s ease;
  }

  .env--opening .env-title,
  .env--leaving .env-title { opacity: 0; }

  .env-button {
    position: relative;
    display: block;
    padding: 0;
    border: 0;
    background: none;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
  }

  .env-button:disabled { cursor: default; }
  .env-button:focus-visible { outline: 2px solid var(--gold); outline-offset: 14px; }

  .env {
    --w: min(420px, 86vw, 78svh);
    position: relative;
    display: block;
    width: var(--w);
    height: calc(var(--w) * .7);
    font-size: calc(var(--w) / 26);
    perspective: 1400px;
  }

  .env > span { display: block; }

  .env-back {
    position: absolute;
    inset: 0;
    border-radius: 4px;
    background: var(--wine-900);
    box-shadow: 0 30px 60px rgba(46, 8, 18, .4);
  }

  .env-left,
  .env-right,
  .env-bottom,
  .env-flap { position: absolute; }

  .env-left,
  .env-right,
  .env-bottom {
    inset: 0;
    z-index: 3;
    pointer-events: none;
  }

  .env-left   { background: #6b1730; clip-path: polygon(0 0, 50.4% 52%, 0 100%); }
  .env-right  { background: #5a1226; clip-path: polygon(100% 0, 49.6% 52%, 100% 100%); }
  .env-bottom { background: #7d2039; clip-path: polygon(0 100%, 50% 47%, 100% 100%); }

  /* Flap has two faces so the inside shows once it swings open */
  .env-flap {
    left: 0;
    top: 0;
    width: 100%;
    height: 55%;
    z-index: 4;
    transform-origin: top center;
    transform-style: preserve-3d;
    transition: transform .9s cubic-bezier(.5, 0, .2, 1);
  }

  .env-flap-out,
  .env-flap-in {
    position: absolute;
    inset: 0;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
  }

  .env-flap-out {
    background: linear-gradient(180deg, var(--crimson), #7a1c36);
    clip-path: polygon(0 0, 100% 0, 50% 100%);
  }

  .env-flap-in {
    background: linear-gradient(180deg, #3a0b19, #4a0f21);
    clip-path: polygon(0 100%, 100% 100%, 50% 0);
    transform: rotateX(180deg);
  }

  .env--opening .env-flap,
  .env--leaving .env-flap {
    transform: rotateX(180deg);
    z-index: 1;
    transition:
      transform .9s cubic-bezier(.5, 0, .2, 1),
      z-index 0s linear .45s;
  }

  .env-card {
    position: absolute;
    left: 6%;
    top: 6%;
    width: 88%;
    height: 88%;
    z-index: 2;
    box-sizing: border-box;
    display: flex !important;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding-top: 9%;
    text-align: center;
    border-radius: 3px;
    background: #fffdf7;
    box-shadow: 0 -4px 18px rgba(0, 0, 0, .12);
    transition: transform 1s cubic-bezier(.3, .1, .2, 1) .55s;
  }

  .env-card::before {
    content: "";
    position: absolute;
    inset: 6px;
    border: 1px solid rgba(200, 162, 90, .55);
    border-radius: 2px;
    pointer-events: none;
  }

  .env--opening .env-card,
  .env--leaving .env-card { transform: translateY(-66%); }

  .env-card-urdu {
    font-family: var(--urdu);
    font-size: 1.7em;
    line-height: 1.9;
    color: var(--hero-ink);
  }

  .env-card-line {
    margin-top: .3em;
    font-family: var(--serif);
    font-size: 1.5em;
    font-weight: 500;
    color: var(--hero-accent);
  }

  .env-seal {
    position: absolute;
    left: 50%;
    top: 55%;
    z-index: 6;
    width: 5.6em;
    height: 5.6em;
    display: grid !important;
    place-items: center;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    background: radial-gradient(circle at 35% 30%, var(--gold-light), var(--gold) 55%, var(--gold-dark));
    box-shadow:
      0 6px 14px rgba(0, 0, 0, .45),
      inset 0 0 0 .16em rgba(255, 255, 255, .2);
    color: var(--wine-900);
    font-family: var(--serif);
    font-style: italic;
    font-size: 1.1em;
    font-weight: 600;
    line-height: 1.1;
    text-align: center;
    transition: opacity .35s ease, transform .5s ease;
  }

  .env-seal::after {
    content: "";
    position: absolute;
    inset: 0;
    border: 1px solid rgba(232, 208, 149, .9);
    border-radius: 50%;
    animation: envPulse 2.2s ease-out infinite;
  }

  .env--opening .env-seal,
  .env--leaving .env-seal {
    opacity: 0;
    transform: translate(-50%, -50%) scale(1.35);
  }

  .env--opening .env-seal::after,
  .env--leaving .env-seal::after { animation: none; }

  @keyframes envPulse {
    0%   { transform: scale(1);   opacity: .9; }
    100% { transform: scale(1.9); opacity: 0; }
  }

  .page-wait .hero-inner { animation: none; opacity: 0; }

  @media (prefers-reduced-motion: reduce) {
    .env-seal::after { animation: none; }
    .env-overlay { transition-duration: .3s; }
    .env--opening .env-flap,
    .env--leaving .env-flap,
    .env-card { transition: none; }
    .music-btn { animation: none; }
  }

  /* ---------- Responsive ---------- */

  @media (max-width: 900px) {
    .venue-grid { grid-template-columns: 1fr; gap: 36px; }
    .venue-info { text-align: center; }
    .venue-info .lead { margin-left: auto; margin-right: auto; }
    .map-frame { height: 380px; }
    .rsvp-grid { grid-template-columns: repeat(2, 1fr); }
  }

  @media (max-width: 800px) {
    .nav-links {
      position: absolute;
      top: 70px;
      left: 0;
      right: 0;
      display: none;
      flex-direction: column;
      gap: 0;
      padding: 10px 6vw 20px;
      background: rgba(46, 8, 18, .97);
      border-bottom: 1px solid rgba(200, 162, 90, .28);
    }

    .nav-links.open { display: flex; }

    .nav-links a,
    .nav--solid .nav-links a {
      color: var(--ivory);
      opacity: .9;
      padding: 16px 0;
      border-bottom: 1px solid rgba(255, 255, 255, .06);
    }

    .menu-button { display: block; margin-left: auto; }
    .couples-grid { grid-template-columns: 1fr; gap: 28px; }
    .details-grid { grid-template-columns: 1fr; }
  }

  @media (max-width: 560px) {
    .section { padding: 70px 6vw; }
    .heading { margin-bottom: 40px; }
    .couple { padding: 96px 20px 48px; }
    .map-frame { height: 320px; border-radius: 6px; }
    .map-frame iframe { border-radius: 6px; }
    .video-frame { padding: 6px; }
    .count-grid { gap: 6px; }
    .rsvp-grid { grid-template-columns: 1fr; }
  }
`;

