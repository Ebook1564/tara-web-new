"use client";

import {
  Globe,
  Smartphone,
  Gamepad2,
  Mail,
  Users,
  Palette,
  Search,
  BarChart3,
  ArrowRight,
} from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Web Development",
    description: "Full-stack web solutions from front-end to back-end, API integration, database management.",
    color: "from-blue-600 to-blue-700",
    lightBg: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    icon: Smartphone,
    title: "App Development",
    description: "Native Android & iOS apps with user-centric design, robust architecture, and scalable backend.",
    color: "from-purple-600 to-purple-700",
    lightBg: "bg-purple-50",
    iconColor: "text-purple-600",
  },
  {
    icon: Gamepad2,
    title: "Game Development",
    description: "Custom game development from concept to launch — 2D, 3D, and multiplayer experiences.",
    color: "from-orange-500 to-orange-600",
    lightBg: "bg-orange-50",
    iconColor: "text-orange-600",
  },
  {
    icon: Mail,
    title: "Email Marketing",
    description: "Strategy, automation, templates, and campaigns that drive engagement and ROI.",
    color: "from-emerald-600 to-emerald-700",
    lightBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
  {
    icon: Users,
    title: "B2B Lead Generation",
    description: "Targeted lead generation campaigns that fill your pipeline with qualified prospects.",
    color: "from-indigo-600 to-indigo-700",
    lightBg: "bg-indigo-50",
    iconColor: "text-indigo-600",
  },
  {
    icon: Palette,
    title: "NFT Design",
    description: "End-to-end NFT creation — art, smart contracts, minting, and marketplace deployment.",
    color: "from-pink-500 to-pink-600",
    lightBg: "bg-pink-50",
    iconColor: "text-pink-600",
  },
  {
    icon: Search,
    title: "App Store Optimization",
    description: "Boost visibility and downloads with keyword-optimized listings, visuals, and reviews.",
    color: "from-amber-500 to-amber-600",
    lightBg: "bg-amber-50",
    iconColor: "text-amber-600",
  },
  {
    icon: BarChart3,
    title: "Digital Strategy",
    description: "Data-driven marketing strategies, growth consulting, and performance optimization.",
    color: "from-teal-500 to-teal-600",
    lightBg: "bg-teal-50",
    iconColor: "text-teal-600",
  },
];

export default function Services() {
  return (
    <section className="relative py-16 lg:py-24" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-primary text-sm font-medium mb-4">
            Our Expertise
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            Comprehensive{" "}
            <span className="text-primary">Digital Services</span>
          </h2>
          <p className="mt-4 text-lg text-muted max-w-2xl mx-auto">
            Everything you need to build, launch, and grow your digital presence — under one roof.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <a
              key={service.title}
              href="#"
              className="group relative p-6 rounded-2xl bg-white border border-border hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
            >
              <div className={`w-12 h-12 rounded-xl ${service.lightBg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                <service.icon size={22} className={service.iconColor} />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              <p className="text-sm text-muted leading-relaxed">{service.description}</p>
              <div className="mt-4 flex items-center gap-1 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                Learn More <ArrowRight size={14} />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
