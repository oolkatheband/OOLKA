"use client";

import { BRANDS } from "@/lib/data";
import { motion } from "framer-motion";
import { Share2, Radio, Music, ExternalLink } from "lucide-react";

export function BrandsPage() {
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
            SISTER CONCERNS
          </p>
          <h1 className="text-6xl md:text-7xl font-condensed font-black uppercase tracking-loose leading-none mb-6">
            OUR COLLECTIVE
          </h1>
          <p className="text-base font-light leading-relaxed text-white/60 max-w-2xl">
            A network of independent labels and production houses operating under the same creative umbrella. Each entity has its own identity, focus, and sound.
          </p>
        </motion.div>

        {/* Brands Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BRANDS.map((brand, i) => (
            <motion.div
              key={brand.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.12, duration: 0.6 }}
              className="border border-white/10 group hover:border-white/30 transition-all duration-300"
            >
              {/* Logo block */}
              <div className="aspect-square bg-black border-b border-white/10 flex items-center justify-center p-8 overflow-hidden relative">
                <img
                  src={brand.logo}
                  alt={`${brand.name} logo`}
                  className="h-3/5 w-auto object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                />
                {/* Type badge */}
                <div className="absolute top-4 left-4">
                  <span className="text-[10px] font-condensed font-bold tracking-widest bg-white/10 text-white/60 px-2 py-1 uppercase">
                    {brand.type}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-5">
                <div>
                  <h3 className="text-xl font-condensed font-black uppercase tracking-tight text-white mb-1">
                    {brand.name}
                  </h3>
                  <p className="text-xs font-condensed font-bold tracking-widest text-white/40 uppercase">
                    {brand.focus}
                  </p>
                </div>

                <p className="text-sm font-light leading-relaxed text-white/70">
                  {brand.description}
                </p>

                {/* Social links */}
                <div className="border-t border-white/10 pt-5">
                  <p className="text-[10px] font-condensed font-bold tracking-widest text-white/30 uppercase mb-3">
                    SOCIAL MEDIA
                  </p>
                  <div className="flex items-center gap-4">
                    <a
                      href={brand.socials.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs font-condensed font-bold tracking-wider text-white/50 hover:text-white transition-all duration-300 hover:tracking-widest uppercase"
                      aria-label={`${brand.name} on Instagram`}
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      IG
                    </a>
                    <a
                      href={brand.socials.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs font-condensed font-bold tracking-wider text-white/50 hover:text-white transition-all duration-300 hover:tracking-widest uppercase"
                      aria-label={`${brand.name} on YouTube`}
                    >
                      <Radio className="w-3.5 h-3.5" />
                      YT
                    </a>
                    <a
                      href={brand.socials.spotify}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs font-condensed font-bold tracking-wider text-white/50 hover:text-white transition-all duration-300 hover:tracking-widest uppercase"
                      aria-label={`${brand.name} on Spotify`}
                    >
                      <Music className="w-3.5 h-3.5" />
                      SP
                    </a>
                    <a
                      href={brand.socials.appleMusic}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs font-condensed font-bold tracking-wider text-white/50 hover:text-white transition-all duration-300 hover:tracking-widest uppercase"
                      aria-label={`${brand.name} on Apple Music`}
                    >
                      <Music className="w-3.5 h-3.5" />
                      AM
                    </a>
                  </div>
                </div>

                {/* External link */}
                <a
                  href="#"
                  className="flex items-center gap-2 text-xs font-condensed font-bold tracking-widest uppercase text-white/50 hover:text-white transition-colors border-t border-white/10 pt-4"
                >
                  VISIT LABEL
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
