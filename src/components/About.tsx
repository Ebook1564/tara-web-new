"use client";

import { Outfit } from "next/font/google";
const outfit = Outfit({ subsets: ["latin"] });

import { Target, Eye, Cpu, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const values = [
  {
    icon: Target,
    title: "Our Story",
    desc: "Started in 2017 by Aman Deep Saxena as a solo app developer. After several successful Android apps, we expanded into full-stack services in 2021. Today we're a team of 20+ serving 1200+ clients globally.",
  },
  {
    icon: Eye,
    title: "Our Vision",
    desc: "To drive profitable growth for our clients through high-quality digital products, data-driven marketing, and result-oriented lead generation campaigns.",
  },
  {
    icon: Cpu,
    title: "Our Expertise",
    desc: "From building custom APIs to full-stack IT solutions and targeted B2B campaigns — we engineer technology and generate leads that fuel business growth.",
  },
];

function FounderPhoto() {
  const boxRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;
    const handleMove = (e: MouseEvent) => {
      const rect = box.getBoundingClientRect();
      setMousePos({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      });
    };
    box.addEventListener("mousemove", handleMove);
    return () => box.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div className="relative mx-auto w-fit">
      <div
        ref={boxRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative group cursor-default"
      >
        <div
          className="absolute -inset-4 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{
            background: `radial-gradient(500px circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(74, 127, 211, 0.12), transparent 50%)`,
          }}
        />
        <div
          className={`absolute -inset-[1.5px] rounded-2xl opacity-0 transition-opacity duration-500 ${isHovered ? "opacity-100" : "opacity-0"}`}
          style={{
            background: `conic-gradient(from ${isHovered ? mousePos.x * 360 : 0}deg at 50% 50%, transparent, rgba(74,127,211,0.4), rgba(59,130,246,0.4), transparent)`,
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            maskComposite: "exclude",
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            padding: "1.5px",
          }}
        />
        <div
          className={`relative w-72 h-72 sm:w-80 sm:h-80 rounded-2xl overflow-hidden border transition-all duration-500 ${isHovered
            ? "border-white/[0.12] shadow-2xl shadow-blue-900/25 -translate-y-0.5"
            : "border-white/[0.08] shadow-lg shadow-blue-900/10"
            }`}
        >
          <Image
            src="/images/about/founder.jpeg"
            alt="Aman Deep Saxena - Founder"
            fill
            className="object-cover"
            sizes="(max-width: 640px) 288px, 320px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <h4 className="text-lg font-bold text-white">Aman Deep Saxena</h4>
            <p className="text-sm text-white/70">Founder & Lead Strategist</p>
            <div className={`flex items-center gap-3 mt-3 transition-all duration-300 ${isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"}`}>
              <a
                href="https://www.linkedin.com/in/amansaxenatara/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all duration-200 group/icon"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current group-hover/icon:scale-110 transition-transform duration-200">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function GlassCard({ icon: Icon, title, desc }: { icon: any; title: string; desc: string }) {
  const boxRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;
    const handleMove = (e: MouseEvent) => {
      const rect = box.getBoundingClientRect();
      setMousePos({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      });
    };
    box.addEventListener("mousemove", handleMove);
    return () => box.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div
      ref={boxRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group cursor-default h-full"
    >
      <div
        className="absolute -inset-4 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{
          background: `radial-gradient(400px circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(74, 127, 211, 0.1), transparent 50%)`,
        }}
      />
      <div
        className={`absolute -inset-[1.5px] rounded-2xl opacity-0 transition-opacity duration-500 ${isHovered ? "opacity-100" : "opacity-0"}`}
        style={{
          background: `conic-gradient(from ${isHovered ? mousePos.x * 360 : 0}deg at 50% 50%, transparent, rgba(74,127,211,0.3), rgba(232,51,152,0.3), transparent)`,
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          padding: "1.5px",
        }}
      />
      <div
        className={`relative p-7 rounded-2xl border backdrop-blur-sm transition-all duration-500 h-full flex flex-col ${isHovered
          ? "border-white/[0.12] bg-white/[0.05] shadow-xl shadow-blue-900/25 -translate-y-0.5"
          : "border-white/[0.06] bg-white/[0.03] shadow-sm shadow-blue-900/10"
          }`}
      >
        <div className="w-12 h-12 rounded-xl bg-[#4A7FD3]/10 flex items-center justify-center mb-4 group-hover:bg-[#4A7FD3]/20 group-hover:scale-105 transition-all duration-300">
          <Icon size={24} className="text-[#4A7FD3] group-hover:text-blue-300 transition-colors duration-300" />
        </div>
        <h3 className="text-lg font-bold text-white mb-3 group-hover:text-[#4A7FD3] transition-colors duration-300">{title}</h3>
        <p className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300 flex-1">{desc}</p>
      </div>
    </div>
  );
}

export default function About() {
  return (
    <section className="relative py-20 lg:py-28 overflow-hidden" id="about">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0418] via-[#100b22] to-[#0a0418]" />
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)", backgroundSize: "32px 32px" }} />

      <div className="absolute inset-0 pointer-events-none">
        <svg className="absolute top-16 left-[10%] w-5 h-5 text-purple-400/20 animate-float" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3 7 7 3-7 3-3 7-3-7-7-3 7-3z" />
        </svg>
        <svg className="absolute top-32 right-[15%] w-6 h-6 text-blue-400/15 animate-float" style={{ animationDelay: "2s" }} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3 7 7 3-7 3-3 7-3-7-7-3 7-3z" />
        </svg>
        <svg className="absolute bottom-24 left-[8%] w-4 h-4 text-purple-400/15 animate-float" style={{ animationDelay: "3.5s" }} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3 7 7 3-7 3-3 7-3-7-7-3 7-3z" />
        </svg>
        <svg className="absolute bottom-32 right-[10%] w-8 h-8 text-blue-400/10 animate-float" style={{ animationDelay: "1s" }} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3 7 7 3-7 3-3 7-3-7-7-3 7-3z" />
        </svg>

        <div className="absolute top-1/3 left-[5%] w-72 h-72 rounded-full bg-blue-600/8 blur-3xl" />
        <div className="absolute bottom-1/3 right-[5%] w-56 h-56 rounded-full bg-pink-600/6 blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className={`text-3xl sm:text-4xl font-extrabold text-white tracking-tight ${outfit.className}`}>
            About <span className="text-[#4A7FD3]">Us</span>
          </h2>
          <p className="mt-3 text-lg text-gray-400 max-w-2xl mx-auto">
            A technology company that builds and grows — from apps and websites to pipelines and partnerships.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-14 items-center mb-20">
          <div className="space-y-5">
            <h3 className={`text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight ${outfit.className}`}>
              Lead by <span className="text-[#4A7FD3]">Aman Deep Saxena</span>
            </h3>
            <p className="text-gray-400 leading-relaxed text-base sm:text-lg">
              Tara Applications is led by Aman Deep Saxena, a technology professional with deep experience across digital products, platforms, and growth systems.
            </p>
            <p className="text-gray-400 leading-relaxed text-base sm:text-lg">
              Over the years, he has worked with clients globally on building, optimizing, and scaling technology-driven solutions — from mobile apps and web platforms to full B2B lead generation engines.
            </p>
            <p className="text-gray-400 leading-relaxed text-base sm:text-lg">
              His approach combines technical execution with strategic thinking, enabling businesses to grow efficiently in competitive markets.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 mt-2 text-[#4A7FD3] font-semibold hover:text-blue-400 transition-colors duration-200 group"
            >
              Learn more about us
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>

          <FounderPhoto />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {values.map((v, i) => (
            <GlassCard key={v.title} icon={v.icon} title={v.title} desc={v.desc} />
          ))}
        </div>

      </div>
    </section>
  );
}
