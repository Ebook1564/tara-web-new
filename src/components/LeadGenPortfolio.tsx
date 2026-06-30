"use client";

import { motion } from "framer-motion";
import { Outfit } from "next/font/google";
import { TrendingUp, Users, Target, Building2, CheckCircle2 } from "lucide-react";

const outfit = Outfit({ subsets: ["latin"] });

const caseStudies = [
  {
    client: "Enterprise SaaS Platform",
    industry: "B2B Software",
    metric1: "$2.4M",
    metric1Label: "Pipeline Generated",
    metric2: "85",
    metric2Label: "Qualified Meetings",
    description: "Built a multi-channel outbound engine targeting VP-level executives in the US and UK, resulting in a massive increase in sales qualified leads within 90 days.",
    color: "from-blue-500 to-indigo-600",
    bgLight: "bg-blue-50",
    borderLight: "border-blue-100",
    textDark: "text-blue-700"
  },
  {
    client: "Global IT Consultancy",
    industry: "IT Services",
    metric1: "310%",
    metric1Label: "ROI in 6 Months",
    metric2: "42",
    metric2Label: "Closed Deals",
    description: "Leveraged AI-driven intent data and hyper-personalized LinkedIn outreach to connect with decision-makers actively looking for cloud migration services.",
    color: "from-purple-500 to-pink-600",
    bgLight: "bg-purple-50",
    borderLight: "border-purple-100",
    textDark: "text-purple-700"
  }
];

export default function LeadGenPortfolio() {
  return (
    <section className="relative py-24 lg:py-32 bg-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-white pointer-events-none" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <div className="inline-flex items-center justify-center space-x-2 bg-purple-50 px-5 py-2.5 rounded-full shadow-sm mb-6 border border-purple-100">
              <TrendingUp className="text-purple-600" size={18} />
              <span className="text-sm font-bold text-purple-700 tracking-wider uppercase">B2B Lead Generation</span>
            </div>
            <h2 className={`text-4xl md:text-5xl font-black mb-6 tracking-tight text-gray-900 ${outfit.className}`}>
              Campaign <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Case Studies</span>
            </h2>
            <p className="text-xl text-gray-500 font-medium leading-relaxed max-w-2xl text-center">
              Real results from our cold outreach and data-driven pipeline growth campaigns.
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {caseStudies.map((study, i) => (
            <motion.div
              key={study.client}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="group relative p-8 sm:p-10 rounded-[2rem] bg-white border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
            >
              {/* Background Accent */}
              <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${study.color} opacity-0 group-hover:opacity-5 blur-[50px] transition-opacity duration-500 rounded-full`} />
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className={`px-4 py-1.5 rounded-full ${study.bgLight} ${study.borderLight} border ${study.textDark} text-xs font-bold uppercase tracking-wider`}>
                    {study.industry}
                  </div>
                </div>
                
                <h3 className={`text-2xl sm:text-3xl font-extrabold text-gray-900 mb-4 ${outfit.className}`}>
                  {study.client}
                </h3>
                
                <p className="text-gray-600 leading-relaxed mb-8">
                  {study.description}
                </p>

                <div className="grid grid-cols-2 gap-6 pt-6 border-t border-gray-100">
                  <div>
                    <div className={`text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br ${study.color} mb-1 ${outfit.className}`}>
                      {study.metric1}
                    </div>
                    <div className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                      {study.metric1Label}
                    </div>
                  </div>
                  <div>
                    <div className={`text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br ${study.color} mb-1 ${outfit.className}`}>
                      {study.metric2}
                    </div>
                    <div className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                      {study.metric2Label}
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
