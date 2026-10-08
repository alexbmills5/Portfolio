"use client";

import { useEffect, useRef, useState } from "react";
import { PiPause, PiPlay } from "react-icons/pi";

const modes = [
  {
    label: "Full stack",
    detail: "Interfaces. Services. Everything in between.",
    layers: ["INTERFACE", "API", "DATA"],
  },
  {
    label: "APIs",
    detail: "Connecting the pieces into a working system.",
    layers: ["REQUEST", "SERVICE", "RESPONSE"],
  },
  {
    label: "VR / AR",
    detail: "Exploring what software can feel like.",
    layers: ["SPACE", "INTERACTION", "EXPERIENCE"],
  },
];
type Point = { x: number; y: number; z: number };

export function SystemVisual() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerRef = useRef({ x: 0, y: 0 });
  const timeRef = useRef(0);
  const pausedRef = useRef(false);
  const [mode, setMode] = useState(0);
  const [paused, setPaused] = useState(false);
  pausedRef.current = paused;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let width = 0,
      height = 0,
      frame = 0,
      lastFrame = 0,
      visible = true,
      dirty = true;
    let angleX = 0,
      angleY = 0;
    const resize = () => {
      dirty = true;
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    intersection.observe(canvas);

    const draw = (now: number) => {
      frame = requestAnimationFrame(draw);
      if (!visible || document.hidden || now - lastFrame < 32) return;
      if ((pausedRef.current || motion.matches) && !dirty) return;
      dirty = false;
      const delta = Math.min((now - lastFrame) / 1000, 0.05);
      lastFrame = now;
      if (!pausedRef.current && !motion.matches) {
        timeRef.current += delta * 0.12;
        angleX += (pointerRef.current.y * 0.2 - angleX) * 0.04;
        angleY += (pointerRef.current.x * 0.25 - angleY) * 0.04;
      }
      const time = timeRef.current;
      context.clearRect(0, 0, width, height);
      const radius = Math.min(width * 0.31, height * 0.34);
      const rotation = time + angleY;
      const tilt = -0.3 + angleX;
      const project = (p: Point) => {
        const x = p.x * Math.cos(rotation) + p.z * Math.sin(rotation);
        const z = -p.x * Math.sin(rotation) + p.z * Math.cos(rotation);
        const y = p.y * Math.cos(tilt) - z * Math.sin(tilt);
        const depth = p.y * Math.sin(tilt) + z * Math.cos(tilt);
        const perspective = 3.8 / (3.8 - depth);
        return {
          x: width / 2 + x * radius * perspective,
          y: height / 2 + y * radius * perspective,
          depth,
        };
      };
      const line = (points: Point[], alpha: number, thick = 0.65) => {
        context.beginPath();
        let depth = 0;
        points.forEach((p, i) => {
          const q = project(p);
          depth += q.depth;
          i === 0 ? context.moveTo(q.x, q.y) : context.lineTo(q.x, q.y);
        });
        context.strokeStyle = `rgba(229,56,59,${alpha * (0.8 + (depth / points.length + 1) * 0.3)})`;
        context.lineWidth = thick;
        context.stroke();
      };
      // A sphere, layered service planes, and a torus share the same projection.
      if (mode === 0) {
        for (let latitude = 1; latitude < 19; latitude++) {
          const phi = (latitude / 19) * Math.PI;
          const ring: Point[] = [];
          for (let j = 0; j <= 100; j++) {
            const theta = (j / 100) * Math.PI * 2;
            ring.push({
              x: Math.sin(phi) * Math.cos(theta),
              y: Math.cos(phi),
              z: Math.sin(phi) * Math.sin(theta),
            });
          }
          line(ring, latitude === 9 || latitude === 10 ? 0.55 : 0.24);
        }
        for (let meridian = 0; meridian < 28; meridian++) {
          const theta = (meridian / 28) * Math.PI * 2;
          const arc: Point[] = [];
          for (let j = 0; j <= 65; j++) {
            const phi = (j / 65) * Math.PI;
            arc.push({
              x: Math.sin(phi) * Math.cos(theta),
              y: Math.cos(phi),
              z: Math.sin(phi) * Math.sin(theta),
            });
          }
          line(arc, 0.28);
        }
      } else if (mode === 1) {
        for (let layer = -1; layer <= 1; layer++)
          for (let grid = -5; grid <= 5; grid++) {
            const v = grid / 5;
            line(
              [
                { x: v, y: layer * 0.65, z: -0.8 },
                { x: v, y: layer * 0.65, z: 0.8 },
              ],
              0.42,
            );
            line(
              [
                { x: -1, y: layer * 0.65, z: v * 0.8 },
                { x: 1, y: layer * 0.65, z: v * 0.8 },
              ],
              0.42,
            );
          }
        for (const x of [-0.7, 0.7])
          for (const z of [-0.6, 0.6])
            line(
              [
                { x, y: -0.65, z },
                { x, y: 0.65, z },
              ],
              0.65,
              1,
            );
      } else {
        for (let i = 0; i < 34; i++) {
          const theta = (i / 34) * Math.PI * 2;
          const ring: Point[] = [];
          for (let j = 0; j <= 50; j++) {
            const phi = (j / 50) * Math.PI * 2;
            ring.push({
              x: (0.8 + 0.3 * Math.cos(phi)) * Math.cos(theta),
              y: 0.3 * Math.sin(phi),
              z: (0.8 + 0.3 * Math.cos(phi)) * Math.sin(theta),
            });
          }
          line(ring, 0.36);
        }
        for (let i = 0; i < 16; i++) {
          const phi = (i / 16) * Math.PI * 2;
          const ring: Point[] = [];
          for (let j = 0; j <= 100; j++) {
            const theta = (j / 100) * Math.PI * 2;
            ring.push({
              x: (0.8 + 0.3 * Math.cos(phi)) * Math.cos(theta),
              y: 0.3 * Math.sin(phi),
              z: (0.8 + 0.3 * Math.cos(phi)) * Math.sin(theta),
            });
          }
          line(ring, 0.26);
        }
      }
      for (let orbit = 0; orbit < 2; orbit++) {
        const ring: Point[] = [];
        for (let j = 0; j <= 120; j++) {
          const a = (j / 120) * Math.PI * 2;
          ring.push({
            x: Math.cos(a) * 1.34,
            y: Math.sin(a) * (orbit === 0 ? 0.2 : 0.8),
            z: Math.sin(a) * (orbit === 0 ? 1.25 : 0.9),
          });
        }
        line(ring, 0.2, 0.8);
        const a = time * (orbit === 0 ? 2 : -1.5) + orbit * 2;
        const dot = project({
          x: Math.cos(a) * 1.34,
          y: Math.sin(a) * (orbit === 0 ? 0.2 : 0.8),
          z: Math.sin(a) * (orbit === 0 ? 1.25 : 0.9),
        });
        context.shadowBlur = 16;
        context.shadowColor = "#e5383b";
        context.fillStyle = "#ffffff";
        context.beginPath();
        context.arc(dot.x, dot.y, 3, 0, Math.PI * 2);
        context.fill();
        context.shadowBlur = 0;
      }
    };
    resize();
    frame = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      intersection.disconnect();
    };
  }, [mode]);

  return (
    <div
      className="system-visual"
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        pointerRef.current = {
          x: ((event.clientX - rect.left) / rect.width) * 2 - 1,
          y: ((event.clientY - rect.top) / rect.height) * 2 - 1,
        };
      }}
      onPointerLeave={() => {
        pointerRef.current = { x: 0, y: 0 };
      }}
    >
      <div className="system-topline">
        <span>
          <span className="tiny-cross" /> Systems in motion
        </span>
        <button
          type="button"
          className="motion-toggle"
          onClick={() => setPaused(!paused)}
          aria-label={
            paused ? "Play visual animation" : "Pause visual animation"
          }
        >
          {paused ? (
            <PiPlay aria-hidden="true" />
          ) : (
            <PiPause aria-hidden="true" />
          )}
        </button>
      </div>
      <div className="canvas-wrap">
        <canvas ref={canvasRef} aria-hidden="true" />
        <div className="system-halo" aria-hidden="true" />
        <span className="system-corner corner-tl" />
        <span className="system-corner corner-tr" />
        <span className="system-corner corner-bl" />
        <span className="system-corner corner-br" />
        <div className="system-label label-one" aria-hidden="true">
          <i />
          {modes[mode].layers[0]}
        </div>
        <div className="system-label label-two" aria-hidden="true">
          <i />
          {modes[mode].layers[1]}
        </div>
        <div className="system-label label-three" aria-hidden="true">
          <i />
          {modes[mode].layers[2]}
        </div>
      </div>
      <div
        className="system-controls"
        role="group"
        aria-label="Explore engineering disciplines"
      >
        {modes.map((item, i) => (
          <button
            key={item.label}
            type="button"
            aria-pressed={mode === i}
            onClick={() => setMode(i)}
          >
            <span className="mode-number">0{i + 1}</span>
            {item.label}
          </button>
        ))}
      </div>
      <p className="system-caption" aria-live="polite">
        <span aria-hidden="true">↳</span> {modes[mode].detail}
      </p>
    </div>
  );
}
