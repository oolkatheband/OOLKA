"use client";

import { motion } from "framer-motion";
import { Mail, Share2, Radio, Music } from "lucide-react";

type PageType = 'home' | 'artists' | 'releases' | 'setlist' | 'brands' | 'contact' | 'apps';

interface HomePageProps {
  setActivePage: (page: PageType) => void;
}

const wordVariants = {
  hidden: { opacity: 0, y: 60, filter: "blur(8px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      delay: i * 0.12,
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export function HomePage({ setActivePage }: HomePageProps) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full min-h-screen bg-black text-white overflow-hidden relative"
    >
      {/* Background grid texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* Hero */}
      <div className="relative z-10 flex flex-col items-start justify-start px-8 md:px-16 pt-40 md:pt-44 pb-20">
        {/* Label */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-xs font-condensed font-bold tracking-widest text-white/50 mb-10 uppercase"
        >
          OOLKA PRODUCTIONS / HARD ROCK & METAL / SINCE 2025
        </motion.p>

        {/* Logo */}
        <motion.div
          custom={0}
          variants={wordVariants}
          initial="hidden"
          animate="visible"
          className="mb-6"
        >
          <img
            src="/logo/oolka-logo-new.png"
            alt="OOLKA Productions"
            className="h-52 md:h-64 w-auto invert"
          />
        </motion.div>

        {/* Subtitle */}
        <motion.h2
          custom={1}
          variants={wordVariants}
          initial="hidden"
          animate="visible"
          className="text-lg md:text-xl font-condensed font-light uppercase tracking-[0.3em] mb-14 text-white/60"
        >
          FEEL • BEAT YOUR HEART
        </motion.h2>

        {/* CTA Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 mb-24"
        >
          <button
            onClick={() => setActivePage("releases")}
            className="px-8 py-3 bg-white text-black font-condensed font-bold text-xs tracking-widest uppercase hover:opacity-80 transition-opacity"
          >
            LISTEN LATEST
          </button>
          <button
            onClick={() => setActivePage("artists")}
            className="px-8 py-3 border border-white text-white font-condensed font-bold text-xs tracking-widest uppercase hover:bg-white/10 transition-all"
          >
            THE COALITION
          </button>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.6 }}
          className="w-full border-t border-white/10 pt-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {/* Contact */}
            <div className="space-y-4">
              <p className="text-xs font-condensed font-bold tracking-widest text-white/40 uppercase">
                CONTACT / PRESS
              </p>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-white/40 flex-shrink-0" />
                <a
                  href="mailto:oolkatheband@gmail.com"
                  className="text-sm font-light text-white hover:text-white/60 transition-colors"
                >
                  oolkatheband@gmail.com
                </a>
              </div>
              <p className="text-xs font-light text-white/40 leading-relaxed">
                For bookings, press enquiries, and collaboration opportunities.
              </p>
            </div>

            {/* Social Media */}
            <div className="space-y-4">
              <p className="text-xs font-condensed font-bold tracking-widest text-white/40 uppercase">
                SOCIAL MEDIA
              </p>
              <div className="flex flex-col gap-3">
                {[
                  { label: "Instagram", href: "instagram.com/oolkatheband", icon: Share2 },
                  { label: "YouTube", href: "https://www.youtube.com/channel/UCQzFdEJfcXIcgnY7eyVhs1A", icon: Radio },
                  { label: "Spotify", href: "https://open.spotify.com/artist/6ta2htFKHLD0JHUfYgdydO?si=u-b0K60oSqutxyCOz1M1Hw", icon: Music },
                  { label: "Apple Music", href: "https://music.apple.com/us/artist/oolka/1831394182", icon: Music },
                ].map(({ label, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    className="flex items-center gap-3 text-sm font-light text-white/70 hover:text-white transition-all duration-300 hover:tracking-wider group"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
                    {label}
                  </a>
                ))}
              </div>
            </div>

            {/* Booking */}
            <div className="space-y-4">
              <p className="text-xs font-condensed font-bold tracking-widest text-white/40 uppercase">
                BOOKING
              </p>
              <p className="text-sm font-light leading-relaxed text-white/70">
                Available for live performances, collaborations, and studio sessions.
              </p>
              <button
                onClick={() => setActivePage("contact")}
                className="text-xs font-condensed font-bold tracking-widest uppercase text-white border-b border-white/40 pb-0.5 hover:border-white transition-colors"
              >
                SEND ENQUIRY
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
