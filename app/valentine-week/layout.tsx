
import type { Metadata } from "next";
import { CoupleSignature } from "@/components/CoupleSignature";

export const metadata: Metadata = {
  title: "Valentine Week ❤️",
  description: "A special surprise for my love",
};

export default function ValentineWeekLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen">
      {children}

      {/* Persistent Couple Signature */}
      <CoupleSignature />

      {/* Home Button for convenience */}
       <div className="fixed top-4 left-4 z-50">
        <a href="/valentine-week" className="block text-2xl drop-shadow-lg hover:scale-110 transition-transform" title="Back to Week">
           🏠
        </a>
      </div>
    </div>
  );
}
