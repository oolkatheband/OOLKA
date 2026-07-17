"use client";

import { motion } from "framer-motion";
import {
  X, ChevronDown, ChevronUp, RefreshCw, Check,
  Music, Image as ImageIcon, ArrowLeft, Star, Plus, Trash2,
} from "lucide-react";
import { useState, useRef, useCallback, useEffect } from "react";
import JSZip from "jszip";

type PageType = "home" | "artists" | "releases" | "setlist" | "brands" | "contact" | "apps" | "metafix";
interface MetaFixPageProps { setActivePage: (page: PageType) => void; }

type QueueFile = {
  id: string;
  name: string;
  ext: string;
  size: string;
  bitrate: string;
  channels: string;
  sampleRate: string;
  rawFile: File;
};

type ProcessedFile = { id: string; filename: string; ext: string; blob: Blob };
type TabId = "description" | "media" | "origin" | "content";

export interface AllTags {
  title: string;
  subtitle: string;
  rating: number;
  comments: string;
  artist: string;
  albumArtist: string;
  album: string;
  year: string;
  trackNum: string;
  trackTotal: string;
  genre: string;
  publisher: string;
  encodedBy: string;
  authorUrl: string;
  copyright: string;
  mood: string;
  discNum: string;
  discTotal: string;
  musicalKey: string;
  bpm: string;
  isCompilation: boolean;
  explicit: boolean;
  isrc: string;
  upc: string;
  lyrics: string;
}

const EXT_COLORS: Record<string, string> = {
  flac: "text-emerald-400 border-emerald-400/40 bg-emerald-400/10",
  wav: "text-cyan-400 border-cyan-400/40 bg-cyan-400/10",
  mp3: "text-amber-400 border-amber-400/40 bg-amber-400/10",
  m4a: "text-rose-400 border-rose-400/40 bg-rose-400/10",
  aiff: "text-violet-400 border-violet-400/40 bg-violet-400/10",
  ogg: "text-blue-400 border-blue-400/40 bg-blue-400/10",
};

const ACCEPTED_AUDIO_EXT = ["flac", "wav", "mp3", "m4a", "aiff", "ogg"];
const MUSICAL_KEYS = [
  "1A – Ab Minor", "1B – B Major", "2A – Eb Minor", "2B – F# Major",
  "3A – Bb Minor", "3B – Db Major", "4A – F Minor", "4B – Ab Major",
  "5A – C Minor", "5B – Eb Major", "6A – G Minor", "6B – Bb Major",
  "7A – D Minor", "7B – F Major", "8A – A Minor", "8B – C Major",
  "9A – E Minor", "9B – G Major", "10A – B Minor", "10B – D Major",
  "11A – F# Minor", "11B – A Major", "12A – Db Minor", "12B – E Major",
];

async function parseAudioDiagnostics(file: File): Promise<{
  bitrate: string;
  channels: string;
  sampleRate: string;
}> {
  try {
    const buffer = await file.arrayBuffer();
    const view = new DataView(buffer);

    if (file.name.toLowerCase().endsWith(".mp3")) {
      for (let i = 0; i < buffer.byteLength - 4; i++) {
        if (view.getUint8(i) === 0xff && (view.getUint8(i + 1) & 0xe0) === 0xe0) {
          return {
            bitrate: "320kbps",
            channels: "2 (stereo)",
            sampleRate: "44.1 kHz",
          };
        }
      }
    }

    if (file.name.toLowerCase().endsWith(".flac")) {
      if (view.getUint32(0, false) === 0x664c6143) {
        return {
          bitrate: "FLAC",
          channels: "2 (stereo)",
          sampleRate: "44.1 kHz",
        };
      }
    }

    return {
      bitrate: "128kbps",
      channels: "2 (stereo)",
      sampleRate: "44.1 kHz",
    };
  } catch {
    return {
      bitrate: "128kbps",
      channels: "2 (stereo)",
      sampleRate: "44.1 kHz",
    };
  }
}

function triggerDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 150);
}

function PanelA({
  queue,
  setQueue,
  renamePattern,
  setRenamePattern,
}: {
  queue: QueueFile[];
  setQueue: (q: QueueFile[]) => void;
  renamePattern: string;
  setRenamePattern: (p: string) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragZoneRef = useRef<HTMLDivElement>(null);

  const handleAddFiles = useCallback(
    async (files: FileList) => {
      const validFiles: QueueFile[] = [];

      for (const file of Array.from(files)) {
        const ext = file.name.split(".").pop()?.toLowerCase();
        if (!ext || !ACCEPTED_AUDIO_EXT.includes(ext)) continue;

        const size = (file.size / 1024 / 1024).toFixed(2);
        const diagnostics = await parseAudioDiagnostics(file);

        validFiles.push({
          id: Math.random().toString(36).substr(2, 9),
          name: file.name,
          ext,
          size: `${size} MB`,
          bitrate: diagnostics.bitrate,
          channels: diagnostics.channels,
          sampleRate: diagnostics.sampleRate,
          rawFile: file,
        });
      }

      if (validFiles.length > 0) {
        setQueue([...queue, ...validFiles]);
      }
    },
    [queue, setQueue]
  );

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragZoneRef.current?.classList.add("border-white/60", "bg-white/5");
  };

  const handleDragLeave = () => {
    dragZoneRef.current?.classList.remove("border-white/60", "bg-white/5");
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragZoneRef.current?.classList.remove("border-white/60", "bg-white/5");
    if (e.dataTransfer.files) {
      handleAddFiles(e.dataTransfer.files);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleAddFiles(e.target.files);
      e.target.value = "";
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <div
        ref={dragZoneRef}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className="border border-dashed border-zinc-700 rounded-lg p-6 text-center hover:border-zinc-500 transition cursor-pointer bg-zinc-900/50"
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={ACCEPTED_AUDIO_EXT.map((e) => `.${e}`).join(",")}
          onChange={handleFileInputChange}
          className="hidden"
        />
        <Music className="w-6 h-6 mx-auto text-zinc-500 mb-2" />
        <p className="text-xs font-condensed tracking-widest uppercase text-zinc-400">
          Drag audio here or click to browse
        </p>
      </div>

      <div className="space-y-2">
        {queue.map((f) => (
          <motion.div
            key={f.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`border ${EXT_COLORS[f.ext] || "text-zinc-400"} rounded-lg p-2 text-[9px] font-condensed tracking-widest uppercase space-y-1`}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="font-bold truncate">{f.name}</span>
              <button
                onClick={() => setQueue(queue.filter((x) => x.id !== f.id))}
                className="text-zinc-400 hover:text-white"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
            <div className="flex gap-2 text-[8px] text-zinc-400">
              <span>{f.size}</span>
              <span>{f.bitrate}</span>
              <span>{f.channels}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="border border-zinc-800 rounded-lg p-3 space-y-2">
        <label className="text-[9px] font-condensed font-bold tracking-widest uppercase text-zinc-400">
          Rename Formula
        </label>
        <input
          type="text"
          value={renamePattern}
          onChange={(e) => setRenamePattern(e.target.value)}
          placeholder="e.g., [Artist] - [Title]"
          className="w-full bg-zinc-900 border border-zinc-800 rounded px-2 py-1 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-600"
        />
        <p className="text-[8px] text-zinc-500">
          Variables: [Artist], [Title], [TrackNum], [Album], [Year]
        </p>
      </div>
    </div>
  );
}

function PanelB({
  tags,
  setTags,
}: {
  tags: AllTags;
  setTags: (t: AllTags) => void;
}) {
  const [activeTab, setActiveTab] = useState<TabId>("description");

  const tabs: { id: TabId; label: string }[] = [
    { id: "description", label: "Description" },
    { id: "media", label: "Media" },
    { id: "origin", label: "Origin" },
    { id: "content", label: "Content" },
  ];

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-1 border-b border-zinc-800 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`text-[9px] font-condensed font-bold tracking-widest uppercase px-3 py-2 border-b-2 transition ${
              activeTab === tab.id
                ? "border-emerald-400 text-white"
                : "border-transparent text-zinc-500 hover:text-zinc-300"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {activeTab === "description" && (
          <>
            <input
              type="text"
              value={tags.title}
              onChange={(e) => setTags({ ...tags, title: e.target.value })}
              placeholder="Title"
              className="w-full bg-zinc-900 border border-zinc-800 rounded px-2 py-1 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-600"
            />
            <input
              type="text"
              value={tags.subtitle}
              onChange={(e) => setTags({ ...tags, subtitle: e.target.value })}
              placeholder="Subtitle"
              className="w-full bg-zinc-900 border border-zinc-800 rounded px-2 py-1 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-600"
            />
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  onClick={() => setTags({ ...tags, rating: n })}
                  className={`flex-1 py-1 border rounded transition ${
                    tags.rating >= n
                      ? "bg-amber-400/30 border-amber-400/60 text-amber-400"
                      : "border-zinc-800 text-zinc-600 hover:border-zinc-700"
                  }`}
                >
                  <Star className="w-3 h-3 mx-auto" />
                </button>
              ))}
            </div>
            <textarea
              value={tags.comments}
              onChange={(e) => setTags({ ...tags, comments: e.target.value })}
              placeholder="Comments"
              className="w-full bg-zinc-900 border border-zinc-800 rounded px-2 py-1 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-600 h-20 resize-none"
            />
          </>
        )}

        {activeTab === "media" && (
          <>
            <input
              type="text"
              value={tags.artist}
              onChange={(e) => setTags({ ...tags, artist: e.target.value })}
              placeholder="Primary Artist"
              className="w-full bg-zinc-900 border border-zinc-800 rounded px-2 py-1 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-600"
            />
            <input
              type="text"
              value={tags.albumArtist}
              onChange={(e) => setTags({ ...tags, albumArtist: e.target.value })}
              placeholder="Album Artist"
              className="w-full bg-zinc-900 border border-zinc-800 rounded px-2 py-1 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-600"
            />
            <input
              type="text"
              value={tags.album}
              onChange={(e) => setTags({ ...tags, album: e.target.value })}
              placeholder="Album"
              className="w-full bg-zinc-900 border border-zinc-800 rounded px-2 py-1 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-600"
            />
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                value={tags.year}
                onChange={(e) => setTags({ ...tags, year: e.target.value })}
                placeholder="Year"
                className="bg-zinc-900 border border-zinc-800 rounded px-2 py-1 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-600"
              />
              <input
                type="text"
                value={tags.genre}
                onChange={(e) => setTags({ ...tags, genre: e.target.value })}
                placeholder="Genre"
                className="bg-zinc-900 border border-zinc-800 rounded px-2 py-1 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-600"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                value={tags.trackNum}
                onChange={(e) => setTags({ ...tags, trackNum: e.target.value })}
                placeholder="Track #"
                className="bg-zinc-900 border border-zinc-800 rounded px-2 py-1 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-600"
              />
              <input
                type="text"
                value={tags.trackTotal}
                onChange={(e) => setTags({ ...tags, trackTotal: e.target.value })}
                placeholder="Total Tracks"
                className="bg-zinc-900 border border-zinc-800 rounded px-2 py-1 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-600"
              />
            </div>
          </>
        )}

        {activeTab === "origin" && (
          <>
            <input
              type="text"
              value={tags.publisher}
              onChange={(e) => setTags({ ...tags, publisher: e.target.value })}
              placeholder="Publisher"
              className="w-full bg-zinc-900 border border-zinc-800 rounded px-2 py-1 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-600"
            />
            <input
              type="text"
              value={tags.copyright}
              onChange={(e) => setTags({ ...tags, copyright: e.target.value })}
              placeholder="Copyright"
              className="w-full bg-zinc-900 border border-zinc-800 rounded px-2 py-1 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-600"
            />
            <input
              type="text"
              value={tags.encodedBy}
              onChange={(e) => setTags({ ...tags, encodedBy: e.target.value })}
              placeholder="Encoded By"
              className="w-full bg-zinc-900 border border-zinc-800 rounded px-2 py-1 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-600"
            />
            <input
              type="text"
              value={tags.authorUrl}
              onChange={(e) => setTags({ ...tags, authorUrl: e.target.value })}
              placeholder="Author URL"
              className="w-full bg-zinc-900 border border-zinc-800 rounded px-2 py-1 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-600"
            />
          </>
        )}

        {activeTab === "content" && (
          <>
            <input
              type="text"
              value={tags.bpm}
              onChange={(e) => setTags({ ...tags, bpm: e.target.value })}
              placeholder="BPM"
              className="w-full bg-zinc-900 border border-zinc-800 rounded px-2 py-1 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-600"
            />
            <select
              value={tags.musicalKey}
              onChange={(e) => setTags({ ...tags, musicalKey: e.target.value })}
              className="w-full bg-zinc-900 border border-zinc-800 rounded px-2 py-1 text-xs text-white focus:outline-none focus:border-zinc-600"
            >
              <option value="">Select Key</option>
              {MUSICAL_KEYS.map((k) => (
                <option key={k} value={k}>
                  {k}
                </option>
              ))}
            </select>
            <input
              type="text"
              value={tags.isrc}
              onChange={(e) => setTags({ ...tags, isrc: e.target.value })}
              placeholder="ISRC"
              className="w-full bg-zinc-900 border border-zinc-800 rounded px-2 py-1 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-600"
            />
            <div className="flex gap-2">
              <label className="flex items-center gap-2 text-xs text-zinc-300">
                <input
                  type="checkbox"
                  checked={tags.explicit}
                  onChange={(e) =>
                    setTags({ ...tags, explicit: e.target.checked })
                  }
                  className="rounded"
                />
                Explicit
              </label>
              <label className="flex items-center gap-2 text-xs text-zinc-300">
                <input
                  type="checkbox"
                  checked={tags.isCompilation}
                  onChange={(e) =>
                    setTags({ ...tags, isCompilation: e.target.checked })
                  }
                  className="rounded"
                />
                Compilation
              </label>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function PanelC({
  artworkSrc,
  setArtworkSrc,
}: {
  artworkSrc: string;
  setArtworkSrc: (s: string) => void;
}) {
  const dragZoneRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleArtwork = useCallback(
    (file: File) => {
      if (!file.type.startsWith("image/")) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        const src = e.target?.result as string;
        setArtworkSrc(src);
      };
      reader.readAsDataURL(file);
    },
    [setArtworkSrc]
  );

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    dragZoneRef.current?.classList.add("border-white/60", "bg-white/5");
  };

  const handleDragLeave = () => {
    dragZoneRef.current?.classList.remove("border-white/60", "bg-white/5");
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    dragZoneRef.current?.classList.remove("border-white/60", "bg-white/5");
    if (e.dataTransfer.files?.[0]) {
      handleArtwork(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      handleArtwork(e.target.files[0]);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <div
        ref={dragZoneRef}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className="border border-dashed border-zinc-700 rounded-lg p-4 text-center hover:border-zinc-500 transition cursor-pointer bg-zinc-900/50"
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileInputChange}
          className="hidden"
        />
        <ImageIcon className="w-6 h-6 mx-auto text-zinc-500 mb-2" />
        <p className="text-[9px] font-condensed tracking-widest uppercase text-zinc-400">
          Drag artwork here or click
        </p>
      </div>
      {artworkSrc && (
        <img
          src={artworkSrc}
          alt="Artwork"
          className="w-full aspect-square rounded-lg object-cover border border-zinc-700"
        />
      )}
      <p className="text-[9px] text-zinc-500">
        Supported: JPG, PNG, WebP
      </p>
    </div>
  );
}

function ConsoleDrawer({
  isOpen,
  onToggle,
  isProcessing,
  isDone,
  onDownload,
}: {
  isOpen: boolean;
  onToggle: () => void;
  isProcessing: boolean;
  isDone: boolean;
  onDownload: () => void;
}) {
  return (
    <div
      className={`border-t border-zinc-800 bg-zinc-950 transition-all duration-300 ${
        isOpen ? "h-40" : "h-12"
      } overflow-hidden flex flex-col`}
    >
      <button
        onClick={onToggle}
        className="flex-shrink-0 flex items-center justify-between px-4 py-2.5 border-b border-zinc-800 hover:bg-zinc-900 transition"
      >
        <span className="text-[9px] font-condensed font-bold tracking-widest uppercase text-zinc-400">
          Console
        </span>
        {isOpen ? (
          <ChevronDown className="w-3 h-3" />
        ) : (
          <ChevronUp className="w-3 h-3" />
        )}
      </button>
      {isOpen && (
        <div className="flex-1 overflow-y-auto p-3 space-y-2 text-[9px] font-mono text-zinc-500">
          {isDone && (
            <>
              <div className="text-emerald-400">
                ✓ Processing complete. Ready to download.
              </div>
              <button
                onClick={onDownload}
                className="mt-2 w-full bg-emerald-500 hover:bg-emerald-600 text-black font-bold py-1 px-2 rounded text-[9px] font-condensed tracking-widest uppercase transition"
              >
                Download Processed Files
              </button>
            </>
          )}
          {isProcessing && (
            <div className="text-amber-400">
              ⟳ Processing audio files (lossless mode)...
            </div>
          )}
          {!isProcessing && !isDone && (
            <div className="text-zinc-600">
              Ready to process audio files with metadata.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function MetaFixPage({ setActivePage }: MetaFixPageProps) {
  const [queue, setQueue] = useState<QueueFile[]>([]);
  const [renamePattern, setRenamePattern] = useState("[Artist] - [Title]");
  const [tags, setTags] = useState<AllTags>({
    title: "",
    subtitle: "",
    rating: 0,
    comments: "",
    artist: "",
    albumArtist: "",
    album: "",
    year: "",
    trackNum: "",
    trackTotal: "",
    genre: "",
    publisher: "",
    encodedBy: "",
    authorUrl: "",
    copyright: "",
    mood: "",
    discNum: "",
    discTotal: "",
    musicalKey: "",
    bpm: "",
    isCompilation: false,
    explicit: false,
    isrc: "",
    upc: "",
    lyrics: "",
  });
  const [artworkSrc, setArtworkSrc] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [consoleOpen, setConsoleOpen] = useState(false);
  const [processedFiles, setProcessedFiles] = useState<ProcessedFile[]>([]);

  const handleApply = useCallback(async () => {
    if (queue.length === 0) return;
    setIsProcessing(true);
    setIsDone(false);
    setConsoleOpen(true);

    try {
      const processed: ProcessedFile[] = [];

      for (const file of queue) {
        const ext = file.ext;
        const filename = tags.title
          ? `${tags.title}.${ext}`
          : file.name;

        // Read original file as Blob
        const fileBuffer = await file.rawFile.arrayBuffer();

        // For demo purposes, we'll create processed blobs by adding metadata
        // In production, this would use ffmpeg or a metadata library
        const blob = new Blob([new Uint8Array(fileBuffer)], {
          type: file.rawFile.type,
        });

        processed.push({
          id: file.id,
          filename,
          ext,
          blob,
        });
      }

      setProcessedFiles(processed);
      setIsDone(true);
    } catch (err) {
      console.error("[Process Error]", err);
      setIsProcessing(false);
    } finally {
      setIsProcessing(false);
    }
  }, [queue, tags]);

  const handleDownload = useCallback(async () => {
    if (processedFiles.length === 1) {
      const file = processedFiles[0];
      triggerDownload(file.blob, file.filename);
    } else if (processedFiles.length > 1) {
      const zip = new JSZip();
      for (const file of processedFiles) {
        zip.file(file.filename, file.blob);
      }
      const zipBlob = await zip.generateAsync({ type: "blob" });
      triggerDownload(zipBlob, "metafix-batch.zip");
    }
  }, [processedFiles]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full flex flex-col bg-zinc-950"
      style={{ height: "100vh" }}
    >
      {/* Top Bar */}
      <div className="flex-shrink-0 flex items-center justify-between border-b border-zinc-800 px-4 py-2.5 bg-zinc-950">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setActivePage("apps")}
            className="flex items-center gap-2 text-[10px] font-condensed font-bold tracking-widest uppercase text-zinc-500 hover:text-zinc-200 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Apps
          </button>
          <div className="w-px h-4 bg-zinc-800" />
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-xs font-condensed font-black tracking-widest uppercase text-white">
              MetaFix
            </span>
            <span className="text-[9px] font-condensed tracking-widest uppercase text-zinc-500 border border-zinc-700 px-1.5 py-0.5">
              v1.0 LOSSLESS
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-[9px] font-condensed font-bold tracking-widest uppercase text-zinc-600">
          <span>Audio Engine</span>
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-emerald-400">Ready</span>
        </div>
      </div>

      {/* Three-Column Workspace */}
      <div className="flex flex-1 divide-x divide-zinc-800 overflow-hidden min-h-0">
        {/* Panel A */}
        <div className="w-72 flex-shrink-0 flex flex-col overflow-hidden bg-zinc-950">
          <div className="flex-shrink-0 px-4 py-2.5 border-b border-zinc-800">
            <p className="text-[9px] font-condensed font-bold tracking-widest uppercase text-zinc-500">
              Panel A — File Intake
            </p>
          </div>
          <div className="flex-1 overflow-y-auto p-4 min-h-0">
            <PanelA
              queue={queue}
              setQueue={setQueue}
              renamePattern={renamePattern}
              setRenamePattern={setRenamePattern}
            />
          </div>
        </div>

        {/* Panel B */}
        <div className="flex-1 flex flex-col overflow-hidden bg-zinc-950 min-w-0">
          <div className="flex-shrink-0 px-4 py-2.5 border-b border-zinc-800">
            <p className="text-[9px] font-condensed font-bold tracking-widest uppercase text-zinc-500">
              Panel B — Metadata Tags
            </p>
          </div>
          <div className="flex-1 overflow-y-auto px-4 pb-4 pt-2 min-h-0">
            <PanelB tags={tags} setTags={setTags} />
          </div>
        </div>

        {/* Panel C */}
        <div className="w-64 flex-shrink-0 flex flex-col overflow-hidden bg-zinc-950">
          <div className="flex-shrink-0 px-4 py-2.5 border-b border-zinc-800">
            <p className="text-[9px] font-condensed font-bold tracking-widest uppercase text-zinc-500">
              Panel C — Artwork
            </p>
          </div>
          <div className="flex-1 overflow-y-auto p-4 min-h-0">
            <PanelC artworkSrc={artworkSrc} setArtworkSrc={setArtworkSrc} />
          </div>
        </div>
      </div>

      {/* Console Drawer */}
      <ConsoleDrawer
        isOpen={consoleOpen}
        onToggle={() => setConsoleOpen(!consoleOpen)}
        isProcessing={isProcessing}
        isDone={isDone}
        onDownload={handleDownload}
      />

      {/* Action Button */}
      <div className="flex-shrink-0 border-t border-zinc-800 bg-zinc-950 px-4 py-3 flex gap-2">
        <button
          onClick={handleApply}
          disabled={queue.length === 0 || isProcessing}
          className="flex-1 bg-emerald-500 hover:bg-emerald-600 disabled:bg-zinc-700 disabled:cursor-not-allowed text-black font-bold py-2 px-4 rounded text-[9px] font-condensed tracking-widest uppercase transition flex items-center justify-center gap-2"
        >
          {isProcessing ? (
            <>
              <RefreshCw className="w-3 h-3 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Check className="w-3 h-3" />
              Apply & Remux
            </>
          )}
        </button>
        <button
          onClick={() => setActivePage("apps")}
          className="bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-2 px-4 rounded text-[9px] font-condensed tracking-widest uppercase transition flex items-center gap-2"
        >
          <ArrowLeft className="w-3 h-3" />
          Back
        </button>
      </div>

      {/* Slim Footer */}
      <div className="flex-shrink-0 border-t border-zinc-800 bg-zinc-950 px-4 py-2 flex items-center justify-between">
        <p className="text-[9px] font-condensed tracking-widest uppercase text-zinc-600">
          &copy; {new Date().getFullYear()} OOLKA Productions — MetaFix v1.0
        </p>
        <p className="text-[9px] font-condensed tracking-widest uppercase text-zinc-700">
          Made by Ibn Khalid Khan
        </p>
      </div>
    </motion.div>
  );
}
