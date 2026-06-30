"use client";

import { Search, ClipboardList, Code2, Rocket, Sparkles } from "lucide-react";

const steps = [
  {
    icon: Search,
    step: "01",
    title: "Discovery",
    description: "We learn about your business, goals, challenges, and audience to define the roadmap.",
  },
  {
    icon: ClipboardList,
    step: "02",
    title: "Strategy",
    description: "We craft a tailored plan with clear milestones, deliverables, and timelines.",
  },
  {
    icon: Code2,
    step: "03",
    title: "Build & Iterate",
    description: "Agile development with regular check-ins, transparent progress, and continuous feedback.",
  },
  {
    icon: Rocket,
    step: "04",
    title: "Launch",
    description: "Rigorous testing, deployment, and go-live support for a smooth, successful launch.",
  },
  {
    icon: Sparkles,
    step: "05",
    title: "Optimize & Grow",
    description: "Post-launch monitoring, optimization, and scaling to maximize long-term results.",
  },
];

export default function Process() {
  return (
    <section className="relative py-16 lg:py-24 bg-surface/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-primary text-sm font-medium mb-4">
            How We Work
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            Our{" "}
            <span className="text-primary">Process</span>
          </h2>
          <p className="mt-4 text-lg text-muted max-w-2xl mx-auto">
            A proven methodology that delivers results, every time.
          </p>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute top-16 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20" />

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-8">
            {steps.map((s) => (
              <div key={s.step} className="relative text-center group">
                <div className="relative z-10 w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center shadow-lg shadow-primary/20 mb-6 group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-primary/30 transition-all duration-300">
                  <s.icon size={26} className="text-white" />
                </div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 text-6xl font-black text-primary/[0.04] select-none -z-10">
                  {s.step}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{s.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
