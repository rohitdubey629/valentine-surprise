
"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import { useMusic } from "@/components/music-provider"

export default function HugDay() {
  const { play } = useMusic()

  // Ensure music is playing for the mood
  useEffect(() => {
    play()
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden bg-yellow-50 text-center">

      {/* Heartbeat Background */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="absolute inset-0 bg-gradient-to-br from-yellow-100 to-orange-100 -z-10"
      />

      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="z-10 bg-white/60 backdrop-blur-xl p-12 rounded-[3rem] shadow-2xl border-4 border-yellow-200 max-w-4xl w-full flex flex-col items-center justify-center gap-12"
      >
        <h1 className="text-5xl md:text-8xl font-dancing text-yellow-600 drop-shadow-sm">
          A Big Warm Hug 🤗
        </h1>

        <div className="relative text-[12rem] md:text-[16rem] leading-none">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, type: "spring" }}
            className="inline-block relative z-10"
          >
            🫂
          </motion.div>
          
          <motion.div
             className="absolute top-0 right-0 -mr-16 -mt-16 text-6xl"
             initial={{ scale: 0 }}
             animate={{ scale: [0, 1.2, 1] }}
             transition={{ delay: 1, duration: 0.5 }}
          >
            ❤️
          </motion.div>
        </div>

        <p className="text-2xl md:text-3xl text-yellow-800 font-serif italic max-w-2xl leading-relaxed">
          "Sometimes a hug is all inside content needed to make everything better. Sending you the warmest hug today and always."
        </p>

        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 2, duration: 1 }}
           className="text-sm text-yellow-600/60 uppercase tracking-widest font-semibold"
        >
          Feel the warmth
        </motion.div>

      </motion.div>
    </div>
  )
}
