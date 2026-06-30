"use client";

import { Search, Users, Target, Phone, TrendingUp, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Outfit } from "next/font/google";
const outfit = Outfit({ subsets: ["latin"] });

const steps = [
  { icon: Search, step: "01", title: "Discovery & ICP", desc: "We deeply analyze your ideal customer profile, target industries, and decision-maker personas to ensure laser-focused targeting.", accent: "from-emerald-400 to-teal-500", textAccent: "text-emerald-500", bgAccent: "bg-emerald-50" },
  { icon: Users, step: "02", title: "Data Enrichment", desc: "We build high-quality, verified prospect lists using enterprise tools like ZoomInfo, Apollo, and LinkedIn Sales Navigator.", accent: "from-blue-400 to-indigo-500", textAccent: "text-blue-500", bgAccent: "bg-blue-50" },
  { icon: Target, step: "03", title: "Omnichannel Outreach", desc: "Personalized email, LinkedIn, and cold calling sequences expertly designed to cut through the noise and start conversations.", accent: "from-purple-400 to-fuchsia-500", textAccent: "text-purple-500", bgAccent: "bg-purple-50" },
  { icon: Phone, step: "04", title: "Rigorous Qualification", desc: "Every lead is vetted. We confirm budget, authority, timeline, and need before they ever reach your sales team.", accent: "from-rose-400 to-pink-500", textAccent: "text-rose-500", bgAccent: "bg-rose-50" },
  { icon: TrendingUp, step: "05", title: "Seamless Handoff", desc: "Qualified, high-intent meetings are booked directly on your calendar with full context and background information.", accent: "from-amber-400 to-orange-500", textAccent: "text-amber-500", bgAccent: "bg-amber-50" },
  { icon: Sparkles, step: "06", title: "Optimize & Scale", desc: "We continuously measure conversion data, A/B test messaging, refine targeting, and aggressively scale what works.", accent: "from-sky-400 to-cyan-500", textAccent: "text-sky-500", bgAccent: "bg-sky-50" },
];

function StepCard({ icon: Icon, step, title, desc, accent, textAccent, bgAccent, index }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="relative group p-8 rounded-[2rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-500 overflow-hidden"
    >
      {/* Huge Background Number */}
      <div className="absolute -right-4 -bottom-10 text-[180px] font-black text-white/[0.03] group-hover:text-white/[0.06] transition-colors duration-500 pointer-events-none select-none z-0">
        {step}
      </div>

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-center justify-between mb-8">
          <div className={`w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 group-hover:border-[#4A7FD3]/30 group-hover:bg-[#4A7FD3]/10`}>
            <Icon size={24} className="text-[#4A7FD3]" />
          </div>
          <span className="text-sm font-bold text-gray-500 group-hover:text-gray-300 transition-colors">STEP {step}</span>
        </div>
        
        <h3 className={`text-2xl font-bold text-white mb-4 group-hover:text-[#4A7FD3] transition-colors ${outfit.className}`}>{title}</h3>
        <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors flex-grow">{desc}</p>
        
        <div className="mt-8 pt-6 border-t border-white/10 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
          <div className={`h-1 w-full rounded-full bg-gradient-to-r ${accent}`} />
        </div>
      </div>
    </motion.div>
  );
}

export default function LeadGenProcess() {
  return (
    <section className="relative py-24 lg:py-32 bg-[#0B1120] overflow-hidden" id="lead-process">
      
      {/* Abstract Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-[#4A7FD3]/20 to-transparent" />
        <div className="absolute top-[20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#4A7FD3]/15 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#E83398]/10 blur-[120px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#4A7FD3]/10 border border-[#4A7FD3]/20 text-[#4A7FD3] text-sm font-semibold mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-[#4A7FD3] animate-pulse" />
            Our Methodology
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className={`text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-6 ${outfit.className}`}
          >
            How We Deliver <span className="text-[#4A7FD3]">Results</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-400 leading-relaxed"
          >
            A repeatable, data-driven system engineered to convert strangers into high-value opportunities.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((s, i) => (
            <StepCard key={s.step} {...s} index={i} />
          ))}
        </div>
        
      </div>
    </section>
  );
}
