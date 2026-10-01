"use client";

import { useEffect, useState } from "react";
import { FiSend, FiGithub, FiLinkedin, FiFacebook, FiMail } from "react-icons/fi";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { profile } from "@/data/portfolio";

const PROMPT = "guest@portfolio:~$ contact --new";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sent">("idle");
  const [typed, setTyped] = useState("");

  // One-shot terminal typing intro, runs once on mount.
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i += 1;
      setTyped(PROMPT.slice(0, i));
      if (i >= PROMPT.length) clearInterval(interval);
    }, 45);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Default: opens the visitor's email client with a pre-filled message.
    // See README.md -> "Wiring up the contact form" to send silently instead
    // (Formspree / EmailJS / your own API route).
    const subject = encodeURIComponent(`Portfolio inquiry from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setStatus("sent");
  };

  return (
    <section id="contact" className="relative px-6 py-28 sm:py-36">
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          eyebrow="Contact"
          title="Let's build something"
          description="Have a project in mind or just want to say hi? My inbox is open."
        />

        <Reveal>
          {/* Terminal window */}
          <div className="overflow-hidden rounded-xl border border-mauve/25 bg-onyx shadow-[0_0_50px_-15px_rgba(166,77,121,0.5)]">
            {/* Title bar */}
            <div className="flex items-center gap-2 border-b border-white/10 bg-white/5 px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
              <span className="ml-3 font-mono text-xs text-white/40">contact.sh</span>
            </div>

            <div className="p-6 font-mono text-sm">
              <p className="text-glow">
                {typed}
                <span className="animate-blink border-r-2 border-glow" />
              </p>

              <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                <TerminalField
                  prompt="name"
                  value={form.name}
                  onChange={(v) => setForm({ ...form, name: v })}
                  required
                />
                <TerminalField
                  prompt="email"
                  type="email"
                  value={form.email}
                  onChange={(v) => setForm({ ...form, email: v })}
                  required
                />
                <div>
                  <label className="text-mauve">&gt; message:</label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="mt-1 w-full resize-none border-none bg-transparent text-white placeholder:text-white/30 focus:outline-none"
                    placeholder="type your message..."
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-sm bg-mauve px-6 py-2.5 text-xs font-semibold uppercase tracking-widest text-white transition-transform hover:scale-105 hover:bg-glow hover:text-onyx"
                >
                  <FiSend /> run send.sh
                </button>
                {status === "sent" && (
                  <p className="text-glow">&gt; opening mail client... done.</p>
                )}
              </form>
            </div>
          </div>
        </Reveal>

        {/* Social icons with neon glow on hover */}
        <div className="mt-10 flex items-center justify-center gap-6 text-xl text-white/50">
          <a href={profile.socials.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="transition-all hover:scale-110 hover:text-glow hover:drop-shadow-[0_0_10px_rgba(200,172,214,0.9)]">
            <FiGithub />
          </a>
          <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="transition-all hover:scale-110 hover:text-glow hover:drop-shadow-[0_0_10px_rgba(200,172,214,0.9)]">
            <FiLinkedin />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="transition-all hover:scale-110 hover:text-glow hover:drop-shadow-[0_0_10px_rgba(200,172,214,0.9)]">
            <FiFacebook />
          </a>
          <a href={`mailto:${profile.email}`} aria-label="Email" className="transition-all hover:scale-110 hover:text-glow hover:drop-shadow-[0_0_10px_rgba(200,172,214,0.9)]">
            <FiMail />
          </a>
        </div>
      </div>
    </section>
  );
}

function TerminalField({
  prompt,
  value,
  onChange,
  type = "text",
  required = false,
}: {
  prompt: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="text-mauve">&gt; {prompt}:</label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full border-none bg-transparent text-white placeholder:text-white/30 focus:outline-none"
      />
    </div>
  );
}
