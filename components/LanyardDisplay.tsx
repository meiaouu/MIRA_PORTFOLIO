"use client";

import dynamic from "next/dynamic";

const Lanyard = dynamic(
  async () => {
    const module = await import("./Lanyard");

    return module.default;
  },
  {
    ssr: false,

    loading: () => (
      <div className="h-full min-h-screen w-full" />
    ),
  }
);

export default function LanyardDisplay() {
  return (
    <div
      className="
        relative
        h-full
        min-h-screen
        w-full
        overflow-hidden
      "
    >
      <Lanyard
        position={[0, 0, 23]}
        gravity={[0, -40, 0]}
        frontImage="/IDme.png"
        backImage="/IDme.png"
        imageFit="contain"
        lanyardImage="/lanyard/lanyard.png"
        lanyardWidth={1}
      />
    </div>
  );
}