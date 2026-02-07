
"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import confetti from "canvas-confetti"
import { Button } from "@/components/ui/button"

export default function KissDay() {
  const [kissCount, setKissCount] = useState(0)

  const sendKiss = () => {
    setKissCount(prev => prev + 1)
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#e11d48', '#be123c'],

      shapes: ['heart' as any]

    })
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden bg-rose-50 text-center">

      <motion.div 
        layout
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="z-10 bg-white/70 backdrop-blur-md p-12 md:p-16 rounded-[4rem] shadow-xl border-2 border-rose-200"
      >
        <h1 className="text-5xl md:text-7xl font-dancing text-rose-600 mb-8 drop-shadow-sm">
          A kiss for my Love 😘
        </h1>


        <div className="relative h-[12rem] mb-12 flex items-center justify-center">
            {/* Flying Kiss Logic */}
            <motion.div
              whileTap={{ scale: 0.9 }}
              animate={kissCount > 0 ? { 
                scale: [1, 1.2, 0.9, 1.1, 1],
                rotate: [0, -10, 10, -5, 5, 0] 
              } : {}}
              onClick={sendKiss}
              className="text-[10rem] cursor-pointer select-none z-10 hover:drop-shadow-lg transition-all"
            >
              💋
            </motion.div>
            
            <AnimatePresence>
              {kissCount > 0 && [...Array(5)].map((_, i) => (
                <motion.div
                   key={`${kissCount}-${i}`}
                   initial={{ x: 0, y: 0, opacity: 1, scale: 0.5 }}
                   animate={{ 
                     x: (Math.random() - 0.5) * 300, 
                     y: -300 - Math.random() * 200, 
                     opacity: 0, 
                     scale: 2,
                     rotate: Math.random() * 360
                   }}
                   exit={{ opacity: 0 }}
                   transition={{ duration: 2, ease: "easeOut", delay: i * 0.1 }}
                   className="absolute text-5xl text-rose-500 pointer-events-none"
                >
                  😘
                </motion.div>
              ))}
            </AnimatePresence>
        </div>


        <p className="text-2xl text-rose-800 font-medium italic mb-8">
          "Sealed with a kiss, forever yours."
        </p>

        <Button 
          size="lg" 
          variant="romantic"
          className="text-xl px-12 py-6 rounded-full shadow-rose-500/30 hover:shadow-rose-500/50 hover:scale-105 transition-all active:scale-95"
          onClick={sendKiss}
        >
          Send Another Kiss 😘
        </Button>

        {kissCount > 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-rose-400 mt-6 font-semibold"
          >
            Kisses Sent: {kissCount} 💋
          </motion.div>
        )}

      </motion.div>
    </div>
  )
}
