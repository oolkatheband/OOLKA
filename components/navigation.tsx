"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

type PageType = 'home' | 'artists' | 'releases' | 'setlist' | 'brands' | 'contact' | 'apps' | 'metafix';

interface NavigationProps {
  activePage: PageType;
  setActivePage: (page: PageType) => void;
}

const NAV_LINKS: { label: string; page: PageType }[] = [
  { label: "HOME", page: "home" },
  { label: "ARTISTS", page: "artists" },
  { label: "RELEASES", page: "releases" },
  { label: "SETLIST", page: "setlist" },
  { label: "BRANDS", page: "brands" },
  { label: "CONTACT", page: "contact" },
];

export function Navigation({ activePage, setActivePage }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isApp = activePage === "metafix";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when switching to app page
  useEffect(() => {
    if (isApp) setMobileOpen(false);
  }, [isApp]);

  const handleNav = (page: PageType) => {
    setActivePage(page);
    setMobileOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{
          opacity: isApp ? 0 : 1,
          height: isApp ? 0 : 64,
          y: isApp ? -64 : 0,
        }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className={`fixed top-0 left-0 right-0 z-50 overflow-hidden transition-colors duration-500 ${isScrolled ? "bg-black/95 border-b border-white/10 backdrop-blur-lg" : "bg-black"
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => handleNav("home")}
            className="flex items-center h-9 focus:outline-none"
            aria-label="OOLKA Home"
          >
            <img
              src="/logo/oolka-logo-new.png"
              alt="OOLKA"
              className="h-full w-auto invert"
            />
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map((item) => (
              <button
                key={item.page}
                onClick={() => handleNav(item.page)}
                className={`text-xs font-condensed font-bold tracking-widest uppercase transition-all duration-300 hover:tracking-[0.2em] ${activePage === item.page
                    ? "text-white border-b border-white pb-0.5"
                    : "text-white/50 hover:text-white"
                  }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Apps & Extensions — Highlighted CTA */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleNav("apps")}
              className={`hidden md:block border text-xs font-condensed font-bold tracking-widest uppercase px-5 py-2 transition-all duration-300 hover:tracking-[0.2em] ${activePage === "apps"
                  ? "bg-white text-black border-white"
                  : "border-white text-white hover:bg-white hover:text-black"
                }`}
            >
              APPS & EXTENSIONS
            </button>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden text-white p-2 focus:outline-none"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-40 bg-black border-b border-white/10 flex flex-col px-6 py-8 gap-6"
          >
            {NAV_LINKS.map((item) => (
              <button
                key={item.page}
                onClick={() => handleNav(item.page)}
                className={`text-left text-sm font-condensed font-bold tracking-widest uppercase transition-colors ${activePage === item.page ? "text-white" : "text-white/50 hover:text-white"
                  }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => handleNav("apps")}
              className="mt-2 border border-white text-white px-6 py-3 text-xs font-condensed font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-all w-full"
            >
              APPS & EXTENSIONS
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
