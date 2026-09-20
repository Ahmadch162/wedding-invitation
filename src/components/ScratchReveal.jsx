import { useEffect, useRef, useState } from "react";

const REQUIRED_PROGRESS = 80;

function ScratchReveal({ onReveal }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const isDrawing = useRef(false);
  const revealedRef = useRef(false);
  const lastPoint = useRef(null);

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;

    if (!canvas || !container) return;

    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      const ctx = canvas.getContext("2d");

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const gradient = ctx.createLinearGradient(
        0,
        0,
        rect.width,
        rect.height
      );

      gradient.addColorStop(0, "#c99b3b");
      gradient.addColorStop(0.5, "#e6c76a");
      gradient.addColorStop(1, "#9c7424");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, rect.width, rect.height);

      ctx.fillStyle = "rgba(53, 74, 41, 0.18)";
      ctx.font = "42px Georgia";
      ctx.textAlign = "center";
      ctx.fillText("✦", rect.width / 2, rect.height / 2 - 15);

      ctx.font = "14px sans-serif";
      ctx.letterSpacing = "3px";
      ctx.fillStyle = "rgba(255,255,255,.8)";
      ctx.fillText(
        "SCRATCH TO REVEAL",
        rect.width / 2,
        rect.height / 2 + 25
      );
    };

    resizeCanvas();

    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  const getPoint = (event) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();

    const source =
      event.touches?.[0] ||
      event.changedTouches?.[0] ||
      event;

    return {
      x: source.clientX - rect.left,
      y: source.clientY - rect.top,
    };
  };

  const scratch = (point) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (lastPoint.current) {
      ctx.beginPath();
      ctx.moveTo(lastPoint.current.x, lastPoint.current.y);
      ctx.lineTo(point.x, point.y);
      ctx.lineWidth = 44;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.globalCompositeOperation = "destination-out";
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.arc(point.x, point.y, 24, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0,0,0,1)";
      ctx.globalCompositeOperation = "destination-out";
      ctx.fill();
    }

    lastPoint.current = point;

    calculateProgress();
  };

  const calculateProgress = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    const sampleWidth = 80;
    const sampleHeight = 80;

    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = sampleWidth;
    tempCanvas.height = sampleHeight;

    const tempCtx = tempCanvas.getContext("2d");

    tempCtx.drawImage(
      canvas,
      0,
      0,
      sampleWidth,
      sampleHeight
    );

    const pixels = tempCtx.getImageData(
      0,
      0,
      sampleWidth,
      sampleHeight
    ).data;

    let transparent = 0;

    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] < 80) {
        transparent++;
      }
    }

    const total = sampleWidth * sampleHeight;
    const percentage = Math.round((transparent / total) * 100);

    setProgress(Math.min(percentage, 100));

    if (
      percentage >= REQUIRED_PROGRESS &&
      !revealedRef.current
    ) {
      revealedRef.current = true;

      setProgress(100);

      canvas.style.transition = "opacity .7s ease";
      canvas.style.opacity = "0";

      window.setTimeout(() => {
        onReveal();
      }, 500);
    }
  };

  const startScratch = (event) => {
    event.preventDefault();

    isDrawing.current = true;
    lastPoint.current = getPoint(event);

    scratch(lastPoint.current);
  };

  const moveScratch = (event) => {
    if (!isDrawing.current) return;

    event.preventDefault();

    scratch(getPoint(event));
  };

  const stopScratch = () => {
    isDrawing.current = false;
    lastPoint.current = null;
  };

  return (
    <section className="scratch-screen">
      <div className="scratch-ornament scratch-ornament--one">
        ❧
      </div>

      <div className="scratch-ornament scratch-ornament--two">
        ❧
      </div>

      <div className="scratch-content">
        <p className="eyebrow">A Little Surprise Awaits</p>

        <h1>Scratch to reveal the special date ✦</h1>

        <div
          ref={containerRef}
          className="scratch-card"
        >
          <div className="scratch-card-content">
            <span className="scratch-small">
              WITH LOVE & JOY
            </span>

            <strong>MEHNDI</strong>

            <span className="scratch-date">
              16 OCTOBER 2026
            </span>

            <span className="scratch-home">
              HOME
            </span>

            <span className="scratch-star">✦</span>
          </div>

          <canvas
            ref={canvasRef}
            className="scratch-canvas"
            onMouseDown={startScratch}
            onMouseMove={moveScratch}
            onMouseUp={stopScratch}
            onMouseLeave={stopScratch}
            onTouchStart={startScratch}
            onTouchMove={moveScratch}
            onTouchEnd={stopScratch}
          />
        </div>

        <div className="scratch-progress">
          <div className="progress-track">
            <div
              className="progress-value"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>

          <span>{progress}% revealed</span>
        </div>

        <p className="scratch-hint">
          Gently scratch across the card to uncover your invitation.
        </p>
      </div>
    </section>
  );
}

export default ScratchReveal;