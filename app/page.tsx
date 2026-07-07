
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useMusic } from "@/components/music-provider"
import { useFormattedText } from "@/lib/names-context"


import { CONSTANTS } from "@/lib/constants"

export default function LandingPage() {
  const router = useRouter()
  const { play } = useMusic()
  const t = useFormattedText()

  const handleStart = () => {
    play()
    router.push("/proposal")
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="space-y-8"
      >
        <div className="relative inline-block">
          <Heart className="w-24 h-24 text-rose-500 fill-rose-500 animate-pulse" />
          <motion.div
            className="absolute inset-0"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <Heart className="w-24 h-24 text-rose-500/30 fill-rose-500/30" />
          </motion.div>
        </div>

        <motion.h1 
          className="text-6xl md:text-8xl font-dancing text-rose-600 drop-shadow-sm"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {t(CONSTANTS.landing.title)}
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-rose-800 font-medium"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1 }}
        >
          {CONSTANTS.landing.subtitle}
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.5 }}
        >

          <div className="flex flex-col gap-4 items-center justify-center">
            <Button 
              size="lg" 
              variant="romantic"
              className="text-xl px-12 py-8 rounded-full shadow-rose-500/50 hover:shadow-rose-500/70 hover:scale-105 transition-all duration-300"
              onClick={handleStart}
            >
              {CONSTANTS.landing.button}
            </Button>
            
            <Button
              variant="link"
              className="text-rose-600 font-semibold hover:text-rose-800 underline-offset-4"
              onClick={() => router.push("/valentine-week")}
            >
              See Valentine Week Calendar 📅
            </Button>

            <Button
              variant="link"
              className="text-purple-600 font-semibold hover:text-purple-800 underline-offset-4"
              onClick={() => router.push("/daily-vibe")}
            >
              Aaj Ka Vibe ✨
            </Button>

            <Button
              variant="link"
              className="text-fuchsia-600 font-semibold hover:text-fuchsia-800 underline-offset-4"
              onClick={() => router.push("/together-time")}
            >
              Together Time 💑
            </Button>

            <Button
              variant="link"
              className="text-pink-600 font-semibold hover:text-pink-800 underline-offset-4"
              onClick={() => router.push("/love-meter")}
            >
              Love Meter 💘
            </Button>
          </div>

        </motion.div>
      </motion.div>
    </div>
  )
}

