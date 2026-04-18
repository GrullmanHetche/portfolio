"use client";
import { useEffect, useRef } from "react";

interface Env {
  x: number; y: number;
  vx: number; vy: number;
  w: number; h: number;
  rot: number; rotSpeed: number;
  flipAngle: number; flipSpeed: number;
  opacity: number;
  depth: number;
}

export default function EnvelopeCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0, H = 0;
    let envelopes: Env[] = [];
    const mouse = { x: 0, y: 0 };
    let rafId: number;

    function resize() {
      if (!canvas) return;
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    }

    function init() {
      envelopes = [];
      for (let i = 0; i < 16; i++) {
        const depth = 0.25 + Math.random() * 0.75;
        const w = 60 + depth * 80;
        envelopes.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.25 - 0.05,
          w: w,
          h: w * 0.65,
          rot: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.007,
          flipAngle: Math.random() * Math.PI * 2,
          flipSpeed: (Math.random() - 0.5) * 0.012,
          opacity: depth * 0.14,
          depth,
        });
      }
    }

    function drawEnvelope(e: Env) {
      const scaleX = Math.cos(e.flipAngle);
      ctx!.save();
      ctx!.globalAlpha = e.opacity;
      ctx!.translate(e.x, e.y);
      ctx!.rotate(e.rot);
      ctx!.scale(scaleX, 1);

      const hw = e.w / 2, hh = e.h / 2;

      // body - roundRect 호환성 처리
      ctx!.beginPath();
      if (typeof ctx!.roundRect === 'function') {
        ctx!.roundRect(-hw, -hh, e.w, e.h, 5);
      } else {
        ctx!.rect(-hw, -hh, e.w, e.h);
      }
      ctx!.fillStyle = "rgba(255,255,255,0.65)";
      ctx!.fill();
      ctx!.strokeStyle = "#1d1d1f";
      ctx!.lineWidth = 0.6;
      ctx!.stroke();

      // V-fold top
      ctx!.beginPath();
      ctx!.moveTo(-hw, -hh);
      ctx!.lineTo(0, hh * 0.15);
      ctx!.lineTo(hw, -hh);
      ctx!.strokeStyle = "rgba(29,29,31,0.35)";
      ctx!.lineWidth = 0.5;
      ctx!.stroke();

      // bottom triangle
      ctx!.beginPath();
      ctx!.moveTo(-hw, hh);
      ctx!.lineTo(0, hh * 0.15);
      ctx!.lineTo(hw, hh);
      ctx!.strokeStyle = "rgba(29,29,31,0.2)";
      ctx!.stroke();

      // side folds
      ctx!.beginPath();
      ctx!.moveTo(-hw, -hh);
      ctx!.lineTo(-hw * 0.1, 0);
      ctx!.lineTo(-hw, hh);
      ctx!.moveTo(hw, -hh);
      ctx!.lineTo(hw * 0.1, 0);
      ctx!.lineTo(hw, hh);
      ctx!.strokeStyle = "rgba(29,29,31,0.12)";
      ctx!.stroke();

      ctx!.restore();
    }

    function animate() {
      ctx!.clearRect(0, 0, W, H);
      const now = Date.now() / 1000;

      // sort (불필요한 연산 방지를 위해 복사본 사용하지 않고 직접 정렬)
      envelopes.sort((a, b) => a.depth - b.depth);

      envelopes.forEach(e => {
        e.flipAngle += e.flipSpeed;
        e.rot += e.rotSpeed + Math.sin(now * 0.4 + e.flipAngle) * 0.0008;
        e.x += e.vx + (mouse.x - W / 2) * 0.00006 * e.depth;
        e.y += e.vy + (mouse.y - H / 2) * 0.00004 * e.depth;

        if (e.x < -120) e.x = W + 120;
        if (e.x > W + 120) e.x = -120;
        if (e.y < -120) e.y = H + 120;
        if (e.y > H + 120) e.y = -120;

        drawEnvelope(e);
      });

      rafId = requestAnimationFrame(animate);
    }

    const onMouse = (ev: MouseEvent) => {
      mouse.x = ev.clientX;
      mouse.y = ev.clientY;
    };
    const onResize = () => { resize(); init(); };

    resize();
    init();
    animate();

    window.addEventListener("mousemove", onMouse);
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0
      }}
    />
  );
}
