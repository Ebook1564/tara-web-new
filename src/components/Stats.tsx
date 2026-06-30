"use client";

import { useEffect, useRef, useState } from "react";
import { Briefcase, Globe, Award, Users } from "lucide-react";
import { Outfit } from "next/font/google";
const outfit = Outfit({ subsets: ["latin"] });

const stats = [
  { value: 2500, suffix: "+", label: "Projects Completed", icon: Briefcase },
  { value: 350, suffix: "+", label: "Global Clients", icon: Globe },
  { value: 10, suffix: "+", label: "Years Experience", icon: Award },
  { value: 30, suffix: "+", label: "Team Members", icon: Users },
];

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const counted = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !counted.current) {
          counted.current = true;
          const duration = 2000;
          const steps = 30;
          const increment = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}

export default function Stats() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="relative pt-32 pb-20 bg-white overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <svg className="absolute top-10 left-[8%] w-6 h-6 text-[#4A7FD3]/20 animate-float" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3 7 7 3-7 3-3 7-3-7-7-3 7-3z" />
        </svg>
        <svg className="absolute top-20 right-[12%] w-4 h-4 text-[#E83398]/15 animate-float" style={{ animationDelay: "1.5s" }} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3 7 7 3-7 3-3 7-3-7-7-3 7-3z" />
        </svg>
        <svg className="absolute bottom-16 left-[15%] w-8 h-8 text-[#4A7FD3]/15 animate-float" style={{ animationDelay: "3s" }} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3 7 7 3-7 3-3 7-3-7-7-3 7-3z" />
        </svg>
        <svg className="absolute bottom-24 right-[20%] w-5 h-5 text-[#E83398]/10 animate-float" style={{ animationDelay: "2s" }} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3 7 7 3-7 3-3 7-3-7-7-3 7-3z" />
        </svg>
        <svg className="absolute top-1/2 left-[5%] w-3 h-3 text-[#4A7FD3]/20 animate-float" style={{ animationDelay: "0.8s" }} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3 7 7 3-7 3-3 7-3-7-7-3 7-3z" />
        </svg>
        <svg className="absolute top-1/3 right-[8%] w-10 h-10 text-[#E83398]/10 animate-float" style={{ animationDelay: "4s" }} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3 7 7 3-7 3-3 7-3-7-7-3 7-3z" />
        </svg>

        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-[#4A7FD3]/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-[#E83398]/5 blur-3xl" />
      </div>
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                className="relative group p-8 text-center rounded-3xl bg-white border border-gray-100 shadow-sm transition-all duration-500 hover:shadow-xl hover:shadow-blue-900/10 hover:border-[#4A7FD3]/30 hover:-translate-y-2 cursor-default"
              >
                <div
                  className={`absolute inset-0 rounded-3xl transition-opacity duration-500 ${
                    hovered === i ? "opacity-100" : "opacity-0"
                  }`}
                  style={{
                    background: `radial-gradient(300px circle at 50% 20%, rgba(74,127,211,0.06), transparent)`,
                  }}
                />

                <div className="relative flex flex-col items-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#4A7FD3]/10 mb-6 group-hover:bg-[#4A7FD3]/20 transition-all duration-300">
                    <Icon
                      size={28}
                      className="text-[#4A7FD3] transition-all duration-300 group-hover:text-blue-600 group-hover:scale-110 group-hover:-translate-y-0.5"
                    />
                  </div>

                  <div className={`text-4xl sm:text-5xl font-extrabold text-gray-900 tabular-nums tracking-tight group-hover:scale-105 transition-transform duration-300 ${outfit.className}`}>
                    <Counter target={stat.value} suffix={stat.suffix} />
                  </div>

                  <div className="relative mt-3 text-sm sm:text-base font-bold text-gray-500 group-hover:text-[#4A7FD3] transition-colors duration-300 tracking-wide uppercase">
                    {stat.label}
                    <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[#E83398] rounded-full group-hover:w-12 transition-all duration-300" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
