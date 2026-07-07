"use client";

import { Star, ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const testimonials = [
  {
    quote: "Loved the work , he understood the problem and fixed it , i have tried to fix this issue with other developers but it took them days still could not figure it out. he just solved the issue in few hours , definitely looking forward to work with him on many more projects.!!!",
    author: "adqkot",
    location: "🇲🇽 Mexico",
    time: "2 years ago",
    avatarBg: "bg-[#d3e3fc]",
    avatarText: "text-[#1d3557]"
  },
  {
    quote: "Aman was quick and delivered the product on time i would highly recommend him for all app related work he is really good and knowledgeable with his work",
    author: "josephpallath",
    location: "🇮🇳 India",
    time: "2 years ago",
    avatarBg: "bg-[#0f7632]",
    avatarText: "text-white"
  },
  {
    quote: "It was a pleasure dealing with Aman and his crew! Communication was professional and friendly. Payment was made promptly, and the process went completely as agreed. Highly trustwothy and reliable— looking forward to work with you again.",
    author: "David Amimo",
    location: "1 review",
    time: "3 months ago",
    avatarBg: "bg-[#e5a01d]",
    avatarText: "text-white"
  },
  {
    quote: "Verify Good Service can be believed by closing the eye",
    author: "Tech Speed",
    location: "2 reviews",
    time: "9 months ago",
    avatarBg: "bg-[#1f1f1f]",
    avatarText: "text-[#e5a01d]"
  },
  {
    quote: "Tara is transparent, professional, and reliable. My experience working with them was smooth and seamless throughout, and I found them to be highly trustworthy in business dealings.",
    author: "Mwambutsa Edgar",
    location: "3 reviews",
    time: "3 days ago",
    badge: "NEW",
    avatarBg: "bg-[#111]",
    avatarText: "text-white"
  },
  {
    quote: "It was a pleasure dealing with Aman and Ashish! Communication was smooth and friendly throughout, and they were very understanding and professional. Payment was made promptly, and the process went completely as agreed. Highly trustworthy and easy to work with — I'd be happy to do business with them again anytime :)",
    author: "Satyam Maitrai",
    location: "5 reviews",
    time: "8 months ago",
    avatarBg: "bg-[#e85d04]",
    avatarText: "text-white"
  },
  {
    quote: "You are sincere and very correct. I really liked your work. And I wish you success in your good endeavor. Thank you again, sir.",
    author: "Jothida Pokkisham",
    location: "1 review",
    time: "7 months ago",
    avatarBg: "bg-[#16a34a]",
    avatarText: "text-white"
  },
  {
    quote: "I recently made a deal with Tara Applications, and I'm very pleased with the experience. They fulfilled their promises and paid me exactly as agreed. The entire process was smooth, professional, and transparent. I highly recommend Tara Applications — they are reliable, trustworthy, and a great company to work with.",
    author: "Abba Auwal",
    location: "1 review · 2 photos",
    time: "11 months ago",
    avatarBg: "bg-[#111]",
    avatarText: "text-[#eab308]"
  }
];

const allTestimonials = [...testimonials, ...testimonials];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
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

  const next = () => setCurrent((p) => (p + 1) % testimonials.length);
  const prev = () => setCurrent((p) => (p - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 lg:py-28 overflow-hidden"
      id="testimonials"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#0c0a12] via-[#0e0b16] to-[#0c0a12]" />
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-px bg-gradient-to-r from-transparent via-purple-400/15 to-transparent" />

      <div
        className={`relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ease-out ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-300 text-xs font-semibold mb-5 tracking-wider uppercase backdrop-blur-sm">
            <CheckCircle2 size={14} className="text-purple-400" />
            Verified Client Reviews
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.05]">
            What Our Clients <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Say</span>
          </h2>
          <p className="mt-4 text-lg text-gray-400 max-w-xl mx-auto">
            Authentic feedback from our partners that rely on us to provide great software and strong lead generation.
          </p>
        </div>

        <style>{`
          @keyframes scroll-left {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-scroll {
            animation: scroll-left 50s linear infinite;
          }
          .animate-scroll:hover {
            animation-play-state: paused;
          }
          .mask-horizontal {
            mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
            -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          }
        `}</style>

        <div className="mt-16 w-[100vw] relative left-1/2 -translate-x-1/2 mask-horizontal overflow-hidden py-10 -my-10 perspective-1000">
          <div className="flex w-max animate-scroll">
            {allTestimonials.map((t, i) => (
              <div
                key={i}
                className={`w-[280px] sm:w-[340px] mx-4 shrink-0 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                  inView ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
                }`}
                style={{
                  transitionDelay: `${(i % testimonials.length) * 100}ms`,
                  filter: "drop-shadow(0 15px 25px rgba(0, 0, 0, 0.2))"
                }}
              >
                <div 
                  className="p-6 sm:p-8 pt-10 pb-10 bg-white text-left relative group hover:-translate-y-2 transition-transform duration-300 h-full flex flex-col"
                  style={{
                    WebkitMaskImage: `url("data:image/svg+xml,%3Csvg width='24' height='12' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 12 L12 0 L24 12 Z' fill='black'/%3E%3C/svg%3E"), url("data:image/svg+xml,%3Csvg width='24' height='12' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0 L12 12 L24 0 Z' fill='black'/%3E%3C/svg%3E"), linear-gradient(black, black)`,
                    WebkitMaskPosition: "top left, bottom left, center",
                    WebkitMaskRepeat: "repeat-x, repeat-x, no-repeat",
                    WebkitMaskSize: "24px 12px, 24px 12px, 100% calc(100% - 24px)",
                    maskImage: `url("data:image/svg+xml,%3Csvg width='24' height='12' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 12 L12 0 L24 12 Z' fill='black'/%3E%3C/svg%3E"), url("data:image/svg+xml,%3Csvg width='24' height='12' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0 L12 12 L24 0 Z' fill='black'/%3E%3C/svg%3E"), linear-gradient(black, black)`,
                    maskPosition: "top left, bottom left, center",
                    maskRepeat: "repeat-x, repeat-x, no-repeat",
                    maskSize: "24px 12px, 24px 12px, 100% calc(100% - 24px)",
                  }}
                >
                  
                  {/* Newspaper style background texture */}
                  <div className="absolute inset-0 opacity-[0.025] pointer-events-none mix-blend-multiply" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cream-paper.png')" }}></div>
                  
                  {/* Subtle torn edge effect using CSS box-shadow */}
                  <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.03)] pointer-events-none"></div>

                  <div className="relative z-10 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-5">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full ${t.avatarBg} ${t.avatarText} flex items-center justify-center font-bold text-lg shadow-inner shrink-0`}>
                          {t.author.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-bold text-gray-900 text-base leading-tight break-all sm:break-normal">{t.author}</div>
                          <div className="text-xs text-gray-500 font-medium mt-0.5">{t.location}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-1.5 mb-4">
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, s) => (
                          <Star key={s} size={14} className="fill-[#111] text-[#111]" />
                        ))}
                      </div>
                      <span className="font-bold text-gray-800 text-xs ml-1">5</span>
                      <span className="text-gray-400 text-xs flex items-center gap-1.5 ml-1">
                        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                        {t.time}
                        {t.badge && (
                          <span className="px-1.5 py-0.5 bg-gray-900 text-white rounded text-[9px] font-bold tracking-wider ml-1">
                            {t.badge}
                          </span>
                        )}
                      </span>
                    </div>

                    <p className="text-gray-800 leading-relaxed text-sm sm:text-[15px] mb-6 font-medium flex-1">
                      "{t.quote}"
                    </p>

                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 pt-10 border-t border-white/10 w-full flex flex-col items-center">
          <p className="text-gray-400 text-sm mb-8 uppercase tracking-[0.2em] font-semibold">Consistently Rated 5 Stars On</p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-20">
            {[
              { name: "Fiverr", domain: "fiverr.com", color: "hover:text-[#1dbf73]", imgClass: "bg-white p-1.5 rounded-lg shadow-sm" },
              { name: "Glassdoor", domain: "glassdoor.com", color: "hover:text-[#0caa41]", imgClass: "bg-transparent rounded-none" },
              { name: "AmbitionBox", domain: "ambitionbox.com", color: "hover:text-[#3860FF]", imgClass: "bg-transparent rounded-none" }
            ].map((platform, i) => (
              <div 
                key={platform.name} 
                className={`flex items-center gap-4 transition-all duration-500 cursor-pointer ${platform.color} ${inView ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
                style={{ transitionDelay: `${600 + i * 150}ms` }}
              >
                <img 
                  src={`https://www.google.com/s2/favicons?domain=${platform.domain}&sz=128`} 
                  alt={platform.name} 
                  className={`w-10 h-10 ${platform.imgClass}`} 
                />
                <span className="text-2xl font-black text-white transition-colors tracking-tight group-hover:text-current">{platform.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
