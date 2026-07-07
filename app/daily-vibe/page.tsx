
"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import confetti from "canvas-confetti"
import { Gift, Sparkles, Heart } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useFormattedText } from "@/lib/names-context"
import { DAILY_VIBES } from "@/lib/daily-vibe-data"

const SPARKLE_SPOTS = [
  "-top-3 -left-3",
  "-top-4 right-4",
  "bottom-2 -right-4",
  "top-1/2 -left-6",
  "-bottom-3 left-1/3",
]

export default function DailyVibePage() {
  const router = useRouter()
  const t = useFormattedText()
  const [dayIndex, setDayIndex] = useState<number | null>(null)
  const [showBonus, setShowBonus] = useState(false)

  useEffect(() => {
    setDayIndex(new Date().getDay())
  }, [])

  if (dayIndex === null) return null

  const vibe = DAILY_VIBES[dayIndex]

  const handleBonus = () => {
    setShowBonus(true)

    confetti({
      particleCount: 90,
      spread: 70,
      startVelocity: 35,
      origin: { y: 0.55 },
      colors: ["#f472b6", "#a78bfa", "#fb923c", "#fde047"],
    })

    confetti({
      particleCount: 18,
      spread: 60,
      startVelocity: 25,
      scalar: 2.2,
      origin: { y: 0.55 },
      shapes: [confetti.shapeFromText({ text: "💖", scalar: 2 })],
    })
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-xl w-full space-y-6"
      >
        <p className="text-sm font-semibold uppercase tracking-widest text-rose-500/70">
          Har Din Naya Pyaar
        </p>

        <Card className={cn("relative overflow-hidden border-2 border-white/60 shadow-2xl bg-gradient-to-br text-white", vibe.gradient)}>
          <CardContent className="p-8 md:p-10 space-y-6">
            <motion.div
              key={vibe.day}
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring" }}
              className="text-7xl"
            >
              {vibe.emoji}
            </motion.div>

            <h1 className="text-3xl md:text-4xl font-dancing font-bold drop-shadow-sm">
              {vibe.title}
            </h1>

            <p className="text-lg md:text-xl font-medium leading-relaxed">
              {t(vibe.message)}
            </p>

            <div className="bg-white/15 rounded-xl p-4 text-sm md:text-base font-medium">
              {vibe.task}
            </div>

            <AnimatePresence mode="wait">
              {!showBonus ? (
                <motion.div
                  key="btn"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="relative inline-block"
                >
                  {/* Pulsing glow */}
                  <motion.span
                    className="absolute inset-0 rounded-full bg-white/50 blur-xl"
                    animate={{ scale: [1, 1.35, 1], opacity: [0.4, 0.85, 0.4] }}
                    transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
                  />

                  <Button
                    onClick={handleBonus}
                    className="relative overflow-hidden bg-white text-rose-600 hover:bg-white rounded-full px-8 py-6 text-base md:text-lg font-semibold shadow-2xl"
                  >
                    {/* Shine sweep */}
                    <motion.span
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-rose-100/80 to-transparent"
                      animate={{ x: ["-120%", "120%"] }}
                      transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
                    />
                    <span className="relative flex items-center gap-2">
                      <Gift className="w-5 h-5" />
                      Aaj ka Bonus Kholo
                      <Sparkles className="w-5 h-5" />
                    </span>
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  key="bonus"
                  initial={{ opacity: 0, scale: 0.7, rotateX: -90 }}
                  animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                  transition={{ type: "spring", damping: 12, stiffness: 120 }}
                  className="relative"
                >
                  {SPARKLE_SPOTS.map((spot, i) => (
                    <motion.span
                      key={spot}
                      className={cn("absolute text-xl pointer-events-none select-none", spot)}
                      animate={{ y: [0, -8, 0], opacity: [0.4, 1, 0.4], rotate: [0, 15, 0] }}
                      transition={{ repeat: Infinity, duration: 2 + i * 0.3, delay: i * 0.2 }}
                    >
                      ✨
                    </motion.span>
                  ))}

                  <div className="relative bg-white/15 backdrop-blur-sm border-2 border-white/40 rounded-2xl px-6 py-7 shadow-inner">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.15, type: "spring" }}
                      className="flex justify-center mb-3"
                    >
                      <Heart className="w-7 h-7 fill-white text-white animate-pulse drop-shadow" />
                    </motion.div>
                    <p className="italic font-serif text-white text-lg md:text-xl leading-relaxed">
                      &ldquo;{t(vibe.bonus)}&rdquo;
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>

        <p className="text-rose-800/60 text-sm">
          Kal ek naya din, ek naya feel. Wapas aana! 🔁
        </p>

        <Button
          variant="link"
          className="text-rose-600 font-semibold hover:text-rose-800"
          onClick={() => router.push("/")}
        >
          ← Home par wapas jao
        </Button>
      </motion.div>
    </div>
  )
}
