"use client";

import { ARTISTS } from "@/lib/data";
import { motion } from "framer-motion";

export function ArtistsPage() {
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
          className="mb-20"
        >
          <p className="text-xs font-condensed font-bold tracking-widest text-white/40 mb-4 uppercase">
            CORE COLLECTIVE
          </p>
          <h1 className="text-6xl md:text-7xl font-condensed font-black uppercase tracking-loose leading-none mb-8">
            The Coalition
          </h1>
          <p className="text-base font-light leading-relaxed text-white/60 max-w-2xl">
            Emerging as a relentless force in the scene around 2025, OOLKA represents a sharp pivot into a heavier, uncompromising soundscape. The project relies on deep-seated collaborations, fusing the production styles, multi-instrumental approaches, and raw energy of core collaborators.
          </p>
        </motion.div>

        {/* Artists Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {ARTISTS.map((artist, i) => (
            <motion.article
              key={artist.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.12, duration: 0.7 }}
              className="group"
            >
              {/* Artist image — fully separated, no overlap */}
              <div className="w-full aspect-square bg-white/5 mb-8 overflow-hidden border border-white/10">
                <img
                  src={artist.image}
                  alt={artist.name}
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                />
              </div>

              {/* Content — fully separated from image */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-2xl font-condensed font-black uppercase tracking-tight mb-1">
                    {artist.name}
                  </h3>
                  <p className="text-xs font-condensed font-bold tracking-widest text-white/40 uppercase">
                    {artist.role}
                  </p>
                </div>

                <p className="text-sm font-light leading-relaxed text-white/70">
                  {artist.bio}
                </p>

                {/* Tracks */}
                <div className="border-t border-white/10 pt-4">
                  <p className="text-[10px] font-condensed font-bold tracking-widest text-white/30 uppercase mb-3">
                    FEATURED ON
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {artist.tracks.map((track) => (
                      <span
                        key={track}
                        className="text-xs font-condensed font-bold tracking-wider uppercase px-3 py-1 bg-white/5 border border-white/10 text-white/60 hover:text-white hover:border-white/30 transition-colors cursor-default"
                      >
                        {track}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
