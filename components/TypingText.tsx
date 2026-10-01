"use client";

import { useEffect, useState } from "react";

/**
 * Simple typewriter effect: types out each word in `words`, pauses,
 * deletes it, then moves to the next — looping forever.
 * Kept deliberately simple: one interval, one piece of state.
 */
export default function TypingText({
  words,
  typingSpeed = 90,
  deletingSpeed = 45,
  pauseMs = 1400,
  className = "",
}: {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseMs?: number;
  className?: string;
}) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex % words.length];

    // Reached full word -> pause, then start deleting
    if (!deleting && text === currentWord) {
      const pause = setTimeout(() => setDeleting(true), pauseMs);
      return () => clearTimeout(pause);
    }

    // Fully deleted -> move to next word
    if (deleting && text === "") {
      setDeleting(false);
      setWordIndex((i) => i + 1);
      return;
    }

    const step = setTimeout(
      () => {
        setText((prev) =>
          deleting ? prev.slice(0, -1) : currentWord.slice(0, prev.length + 1)
        );
      },
      deleting ? deletingSpeed : typingSpeed
    );

    return () => clearTimeout(step);
  }, [text, deleting, wordIndex, words, typingSpeed, deletingSpeed, pauseMs]);

  return (
    <span className={className}>
      {text}
      <span className="animate-blink border-r-2 border-mauve" aria-hidden="true" />
    </span>
  );
}
