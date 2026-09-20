import { useEffect, useState } from "react";

const TARGET = new Date(
  "2026-10-16T19:00:00+05:00"
);

function getTimeLeft() {
  const difference = TARGET.getTime() - Date.now();

  if (difference <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  return {
    days: Math.floor(
      difference / (1000 * 60 * 60 * 24)
    ),

    hours: Math.floor(
      (difference / (1000 * 60 * 60)) % 24
    ),

    minutes: Math.floor(
      (difference / (1000 * 60)) % 60
    ),

    seconds: Math.floor(
      (difference / 1000) % 60
    ),
  };
}

function Countdown() {
  const [time, setTime] = useState(getTimeLeft());

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTime(getTimeLeft());
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  const items = [
    ["Days", time.days],
    ["Hours", time.hours],
    ["Minutes", time.minutes],
    ["Seconds", time.seconds],
  ];

  return (
    <section className="countdown-section section-shell">
      <div className="countdown-card">
        <div className="countdown-pattern" />

        <div className="countdown-content">
          <p className="eyebrow">The Celebration Begins In</p>

          <h2>Counting Down to Mehndi</h2>

          <div className="countdown-grid">
            {items.map(([label, value]) => (
              <div
                className="countdown-item"
                key={label}
              >
                <strong>
                  {String(value).padStart(2, "0")}
                </strong>

                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Countdown;