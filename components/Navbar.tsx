"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi";
import { navLinks, profile } from "@/data/portfolio";

export default function Navbar() {
  const [active, setActive] = useState("#home");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.querySelector(link.href))
      .filter(Boolean) as Element[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        });
      },
      {
        rootMargin: "-40% 0px -50% 0px",
        threshold: 0,
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-white/[0.06] bg-[#050506]/75 py-3 backdrop-blur-xl"
          : "py-5"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6">
        <a
          href="#home"
          className="font-display text-lg font-semibold tracking-tight text-white"
        >
          {profile.name.split(" ")[0]}
          <span className="text-[#756884]">.</span>
        </a>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`relative px-4 py-2 text-sm font-medium transition-colors ${
                  active === link.href
                    ? "text-white"
                    : "text-white/45 hover:text-white/85"
                }`}
              >
                {link.label}

                {active === link.href && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-x-2 -bottom-1 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent"
                  />
                )}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.07] bg-black/20 text-2xl text-white transition-colors hover:bg-white/[0.05] md:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <HiX /> : <HiMenu />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ height: 0, opacity: 0, y: -8 }}
            animate={{ height: "auto", opacity: 1, y: 0 }}
            exit={{ height: 0, opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="mx-4 mt-3 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#08080b]/92 shadow-[0_20px_60px_rgba(0,0,0,.45)] backdrop-blur-xl md:hidden"
          >
            {navLinks.map((link) => (
              <li key={link.href} className="border-b border-white/[0.05] last:border-b-0">
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`block px-6 py-3.5 text-sm transition-colors ${
                    active === link.href
                      ? "bg-white/[0.04] text-white"
                      : "text-white/55 hover:bg-white/[0.025] hover:text-white"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  );
}
