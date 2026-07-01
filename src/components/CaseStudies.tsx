"use client";

import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const caseStudies = [
  {
    client: "Maven Lane",
    category: "Interior Design",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=800",
    logo: "MAVEN LANE",
    results: [
      { value: "$700K+", label: "Revenue in 6 months" },
      { value: "$641,826", label: "From automations" },
      { value: "88%", label: "Open rate on the new welcome series" },
      { value: "$52,930", label: "From a single Labor Day campaign" },
      { value: "Full lifecycle rebuild", label: "Structured, scalable retention system", isFullText: true },
    ],
  },
  {
    client: "Boie USA",
    category: "Personal Care",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=800",
    logo: "BOIE USA",
    results: [
      { value: "770%", label: "Holiday revenue growth" },
      { value: "650%", label: "YoY sales increase" },
      { value: "500%", label: "List growth (2K → 100K+)" },
    ],
  },
  {
    client: "VitaMedica",
    category: "Healthcare",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800",
    logo: "VitaMedica",
    results: [
      { value: "40%+", label: "Increase in open rates" },
      { value: "30%+", label: "Increase in click-through rates" },
      { value: "15%", label: "Drop in unsubscription rates" },
    ],
  },
  {
    client: "London",
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e08?auto=format&fit=crop&q=80&w=800",
    logo: "london",
    results: [
      { value: "140%", label: "Increase in revenue" },
      { value: "250K+", label: "Emails deployed monthly" },
      { value: "3x", label: "ROI on email marketing" },
    ],
  },
  {
    client: "RCJuice",
    category: "Hobby",
    image: "https://images.unsplash.com/photo-1594882645126-14020914d58d?auto=format&fit=crop&q=80&w=800",
    logo: "RCJuice",
    results: [
      { value: "Zero", label: "Complaints on broken links" },
      { value: "Sleek", label: "Responsive email designs" },
      { value: "100%", label: "Professional communications" },
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
              Let the results speak for themselves and discover how we can make a difference for your email marketing program. We cater to clients across 25 different industries, including eCommerce, travel and hospitality, healthcare, real estate, SaaS businesses, agencies, and more.
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
                      {r.isFullText ? (
                        <p className="text-gray-700">
                          <span className="font-semibold">{r.value}</span> → {r.label}
                        </p>
                      ) : (
                        <>
                          <span className="text-lg font-bold text-gray-900 shrink-0">{r.value}</span>
                          <span className="text-gray-600">{r.label}</span>
                        </>
                      )}
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
