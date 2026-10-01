import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono, Press_Start_2P } from "next/font/google";
import CustomCursor from "@/components/CustomCursor";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
});

const pressStart2P = Press_Start_2P({
  subsets: ["latin"],
  variable: "--font-pixel",
  weight: "400",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Marjorie Pulmones | Full Stack Developer",
  description:
    "Portfolio of Marjorie Pulmones — Full Stack Developer building futuristic, high-performance web experiences.",
  keywords: [
    "portfolio",
    "developer",
    "react",
    "next.js",
    "full stack developer",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${pressStart2P.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <body>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
