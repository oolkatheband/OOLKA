"use client";

import { SETLIST_TRACKS, UPCOMING_CONCERTS } from "@/lib/data";
import { motion } from "framer-motion";
import { MapPin, Calendar, Ticket } from "lucide-react";

const ENERGY_COLORS: Record<string, string> = {
  HEAVY: "text-white bg-white/10",
  ACOUSTIC: "text-white/60 bg-white/5",
  MEDIUM: "text-white/80 bg-white/8",
  INSTRUMENTAL: "text-white/70 bg-white/5",
};

export function SetlistPage() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full min-h-screen bg-black text-white py-32 px-6"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-xs font-condensed font-bold tracking-widest text-white/40 mb-4 uppercase">
            LIVE MANIFEST
          </p>
          <h1 className="text-6xl md:text-7xl font-condensed font-black uppercase tracking-loose leading-none">
            SETLIST
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* Left: Setlist Table */}
          <div className="lg:col-span-2">
            <p className="text-xs font-condensed font-bold tracking-widest text-white/40 uppercase mb-6">
              STANDARD SETLIST
            </p>

            <div className="border border-white/10 overflow-hidden">
              {/* Table header */}
              <div className="grid grid-cols-12 border-b border-white/10 bg-white/[0.03]">
                <div className="col-span-1 px-4 py-3 text-[10px] font-condensed font-bold tracking-widest text-white/40">
                  #
                </div>
                <div className="col-span-5 px-4 py-3 text-[10px] font-condensed font-bold tracking-widest text-white/40">
                  TRACK
                </div>
                <div className="col-span-3 px-4 py-3 text-[10px] font-condensed font-bold tracking-widest text-white/40">
                  ARTIST
                </div>
                <div className="col-span-2 px-4 py-3 text-[10px] font-condensed font-bold tracking-widest text-white/40">
                  ENERGY
                </div>
                <div className="col-span-1 px-4 py-3 text-[10px] font-condensed font-bold tracking-widest text-white/40">
                  DUR.
                </div>
              </div>

              {SETLIST_TRACKS.map((track, i) => (
                <motion.div
                  key={track.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                  className="grid grid-cols-12 border-b border-white/5 hover:bg-white/[0.03] transition-colors group"
                >
                  <div className="col-span-1 px-4 py-4 text-xs font-light text-white/30">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="col-span-5 px-4 py-4 text-sm font-condensed font-bold tracking-wide uppercase text-white group-hover:text-white/80 transition-colors">
                    {track.title}
                  </div>
                  <div className="col-span-3 px-4 py-4 text-xs font-light text-white/60">
                    {track.artist}
                  </div>
                  <div className="col-span-2 px-4 py-4">
                    <span
                      className={`text-[10px] font-condensed font-bold tracking-wider px-2 py-0.5 ${
                        ENERGY_COLORS[track.energy] ?? "text-white/50"
                      }`}
                    >
                      {track.energy}
                    </span>
                  </div>
                  <div className="col-span-1 px-4 py-4 text-xs font-light text-white/30">
                    {track.duration}
                  </div>
                </motion.div>
              ))}
            </div>

            <p className="text-xs font-light text-white/30 mt-4">
              Setlist subject to change. Total runtime approx.{" "}
              {SETLIST_TRACKS.reduce((acc, t) => {
                const [m, s] = t.duration.split(":").map(Number);
                return acc + m * 60 + s;
              }, 0) >= 3600
                ? "60+ min"
                : `${Math.floor(
                    SETLIST_TRACKS.reduce((acc, t) => {
                      const [m, s] = t.duration.split(":").map(Number);
                      return acc + m * 60 + s;
                    }, 0) / 60
                  )} min`}
            </p>
          </div>

          {/* Right: Upcoming Concerts */}
          <div className="lg:sticky lg:top-32">
            <p className="text-xs font-condensed font-bold tracking-widest text-white/40 uppercase mb-6">
              UPCOMING CONCERTS
            </p>

            <div className="space-y-4">
              {UPCOMING_CONCERTS.map((concert, i) => (
                <motion.div
                  key={concert.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                  className="border border-white/10 p-6 space-y-4 hover:border-white/30 transition-colors"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-base font-condensed font-black uppercase tracking-wide leading-tight">
                      {concert.venue}
                    </h3>
                    <span
                      className={`flex-shrink-0 text-[10px] font-condensed font-bold tracking-widest px-2 py-0.5 ${
                        concert.status === "Announced"
                          ? "bg-white text-black"
                          : concert.status === "Upcoming"
                          ? "bg-white/20 text-white"
                          : "bg-white/5 text-white/50"
                      }`}
                    >
                      {concert.status.toUpperCase()}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs text-white/50">
                      <Calendar className="w-3 h-3 flex-shrink-0" />
                      <span>{concert.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-white/50">
                      <MapPin className="w-3 h-3 flex-shrink-0" />
                      <span>{concert.city}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-white/50">
                      <Ticket className="w-3 h-3 flex-shrink-0" />
                      <span>{concert.type}</span>
                    </div>
                  </div>

                  {concert.status === "Announced" && (
                    <button className="w-full px-4 py-2 border border-white text-white text-xs font-condensed font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-all">
                      GET TICKETS
                    </button>
                  )}
                  {concert.status !== "Announced" && (
                    <button
                      disabled
                      className="w-full px-4 py-2 border border-white/20 text-white/30 text-xs font-condensed font-bold tracking-widest uppercase cursor-not-allowed"
                    >
                      TICKETS TBA
                    </button>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Note */}
            <div className="mt-6 border-t border-white/10 pt-6">
              <p className="text-xs font-light text-white/30 leading-relaxed">
                Follow OOLKA on social media for the latest announcements on upcoming live performances and tour dates.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
