"use client";

import { ReactNode } from "react";
import { Sparkles } from "lucide-react";
import { Outfit } from "next/font/google";

const outfit = Outfit({ subsets: ["latin"] });

interface PageHeroProps {
  title: ReactNode;
  description: string;
  badgeText?: string;
}

export default function PageHero({ title, description, badgeText }: PageHeroProps) {
  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-[#0a0418]">
      {/* Dark background elements similar to Hero.tsx to make navbar visible */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0418] via-[#150b2e] to-[#0b0b1a]" />
      
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[10%] -left-32 w-[600px] h-[600px] bg-purple-600/12 rounded-full blur-[140px]" />
        <div className="absolute top-[30%] -right-40 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[140px]" />
      </div>

      <div
        className="absolute inset-0 opacity-[0.03] z-[1]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#0a0418] to-transparent z-[1]" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {badgeText && (
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.05] border border-white/[0.08] text-purple-200 text-xs font-semibold tracking-wider backdrop-blur-md mx-auto mb-6 shadow-[0_0_15px_rgba(168,85,247,0.15)]">
            <Sparkles size={14} className="text-purple-400" />
            {badgeText}
          </div>
        )}
        <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6 text-white tracking-tight ${outfit.className}`}>
          {title}
        </h1>
        <p className="text-lg sm:text-xl text-gray-300/90 max-w-2xl mx-auto leading-relaxed font-medium">
          {description}
        </p>
      </div>
    </section>
  );
}
