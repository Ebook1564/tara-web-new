"use client";

import { Users, Target, TrendingUp, Building2, Phone, Mail as MailIcon, BarChart3, ArrowRight, CheckCircle, Sparkles, Award, Brain } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Outfit } from "next/font/google";
const outfit = Outfit({ subsets: ["latin"] });

const channels = [
  { icon: MailIcon, title: "Email Outreach", desc: "Hyper-personalized sequences targeting key decision-makers at scale.", gradient: "from-[#4A7FD3] to-[#E83398]" },
  { icon: Phone, title: "Cold Calling", desc: "Elite SDRs trained to navigate gatekeepers and book qualified meetings.", gradient: "from-[#4A7FD3] to-[#E83398]" },
  { icon: Building2, title: "LinkedIn Outreach", desc: "Strategic connection campaigns, profile optimization, and InMail.", gradient: "from-[#4A7FD3] to-[#E83398]" },
  { icon: BarChart3, title: "Paid Ads", desc: "Laser-targeted LinkedIn, Meta Ads & Google Ads to capture high-intent buyers.", gradient: "from-[#4A7FD3] to-[#E83398]" },
  { icon: Target, title: "Lead Scoring", desc: "AI-driven intent scoring to prioritize your hottest prospects.", gradient: "from-[#4A7FD3] to-[#E83398]" },
  { icon: TrendingUp, title: "CRM Integration", desc: "Flawless sync with Salesforce, HubSpot, and your favorite tools.", gradient: "from-[#4A7FD3] to-[#E83398]" },
];

function AnimatedStat({ value, label, icon: Icon, delay }: { value: string; label: string; icon: any; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay }}
      className="relative group p-6 rounded-2xl bg-white border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#4A7FD3]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="w-12 h-12 rounded-full bg-[#4A7FD3]/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300 group-hover:bg-[#E83398]/10">
          <Icon size={20} className="text-[#4A7FD3] group-hover:text-[#E83398] transition-colors duration-300" />
        </div>
        <div className={`text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-1 ${outfit.className}`}>{value}</div>
        <div className="text-sm font-medium text-gray-500 uppercase tracking-wider">{label}</div>
      </div>
    </motion.div>
  );
}

function ChannelCard({ icon: Icon, title, desc, gradient, index }: { icon: any; title: string; desc: string; gradient: string; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="group relative p-8 rounded-3xl bg-white border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden"
    >
      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 blur-[40px] transition-opacity duration-500`} />

      <div className="relative z-10">
        <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 group-hover:bg-[#E83398]/10 group-hover:border-[#E83398]/20">
          <Icon size={24} className="text-[#4A7FD3] group-hover:text-[#E83398] transition-colors duration-300" />
        </div>
        <h4 className={`text-xl font-bold text-gray-900 mb-3 group-hover:text-[#4A7FD3] transition-colors duration-300 ${outfit.className}`}>{title}</h4>
        <p className="text-gray-600 leading-relaxed text-sm">{desc}</p>
      </div>
    </motion.div>
  );
}

export default function LeadGenServices() {
  return (
    <section className="relative py-24 lg:py-32 bg-[#F8FAFC] overflow-hidden" id="lead-gen">
      {/* Dynamic Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#4A7FD3]/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[#E83398]/10 blur-[120px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-20 lg:mb-28">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-[#4A7FD3] text-sm font-semibold mb-6"
          >
            <Sparkles size={16} className="text-blue-500" />
            High-Impact Growth Engine
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className={`text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight mb-6 ${outfit.className}`}
          >
            B2B Lead <span className="text-[#4A7FD3]">Generation</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 leading-relaxed"
          >
            Stop chasing unqualified prospects. We build multi-channel engines that fill your pipeline with decision-makers who are ready to buy.
          </motion.p>
        </div>

        {/* Results / Value Prop Split */}
        <div className="grid lg:grid-cols-12 gap-12 items-center mb-28">

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 space-y-8"
          >
            <h3 className={`text-3xl font-extrabold text-gray-900 leading-tight ${outfit.className}`}>
              Build pipeline that actually <span className="italic text-[#4A7FD3]">converts.</span>
            </h3>
            <p className="text-lg text-gray-600 leading-relaxed">
              We blend AI automation and experienced outbound specialists to identify the right buyers, personalize every touchpoint and consistently deliver qualified opportunities. 5M+ leads generated, 10+ years of experience. Our campaigns are built to deliver 3X pipeline growth, not more emails.
            </p>

            <ul className="space-y-4">
              {[
                "AI driven prospect research with human quality control",
                "Multi-channel outbound campaigns that book qualified meetings",
                "5M+ B2B leads generated across SaaS, IT & Professional Services",
                "Proven framework that drives 3X+ pipeline growth",
              ].map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + (i * 0.1) }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle size={24} className="text-[#4A7FD3] shrink-0" />
                  <span className="text-gray-700 font-medium text-lg">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <div className="lg:col-span-7 grid grid-cols-2 gap-4 sm:gap-6">
            <AnimatedStat value="5M+" label="Leads Generated" icon={Users} delay={0.2} />
            <AnimatedStat value="10+" label="Years of Experience" icon={Award} delay={0.3} />
            <AnimatedStat value="3X" label="Pipeline Growth" icon={TrendingUp} delay={0.4} />
            <AnimatedStat value="AI + Human" label="Prospecting Engine" icon={Brain} delay={0.5} />
          </div>
        </div>

        {/* Channels Grid */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h3 className={`text-3xl font-extrabold text-gray-900 ${outfit.className}`}>Our Arsenal</h3>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">We deploy a synchronized attack across the most effective B2B channels.</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {channels.map((ch, i) => (
              <ChannelCard key={ch.title} icon={ch.icon} title={ch.title} desc={ch.desc} gradient={ch.gradient} index={i} />
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center relative z-20"
        >
          <div className="absolute inset-0 bg-[#4A7FD3]/10 blur-[100px] rounded-full pointer-events-none" />
          <Link
            href="/contact"
            className="relative inline-flex items-center gap-3 px-10 py-5 text-lg font-bold text-white bg-[#4A7FD3] hover:bg-[#3965b0] rounded-full transition-all duration-300 group shadow-xl shadow-blue-500/20 hover:shadow-2xl hover:-translate-y-1"
          >
            Start Filling Your Pipeline
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
