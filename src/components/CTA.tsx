"use client";

import { ArrowRight, Send, Mail, Rocket } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Outfit } from "next/font/google";

const outfit = Outfit({ subsets: ["latin"] });

export default function CTA() {
  return (
    <section className="relative py-24 lg:py-32 bg-[#050505] overflow-hidden" id="cta">
      {/* Dynamic Glow Backgrounds */}
      <div className="absolute inset-0">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-purple-600/20 blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/20 blur-[120px] mix-blend-screen" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative rounded-[2.5rem] p-8 sm:p-12 lg:p-16 border border-white/10 bg-[#0c0c0e]/80 backdrop-blur-2xl shadow-2xl overflow-hidden group"
        >
          {/* Animated gradient ring on hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-blue-500/10 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 -translate-x-full group-hover:translate-x-full" />

          <div className="relative z-10 flex flex-col items-center text-center">

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-white/10 flex items-center justify-center mb-8 text-white shadow-[0_0_30px_rgba(168,85,247,0.2)]"
            >
              <Rocket size={32} className="text-purple-400" />
            </motion.div>

            <h2 className={`text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6 leading-tight ${outfit.className}`}>
              Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Scale</span> Your Business?
            </h2>

            <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              Whether you need a cutting-edge platform built or a pipeline filled with high-intent qualified leads, we have the expertise to make it happen.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full sm:w-auto">
              <Link
                href="/contact"
                className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 text-base font-bold text-white bg-gradient-to-r from-purple-600 to-blue-600 rounded-full transition-all duration-300 shadow-[0_0_40px_rgba(147,51,234,0.3)] hover:shadow-[0_0_60px_rgba(147,51,234,0.5)] hover:-translate-y-1 overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                <span className="relative z-10 flex items-center gap-2">
                  <Send size={18} />
                  Get in Touch
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </Link>

              <a
                href="mailto:contact@taraapplications.com"
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 text-base font-bold text-gray-300 bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white rounded-full transition-all duration-300 backdrop-blur-md"
              >
                <Mail size={18} className="group-hover:scale-110 transition-transform duration-300 text-blue-400" />
                contact@taraapplications.com
              </a>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
