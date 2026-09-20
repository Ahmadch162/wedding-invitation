import { useEffect, useRef } from "react";

function Fireworks() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let animationFrame;
    let running = true;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;

      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();

    window.addEventListener("resize", resize);

    const particles = [];

    const createFirework = () => {
      const x =
        window.innerWidth * (0.15 + Math.random() * 0.7);

      const y =
        window.innerHeight * (0.18 + Math.random() * 0.42);

      const colors = [
        "#f3d47a",
        "#e6b84f",
        "#f7e8b0",
        "#d7a942",
        "#b7c985",
      ];

      for (let i = 0; i < 70; i++) {
        const angle = (Math.PI * 2 * i) / 70;

        const speed =
          1.4 + Math.random() * 3.5;

        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          decay: 0.008 + Math.random() * 0.015,
          size: 1 + Math.random() * 2,
          color:
            colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    let lastFirework = 0;

    const render = (time) => {
      if (!running) return;

      ctx.clearRect(
        0,
        0,
        window.innerWidth,
        window.innerHeight
      );

      if (time - lastFirework > 650) {
        createFirework();
        lastFirework = time;
      }

      particles.forEach((particle, index) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vy += 0.025;
        particle.vx *= 0.99;
        particle.life -= particle.decay;

        if (particle.life <= 0) {
          particles.splice(index, 1);
          return;
        }

        ctx.globalAlpha = particle.life;
        ctx.fillStyle = particle.color;

        ctx.beginPath();
        ctx.arc(
          particle.x,
          particle.y,
          particle.size,
          0,
          Math.PI * 2
        );
        ctx.fill();
      });

      ctx.globalAlpha = 1;

      animationFrame = requestAnimationFrame(render);
    };

    createFirework();
    animationFrame = requestAnimationFrame(render);

    const timeout = window.setTimeout(() => {
      running = false;
      cancelAnimationFrame(animationFrame);
    }, 4800);

    return () => {
      running = false;
      cancelAnimationFrame(animationFrame);
      clearTimeout(timeout);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fireworks-canvas"
      aria-hidden="true"
    />
  );
}

export default Fireworks;