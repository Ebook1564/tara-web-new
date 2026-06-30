"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Home", href: "/" },

  {
    label: "Lead Generation",
    href: "/lead-generation",
  },
  {
    label: "Development",
    href: "/services",
    dropdown: [
      { label: "Web Development", href: "/services/web-development" },
      { label: "App Development", href: "/services/app-development" },
      { label: "Game Development", href: "/services/game-development" },
      { label: "Email Marketing", href: "/services/email-marketing" },
      { label: "ASO", href: "/services/aso" },
    ],
  },
  { label: "Portfolio", href: "/portfolio" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => pathname === href;

  return (
    <header
      className={cn(
        "fixed z-50 transition-all duration-500",
        scrolled ? "inset-x-4 top-3" : "inset-x-0 top-0"
      )}
    >
      <div
        className={cn(
          "mx-auto transition-all duration-500",
          scrolled
            ? "max-w-7xl bg-white shadow-md border border-gray-100 rounded-2xl"
            : "max-w-full bg-transparent"
        )}
      >
        <div
          className={cn(
            "px-4 sm:px-6 lg:px-8 transition-all duration-500",
            scrolled ? "h-14 lg:h-16" : "h-16 lg:h-20"
          )}
        >
          <div className="flex items-center justify-between h-full">
            {/* Logo */}
            <Link href="/" className="flex items-center shrink-0">
              <img
                src={scrolled ? "/images/logo.png" : "/images/logo-white.png"}
                alt="TARA APPLICATIONS"
                style={{ height: "36px", width: "auto", display: "block" }}
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-0.5">
              {navItems.map((item) =>
                item.dropdown ? (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => setOpenDropdown(item.label)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <button
                      className={cn(
                        "flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                        scrolled
                          ? "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                          : "text-gray-300 hover:text-white hover:bg-white/10"
                      )}
                    >
                      {item.label}
                      <ChevronDown size={14} className="mt-0.5" />
                    </button>
                    {openDropdown === item.label && (
                      <div className="absolute top-full left-0 pt-1.5 w-56">
                        <div className="rounded-xl border border-gray-100 bg-white shadow-lg shadow-black/5 py-2">
                          {item.dropdown.map((sub) => (
                            <Link
                              key={sub.label}
                              href={sub.href}
                              onClick={() => setOpenDropdown(null)}
                              className="block px-4 py-2.5 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={cn(
                      "px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                      isActive(item.href)
                        ? scrolled
                          ? "text-blue-600 bg-blue-50"
                          : "text-white bg-white/15"
                        : scrolled
                          ? "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                          : "text-gray-300 hover:text-white hover:bg-white/10"
                    )}
                  >
                    {item.label}
                  </Link>
                )
              )}
            </nav>

            {/* CTA + Mobile Toggle */}
            <div className="flex items-center gap-4">
              <Link
                href="/contact"
                className={cn(
                  "hidden lg:inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-xl transition-all duration-300",
                  scrolled
                    ? "text-white bg-[#4A7FD3] hover:bg-blue-600 shadow-sm"
                    : "text-white bg-[#4A7FD3]/90 hover:bg-[#4A7FD3] border border-white/10"
                )}
              >
                Get Started
              </Link>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className={cn(
                  "lg:hidden p-2 rounded-lg transition-colors",
                  scrolled ? "text-gray-600 hover:text-blue-600" : "text-gray-300 hover:text-white"
                )}
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="lg:hidden mx-auto max-w-7xl bg-white border-x border-b border-gray-100 rounded-b-2xl shadow-md overflow-hidden">
          <div className="px-4 py-4 space-y-1">
            {navItems.map((item) =>
              item.dropdown ? (
                <div key={item.label}>
                  <button
                    onClick={() =>
                      setOpenDropdown(openDropdown === item.label ? null : item.label)
                    }
                    className="flex items-center justify-between w-full px-3 py-2.5 text-sm font-medium text-gray-600 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    {item.label}
                    <ChevronDown
                      size={14}
                      className={cn(
                        "transition-transform duration-200",
                        openDropdown === item.label && "rotate-180"
                      )}
                    />
                  </button>
                  {openDropdown === item.label && (
                    <div className="pl-4 space-y-1">
                      {item.dropdown.map((sub) => (
                        <Link
                          key={sub.label}
                          href={sub.href}
                          onClick={() => setMobileOpen(false)}
                          className="block px-3 py-2 text-sm text-gray-500 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "block px-3 py-2.5 text-sm font-medium rounded-lg transition-colors",
                    isActive(item.href)
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                  )}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              )
            )}
            <Link
              href="/contact"
              className="block text-center mt-3 px-5 py-3 text-sm font-semibold text-white bg-[#4A7FD3] rounded-xl hover:bg-blue-600 transition-all duration-300"
              onClick={() => setMobileOpen(false)}
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
