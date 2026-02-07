
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rohit ❤️ Shreya - Valentine Week",
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
      <div className="fixed bottom-4 right-4 z-50 pointer-events-none animate-pulse">
        <p className="font-dancing text-xl md:text-2xl text-rose-600 drop-shadow-sm bg-white/80 backdrop-blur-sm px-6 py-2 rounded-full border border-rose-200 shadow-lg">
          Rohit ❤️ Shreya
        </p>
      </div>
      
      {/* Home Button for convenience */}
       <div className="fixed top-4 left-4 z-50">
        <a href="/valentine-week" className="block text-2xl drop-shadow-lg hover:scale-110 transition-transform" title="Back to Week">
           🏠
        </a>
      </div>
    </div>
  );
}
