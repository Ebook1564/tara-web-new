"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Outfit } from "next/font/google";

const outfit = Outfit({ subsets: ["latin"] });

const steps = [
  {
    id: "omni",
    title: "Omnichannel engagement",
    desc: "We develop a comprehensive plan that combines email, LinkedIn, and cold calling to reach your prospects at the right time and in the right place.",
    type: "agency"
  },
  {
    id: "activation",
    title: "Activation",
    desc: "We identify and engage active buyers showing high intent, nurturing them until they are ready to talk.",
    type: "agency"
  },
  {
    id: "conversion",
    title: "Conversion",
    desc: "We seamlessly transition warm prospects into scheduled meetings directly on your sales team's calendar.",
    type: "agency"
  },
  {
    id: "closure",
    title: "Deal closure",
    desc: "Your team takes over the qualified meetings to do what they do best: pitch, negotiate, and close the deals.",
    type: "client"
  }
];

export default function LeadGenFunnel() {
  const [activeStep, setActiveStep] = useState("omni");

  return (
    <section className="bg-[#1a1a1a] py-24 px-4 sm:px-6 lg:px-8 overflow-hidden rounded-[2rem] mx-4 sm:mx-8 my-12 shadow-2xl">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <h2 className={`text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight ${outfit.className}`}>
            How your pipeline will<br />look with Tara
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Focus on scaling your business while we deliver you<br />sales-ready B2B leads.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-8 items-start">
          
          {/* Left Side: Journey Steps */}
          <div className="space-y-10">
            <div>
              <p className="text-gray-400 text-sm font-medium mb-4 ml-2">We take care of the entire user journey</p>
              <div className="space-y-3 p-4 rounded-3xl border border-white/5 bg-white/[0.02]">
                {steps.filter(s => s.type === "agency").map((step) => (
                  <div
                    key={step.id}
                    onMouseEnter={() => setActiveStep(step.id)}
                    className={`cursor-pointer rounded-2xl transition-all duration-300 overflow-hidden ${
                      activeStep === step.id ? "bg-white/10" : "bg-white/5 hover:bg-white/10"
                    }`}
                  >
                    <div className="flex items-center justify-between p-5">
                      <h3 className="text-white font-semibold text-lg">{step.title}</h3>
                      <ChevronRight className={`transition-transform duration-300 ${activeStep === step.id ? "text-[#4A7FD3]" : "text-gray-600"}`} size={20} />
                    </div>
                    
                    <div className={`px-5 overflow-hidden transition-all duration-500 ease-in-out ${activeStep === step.id ? "max-h-40 pb-5 opacity-100" : "max-h-0 opacity-0"}`}>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-gray-400 text-sm font-medium mb-4 ml-2">Your part in the process</p>
              <div className="p-4 rounded-3xl border border-white/5 bg-white/[0.02]">
                {steps.filter(s => s.type === "client").map((step) => (
                  <div
                    key={step.id}
                    onMouseEnter={() => setActiveStep(step.id)}
                    className={`cursor-pointer rounded-2xl transition-all duration-300 overflow-hidden ${
                      activeStep === step.id ? "bg-white/10" : "bg-white/5 hover:bg-white/10"
                    }`}
                  >
                    <div className="flex items-center justify-between p-5">
                      <h3 className="text-white font-semibold text-lg">{step.title}</h3>
                      <ChevronRight className={`transition-transform duration-300 ${activeStep === step.id ? "text-[#4A7FD3]" : "text-gray-600"}`} size={20} />
                    </div>
                    
                    <div className={`px-5 overflow-hidden transition-all duration-500 ease-in-out ${activeStep === step.id ? "max-h-40 pb-5 opacity-100" : "max-h-0 opacity-0"}`}>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side: Funnel */}
          <div className="relative flex flex-col items-center pt-8">
            <p className="text-gray-500 text-xs text-center mb-8 max-w-[200px]">
              * Average yearly outcomes.<br/>The results depend on multiple factors.
            </p>

            <div className="w-full max-w-md space-y-2 flex flex-col items-center perspective-1000">
              
              {/* Level 1: Leads */}
              <div className="w-full flex flex-col items-center">
                <span className="text-gray-400 text-xs font-semibold mb-2 tracking-widest uppercase">Leads</span>
                <div 
                  className={`w-full bg-gradient-to-r from-[#4A7FD3] to-[#E83398] py-8 px-6 rounded-2xl flex items-center justify-center text-center transition-all duration-500 transform ${activeStep === 'omni' ? 'scale-105 shadow-[0_0_40px_rgba(74,127,211,0.4)] z-10' : 'scale-100 opacity-90'}`}
                  style={{ clipPath: "polygon(0 0, 100% 0, 95% 100%, 5% 100%)" }}
                >
                  <span className="text-white font-bold text-lg">Up to 18,000* prospects<br/>within your client profile</span>
                </div>
              </div>

              {/* Level 2: MQLs */}
              <div className="w-[90%] flex flex-col items-center pt-2">
                <span className="text-gray-400 text-xs font-semibold mb-2 tracking-widest uppercase">MQLs</span>
                <div 
                  className={`w-full bg-[#2a2a2a] py-6 px-6 rounded-2xl flex items-center justify-center text-center transition-all duration-500 transform ${activeStep === 'activation' ? 'scale-105 bg-[#333] shadow-xl z-10 border border-white/10' : 'scale-100'}`}
                  style={{ clipPath: "polygon(0 0, 100% 0, 93% 100%, 7% 100%)" }}
                >
                  <span className="text-white font-bold text-base">Up to 9,000*<br/>marketing-qualified leads</span>
                </div>
              </div>

              {/* Level 3: SQLs */}
              <div className="w-[80%] flex flex-col items-center pt-2">
                <span className="text-gray-400 text-xs font-semibold mb-2 tracking-widest uppercase">SQLs</span>
                <div 
                  className={`w-full bg-[#2a2a2a] py-5 px-6 rounded-2xl flex items-center justify-center text-center transition-all duration-500 transform ${activeStep === 'conversion' ? 'scale-105 bg-[#333] shadow-xl z-10 border border-white/10' : 'scale-100'}`}
                  style={{ clipPath: "polygon(0 0, 100% 0, 90% 100%, 10% 100%)" }}
                >
                  <span className="text-white font-bold text-sm">200* sales-qualified meetings<br/>with decision-makers</span>
                </div>
              </div>

              {/* Level 4: Closed Deals */}
              <div className="w-[65%] flex flex-col items-center pt-2">
                <span className="text-gray-400 text-xs font-semibold mb-2 tracking-widest uppercase">Opportunities</span>
                <div 
                  className={`w-full bg-[#2a2a2a] py-4 px-6 rounded-2xl flex items-center justify-center text-center transition-all duration-500 transform ${activeStep === 'closure' ? 'scale-105 bg-[#333] shadow-xl z-10 border border-[#4A7FD3]/50' : 'scale-100'}`}
                  style={{ clipPath: "polygon(0 0, 100% 0, 85% 100%, 15% 100%)" }}
                >
                  <span className="text-white font-bold text-sm">10-30* closed deals</span>
                </div>
              </div>

            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
