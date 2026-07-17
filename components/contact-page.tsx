"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Share2, Radio, Music, Send } from "lucide-react";

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setSubmitted(true);
    setLoading(false);
  };

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
            TRANSMISSIONS
          </p>
          <h1 className="text-6xl md:text-7xl font-condensed font-black uppercase tracking-loose leading-none">
            CONTACT
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="space-y-12"
          >
            {/* Direct contact */}
            <div className="space-y-4">
              <p className="text-xs font-condensed font-bold tracking-widest text-white/40 uppercase">
                DIRECT CONTACT / PRESS
              </p>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-white/40 flex-shrink-0" />
                <a
                  href="mailto:oolkatheband@gmail.com"
                  className="text-xl font-light hover:text-white/60 transition-colors break-all"
                >
                  oolkatheband@gmail.com
                </a>
              </div>
              <p className="text-sm font-light text-white/50 leading-relaxed">
                For press enquiries, booking requests, and collaboration opportunities.
                We respond within 2–3 business days.
              </p>
            </div>

            {/* Booking */}
            <div className="space-y-4 border-t border-white/10 pt-10">
              <p className="text-xs font-condensed font-bold tracking-widest text-white/40 uppercase">
                BOOKING
              </p>
              <p className="text-sm font-light text-white/50 leading-relaxed">
                Available for live performances, headline sets, collaborative studio sessions,
                and special events. Include your date, venue, and details in the form.
              </p>
            </div>

            {/* Social Media */}
            <div className="space-y-4 border-t border-white/10 pt-10">
              <p className="text-xs font-condensed font-bold tracking-widest text-white/40 uppercase">
                SOCIAL MEDIA
              </p>
              <div className="space-y-3">
                {[
                  { label: "INSTAGRAM", href: "#", icon: Share2 },
                  { label: "YOUTUBE", href: "#", icon: Radio },
                  { label: "SPOTIFY", href: "#", icon: Music },
                  { label: "APPLE MUSIC", href: "#", icon: Music },
                ].map(({ label, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm font-condensed font-bold tracking-widest uppercase text-white/50 hover:text-white transition-all duration-300 hover:tracking-[0.2em]"
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-[10px] font-condensed font-bold tracking-widest text-white/40 uppercase mb-2">
                      NAME
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                      placeholder="Your name"
                      className="w-full bg-transparent border-b border-white/20 focus:border-white outline-none py-3 text-sm font-light placeholder-white/20 text-white transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-condensed font-bold tracking-widest text-white/40 uppercase mb-2">
                      EMAIL
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                      placeholder="your@email.com"
                      className="w-full bg-transparent border-b border-white/20 focus:border-white outline-none py-3 text-sm font-light placeholder-white/20 text-white transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-condensed font-bold tracking-widest text-white/40 uppercase mb-2">
                      SUBJECT
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      placeholder="Booking / Press / Collab / Other"
                      className="w-full bg-transparent border-b border-white/20 focus:border-white outline-none py-3 text-sm font-light placeholder-white/20 text-white transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-condensed font-bold tracking-widest text-white/40 uppercase mb-2">
                      MESSAGE
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      required
                      placeholder="Write your message here..."
                      rows={5}
                      className="w-full bg-transparent border-b border-white/20 focus:border-white outline-none py-3 text-sm font-light placeholder-white/20 text-white transition-colors resize-none"
                    />
                  </div>
                </div>

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center gap-3 px-8 py-3 bg-white text-black font-condensed font-bold text-xs tracking-widest uppercase hover:opacity-80 transition-opacity disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  {loading ? "TRANSMITTING..." : "SEND MESSAGE"}
                </motion.button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="border border-white/20 p-12 space-y-4 text-center"
              >
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black text-lg font-bold mx-auto">
                  ✓
                </div>
                <h3 className="text-2xl font-condensed font-black uppercase tracking-tighter">
                  TRANSMISSION RECEIVED
                </h3>
                <p className="text-sm font-light text-white/60">
                  We&apos;ll respond within 2–3 business days. Welcome to the OOLKA circuit.
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
