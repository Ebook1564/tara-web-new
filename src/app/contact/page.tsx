"use client";

import { useState } from "react";
import { Send, Mail, MapPin, Phone, Check } from "lucide-react";
import PageHero from "@/components/PageHero";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <PageHero
        title={<>Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Talk</span></>}
        description="Ready to start your project? Fill out the form and we'll get back to you within 24 hours."
        badgeText="GET IN TOUCH"
      />
      <section className="relative pb-20 pt-10">
        <div className="absolute inset-0 bg-gradient-to-b from-surface via-white to-surface/50" />
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/5 rounded-full blur-[128px]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Form */}
            <div className="p-8 rounded-2xl border border-border bg-white shadow-sm">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-6">
                    <Check size={28} className="text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">Thank You!</h3>
                  <p className="text-muted">We&apos;ll review your message and get back to you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 rounded-xl bg-surface border border-border text-foreground placeholder:text-muted/50 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30 transition-all"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                      <input
                        type="email"
                        required
                        className="w-full px-4 py-3 rounded-xl bg-surface border border-border text-foreground placeholder:text-muted/50 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30 transition-all"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Company</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-xl bg-surface border border-border text-foreground placeholder:text-muted/50 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30 transition-all"
                      placeholder="Your Company"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Service Needed</label>
                    <select className="w-full px-4 py-3 rounded-xl bg-surface border border-border text-muted focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30 transition-all">
                      <option>Select a service</option>
                      <option>Web Development</option>
                      <option>App Development</option>
                      <option>Game Development</option>
                      <option>Email Marketing</option>
                      <option>B2B Lead Generation</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Message</label>
                    <textarea
                      rows={4}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-surface border border-border text-foreground placeholder:text-muted/50 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30 transition-all resize-none"
                      placeholder="Tell us about your project..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold text-white bg-primary hover:bg-primary-dark rounded-xl shadow-md hover:shadow-lg hover:shadow-primary/20 transition-all duration-300"
                  >
                    <Send size={16} />
                    Send Message
                  </button>
                </form>
              )}
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <div className="p-6 rounded-2xl border border-border bg-white shadow-sm">
                <h3 className="text-lg font-semibold text-foreground mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <a
                    href="mailto:contact@taraapplications.com"
                    className="flex items-center gap-3 text-sm text-muted hover:text-primary transition-colors"
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center shrink-0">
                      <Mail size={18} className="text-primary" />
                    </div>
                    contact@taraapplications.com
                  </a>
                  <div className="flex items-start gap-3 text-sm text-muted">
                    <div className="w-10 h-10 rounded-xl bg-secondary/5 flex items-center justify-center shrink-0">
                      <MapPin size={18} className="text-secondary" />
                    </div>
                    <span>New Delhi, India , Dubai, Sharjah</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
                      <Phone size={18} className="text-amber-600" />
                    </div>
                    +91 96252 57002
                  </div>
                </div>
              </div>

              {/* <div className="p-6 rounded-2xl border border-border bg-white shadow-sm">
                <h3 className="text-lg font-semibold text-foreground mb-2">Free Consultation</h3>
                <p className="text-sm text-muted mb-4">
                  Schedule a free 30-minute call to discuss your project requirements and get a
                  ballpark estimate.
                </p>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-dark transition-colors"
                >
                  Book a call &rarr;
                </a>
              </div> */}

              <div className="p-6 rounded-2xl border border-border bg-white shadow-sm">
                <h3 className="text-lg font-semibold text-foreground mb-2">Global Reach</h3>
                <p className="text-sm text-muted">
                  We&apos;ve worked with clients from 25+ countries and 1200+ businesses worldwide.
                  Distance is never a barrier.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
