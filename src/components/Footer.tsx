"use client";

import Link from "next/link";
import { Mail, MapPin } from "lucide-react";

const footerLinks = {
  Services: [
    { label: "Web Development", href: "/services/web-development" },
    { label: "App Development", href: "/services/app-development" },
    { label: "Game Development", href: "/services/game-development" },
    { label: "Email Marketing", href: "/services/email-marketing" },
    { label: "B2B Lead Generation", href: "/lead-generation" },
    { label: "App Store Optimization", href: "/services/aso" }, 
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Testimonials", href: "/#testimonials" },
    { label: "Contact", href: "/contact" },
  ],
  Support: [
    { label: "FAQ", href: "/#faq" },
    { label: "Privacy Policy", href: "/privacy-policy" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="inline-flex">
              <img
                src="/images/logo.png"
                alt="TARA APPLICATIONS"
                style={{ height: "36px", width: "auto", display: "block" }}
              />
            </Link>

            <p className="text-sm text-muted leading-relaxed max-w-sm">
              Full-stack development & digital solutions agency. We build web, mobile, and game platforms
              that drive real business growth for 1200+ clients worldwide.
            </p>

            <div className="space-y-3">
              <a
                href="mailto:contact@taraapplications.com"
                className="flex items-center gap-2 text-sm text-muted hover:text-primary transition-colors"
              >
                <Mail size={14} />
                contact@taraapplications.com
              </a>
              <div className="flex items-start gap-2 text-sm text-muted">
                <MapPin size={14} className="mt-0.5 shrink-0" />
                New Delhi, India
                <br />
                Dubai, UAE
              </div>
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted">
            &copy; {new Date().getFullYear()} Tara Applications. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {["LinkedIn"].map((social) => (
              <a
                key={social}
                href="https://in.linkedin.com/in/amansaxenatara"
                className="text-xs text-muted hover:text-primary transition-colors"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
