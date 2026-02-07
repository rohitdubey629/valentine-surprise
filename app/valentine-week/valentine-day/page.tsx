
"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import confetti from "canvas-confetti"
import { useMusic } from "@/components/music-provider"

const LOVE_LETTER = [
  "My Dearest Valentine ❤️",
  "From the moment you entered my life,",
  "You became my favorite person.",
  "Your smile is my sunshine,",
  "Your love is my forever home.",
  "I promise to cherish you,",
  "To love you more each day,",
  "And to be yours, always.",
  "Happy Valentine's Day, My Love! 💖"
]

const GALLERY_IMAGES = [
  "/gallery/1.jpg", 
  "/gallery/2.jpg",
  "/gallery/3.jpg",
  // In a real app these would be real paths, here we simulate with placeholders or colors
]

export default function ValentineDay() {
  const { play } = useMusic()
  const [currentLine, setCurrentLine] = useState(0)
  const [showGallery, setShowGallery] = useState(false)

  useEffect(() => {
    play()
    
    // Typewriter effect logic
    if (currentLine < LOVE_LETTER.length) {
      const timeout = setTimeout(() => {
        setCurrentLine(prev => prev + 1)
      }, 2500)
      return () => clearTimeout(timeout)
    } else {
      setTimeout(() => setShowGallery(true), 1000)
      fireworks()
    }
  }, [currentLine, play])

  const fireworks = () => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden bg-rose-950 text-rose-50 text-center">
      
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-rose-950 via-transparent to-rose-900/50 pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="z-10 max-w-4xl w-full p-8 md:p-16 relative"
      >
        <div className="mb-12 space-y-6 min-h-[50vh] flex flex-col items-center justify-center">
          {LOVE_LETTER.slice(0, currentLine + 1).map((line, index) => (
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className={`text-xl md:text-4xl ${index === 0 || index === LOVE_LETTER.length - 1 ? "font-dancing text-rose-300 font-bold text-3xl md:text-5xl my-4" : "font-serif italic text-rose-100/90"}`}
            >
              {line}
            </motion.p>
          ))}
        </div>

        <AnimatePresence>
          {showGallery && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="mt-12"
            >
              <h2 className="text-3xl font-dancing text-rose-300 mb-8">Our Beautiful Memories</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                 {/* Placeholder for Gallery - using colors for now */}
                 {[1, 2, 3].map((i) => (
                   <motion.div
                     key={i}
                     whileHover={{ scale: 1.05, rotate: Math.random() * 4 - 2 }}
                     className="aspect-[4/5] bg-rose-800/50 rounded-2xl border border-rose-700/50 flex items-center justify-center overflow-hidden relative shadow-lg group"
                   >
                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                        <span className="text-white font-dancing text-xl">Love Memory {i}</span>
                     </div>
                     <span className="text-6xl opacity-50">📸</span>
                   </motion.div>
                 ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </motion.div>
    </div>
  )
}
