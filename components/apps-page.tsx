"use client";

import { motion } from "framer-motion";
import { Download, MonitorPlay, Globe, Zap, ExternalLink } from "lucide-react";

type PageType = "home" | "artists" | "releases" | "setlist" | "brands" | "contact" | "apps" | "metafix";

interface AppsPageProps {
  setActivePage?: (page: PageType) => void;
}

const UPCOMING_APPS = [
  {
    id: 1,
    name: "MetaFix",
    type: "Web App",
    description:
      "Fix your Metadata Online.",
    icon: Zap,
    status: "LIVE",
    platform: "Web / PWA",
  },
  {
    id: 2,
    name: "OOLKA EQ",
    type: "Browser Extension",
    description:
      "Fix your EQ Online.",
    icon: MonitorPlay,
    status: "IN DEVELOPMENT",
    platform: "Chrome / Firefox",
  },
  {
    id: 3,
    name: "OOLKA Lyrics Overlay",
    type: "Browser Extension",
    description:
      "Displays real-time synchronized lyrics across all major streaming platforms. Built with the OOLKA brutalist aesthetic — stark white text on black.",
    icon: Globe,
    status: "PLANNED",
    platform: "Chrome",
  },
  {
    id: 4,
    name: "OOLKA Muzik",
    type: "Software",
    description:
      "Full windows song discovery with local and multi tools.",
    icon: Download,
    status: "PLANNED",
    platform: "Windows",
  },
];

export function AppsPage({ setActivePage }: AppsPageProps) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full bg-black text-white pt-20 pb-32 px-6"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <p className="text-xs font-condensed font-bold tracking-widest text-white/40 mb-4 uppercase">
            DIGITAL TOOLS
          </p>
          <h1 className="text-6xl md:text-7xl font-condensed font-black uppercase tracking-looser leading-none mb-6">
            APPS &<br />EXTENSIONS
          </h1>
          <p className="text-base font-light leading-relaxed text-white/60 max-w-2xl">
            Revolutionary tools and extensions from the OOLKA collective. We&apos;re building a digital ecosystem around the music — stripped back, high-contrast, and brutalist to the core.
          </p>
        </motion.div>

        {/* Status Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="border border-white/10 px-6 py-4 mb-16 flex items-center gap-4"
        >
          <div className="w-2 h-2 rounded-full bg-white animate-pulse flex-shrink-0" />
          <p className="text-xs font-condensed font-bold tracking-widest uppercase text-white/60">
            DEVELOPMENT IN PROGRESS — STAY TUNED FOR LAUNCHES
          </p>
        </motion.div>

        {/* Apps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {UPCOMING_APPS.map((app, i) => {
            const Icon = app.icon;
            return (
              <motion.div
                key={app.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.6 }}
                onClick={app.name === "MetaFix" ? () => setActivePage?.("metafix") : undefined}
                className={`border border-white/10 hover:border-white/30 transition-all duration-300 group p-8 space-y-6 ${app.name === "MetaFix" ? "cursor-pointer hover:border-white/60" : ""}`}
              >
                {/* Top row */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 border border-white/20 flex items-center justify-center group-hover:border-white/60 transition-colors">
                      <Icon className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <h3 className="text-lg font-condensed font-black uppercase tracking-tight text-white">
                        {app.name}
                      </h3>
                      <p className="text-xs font-condensed font-bold tracking-widest text-white/40 uppercase">
                        {app.type}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`text-[10px] font-condensed font-bold tracking-widest px-2.5 py-1 flex-shrink-0 ${
                      app.status === "IN DEVELOPMENT"
                        ? "bg-white text-black"
                        : "border border-white/20 text-white/40"
                    }`}
                  >
                    {app.status}
                  </span>
                </div>

                <p className="text-sm font-light leading-relaxed text-white/70">
                  {app.description}
                </p>

                <div className="flex items-center justify-between border-t border-white/10 pt-5">
                  <div className="flex items-center gap-2 text-xs text-white/40">
                    <Globe className="w-3 h-3" />
                    <span className="font-condensed tracking-wider uppercase">
                      {app.platform}
                    </span>
                  </div>
                  {app.name === "MetaFix" ? (
                    <button
                      onClick={() => setActivePage?.("metafix")}
                      className="flex items-center gap-2 text-xs font-condensed font-bold tracking-widest uppercase text-black bg-white border border-white px-4 py-2 hover:bg-zinc-200 transition-colors"
                    >
                      LAUNCH
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  ) : (
                    <button
                      disabled
                      className="text-xs font-condensed font-bold tracking-widest uppercase text-white/30 border border-white/10 px-4 py-2 cursor-not-allowed"
                    >
                      COMING SOON
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Newsletter sign-up for updates */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mt-16 border-t border-white/10 pt-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-condensed font-black uppercase tracking-tighter mb-3">
                GET NOTIFIED
              </h2>
              <p className="text-sm font-light text-white/60 leading-relaxed">
                Be the first to know when OOLKA apps and extensions launch. We&apos;ll send you one email — no noise.
              </p>
            </div>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col sm:flex-row gap-3"
            >
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 bg-transparent border-b border-white/30 focus:border-white outline-none text-sm font-light placeholder-white/30 py-3 transition-colors text-white"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-white text-black font-condensed font-bold text-xs tracking-widest uppercase hover:opacity-80 transition-opacity flex-shrink-0"
              >
                NOTIFY ME
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
