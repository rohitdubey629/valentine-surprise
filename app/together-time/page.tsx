
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import confetti from "canvas-confetti"
import { Heart, RotateCcw, ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useFormattedText } from "@/lib/names-context"
import { TOGETHER_MODES } from "@/lib/together-data"

export default function TogetherTimePage() {
  const router = useRouter()
  const t = useFormattedText()
  const [modeIndex, setModeIndex] = useState(0)
  const [cardIndex, setCardIndex] = useState(0)
  const [completed, setCompleted] = useState(false)
  const [pickedOption, setPickedOption] = useState<"A" | "B" | null>(null)

  const mode = TOGETHER_MODES[modeIndex]
  const card = mode.cards[cardIndex]
  const total = mode.cards.length
  const progress = ((cardIndex + (completed ? 1 : 0)) / total) * 100

  const celebrate = () => {
    confetti({
      particleCount: 90,
      spread: 65,
      origin: { y: 0.6 },
      colors: ["#ec4899", "#a855f7", "#f97316"],
    })
  }

  const goNext = () => {
    if (cardIndex >= total - 1) {
      setCompleted(true)
      celebrate()
      return
    }
    setPickedOption(null)
    setCardIndex((i) => i + 1)
  }

  const handleChoice = (opt: "A" | "B") => {
    setPickedOption(opt)
    setTimeout(goNext, 550)
  }

  const switchMode = (i: number) => {
    setModeIndex(i)
    setCardIndex(0)
    setCompleted(false)
    setPickedOption(null)
  }

  const restart = () => {
    setCardIndex(0)
    setCompleted(false)
    setPickedOption(null)
  }

  return (
    <div className="min-h-screen flex flex-col items-center p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        <h1 className="text-4xl md:text-6xl font-dancing text-rose-600 drop-shadow-sm mb-2">
          Together Time 💕
        </h1>
        <p className="text-rose-800/80 italic">
          Chalo, kuch khaas pal saath bitate hain — phone ek dusre ko pass karo aur khelo!
        </p>
      </motion.div>

      {/* Mode tabs */}
      <div className="flex flex-wrap gap-3 justify-center mb-8">
        {TOGETHER_MODES.map((m, i) => (
          <Button
            key={m.key}
            onClick={() => switchMode(i)}
            variant={i === modeIndex ? "default" : "outline"}
            className={cn(
              "rounded-full border-2 transition-all",
              i === modeIndex
                ? cn("bg-gradient-to-r text-white border-transparent shadow-lg", m.gradient)
                : "text-rose-500 border-rose-200 hover:bg-rose-50"
            )}
          >
            <span className="mr-2">{m.emoji}</span> {m.label}
          </Button>
        ))}
      </div>

      <div className="w-full max-w-xl">
        {/* Progress bar */}
        <div className="h-2 w-full bg-white/50 rounded-full overflow-hidden mb-6 shadow-inner">
          <motion.div
            className={cn("h-full bg-gradient-to-r", mode.gradient)}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
          />
        </div>

        <AnimatePresence mode="wait">
          {!completed ? (
            <motion.div
              key={`${mode.key}-${cardIndex}`}
              initial={{ opacity: 0, y: 30, rotate: -2 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              exit={{ opacity: 0, y: -30, rotate: 2 }}
              transition={{ duration: 0.4 }}
            >
              <Card
                className={cn(
                  "relative overflow-hidden border-4 border-white/60 shadow-2xl bg-gradient-to-br text-white",
                  mode.gradient
                )}
              >
                <CardContent className="p-8 md:p-10 flex flex-col items-center text-center space-y-6 min-h-[280px] justify-center">
                  <p className="text-xs uppercase tracking-widest font-semibold text-white/70">
                    {mode.tagline}
                  </p>

                  {card.type === "choice" ? (
                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {(["A", "B"] as const).map((opt) => {
                        const label = opt === "A" ? card.optionA : card.optionB
                        const isPicked = pickedOption === opt
                        return (
                          <motion.button
                            key={opt}
                            onClick={() => !pickedOption && handleChoice(opt)}
                            whileHover={{ scale: pickedOption ? 1 : 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            animate={isPicked ? { scale: 1.1 } : { scale: 1 }}
                            className={cn(
                              "rounded-2xl p-6 text-lg font-semibold bg-white/15 border-2 border-white/30 transition-colors",
                              isPicked && "bg-white/40 border-white"
                            )}
                          >
                            {label}
                          </motion.button>
                        )
                      })}
                    </div>
                  ) : (
                    <>
                      <span className="text-5xl">
                        {card.type === "truth" ? "💬" : card.type === "dare" ? "🔥" : "💌"}
                      </span>
                      <p className="text-xl md:text-2xl font-medium leading-relaxed">
                        {t(card.text)}
                      </p>
                      <Button
                        onClick={goNext}
                        className="bg-white/90 text-rose-600 hover:bg-white rounded-full px-8 shadow-lg"
                      >
                        Next Card <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </>
                  )}
                </CardContent>
              </Card>

              <p className="text-center text-sm text-rose-700/60 mt-3">
                Card {cardIndex + 1} of {total}
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring" }}
              className="text-center"
            >
              <Card className="bg-white/85 backdrop-blur-md border-2 border-rose-200 shadow-2xl">
                <CardContent className="p-10 space-y-6">
                  <motion.div
                    animate={{ y: [0, -12, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="text-7xl"
                  >
                    💑
                  </motion.div>
                  <h2 className="text-3xl font-dancing text-rose-600 font-bold">
                    Activity Complete! 🎉
                  </h2>
                  <p className="text-rose-800/80">
                    Itna time saath bitane ke liye shukriya. Ek activity aur try karo?
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      onClick={restart}
                      variant="outline"
                      className="rounded-full border-rose-300 text-rose-600 hover:bg-rose-50"
                    >
                      <RotateCcw className="w-4 h-4 mr-2" /> Dobara Khelo
                    </Button>
                    <Button
                      onClick={() => switchMode((modeIndex + 1) % TOGETHER_MODES.length)}
                      variant="romantic"
                      className="rounded-full"
                    >
                      Naya Mode Try Karo <Heart className="w-4 h-4 ml-2 fill-white" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Button
        variant="link"
        className="text-rose-600 font-semibold hover:text-rose-800 mt-10"
        onClick={() => router.push("/")}
      >
        ← Home par wapas jao
      </Button>
    </div>
  )
}
