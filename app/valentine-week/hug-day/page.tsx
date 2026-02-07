
"use client"

import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import confetti from "canvas-confetti"
import { useMusic } from "@/components/music-provider"
import { Button } from "@/components/ui/button"

export default function HugDay() {
  const { play } = useMusic()
  const [hugStatus, setHugStatus] = useState("idle") // idle, charging, sent
  const [hugDuration, setHugDuration] = useState(0)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Ensure music is playing
  useEffect(() => {
    play()
  }, [])

  const startHug = () => {
    setHugStatus("charging")
    setHugDuration(0)
    timerRef.current = setInterval(() => {
      setHugDuration(prev => prev + 0.1)
    }, 100)
  }

  const releaseHug = () => {
    if (hugStatus !== "charging") return
    
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }

    setHugStatus("sent")
    
    if (hugDuration > 3) {
      // Massive hug
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#fbbf24', '#f59e0b', '#d97706']
      })
    } else {
      confetti({
        particleCount: 50,
        origin: { y: 0.6 }
      })
    }

    // Reset after delay
    setTimeout(() => {
      setHugStatus("idle")
      setHugDuration(0)
    }, 3000)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden bg-yellow-50 text-center select-none">

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
        <h1 className="text-4xl md:text-7xl font-dancing text-yellow-600 drop-shadow-sm">
          A Big Warm Hug 🤗
        </h1>

        <div className="relative h-[20rem] flex items-center justify-center">
          <motion.div
            animate={{ 
              scale: hugStatus === "charging" ? 1 + (hugDuration * 0.2) : 1,
              opacity: hugStatus === "sent" ? 0 : 1
            }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
            className="text-[10rem] md:text-[14rem] z-10 cursor-pointer"
            onMouseDown={startHug}
            onMouseUp={releaseHug}
            onMouseLeave={releaseHug}
            onTouchStart={startHug}
            onTouchEnd={releaseHug}
          >
            🫂
          </motion.div>
          
          {/* Shockwave effect */}
          <AnimatePresence>
            {hugStatus === "sent" && (
              <motion.div
                initial={{ scale: 1, opacity: 0.8, border: "4px solid #f59e0b" }}
                animate={{ scale: 3, opacity: 0, borderWidth: "0px" }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="absolute inset-0 rounded-full bg-yellow-400/30"
              />
            )}
          </AnimatePresence>
          
          <motion.div
             className="absolute top-0 right-0 -mr-10 -mt-10 text-6xl"
             initial={{ scale: 0 }}
             animate={{ scale: hugStatus === "charging" ? [0, 1.2, 1] : 0 }}
          >
            ❤️
          </motion.div>
        </div>

        <div className="h-12 w-full max-w-md">
           {hugStatus === "charging" && (
             <p className="text-2xl font-bold text-yellow-600 animate-pulse">
               Charging Hug... {hugDuration.toFixed(1)}s
             </p>
           )}
           {hugStatus === "sent" && (
             <motion.p 
               initial={{ scale: 0.5, opacity: 0 }}
               animate={{ scale: 1.5, opacity: 1 }}
               className="text-3xl font-dancing font-bold text-orange-600"
             >
               {hugDuration > 3 ? "MEGA BEAR HUG SENT! 🐻💥" : "Warm Hug Sent! 🤗"}
             </motion.p>
           )}
           {hugStatus === "idle" && (
             <p className="text-xl text-yellow-800 font-serif italic">
               Hold the emoji to send a bigger hug!
             </p>
           )}
        </div>

        <Button 
          size="lg"
          className="bg-yellow-500 hover:bg-yellow-600 text-white text-xl px-12 py-8 rounded-full shadow-lg"
          onMouseDown={startHug}
          onMouseUp={releaseHug}
          onMouseLeave={releaseHug}
          onTouchStart={startHug}
          onTouchEnd={releaseHug}
        >
          Hold to Hug 🤗
        </Button>

      </motion.div>
    </div>
  )
}

