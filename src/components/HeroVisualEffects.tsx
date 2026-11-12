import React, { useEffect, useRef } from 'react';

export const HeroVisualEffects: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    // Subtle embers / sparks particles
    interface Ember {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      opacity: number;
      fadeSpeed: number;
      color: string;
    }

    const embers: Ember[] = [];
    const maxEmbers = 35;

    for (let i = 0; i < maxEmbers; i++) {
      embers.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 0.8,
        speedY: -(Math.random() * 0.8 + 0.3),
        speedX: (Math.random() - 0.5) * 0.4,
        opacity: Math.random() * 0.7 + 0.2,
        fadeSpeed: Math.random() * 0.005 + 0.002,
        color: Math.random() > 0.4 ? '#E5004F' : '#ffffff',
      });
    }

    let animationId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      embers.forEach((e) => {
        e.y += e.speedY;
        e.x += e.speedX;
        e.opacity -= e.fadeSpeed;

        if (e.opacity <= 0 || e.y < 0) {
          e.y = height + 10;
          e.x = Math.random() * width;
          e.opacity = Math.random() * 0.7 + 0.3;
        }

        ctx.fillStyle = e.color;
        ctx.globalAlpha = Math.max(0, e.opacity);
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-10 opacity-70"
    />
  );
};
