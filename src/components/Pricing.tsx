"use client";

import { Check, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Starter",
    price: "$999",
    period: "/project",
    description: "Perfect for small businesses getting started with digital.",
    features: [
      "5-Page Website or Basic App",
      "Responsive Design",
      "Contact Form Integration",
      "Basic SEO Setup",
      "1 Revision Round",
      "2 Weeks Delivery",
    ],
    popular: false,
  },
  {
    name: "Growth",
    price: "$2,999",
    period: "/project",
    description: "Ideal for growing businesses needing a robust digital presence.",
    features: [
      "10-Page Website or Full App",
      "Custom UI/UX Design",
      "CMS Integration",
      "Advanced SEO & Analytics",
      "3 Revision Rounds",
      "API Integrations",
      "4 Weeks Delivery",
      "30 Days Support",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For large-scale projects with complex requirements.",
    features: [
      "Custom Web/App Platform",
      "Full UI/UX Strategy",
      "Scalable Architecture",
      "Third-Party Integrations",
      "Unlimited Revisions",
      "Dedicated Project Manager",
      "Priority Support",
      "Ongoing Maintenance",
    ],
    popular: false,
  },
];

export default function Pricing() {
  return (
    <section className="relative py-16 lg:py-24 bg-surface/30" id="pricing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-primary text-sm font-medium mb-4">
            Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            Transparent{" "}
            <span className="text-primary">Pricing</span>
          </h2>
          <p className="mt-4 text-lg text-muted max-w-2xl mx-auto">
            No hidden fees. No surprises. Just honest pricing for quality work.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                "relative p-6 lg:p-8 rounded-2xl border transition-all duration-300",
                plan.popular
                  ? "border-primary bg-white shadow-xl shadow-primary/10 scale-105"
                  : "border-border bg-white hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5"
              )}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-xs font-semibold text-white">
                  Most Popular
                </div>
              )}

              <div className="text-center">
                <h3 className="text-xl font-bold text-foreground mb-2">{plan.name}</h3>
                <p className="text-sm text-muted mb-6">{plan.description}</p>
                <div className="mb-6">
                  <span className="text-4xl font-extrabold text-foreground">{plan.price}</span>
                  <span className="text-muted text-sm">{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-muted">
                    <Check size={16} className="text-primary mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href="/contact"
                className={cn(
                  "flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold transition-all duration-300",
                  plan.popular
                    ? "bg-primary text-white hover:bg-primary-dark shadow-md"
                    : "border border-border text-foreground hover:border-primary/30 hover:text-primary"
                )}
              >
                Get Started <ArrowRight size={14} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
