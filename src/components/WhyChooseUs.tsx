"use client";

import { Lightbulb, Code, Rocket, BarChart3, Headphones, Handshake } from "lucide-react";

const reasons = [
  {
    icon: Lightbulb,
    title: "Strategic Thinking",
    description: "We don't just code — we strategize. Every solution is built around your business goals.",
  },
  {
    icon: Code,
    title: "Full-Stack Expertise",
    description: "From front-end to back-end, mobile to web, we have the technical depth to deliver end-to-end.",
  },
  {
    icon: Rocket,
    title: "Agile Delivery",
    description: "No red tape. We move fast with agile processes, delivering value in weeks, not months.",
  },
  {
    icon: BarChart3,
    title: "Data-Driven",
    description: "Every decision backed by data. We measure, optimize, and iterate for maximum impact.",
  },
  {
    icon: Headphones,
    title: "Dedicated Support",
    description: "Your dedicated team becomes an extension of your company, available when you need them.",
  },
  {
    icon: Handshake,
    title: "Long-Term Partnership",
    description: "3+ years average client relationship — we're invested in your long-term success.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="relative py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-primary text-sm font-medium mb-4">
            Why Choose Us
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            What Sets Us{" "}
            <span className="text-primary">Apart</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason) => (
            <div
              key={reason.title}
              className="group p-6 rounded-2xl bg-white border border-border hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center mb-5 group-hover:bg-primary/10 transition-colors duration-300">
                <reason.icon size={22} className="text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-3">{reason.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
