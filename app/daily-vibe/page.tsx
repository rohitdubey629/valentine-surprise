
"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import confetti from "canvas-confetti"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useFormattedText } from "@/lib/names-context"
import { DAILY_VIBES } from "@/lib/daily-vibe-data"

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
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 },
      colors: ["#f472b6", "#a78bfa", "#fb923c"],
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
                <motion.div key="btn" exit={{ opacity: 0, scale: 0.9 }}>
                  <Button
                    onClick={handleBonus}
                    className="bg-white/90 text-rose-600 hover:bg-white rounded-full px-8 shadow-lg"
                  >
                    ✨ Aaj ka Bonus Kholo
                  </Button>
                </motion.div>
              ) : (
                <motion.p
                  key="bonus"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="italic font-serif text-white/90"
                >
                  {t(vibe.bonus)}
                </motion.p>
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
