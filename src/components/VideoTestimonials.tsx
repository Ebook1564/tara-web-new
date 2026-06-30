"use client";

import { Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const videos = [
  {
    name: "Manuel De La Cruz",
    role: "CEO",
    company: "Boie USA",
    color: "from-sky-500 to-sky-600",
  },
  {
    name: "Malin Wittig",
    role: "Global Communication Manager",
    company: "Profoto",
    color: "from-orange-500 to-orange-600",
  },
  {
    name: "Larrin",
    role: "CMO",
    company: "Patriot Gold Group",
    color: "from-amber-500 to-amber-600",
  },
  {
    name: "Lisa Brown Shosteck",
    role: "Director",
    company: "ANA",
    color: "from-red-500 to-red-600",
  },
];

function VideoCard({ v, i, inView }: { v: typeof videos[0]; i: number; inView: boolean }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group rounded-2xl border border-gray-200 bg-white hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-200/30 transition-all duration-500 overflow-hidden ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
      style={{ transitionDelay: `${i * 100}ms` }}
    >
      <div className="relative aspect-video bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center cursor-pointer group overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${v.color} opacity-5 group-hover:opacity-10 transition-opacity duration-500`} />
        <div className={`w-16 h-16 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center transition-all duration-300 ${isHovered ? "scale-110 shadow-xl border-emerald-200" : ""}`}>
          <Play size={24} className="text-emerald-600 ml-0.5 transition-colors duration-300" />
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${v.color} flex items-center justify-center shrink-0 shadow-sm`}>
            <span className="text-sm font-bold text-white">{v.company.charAt(0)}</span>
          </div>
          <div>
            <div className="text-sm font-semibold text-gray-900">{v.name}</div>
            <div className="text-xs text-gray-400">{v.role}, {v.company}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function VideoTestimonials() {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } },
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-20 lg:py-28 overflow-hidden" id="video-testimonials">
      <div className="absolute inset-0 bg-gradient-to-br from-white via-emerald-50/40 to-white" />
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(16,185,129,0.2) 1px, transparent 0)", backgroundSize: "32px 32px" }} />

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-emerald-300/50 to-transparent" />

      <div className="absolute inset-0 pointer-events-none">
        <svg className="absolute top-16 right-[12%] w-4 h-4 text-emerald-300/30 animate-float" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3 7 7 3-7 3-3 7-3-7-7-3 7-3z" />
        </svg>
        <svg className="absolute bottom-20 left-[8%] w-5 h-5 text-teal-300/25 animate-float" style={{ animationDelay: "2.5s" }} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3 7 7 3-7 3-3 7-3-7-7-3 7-3z" />
        </svg>
        <div className="absolute top-1/3 -left-32 w-80 h-80 rounded-full bg-emerald-300/15 blur-3xl" />
        <div className="absolute bottom-1/4 -right-28 w-72 h-72 rounded-full bg-teal-300/10 blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-14 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-700 text-xs font-semibold mb-5 tracking-wider uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Video Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight leading-[1.05]">
            Hear From Our <span className="text-emerald-600">Clients</span>
          </h2>
          <p className="mt-3 text-lg text-gray-500 max-w-2xl mx-auto">
            Real stories from real people we&apos;ve worked with.
          </p>
        </div>

        <div className="relative">
          <div className="flex overflow-x-auto gap-5 pb-4 snap-x snap-mandatory custom-scrollbar [-webkit-overflow-scrolling:touch] [mask-image:linear-gradient(to_right,transparent,black_60px,black_calc(100%-60px),transparent)]">
            {videos.map((v, i) => (
              <div key={v.name} className="min-w-[340px] sm:min-w-[400px] snap-start">
                <VideoCard v={v} i={i} inView={inView} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
