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

        /* ID IMAGE */
        frontImage="/IDme2.png"
        backImage="/IDme2.png"

        /* Fill the ID */
        imageFit="cover"

        /* Move image upward */
        imageOffsetY={-0.12}

        /* Make IDme2.png larger */
        imageZoom={1.7}

        /* Normal brightness / no dark filter */
        imageBrightness={1}

        /* LANYARD */
        lanyardImage="/lanyard/lanyard.png"
        lanyardWidth={2}
      />
    </div>
  );
}