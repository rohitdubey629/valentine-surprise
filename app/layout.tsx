
import type { Metadata, Viewport } from "next";
import { Inter, Dancing_Script } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const dancingScript = Dancing_Script({ subsets: ["latin"], variable: "--font-dancing" });

export const metadata: Metadata = {
  title: "A Surprise For You ❤️",
  description: "Made with love",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Our Love",
  },
  icons: {
    icon: [
      { url: "/icons/icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/icons/icon-180.png", sizes: "180x180", type: "image/png" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#e11d48",
};


import { MusicProvider } from "@/components/music-provider";
import { FloatingHearts } from "@/components/floating-hearts";
import { NamesProvider } from "@/lib/names-context";
import { NameGate } from "@/components/NameGate";
import { ServiceWorkerRegister } from "@/components/ServiceWorkerRegister";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.variable, dancingScript.variable, "font-sans antialiased min-h-screen bg-gradient-to-br from-pink-100 via-rose-100 to-purple-100 overflow-x-hidden relative")}>
        <ServiceWorkerRegister />
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


