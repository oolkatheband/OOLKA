"use client";

import { RELEASES } from "@/lib/data";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { X, Play, ExternalLink } from "lucide-react";

type Release = (typeof RELEASES)[number];

// Audio Visualiser bars
function AudioVisualiser({ active }: { active: boolean }) {
  const bars = Array.from({ length: 20 });
  return (
    <div className="flex items-end gap-[3px] h-8">
      {bars.map((_, i) => (
        <motion.div
          key={i}
          className="w-[3px] bg-white rounded-full"
          animate={
            active
              ? {
                height: [
                  `${8 + Math.random() * 24}px`,
                  `${8 + Math.random() * 24}px`,
                  `${8 + Math.random() * 24}px`,
                ],
              }
              : { height: "4px" }
          }
          transition={
            active
              ? {
                duration: 0.4 + (i % 5) * 0.1,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
                delay: i * 0.04,
              }
              : {}
          }
        />
      ))}
    </div>
  );
}

function ReleaseModal({
  track,
  onClose,
}: {
  track: Release;
  onClose: () => void;
}) {
  const [playing, setPlaying] = useState(false);
  const isUpcoming = track.releaseDate === "Upcoming";

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const featuredStr =
    track.featured && track.featured !== "NIL"
      ? `feat. ${track.featured}`
      : null;

  const metaFields = [
    { label: "ARTIST", value: track.artist },
    { label: "FEATURED", value: track.featured === "NIL" ? "—" : track.featured },
    { label: "GENRE", value: track.genre },
    { label: "SUBGENRE", value: track.subgenre === "NIL" ? "—" : track.subgenre },
    { label: "RELEASE DATE", value: track.releaseDate },
    { label: "LANGUAGE", value: track.language },
    { label: "TYPE", value: track.type },
    { label: "COMPOSER", value: track.composer },
    { label: "SONGWRITER", value: track.songwriter === "NIL" ? "—" : track.songwriter },
    { label: "COPYRIGHT", value: track.copyright },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${track.title} details`}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="bg-black border border-white/20 w-full max-w-3xl max-h-[90vh] overflow-y-auto"
      >
        {/* Header with cover */}
        <div className="flex items-stretch border-b border-white/10">
          {/* Cover art */}
          <div className="w-40 md:w-52 flex-shrink-0 bg-black relative overflow-hidden">
            <img
              src={track.coverImage || "/OOLKA/covers/binary-serenity.png"}
              alt={`${track.title} cover`}
              className="w-full h-full object-cover"
            />
            {isUpcoming && (
              <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                <span className="text-xs font-condensed font-black tracking-widest text-white">
                  UPCOMING
                </span>
              </div>
            )}
          </div>

          {/* Title + actions */}
          <div className="flex-1 p-6 flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-2xl md:text-3xl font-condensed font-black uppercase tracking-tight">
                    {track.title}
                  </h2>
                  {track.explicit && (
                    <span className="flex-shrink-0 text-[10px] font-condensed font-black bg-white text-black px-1.5 py-0.5 tracking-wider">
                      E
                    </span>
                  )}
                </div>
                <p className="text-sm text-white/60 font-light">
                  {track.artist}
                  {featuredStr && ` — ${featuredStr}`}
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-white/40 hover:text-white transition-colors p-1 flex-shrink-0"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Visualiser + play row */}
            <div className="mt-4 flex items-center gap-4">
              {!isUpcoming && (
                <button
                  onClick={() => setPlaying((p) => !p)}
                  className="flex items-center gap-2 px-4 py-2 bg-white text-black font-condensed font-bold text-xs tracking-widest uppercase hover:opacity-80 transition-opacity"
                  aria-label={playing ? "Pause" : "Play on Spotify"}
                >
                  <Play className="w-3 h-3 fill-black" />
                  {playing ? "PLAYING" : "PLAY"}
                </button>
              )}
              <AudioVisualiser active={playing} />
            </div>
          </div>
        </div>

        {/* Spotify embed */}
        {!isUpcoming && track.spotifyId && (
          <div className="border-b border-white/10 p-6">
            <iframe
              style={{ borderRadius: 0 }}
              src={`https://open.spotify.com/embed/track/${track.spotifyId}?utm_source=generator&theme=0`}
              width="100%"
              height="80"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              title={`Listen to ${track.title} on Spotify`}
            />
          </div>
        )}

        {/* Metadata grid */}
        <div className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
            {metaFields.map((field) => (
              <div key={field.label}>
                <p className="text-[10px] font-condensed font-bold tracking-widest text-white/40 mb-1">
                  {field.label}
                </p>
                <p className="text-sm font-light text-white">{field.value}</p>
              </div>
            ))}
          </div>

          {/* Streaming links */}
          {!isUpcoming && (
            <div className="flex flex-wrap gap-3 border-t border-white/10 pt-6">
              {[
                { label: track.platform.toUpperCase(), href: track.link },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 border border-white/30 text-xs font-condensed font-bold tracking-widest uppercase text-white hover:bg-white hover:text-black hover:border-white transition-all duration-300"
                >
                  {link.label}
                  <ExternalLink className="w-3 h-3" />
                </a>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

function ReleaseCard({
  track,
  index,
  onClick,
}: {
  track: Release;
  index: number;
  onClick: () => void;
}) {
  const isUpcoming = track.releaseDate === "Upcoming";

  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      className="group relative overflow-hidden border border-white/10 hover:border-white/50 transition-all duration-300 text-left w-full"
      aria-label={`View ${track.title} details`}
    >
      {/* Cover image */}
      <div className="aspect-square relative overflow-hidden bg-black">
        <img
          src={track.coverImage || "/OOLKA/covers/binary-serenity.png"}
          alt={`${track.title} cover art`}
          className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${isUpcoming ? "opacity-30" : "opacity-80 group-hover:opacity-100"
            }`}
        />

        {/* Upcoming overlay */}
        {isUpcoming && (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-xl font-condensed font-black text-white tracking-widest">
              UPCOMING
            </p>
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2 p-4">
          <p className="text-xs font-condensed font-bold tracking-widest text-white text-center">
            CLICK TO EXPLORE
          </p>
        </div>
      </div>

      {/* Track info */}
      <div className="p-4 bg-black">
        <div className="flex items-start justify-between gap-2 mb-1">
          <div className="flex items-center gap-2 flex-wrap min-w-0">
            <p className="text-sm font-condensed font-black uppercase tracking-wide text-white truncate">
              {track.title}
            </p>
            {track.explicit && (
              <span className="flex-shrink-0 text-[9px] font-condensed font-black bg-white/20 text-white/80 px-1 py-0.5 tracking-wider">
                E
              </span>
            )}
          </div>
          <span className="flex-shrink-0 text-[10px] font-condensed text-white/30 tracking-wider">
            {track.releaseDate.slice(-4)}
          </span>
        </div>
        <p className="text-xs text-white/50 font-light truncate">{track.artist}</p>
        <p className="text-[10px] text-white/30 font-condensed tracking-wider uppercase mt-1">
          {track.genre}
          {track.subgenre && track.subgenre !== "NIL" ? ` / ${track.subgenre}` : ""}
        </p>
      </div>
    </motion.button>
  );
}

export function ReleasesPage() {
  const [selected, setSelected] = useState<number | null>(null);
  const selectedTrack = selected !== null ? RELEASES[selected] : null;

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
            COMPLETE DISCOGRAPHY
          </p>
          <h1 className="text-6xl md:text-7xl font-condensed font-black uppercase tracking-loose leading-none">
            2025–2026 Releases
          </h1>
          <p className="text-sm font-light text-white/50 mt-4">
            {RELEASES.length} releases — click any card to explore metadata, cover art & streaming links
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {RELEASES.map((release, i) => (
            <ReleaseCard
              key={release.id}
              track={release}
              index={i}
              onClick={() => setSelected(i)}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected !== null && selectedTrack && (
          <ReleaseModal
            track={selectedTrack}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>
    </motion.section>
  );
}
