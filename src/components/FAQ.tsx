"use client";

import { useState } from "react";
import { Plus, Search, MessageCircle, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Outfit } from "next/font/google";
import Link from "next/link";

const outfit = Outfit({ subsets: ["latin"] });

const faqs = [
  {
    category: "Development",
    q: "What kind of games and apps do you develop?",
    a: "We specialize in high-performance 2D/3D games (Unity, HTML5) and premium cross-platform mobile apps for iOS and Android. From hyper-casual games to complex SaaS dashboards, we build it all.",
  },
  {
    category: "Development",
    q: "Do you handle App Store Optimization (ASO) and publishing?",
    a: "Yes! We handle the entire lifecycle. From development and rigorous testing to App Store Optimization (ASO) and global publishing on both Google Play and the Apple App Store.",
  },
  {
    category: "Pricing",
    q: "How much does a game or app project cost?",
    a: "Simple mobile apps start at $2,999, while full 3D games and complex platforms are custom quoted based on features. We provide clear, transparent estimates during our free discovery call.",
  },
  {
    category: "Process",
    q: "How long does it take to launch a project?",
    a: "A typical hyper-casual game or simple utility app takes 4-8 weeks. Larger, feature-rich apps and complex multiplayer games can take 3-6 months depending on the scope of work.",
  },
  {
    category: "Development",
    q: "Can you integrate ads and in-app purchases?",
    a: "Absolutely. We expertly integrate major ad networks (AdMob, Unity Ads, AppLovin) and secure in-app purchase (IAP) systems to maximize your revenue and ensure a smooth user experience.",
  },
  {
    category: "Marketing",
    q: "What is B2B Lead Generation and how does it work?",
    a: "Our B2B Lead Generation services involve targeted email outreach, LinkedIn networking, and multi-channel campaigns to connect you with highly qualified prospects tailored to your business needs.",
  },
  {
    category: "Marketing",
    q: "Can you help improve our existing email campaigns?",
    a: "Yes, we offer comprehensive email marketing audits. We optimize your funnels, design stunning templates, and improve open and click-through rates significantly.",
  },
];

const categories = ["All", "Development", "Marketing", "Pricing", "Process"];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = activeCategory === "All" || faq.category === activeCategory;
    const matchesSearch = faq.q.toLowerCase().includes(searchQuery.toLowerCase()) || faq.a.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden bg-[#FAFAFA]" id="faq">
      <div className="absolute inset-0 bg-gradient-to-b from-[#4A7FD3]/5 to-transparent" />
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #E83398 1px, transparent 0)", backgroundSize: "40px 40px" }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <div className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-white border border-gray-200 shadow-sm mb-6">
              <span className="w-2 h-2 rounded-full bg-[#E83398] animate-pulse" />
              <span className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#4A7FD3] to-[#E83398] tracking-wider uppercase">
                Got Questions?
              </span>
            </div>
            <h2 className={`text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 tracking-tight leading-[1.1] mb-6 ${outfit.className}`}>
              Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4A7FD3] to-[#E83398]">Questions</span>
            </h2>
            <p className="text-xl text-gray-500 font-medium max-w-2xl mx-auto">
              Everything you need to know about building your next big app or game with us.
            </p>
          </motion.div>
        </div>

        {/* Interactive Filters & Search */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            {/* Category Pills */}
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => { setActiveCategory(cat); setOpenIndex(null); }}
                  className={cn(
                    "px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300",
                    activeCategory === cat
                      ? "bg-gray-900 text-white shadow-lg shadow-gray-900/20 scale-105"
                      : "bg-white text-gray-600 border border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Bar */}
            <div className="relative w-full md:w-72">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search FAQs..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setOpenIndex(null); }}
                className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#4A7FD3] focus:border-transparent transition-all shadow-sm placeholder:text-gray-400"
              />
            </div>
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-4">
            <AnimatePresence mode="popLayout">
              {filteredFaqs.length > 0 ? (
                filteredFaqs.map((faq, i) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    key={faq.q}
                    className={cn(
                      "rounded-2xl border transition-all duration-300 overflow-hidden",
                      openIndex === i
                        ? "border-[#4A7FD3]/30 bg-white shadow-xl shadow-[#4A7FD3]/10"
                        : "border-gray-200 bg-white hover:border-[#4A7FD3]/30 hover:shadow-md"
                    )}
                  >
                    <button
                      onClick={() => setOpenIndex(openIndex === i ? null : i)}
                      className="flex items-center justify-between w-full p-6 text-left cursor-pointer group outline-none focus:ring-2 focus:ring-[#E83398]/20"
                    >
                      <span className={`text-lg font-bold transition-colors pr-8 ${openIndex === i ? 'text-gray-900' : 'text-gray-700 group-hover:text-gray-900'}`}>
                        {faq.q}
                      </span>
                      <div
                        className={cn(
                          "shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500",
                          openIndex === i
                            ? "bg-gradient-to-br from-[#4A7FD3] to-[#E83398] text-white rotate-45 shadow-md"
                            : "bg-gray-50 text-gray-400 group-hover:bg-gray-100 group-hover:text-[#E83398]"
                        )}
                      >
                        <Plus size={20} strokeWidth={2.5} />
                      </div>
                    </button>
                    
                    <AnimatePresence initial={false}>
                      {openIndex === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                          <div className="px-6 pb-6 pt-0">
                            <div className="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded-full mb-3 uppercase tracking-wider">
                              {faq.category}
                            </div>
                            <p className="text-gray-600 leading-relaxed text-base font-medium">
                              {faq.a}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  className="text-center py-12 bg-white rounded-2xl border border-gray-200"
                >
                  <p className="text-gray-500 font-medium">No results found for "{searchQuery}"</p>
                  <button 
                    onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}
                    className="mt-4 text-[#4A7FD3] font-bold hover:underline"
                  >
                    Clear search
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Support Widget */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 bg-gradient-to-br from-gray-900 to-black rounded-3xl p-8 text-white shadow-2xl overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#E83398]/30 to-[#4A7FD3]/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              
              <div className="relative z-10">
                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm border border-white/20">
                  <MessageCircle size={28} className="text-[#4A7FD3]" />
                </div>
                
                <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
                <p className="text-gray-400 mb-8 leading-relaxed">
                  Can't find the answer you're looking for? Our team is available to help you with any questions.
                </p>
                
                <Link 
                  href="/contact"
                  className="flex items-center justify-between w-full p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors group/btn"
                >
                  <span className="font-bold">Contact Support</span>
                  <ArrowRight size={18} className="text-[#E83398] group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
