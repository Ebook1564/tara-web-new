"use client";

import { ArrowRight, ExternalLink, Sparkles, Gamepad2, BookOpen, Layers, Monitor, Target, BarChart3 } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Outfit } from "next/font/google";
const outfit = Outfit({ subsets: ["latin"] });

const projects = [
  {
    title: "Snappgames Platform",
    category: "Game Dev",
    desc: "A High-Performance Gaming Platform Offering a Rich Library of Addictive, High-Quality Web and Mobile Games.",
    tag: "development",
    gradient: "from-[#4A7FD3] to-[#4A7FD3]/80",
    icon: Gamepad2,
    thumbGradient: "bg-gradient-to-br from-blue-50 to-blue-100",
    image: "/snappgames.jpg",
    link: "https://snappgames.com",
    linkText: "Visit Website",
    logo: "/snappgames_logo.jpg"
  },
  {
    title: "eBook Bundle App",
    category: "Mobile App",
    desc: "A massive library of beautifully formatted eBooks packed into a lightning-fast, premium mobile reading experience.",
    tag: "development",
    gradient: "from-[#4A7FD3] to-[#E83398]",
    icon: BookOpen,
    thumbGradient: "bg-gradient-to-br from-purple-50 to-pink-50",
    image: "/ebookapp.jpg",
    link: "https://play.google.com/store/apps/details?id=com.freeebookbundle",
    linkText: "Play Store",
    logo: "/ebook_logo.jpg"
  },
  {
    title: "Hill Dash Run",
    category: "Game Dev",
    desc: "A thrilling, physics-based racing game featuring incredible 3D environments and intense off-road challenges.",
    tag: "development",
    gradient: "from-[#E83398] to-[#E83398]/80",
    icon: Layers,
    thumbGradient: "bg-gradient-to-br from-pink-50 to-pink-100",
    image: "/hill_dash_run.jpg",
    logo: "/hill_dash_logo.jpg"
  },
  {
    title: "Bubu's Pixel Adventure",
    category: "Game Dev",
    desc: "An adorable 2D pixel-art platformer filled with challenging jumps, tricky obstacles, and endless fun.",
    tag: "development",
    gradient: "from-[#4A7FD3] to-[#3965b0]",
    icon: Gamepad2,
    thumbGradient: "bg-gradient-to-br from-indigo-50 to-blue-100",
    image: "/bubu_game.jpg",
    link: "https://play.google.com/store/apps/details?id=com.HyperAppsVP.Bubbu",
    linkText: "Play Store",
    logo: "/bubu_logo.jpg"
  },
  {
    title: "Escape Balls",
    category: "Game Dev",
    desc: "An incredibly fun physics-based puzzle platformer where you navigate challenging sceneries to escape.",
    tag: "development",
    gradient: "from-[#E83398] to-[#c82882]",
    icon: Gamepad2,
    thumbGradient: "bg-gradient-to-br from-rose-50 to-pink-100",
    image: "/escape_balls.jpg",
    link: "https://play.google.com/store/apps/details?id=com.HyperAppsVP.EscapePro",
    linkText: "Play Store",
    logo: "/escape_balls_logo.jpg"
  },
  {
    title: "Restaurant Tycoon",
    category: "Game Dev",
    desc: "A highly addictive culinary management game where players build, decorate, and run their own 3D restaurant kingdom.",
    tag: "development",
    gradient: "from-[#4A7FD3] to-[#E83398]",
    icon: Gamepad2,
    thumbGradient: "bg-gradient-to-br from-blue-50 to-purple-100",
    image: "/restaurant_tycoon.jpg",
    link: "https://play.google.com/store/apps/details?id=com.allshopping.app",
    linkText: "Play Store",
    logo: "/restaurant_tycoon_logo.jpg"
  },
];

const categories = ["All", "Game Dev", "Mobile App"];

function ProjectCard({ p, i }: { p: typeof projects[0]; i: number }) {
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
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.4, delay: i * 0.05 }}
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group cursor-default h-full"
    >
      <div
        className="absolute -inset-4 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(74, 127, 211, 0.08), transparent 50%)`,
        }}
      />
      <div
        className={`absolute -inset-[1.5px] rounded-3xl opacity-0 transition-opacity duration-500 pointer-events-none ${isHovered ? "opacity-100" : ""}`}
        style={{
          background: `conic-gradient(from ${isHovered ? mousePos.x * 360 : 0}deg at 50% 50%, transparent, rgba(74,127,211,0.3), rgba(232,51,152,0.2), transparent)`,
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          padding: "1.5px",
        }}
      />
      <div
        className={`relative rounded-[1.5rem] border overflow-hidden flex flex-col group/card min-h-[360px] cursor-pointer [perspective:1200px] ${isHovered
          ? "border-transparent shadow-2xl shadow-blue-900/20 -translate-y-2"
          : "border-gray-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
          } transition-all duration-500`}
      >
        {/* Underneath Layer: The Image (Revealed on Hover) */}
        <div className="absolute inset-0 w-full h-full z-0">
          {p.image ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={p.image} alt={p.title} className="absolute inset-0 w-full h-full object-cover transform scale-110 group-hover/card:scale-100 transition-transform duration-700" />
          ) : (
            <div className={`absolute inset-0 w-full h-full ${p.thumbGradient} flex items-center justify-center transform scale-110 group-hover/card:scale-100 transition-transform duration-700`}>
              <p.icon size={80} className="text-[#4A7FD3] opacity-30" />
            </div>
          )}

          {/* Dark Overlay for the revealed state */}
          <div className="absolute inset-0 bg-[#050505]/70 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center p-6 text-center">
            <span
              className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[11px] font-bold tracking-wider uppercase bg-gradient-to-r ${p.gradient} text-white mb-4 transform -translate-y-8 opacity-0 group-hover/card:translate-y-0 group-hover/card:opacity-100 transition-all duration-500 delay-100`}
            >
              {p.category}
            </span>
            {p.link ? (
              <a href={p.link} target="_blank" rel="noopener noreferrer" className="transform translate-y-8 opacity-0 group-hover/card:translate-y-0 group-hover/card:opacity-100 transition-all duration-500 delay-150 inline-flex items-center gap-2 text-sm font-bold text-white bg-white/20 backdrop-blur-md px-6 py-3 rounded-full hover:bg-white/30 border border-white/10 hover:border-white/30">
                {p.linkText || "View Details"} <ExternalLink size={16} />
              </a>
            ) : (
              <div className="transform translate-y-8 opacity-0 group-hover/card:translate-y-0 group-hover/card:opacity-100 transition-all duration-500 delay-150 inline-flex items-center gap-2 text-sm font-bold text-white bg-white/20 backdrop-blur-md px-6 py-3 rounded-full hover:bg-white/30 border border-white/10 hover:border-white/30">
                View Details <ExternalLink size={16} />
              </div>
            )}
          </div>
        </div>

        {/* Top Layer: The White Card (Visible by default, 3D swings open on hover) */}
        <div className="absolute inset-0 bg-white z-10 p-8 flex flex-col items-center text-center transform origin-left transition-all duration-[800ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover/card:-rotate-y-[110deg] group-hover/card:opacity-0 [transform-style:preserve-3d]">
          {/* Custom Logo or Fallback Icon */}
          {p.logo ? (
            <div className="w-20 h-20 mb-6 flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.logo} alt={`${p.title} logo`} className="w-full h-full object-contain drop-shadow-sm rounded-2xl" />
            </div>
          ) : (
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 shadow-md bg-gradient-to-br ${p.gradient}`}>
              <p.icon size={28} className="text-white" />
            </div>
          )}

          <h3 className={`text-xl font-bold text-gray-800 tracking-wide mb-4 uppercase ${outfit.className}`}>
            {p.title}
          </h3>

          <p className="text-sm text-gray-400 leading-relaxed font-medium">
            {p.desc}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

interface PortfolioProps {
  hideViewAll?: boolean;
}

export default function Portfolio({ hideViewAll = false }: PortfolioProps) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  const displayProjects = hideViewAll ? filteredProjects : filteredProjects.slice(0, 6);

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden bg-[#fafafa]" id="portfolio">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#4A7FD3]/5 to-transparent" />
      <div className="absolute inset-0 opacity-[0.2]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #4A7FD3 1px, transparent 0)", backgroundSize: "40px 40px" }} />

      <div className="absolute inset-0 pointer-events-none">
        <svg className="absolute top-20 left-[8%] w-4 h-4 text-[#4A7FD3]/20 animate-float" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3 7 7 3-7 3-3 7-3-7-7-3 7-3z" />
        </svg>
        <svg className="absolute bottom-16 right-[10%] w-5 h-5 text-[#E83398]/20 animate-float" style={{ animationDelay: "3s" }} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3 7 7 3-7 3-3 7-3-7-7-3 7-3z" />
        </svg>
        <div className="absolute top-1/4 left-[10%] w-80 h-80 rounded-full bg-[#4A7FD3]/10 blur-[120px]" />
        <div className="absolute bottom-1/4 right-[10%] w-72 h-72 rounded-full bg-[#E83398]/10 blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <div className="inline-flex items-center justify-center space-x-2 bg-white/80 backdrop-blur-sm px-5 py-2.5 rounded-full shadow-sm mb-6 border border-pink-100/50">
              <Sparkles className="text-[#E83398]" size={18} />
              <span className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#4A7FD3] to-[#E83398] tracking-wider uppercase">Our Portfolio</span>
            </div>
            <h2 className={`text-4xl md:text-6xl font-black mb-6 tracking-tight ${outfit.className}`}>
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4A7FD3] to-[#E83398]">Projects</span>
            </h2>
            <p className="text-xl text-gray-600 font-medium leading-relaxed max-w-2xl text-center">
              Explore our collection of high-performance mobile games and premium digital applications.
            </p>
          </motion.div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-[#4A7FD3] text-white shadow-lg shadow-blue-500/30"
                  : "bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-600 border border-gray-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {displayProjects.map((p, i) => (
            <ProjectCard key={p.title} p={p} i={i} />
          ))}
        </div>

        {/* {!hideViewAll && (
          <div className="text-center mt-16">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 px-8 py-4 text-sm font-bold tracking-wide uppercase text-white bg-[#4A7FD3] rounded-xl hover:bg-[#3965b0] hover:shadow-[0_8px_25px_rgb(74,127,211,0.3)] hover:-translate-y-1 transition-all duration-300 group"
            >
              View All Projects
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>
        )} */}
      </div>
    </section>
  );
}
