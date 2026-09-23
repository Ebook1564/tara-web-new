"use client";

import React, { useEffect, useRef, useState } from "react";

// List of exactly 4 requested companies
const clientCompanies = [
  { name: "MAGHGM", domain: "maghgm.com" },
  { name: "ASF Accounting", domain: "asf-accounting.ae" },
  { name: "Dubai Holding", domain: "dubaiholding.com" },
  { name: "Sobha", domain: "sobharealty.com" },
];

function LogoItem({ company }: { company: { name: string; domain: string } }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center gap-3 w-full h-28 grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300 hover:scale-105 cursor-pointer">
      <div className="relative w-16 h-16 flex items-center justify-center bg-white rounded-2xl shadow-sm border border-slate-100">
        {failed ? (
          <span className="text-xl font-bold text-slate-400">
            {company.name.charAt(0)}
          </span>
        ) : (
          <img
            src={`https://www.google.com/s2/favicons?domain=${company.domain}&sz=128`}
            alt={`${company.name} logo`}
            className="max-w-[40px] max-h-[40px] object-contain"
            onError={() => setFailed(true)}
          />
        )}
      </div>
      <span className="text-xs font-semibold text-slate-600 tracking-wide uppercase text-center max-w-[100px] truncate">
        {company.name}
      </span>
    </div>
  );
}

export default function ClientLogos() {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 lg:py-24 bg-white overflow-hidden border-t border-slate-100"
    >
      <div
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 ease-out ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4">
            Trusted by the World's Best
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Join industry leaders who rely on our intelligence data to drive their growth.
          </p>
        </div>

        {/* Logos Grid: Restricted to 1 row of exactly 4 companies */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-8 gap-y-10 items-center justify-items-center max-w-4xl mx-auto">
          {clientCompanies.map((company, idx) => (
            <LogoItem key={idx} company={company} />
          ))}
        </div>
        
      </div>
    </section>
  );
}
