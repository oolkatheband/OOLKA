"use client";

import { Heart } from "lucide-react";
import { motion } from "framer-motion";

type PageType = 'home' | 'artists' | 'releases' | 'setlist' | 'brands' | 'contact' | 'apps' | 'metafix';

interface FooterProps {
  setActivePage?: (page: PageType) => void;
}

const NAV_LINKS: { label: string; page: PageType }[] = [
  { label: "HOME", page: "home" },
  { label: "ARTISTS", page: "artists" },
  { label: "RELEASES", page: "releases" },
  { label: "SETLIST", page: "setlist" },
  { label: "BRANDS", page: "brands" },
  { label: "CONTACT", page: "contact" },
];

const SOCIAL_LINKS = [
  { label: "SPOTIFY", href: "https://open.spotify.com/artist/6ta2htFKHLD0JHUfYgdydO?si=u-b0K60oSqutxyCOz1M1Hw" },
  { label: "APPLE MUSIC", href: "https://music.apple.com/us/artist/oolka/1831394182" },
  { label: "YOUTUBE", href: "https://www.youtube.com/channel/UCQzFdEJfcXIcgnY7eyVhs1A" },
  { label: "INSTAGRAM", href: "instagram.com/oolkatheband" },
];

export function Footer({ setActivePage }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="w-full bg-black text-white border-t border-white/10"
      aria-label="Site footer"
    >
      {/* Main footer body */}
      <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24 py-16 md:py-20">
        {/* Three-column desktop layout */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 md:gap-8">
          {/* Left: Branding + Contact */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col gap-0 md:max-w-[260px]"
          >
            {/* Inverted Logo */}
            <div className="h-32 md:h-40 p-3 inline-flex items-center self-start">
              <img
                src="/OOLKA/logo/oolka-logo-new.png"
                alt="OOLKA Productions"
                className="h-full w-auto invert"
              />
            </div>

            {/* Contact */}
            <div className="space-y-">
              <p className="text-[10px] font-condensed font-bold tracking-widest text-white/30 uppercase">
                CONTACT / PRESS
              </p>
              <a
                href="mailto:oolkatheband@gmail.com"
                className="text-sm font-light text-white/60 hover:text-white transition-all duration-300 hover:underline block"
              >
                oolkatheband@gmail.com
              </a>
            </div>
          </motion.div>

          {/* Center: Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="flex flex-col gap-3"
          >
            <p className="text-[10px] font-condensed font-bold tracking-widest text-white/30 uppercase mb-1">
              NAVIGATION
            </p>
            {NAV_LINKS.map((link) => (
              <button
                key={link.page}
                onClick={() => setActivePage?.(link.page)}
                className="text-left text-xs font-condensed font-bold tracking-widest uppercase text-white/50 hover:text-white transition-all duration-300 hover:tracking-[0.2em] w-fit"
              >
                {link.label}
              </button>
            ))}
          </motion.div>

          {/* Right: Social Signals */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col gap-3"
          >
            <p className="text-[10px] font-condensed font-bold tracking-widest text-white/30 uppercase mb-1">
              FOLLOW
            </p>
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-condensed font-bold tracking-widest uppercase text-white/50 hover:text-white transition-all duration-300 hover:tracking-[0.2em] w-fit"
              >
                {social.label}
              </a>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24 py-5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/100">
          {/* Copyright */}
          <p className="font-light tracking-wide text-center md:text-left">
            &copy; {currentYear} OOLKA Productions. All rights reserved.
          </p>

          {/* Made with love */}
          <p className="flex items-center gap-1 font-light tracking-wide">
            Made with{" "}
            <Heart className="inline w-3 h-3 mx-0.5 text-white fill-white" aria-hidden="true" />{" "}
            by Ibn Khalid Khan
          </p>
        </div>
      </div>
    </footer>
  );
}
