
"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import confetti from "canvas-confetti"
import { Heart, RotateCcw, Sparkles, Share2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useNames } from "@/lib/names-context"
import { randomLoveScore, loveVerdict } from "@/lib/love-meter"
import { shareOrDownloadLoveCard } from "@/lib/share-card"

type Phase = "idle" | "calculating" | "done"

export default function LoveMeterPage() {
  const router = useRouter()
  const { names } = useNames()
  const [phase, setPhase] = useState<Phase>("idle")
  const [displayScore, setDisplayScore] = useState(0)
  const [finalScore, setFinalScore] = useState(0)
  const [sharing, setSharing] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const verdict = loveVerdict(finalScore)

  useEffect(() => {
    if (phase !== "calculating") return

    intervalRef.current = setInterval(() => {
      setDisplayScore(Math.floor(Math.random() * 100))
    }, 60)

    const settle = setTimeout(() => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      const score = randomLoveScore()
      setFinalScore(score)
      setDisplayScore(score)
      setPhase("done")

      confetti({
        particleCount: 100,
        spread: 75,
        startVelocity: 35,
        origin: { y: 0.55 },
        colors: ["#f472b6", "#a855f7", "#fb923c", "#fde047"],
      })

      if (score >= 96) {
        confetti({
          particleCount: 20,
          spread: 60,
          scalar: 2.2,
          startVelocity: 25,
          origin: { y: 0.55 },
          shapes: [confetti.shapeFromText({ text: "💖", scalar: 2 })],
        })
      }
    }, 1600)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      clearTimeout(settle)
    }
  }, [phase])

  const start = () => {
    setDisplayScore(0)
    setPhase("calculating")
  }

  const reset = () => {
    setPhase("idle")
    setDisplayScore(0)
  }

  const handleShare = async () => {
    setSharing(true)
    try {
      await shareOrDownloadLoveCard({
        me: names.me || "Tum",
        partner: names.partner || "Partner",
        score: finalScore,
        title: verdict.title,
      })
    } catch {
      // ignore share/download failures (e.g. user cancelled)
    } finally {
      setSharing(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-lg w-full space-y-6"
      >
        <p className="text-sm font-semibold uppercase tracking-widest text-rose-500/70">
          Love Meter
        </p>

        <Card className="relative overflow-hidden border-2 border-white/60 shadow-2xl bg-gradient-to-br from-rose-400 via-pink-500 to-fuchsia-600 text-white">
          <CardContent className="p-8 md:p-10 space-y-8">
            <div className="flex items-center justify-center gap-3 text-xl md:text-2xl font-dancing font-bold">
              <span className="truncate max-w-[40%]">{names.me || "Tum"}</span>
              <motion.span
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ repeat: Infinity, duration: 1.1 }}
              >
                <Heart className="w-7 h-7 fill-white text-white" />
              </motion.span>
              <span className="truncate max-w-[40%]">{names.partner || "Partner"}</span>
            </div>

            {/* Meter ring */}
            <div className="relative w-44 h-44 mx-auto">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="10" />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="white"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 42}
                  animate={{ strokeDashoffset: 2 * Math.PI * 42 * (1 - displayScore / 100) }}
                  transition={{ duration: phase === "calculating" ? 0.05 : 0.8, ease: "easeOut" }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold drop-shadow-sm">{displayScore}%</span>
                {phase === "done" && (
                  <Sparkles className="w-5 h-5 mt-1 animate-pulse" />
                )}
              </div>
            </div>

            <AnimatePresence mode="wait">
              {phase === "idle" && (
                <motion.div key="idle" exit={{ opacity: 0, scale: 0.9 }}>
                  <Button
                    onClick={start}
                    className="bg-white/90 text-rose-600 hover:bg-white rounded-full px-8 py-6 text-lg font-semibold shadow-lg"
                  >
                    💘 Check Karo
                  </Button>
                </motion.div>
              )}

              {phase === "calculating" && (
                <motion.p
                  key="calc"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="italic text-white/90 animate-pulse"
                >
                  Calculating pyaar ki taakat...
                </motion.p>
              )}

              {phase === "done" && (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ type: "spring" }}
                  className="space-y-3"
                >
                  <h2 className="text-2xl md:text-3xl font-dancing font-bold drop-shadow-sm">
                    {verdict.title}
                  </h2>
                  <p className="text-white/90 font-serif italic">{verdict.message}</p>

                  <div className="flex flex-wrap gap-3 justify-center mt-2">
                    <Button
                      onClick={handleShare}
                      disabled={sharing}
                      className="rounded-full bg-white/90 text-rose-600 hover:bg-white shadow-lg disabled:opacity-70"
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      {sharing ? "Tayyar kar rahe hain..." : "Share Karo"}
                    </Button>

                    <Button
                      onClick={reset}
                      variant="outline"
                      className="rounded-full bg-white/10 border-2 border-white text-white hover:bg-white/25 hover:text-white"
                    >
                      <RotateCcw className="w-4 h-4 mr-2" /> Dobara Try Karo
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>

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
