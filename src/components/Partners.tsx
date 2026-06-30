"use client";

import { useEffect, useRef, useState } from "react";
import { Sparkles } from "lucide-react";

const partners = [
  { name: "Kaizen Gaming", domain: "kaizengaming.com", color: "#F97316" },
  { name: "Sriida Solutions", domain: "sriidasolutions.com", color: "#1E3A8A" },
  { name: "Taashee", domain: "taashee.com", color: "#65A30D" },
  { name: "Profoto", domain: "profoto.com", color: "#EA580C" },
  { name: "Boie USA", domain: "boieusa.com", color: "#0284C7" },
  { name: "Patriot Gold", domain: "patriotgoldgroup.com", color: "#D97706" },
  { name: "ANA", domain: "ana.net", color: "#DC2626" },
];

function PartnerBadge({ p }: { p: { name: string; domain: string; color: string } }) {
  const [failed, setFailed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative flex items-center gap-4 px-6 py-4 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-md transition-all duration-500 whitespace-nowrap group cursor-pointer"
      style={{
        boxShadow: isHovered ? `0 10px 40px -10px ${p.color}50, inset 0 0 0 1px ${p.color}40` : '0 4px 20px -10px rgba(0,0,0,0.5)',
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
      }}
    >
      <div 
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(circle at center, ${p.color}, transparent 70%)` }}
      />
      
      <div 
        className="relative w-12 h-12 rounded-xl bg-white/[0.03] flex items-center justify-center shrink-0 overflow-hidden ring-1 ring-white/10 transition-all duration-500"
        style={{
          boxShadow: isHovered ? `0 0 20px ${p.color}40` : 'none',
          borderColor: isHovered ? `${p.color}80` : 'rgba(255,255,255,0.1)',
        }}
      >
        {failed ? (
          <span className="text-lg font-black transition-colors duration-500" style={{ color: isHovered ? p.color : '#6b7280' }}>
            {p.name.charAt(0)}
          </span>
        ) : (
          <img
            src={`https://www.google.com/s2/favicons?domain=${p.domain}&sz=128`}
            alt={`${p.name} logo`}
            width={32}
            height={32}
            className="transition-all duration-500 group-hover:scale-110"
            onError={() => setFailed(true)}
          />
        )}
      </div>
      <span 
        className="relative text-base font-bold transition-colors duration-500 tracking-wide"
        style={{ color: isHovered ? p.color : '#9ca3af' }}
      >
        {p.name}
      </span>
    </div>
  );
}

function MarqueeRow({ items, reverse, speed = 40 }: { items: { name: string; domain: string; color: string }[]; reverse?: boolean; speed?: number }) {
  return (
    <div className="flex overflow-hidden group">
      <div 
        className={`flex gap-6 min-w-full ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}
        style={{ animationDuration: `${speed}s` }}
      >
        {/* Render 3 sets to ensure smooth infinite loop across ultra-wide screens */}
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex gap-6 shrink-0 pr-6">
            {items.map((p, j) => (
              <PartnerBadge key={`${i}-${j}`} p={p} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Partners() {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden bg-[#030303]"
      id="partners"
    >
      {/* Premium Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:24px_24px] opacity-50" />
        
        {/* Glowing Orbs */}
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[128px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[128px] pointer-events-none" />
      </div>

      <div className={`relative z-10 max-w-7xl mx-auto transition-all duration-1000 ease-out ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
        
        {/* Header Content */}
        <div className="text-center px-4 sm:px-6 lg:px-8 mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-300 text-sm font-semibold mb-6 shadow-sm backdrop-blur-md">
            <Sparkles size={16} className="text-purple-400 animate-pulse" />
            <span className="tracking-wide uppercase text-xs">Trusted By Industry Leaders</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight mb-6">
            Companies We've <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Worked With</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            We partner with ambitious brands and forward-thinking enterprises to deliver transformative digital experiences.
          </p>
        </div>

        {/* Marquee Area */}
        <div className="relative flex flex-col gap-6 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          {/* Subtle gradient overlays for depth */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#030303] via-transparent to-[#030303] z-10 opacity-60" />
          
          <MarqueeRow items={partners} speed={25} />
          <MarqueeRow items={[...partners].reverse()} reverse speed={35} />
          <MarqueeRow items={[...partners.slice(6), ...partners.slice(0, 6)]} speed={30} />
        </div>
      </div>

      {/* Inline Styles for Marquee Animations */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-33.33333%); }
        }
        @keyframes marquee-reverse {
          0% { transform: translateX(-33.33333%); }
          100% { transform: translateX(0%); }
        }
        .animate-marquee {
          animation: marquee linear infinite;
        }
        .animate-marquee-reverse {
          animation: marquee-reverse linear infinite;
        }
        .group:hover .animate-marquee,
        .group:hover .animate-marquee-reverse {
          animation-play-state: paused;
        }
      `}} />
    </section>
  );
}
