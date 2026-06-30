"use client";

import { Outfit } from "next/font/google";
const outfit = Outfit({ subsets: ["latin"] });

import { Globe, Smartphone, Gamepad2, Mail, Users, Search, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const services = [
  {
    icon: Globe,
    title: "Web Development",
    desc: "Full-stack web solutions — front-end, back-end, API integration, and database management using modern frameworks.",
  },
  {
    icon: Smartphone,
    title: "App Development",
    desc: "Native Android & iOS apps with clean architecture, intuitive UX, and scalable backends.",
  },
  {
    icon: Gamepad2,
    title: "Game Development",
    desc: "Custom 2D, 3D, and multiplayer games from concept to launch — Unity, Unreal, and more.",
  },
  {
    icon: Mail,
    title: "Email Marketing",
    desc: "Automated campaigns, segmentation, A/B testing, and templates that drive engagement and ROI.",
  },
  {
    icon: Users,
    title: "Lead Generation",
    desc: "Targeted B2B lead generation through multi-channel outreach, qualification, and CRM integration.",
  },
  {
    icon: Search,
    title: "App Store Optimization",
    desc: "Keyword-optimized listings, visual assets, and review management to boost visibility and downloads.",
  },
];

function ServiceCard({ icon: Icon, title, desc, index }: { icon: any; title: string; desc: string; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const handleMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      setMousePos({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      });
    };
    card.addEventListener("mousemove", handleMove);
    return () => card.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group cursor-default"
    >
      <div
        className="absolute -inset-4 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{
          background: `radial-gradient(500px circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(74, 127, 211, 0.08), transparent 50%)`,
        }}
      />
      <div
        className={`absolute -inset-[1.5px] rounded-3xl opacity-0 transition-opacity duration-500 ${isHovered ? "opacity-100" : "opacity-0"}`}
        style={{
          background: `conic-gradient(from ${isHovered ? mousePos.x * 360 : 0}deg at 50% 50%, transparent, rgba(232,51,152,0.3), rgba(74,127,211,0.3), transparent)`,
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          padding: "1.5px",
        }}
      />
      <Link
        href="/services"
        className={`relative block p-8 rounded-[1.5rem] border transition-all duration-500 h-full overflow-hidden ${
          isHovered
            ? "border-[#4A7FD3]/20 bg-white shadow-[0_20px_40px_rgb(74,127,211,0.08)] -translate-y-2"
            : "border-gray-100 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
        }`}
      >
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 ${isHovered ? 'bg-[#4A7FD3] shadow-lg shadow-[#4A7FD3]/30 scale-110 -rotate-3' : 'bg-[#4A7FD3]/10'}`}>
          <Icon size={24} className={`transition-colors duration-300 ${isHovered ? 'text-white' : 'text-[#4A7FD3]'}`} />
        </div>
        <h3 className={`text-xl font-extrabold text-gray-900 mb-3 group-hover:text-[#4A7FD3] transition-colors duration-300 ${outfit.className}`}>{title}</h3>
        <p className="text-gray-500 leading-relaxed group-hover:text-gray-600 transition-colors duration-300">{desc}</p>
        
        {/* Animated bottom line */}
        <div className={`absolute bottom-0 left-8 right-8 h-1 rounded-t-lg bg-[#4A7FD3] transition-all duration-500 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`} />
      </Link>
    </motion.div>
  );
}

export default function DevServices() {
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
    <section ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden bg-[#fafafa]" id="dev-services">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#4A7FD3]/5 to-transparent" />
      <div className="absolute inset-0 opacity-[0.2]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #4A7FD3 1px, transparent 0)", backgroundSize: "40px 40px" }} />

      <div className="absolute inset-0 pointer-events-none">
        <svg className="absolute top-12 left-[6%] w-4 h-4 text-blue-300/30 animate-float" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3 7 7 3-7 3-3 7-3-7-7-3 7-3z" />
        </svg>
        <svg className="absolute bottom-20 right-[8%] w-5 h-5 text-blue-300/20 animate-float" style={{ animationDelay: "2.5s" }} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3 7 7 3-7 3-3 7-3-7-7-3 7-3z" />
        </svg>
        <div className="absolute top-1/4 right-[10%] w-64 h-64 rounded-full bg-blue-300/10 blur-3xl" />
        <div className="absolute bottom-1/4 left-[5%] w-48 h-48 rounded-full bg-pink-300/8 blur-3xl" />
      </div>

      <div className={`relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`}>
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-gray-100 text-[#4A7FD3] text-sm font-bold tracking-wide uppercase mb-8 shadow-sm"
          >
            <Sparkles size={16} className="text-[#E83398] animate-pulse" />
            Our Expertise
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className={`text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight mb-6 ${outfit.className}`}
          >
            Development <span className="text-[#4A7FD3]">Services</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-500 leading-relaxed font-medium"
          >
            We build the digital products that power your business — from scratch to scale.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((s, index) => (
            <ServiceCard key={s.title} icon={s.icon} title={s.title} desc={s.desc} index={index} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-8 py-4 text-sm font-bold tracking-wide uppercase text-white bg-[#4A7FD3] rounded-xl hover:bg-[#3965b0] hover:shadow-[0_8px_25px_rgb(74,127,211,0.3)] hover:-translate-y-1 transition-all duration-300 group"
          >
            View All Services
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>
      </div>
    </section>
  );
}
