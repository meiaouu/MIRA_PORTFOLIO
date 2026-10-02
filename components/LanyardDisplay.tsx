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

        /*
         * cover = fills more of the ID
         * contain = shows whole image
         */
        imageFit="cover"
        imageOffsetY={-0.12}
        /*
         * IMAGE SIZE
         *
         * 1    = normal
         * 1.1  = slightly bigger
         * 1.2  = recommended
         * 1.3+ = much bigger
         */
        imageZoom={1.4}

        /*
         * IMAGE BRIGHTNES
         *
         * 1    = normal
         * 0.8  = slightly darker
         * 0.7  = recommended
         * 0.6  = darker
         */
        imageBrightness={0.6}

        /* LANYARD */
        lanyardImage="/lanyard/lanyard.png"
        lanyardWidth={1}
      />
    </div>
  );
}