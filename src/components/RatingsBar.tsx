"use client";

import { useEffect, useRef, useState } from "react";

function Stars({ count = 5, animated = false, rating }: { count?: number; animated?: boolean; rating?: string }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-1.5 w-full">
      <div className="flex items-center gap-0.5 shrink-0">
        {[...Array(count)].map((_, i) => (
          <svg
            key={i}
            viewBox="0 0 16 16"
            className={`w-3 h-3 sm:w-5 sm:h-5 shrink-0 fill-yellow-500 transition-all duration-200 ${animated ? "hover:scale-125 hover:fill-yellow-400" : ""
              }`}
          >
            <path d="M8 1.5l1.76 3.57 3.94.57-2.85 2.78.67 3.93L8 10.5l-3.52 1.85.67-3.93L2.3 5.64l3.94-.57L8 1.5z" />
          </svg>
        ))}
      </div>
      {rating && <span className="text-gray-300 font-bold text-[10px] sm:text-sm shrink-0">{rating}</span>}
    </div>
  );
}

export default function RatingsBar() {
  const boxRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [isHovered, setIsHovered] = useState(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = boxRef.current?.parentElement;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

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
    <div className={`flex justify-center transition-all duration-700 ease-out ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}>
      <div
        ref={boxRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative group cursor-default"
      >
        {/* Glow follows mouse */}
        <div
          className="absolute -inset-6 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{
            background: `radial-gradient(700px circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(74, 127, 211, 0.15), transparent 50%)`,
          }}
        />

        {/* Gradient border ring */}
        <div
          className="absolute -inset-[2px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `conic-gradient(from ${isHovered ? mousePos.x * 360 : 0}deg at 50% 50%, transparent, rgba(232,51,152,0.4), rgba(74,127,211,0.4), transparent)`,
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            maskComposite: "exclude",
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            padding: "2px",
          }}
        />

        {/* Main box */}
        <div
          className={`relative rounded-2xl border transition-all duration-500 overflow-hidden ${isHovered
            ? "border-white/[0.12] bg-[#130d24] shadow-2xl shadow-blue-900/25 -translate-y-0.5"
            : "border-white/[0.07] bg-[#0f0a1e] shadow-xl shadow-blue-900/10"
            } backdrop-blur-md`}
        >
          <div className="grid grid-cols-2 md:grid-cols-4">
            <a href="https://www.fiverr.com/amansaxena23" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center gap-2 sm:gap-3 group/rating px-2 sm:px-6 py-4 sm:py-7 text-center border-b border-r border-white/[0.07] md:border-b-0 hover:bg-white/[0.02] transition-colors">
              <img
                src="https://www.google.com/s2/favicons?domain=fiverr.com&sz=128"
                alt="Fiverr"
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl transition-transform duration-300 group-hover/rating:scale-110"
              />
              <div className="text-white font-bold text-xs sm:text-base leading-tight">Fiverr</div>
              <Stars animated rating="5.0" />
            </a>

            <a href="https://www.google.com/search?q=Tara+Applications-+Android%2FIOS+Development%7C+Game+Development%7C+Digital+Marketing%7C+Graphic+Desiging&oq=tara+&gs_lcrp=EgZjaHJvbWUqBggCEEUYOzIGCAAQRRg5MgoIARAuGLEDGIAEMgYIAhBFGDsyBwgDEC4YgAQyCggEEC4YsQMYgAQyCggFEAAYsQMYgAQyBggGEEUYPTIGCAcQRRg90gEIMTg2OGowajmoAgawAgHxBRCBPD-DIY5z&sourceid=chrome&ie=UTF-8#lrd=0x6c1046c2ae0aaa75:0x100853e9493cff7b,1,,,," target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center gap-2 sm:gap-3 group/rating px-2 sm:px-6 py-4 sm:py-7 text-center border-b border-white/[0.07] md:border-b-0 md:border-r hover:bg-white/[0.02] transition-colors">
              <img
                src="https://www.google.com/s2/favicons?domain=google.com&sz=128"
                alt="Google"
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl transition-transform duration-300 group-hover/rating:scale-110"
              />
              <div className="text-white font-bold text-xs sm:text-base leading-tight">Google</div>
              <Stars animated rating="4.8" />
            </a>

            <a href="https://www.glassdoor.co.uk" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center gap-2 sm:gap-3 group/rating px-2 sm:px-6 py-4 sm:py-7 text-center border-r border-white/[0.07] hover:bg-white/[0.02] transition-colors">
              <img
                src="https://www.google.com/s2/favicons?domain=glassdoor.com&sz=128"
                alt="Glassdoor"
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl transition-transform duration-300 group-hover/rating:scale-110"
              />
              <div className="text-white font-bold text-xs sm:text-base leading-tight">Glassdoor</div>
              <Stars animated rating="5.0" />
            </a>

            <a href="https://www.ambitionbox.com" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center gap-2 sm:gap-3 group/rating px-2 sm:px-6 py-4 sm:py-7 text-center hover:bg-white/[0.02] transition-colors">
              <img
                src="https://www.google.com/s2/favicons?domain=ambitionbox.com&sz=128"
                alt="AmbitionBox"
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl transition-transform duration-300 group-hover/rating:scale-110"
              />
              <div className="text-white font-bold text-xs sm:text-base leading-tight">AmbitionBox</div>
              <Stars animated rating="4.9" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
