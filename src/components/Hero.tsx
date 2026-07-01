"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, TrendingUp } from "lucide-react";
import Link from "next/link";
import RatingsBar from "./RatingsBar";

function Stars() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;
    const stars = Array.from({ length: 120 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.5 + 0.3,
      dx: (Math.random() - 0.5) * 0.15,
      dy: (Math.random() - 0.5) * 0.15,
      o: Math.random() * 0.5 + 0.1,
      phase: Math.random() * Math.PI * 2,
    }));

    let frame: number;
    let t = 0;
    const draw = () => {
      t += 0.005;
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        s.x += s.dx;
        s.y += s.dy;
        if (s.x < 0) s.x = w;
        if (s.x > w) s.x = 0;
        if (s.y < 0) s.y = h;
        if (s.y > h) s.y = 0;
        const flicker = s.o + Math.sin(t * 2 + s.phase) * 0.15;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0, flicker)})`;
        ctx.fill();
      }
      frame = requestAnimationFrame(draw);
    };
    draw();

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />;
}

export default function Hero() {
  const orbsRef = useRef<HTMLDivElement>(null);
  const [scrollRadius, setScrollRadius] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = 40;
      const scroll = window.scrollY;
      const vh = window.innerHeight;
      const progress = Math.min(scroll / (vh * 0.5), 1);
      setScrollRadius(progress * max);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const orbs = orbsRef.current;
    if (!orbs) return;
    let frame: number;
    let t = 0;
    const animate = () => {
      t += 0.002;
      for (let i = 0; i < orbs.children.length; i++) {
        const el = orbs.children[i] as HTMLElement;
        const speed = parseFloat(el.dataset.speed || "1");
        const x = Math.sin(t * speed + i * 1.2) * 60;
        const y = Math.cos(t * speed * 0.6 + i * 1.8) * 40;
        const s = 1 + Math.sin(t * speed * 1.3 + i) * 0.08;
        el.style.transform = `translate(${x}px, ${y}px) scale(${s})`;
      }
      frame = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <section
      className="relative w-full min-h-[800px] sm:min-h-[600px] h-[100vh] max-h-[900px] flex items-center"
      style={{ borderRadius: `0 0 ${scrollRadius}px ${scrollRadius}px`, transition: "border-radius 0.1s ease-out" }}
    >
      <div className="absolute inset-0 overflow-hidden" style={{ borderRadius: `0 0 ${scrollRadius}px ${scrollRadius}px`, transition: "border-radius 0.1s ease-out" }}>
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0418] via-[#150b2e] to-[#0b0b1a]" />

      <div ref={orbsRef} className="absolute inset-0 pointer-events-none">
        <div data-speed="0.4" className="absolute top-[10%] -left-32 w-[700px] h-[700px] bg-purple-600/12 rounded-full blur-[160px]" />
        <div data-speed="0.25" className="absolute top-[30%] -right-40 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[140px]" />
        <div data-speed="0.35" className="absolute bottom-[5%] left-[20%] w-[500px] h-[500px] bg-fuchsia-500/8 rounded-full blur-[120px]" />
        <div data-speed="0.5" className="absolute top-[55%] right-[20%] w-[350px] h-[350px] bg-violet-500/6 rounded-full blur-[90px]" />
        <div data-speed="0.2" className="absolute bottom-[30%] left-[5%] w-[300px] h-[300px] bg-cyan-500/4 rounded-full blur-[80px]" />
      </div>

      <Stars />

      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0418] via-transparent to-transparent z-[1]" />

      <div
        className="absolute inset-0 opacity-[0.03] z-[1]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#0a0418] to-transparent z-[1]" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-24 sm:pb-10 w-full">
        <div className="text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.07] text-purple-300 text-xs font-medium backdrop-blur-sm mx-auto">
            <TrendingUp size={14} />
            Trusted by 1200+ Clients Worldwide
          </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.05]">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-100">We Build Your Product.</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-pink-100">We Fill Your Pipeline.</span>
            </h1>

          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Custom software development and B2B lead generation under one roof.
            From web & mobile apps to targeted prospect campaigns
            we engineer growth from code to close.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-4 text-base font-semibold text-white bg-[#3b82f6] hover:bg-[#2563eb] rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Get Free Consultation
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 px-7 py-4 text-base font-medium text-white border border-white/20 hover:bg-white/5 hover:border-white/40 rounded-xl transition-all duration-300"
            >
              View Our Work
            </Link>
          </div>

        </div>
      </div>
      </div>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-20 translate-y-1/2">
        <RatingsBar />
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-600 z-10">
        <span className="text-[10px] font-semibold tracking-[0.2em] uppercase">Scroll</span>
        <div className="w-4 h-7 rounded-full border border-white/10 flex justify-center pt-1.5">
          <div className="w-1 h-2 rounded-full bg-purple-400" />
        </div>
      </div>
    </section>
  );
}
