
import type { Metadata } from "next";
import { Inter, Dancing_Script } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const dancingScript = Dancing_Script({ subsets: ["latin"], variable: "--font-dancing" });

export const metadata: Metadata = {
  title: "A Surprise For You ❤️",
  description: "Made with love",
};


import { MusicProvider } from "@/components/music-provider";
import { FloatingHearts } from "@/components/floating-hearts";
import { NamesProvider } from "@/lib/names-context";
import { NameGate } from "@/components/NameGate";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.variable, dancingScript.variable, "font-sans antialiased min-h-screen bg-gradient-to-br from-pink-100 via-rose-100 to-purple-100 overflow-x-hidden relative")}>
        <NamesProvider>
          <MusicProvider>
            <FloatingHearts />
            <NameGate>{children}</NameGate>
          </MusicProvider>
        </NamesProvider>
      </body>
    </html>
  );
}


