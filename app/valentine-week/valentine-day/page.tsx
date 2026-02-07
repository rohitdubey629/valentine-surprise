
"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import confetti from "canvas-confetti"
import { useMusic } from "@/components/music-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"


const LOVE_LETTER = [
  "My Dearest Shreya ❤️",
  "From the moment you entered my life,",
  "You became my favorite person.",
  "Your smile is my sunshine,",
  "Your love is my forever home.",
  "I promise to cherish you,",
  "To love you more each day,",
  "And to be yours, always.",
  "Happy Valentine's Day, My Love! 💖",
  "Forever Yours, Rohit 💑"
]


export default function ValentineDay() {
  const { play } = useMusic()
  const [isGiftOpen, setIsGiftOpen] = useState(false)
  const [accepted, setAccepted] = useState(false)

  useEffect(() => {
    play()
  }, [])

  const handleOpenGift = () => {
    setIsGiftOpen(true)
    play()
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    })
  }

  const handleAccept = () => {
    setAccepted(true)
    const duration = 15 * 1000;
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
      
      {/* Magical Background */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-rose-950 via-rose-900/40 to-black/80 pointer-events-none" />

      <AnimatePresence mode="wait">
        {!isGiftOpen ? (
          <motion.div
            key="gift-box"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 2, opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="z-10 flex flex-col items-center gap-8 cursor-pointer"
            onClick={handleOpenGift}
          >
             <div className="relative group">
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-rose-500 rounded-full blur-[100px] opacity-20 group-hover:opacity-40 transition-opacity duration-1000" />
                
                <motion.div
                  animate={{ 
                    y: [0, -20, 0],
                    rotate: [0, -5, 5, 0]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="text-[10rem] md:text-[15rem] relative z-10 drop-shadow-[0_0_50px_rgba(225,29,72,0.5)]"
                >
                  🎁
                </motion.div>
                
                <p className="mt-8 text-2xl font-dancing text-rose-200 animate-pulse">
                  Tap to Open Your Surprise ✨
                </p>
             </div>
          </motion.div>
        ) : (
          <motion.div 
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="z-10 max-w-4xl w-full p-4 md:p-8 relative"
          >
            {!accepted ? (
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="mb-12 space-y-6">
                  {LOVE_LETTER.map((line, index) => (
                    <motion.p
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.8 + 0.5, duration: 1 }}
                      className={`text-xl md:text-3xl ${index === 0 || index === LOVE_LETTER.length - 1 ? "font-dancing text-rose-300 font-bold text-3xl md:text-5xl my-4" : "font-serif italic text-rose-100/90 leading-relaxed"}`}
                    >
                      {line}
                    </motion.p>
                  ))}
                </div>

                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: LOVE_LETTER.length * 0.8 + 1, type: "spring" }}
                  className="mt-12"
                >

                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white text-2xl md:text-3xl py-8 px-12 rounded-full shadow-[0_0_50px_rgba(225,29,72,0.6)] animate-bounce"
                    onClick={handleAccept}
                  >
                    Be My Valentine Forever, Shreya? 💍
                  </Button>
                </motion.div>
              </motion.div>
            ) : (
               <motion.div
                 initial={{ scale: 0.5, opacity: 0 }}
                 animate={{ scale: 1, opacity: 1 }}
                 className="flex flex-col items-center justify-center min-h-[50vh] gap-8"
               >
                 <h1 className="text-5xl md:text-8xl font-dancing text-rose-400 drop-shadow-[0_0_20px_rgba(251,113,133,0.8)]">
                   I Love You Shreya! ❤️
                 </h1>

                 <p className="text-2xl text-rose-200/80 font-serif">
                   You are the best thing that ever happened to me.
                 </p>
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                    {/* Floating Memories */}
                    {[1,2,3,4].map((i) => (
                      <motion.div 
                        key={i}
                        animate={{ y: [0, -20, 0] }}
                        transition={{ delay: i * 0.2, duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        className="w-32 h-40 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 flex items-center justify-center text-4xl"
                      >
                        📸
                      </motion.div>
                    ))}
                 </div>
               </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

