"use client";

import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const caseStudies = [
  {
    client: "Nexora AI",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=800",
    logo: "NEXORA AI",
    results: [
      { value: "92", label: "Qualified Sales Meetings" },
      { value: "₹12.4Cr", label: "Qualified Pipeline" },
      { value: "14.8%", label: "Positive Reply Rate" },
    ],
  },
  {
    client: "StackRoot",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=800",
    logo: "STACKROOT",
    results: [
      { value: "118", label: "Executive Meetings" },
      { value: "₹19.8Cr", label: "Qualified Pipeline" },
      { value: "16.3%", label: "Positive Reply Rate" },
    ],
  },
  {
    client: "BlueMatrix",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800",
    logo: "BLUEMATRIX",
    results: [
      { value: "81", label: "Qualified Discovery Calls" },
      { value: "₹10.6Cr", label: "Qualified Pipeline" },
      { value: "12.9%", label: "Positive Reply Rate" },
    ],
  },
  {
    client: "PixelForge",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e08?auto=format&fit=crop&q=80&w=800",
    logo: "PIXELFORGE",
    results: [
      { value: "67", label: "Strategy Meetings" },
      { value: "₹8.1Cr", label: "Qualified Pipeline" },
      { value: "11.4%", label: "Positive Reply Rate" },
    ],
  },
  {
    client: "CloudNova",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1594882645126-14020914d58d?auto=format&fit=crop&q=80&w=800",
    logo: "CLOUDNOVA",
    results: [
      { value: "126", label: "Enterprise Meetings" },
      { value: "₹22.7Cr", label: "Qualified Pipeline" },
      { value: "17.1%", label: "Positive Reply Rate" },
    ],
  },
];

export default function CaseStudies() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const activeStudy = caseStudies[activeIndex];

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

  const next = () => {
    setActiveIndex((prev) => (prev + 1) % caseStudies.length);
    scrollToActive((activeIndex + 1) % caseStudies.length);
  };
  
  const prev = () => {
    setActiveIndex((prev) => (prev - 1 + caseStudies.length) % caseStudies.length);
    scrollToActive((activeIndex - 1 + caseStudies.length) % caseStudies.length);
  };

  const scrollToActive = (index: number) => {
    if (carouselRef.current) {
      const container = carouselRef.current;
      const card = container.children[index] as HTMLElement;
      if (card) {
        const scrollLeft = card.offsetLeft - (container.clientWidth / 2) + (card.clientWidth / 2);
        container.scrollTo({ left: scrollLeft, behavior: "smooth" });
      }
    }
  };

  const handleCardClick = (index: number) => {
    setActiveIndex(index);
    scrollToActive(index);
  };

  return (
    <section ref={sectionRef} className="relative py-20 lg:py-28 bg-white overflow-hidden" id="case-studies">
      {/* Background accents */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-30" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Section: Title/Desc on Left, Stats on Right */}
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-start transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          
          {/* Left Column: Heading */}
          <div className="max-w-xl">
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight mb-6">
              Case Studies
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              <span className="block text-gray-900 font-bold mb-3">Helping Technology Companies Build Predictable Revenue Pipelines</span>
              Explore how Tara Applications helps ambitious technology companies generate qualified opportunities, accelerate sales conversations, and build predictable client acquisition systems through strategic B2B lead generation.
            </p>
            
            <div className="flex items-center gap-4">
              <button 
                onClick={prev}
                className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:text-indigo-600 hover:border-indigo-600 transition-colors duration-300 focus:outline-none"
                aria-label="Previous case study"
              >
                <ArrowLeft size={20} />
              </button>
              <button 
                onClick={next}
                className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:text-indigo-600 hover:border-indigo-600 transition-colors duration-300 focus:outline-none"
                aria-label="Next case study"
              >
                <ArrowRight size={20} />
              </button>
            </div>

            <Link href="/contact" className="mt-10 inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-100/50 text-indigo-700 shadow-sm transition-all hover:shadow-md hover:-translate-y-1 group">
              <span className="font-semibold tracking-wide">Your Company Could Be Next.</span>
              <div className="bg-white p-1.5 rounded-full shadow-sm group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <ArrowUpRight size={16} />
              </div>
            </Link>
          </div>

          {/* Right Column: Dynamic Stats */}
          <div className="relative lg:pl-12 lg:border-l border-gray-200 min-h-[250px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStudy.client}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="space-y-6"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  {activeStudy.client} Client Results
                </h3>
                
                <div className="space-y-4">
                  {activeStudy.results.map((r, i) => (
                    <div key={i} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2">
                      <span className="text-lg font-bold text-gray-900 shrink-0">{r.value}</span>
                      <span className="text-gray-600">{r.label}</span>
                    </div>
                  ))}
                </div>

                {/* <div className="pt-4">
                  <Link
                    href={`/case-studies/${activeStudy.client.toLowerCase().replace(/\s+/g, '-')}`}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-sky-500 hover:text-sky-600 transition-colors group"
                  >
                    Visit Case Study
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
                  </Link>
                </div> */}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>


        
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}} />
    </section>
  );
}
