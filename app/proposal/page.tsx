
"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import confetti from "canvas-confetti"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart } from "lucide-react"


import { CONSTANTS } from "@/lib/constants"

export default function ProposalPage() {
  const router = useRouter()
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 })
  const [showNoButton, setShowNoButton] = useState(true)

  const moveNoButton = () => {
    const x = Math.random() * (window.innerWidth - 200) - window.innerWidth / 2 + 100
    const y = Math.random() * (window.innerHeight - 200) - window.innerHeight / 2 + 100
    setNoPosition({ x, y })
  }


  const handleYesClick = () => {
    try {
      const audio = new Audio("/success.mp3")
      audio.volume = 0.5
      audio.play().catch(e => console.log("Audio play failed", e))
    } catch (e) {
      console.log("Audio load failed", e)
    }

    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff69b4', '#ff1493', '#ff0000']
    })
    setTimeout(() => {
      router.push("/celebration")
    }, 2000)
  }


  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 overflow-hidden relative">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="max-w-md w-full text-center p-8 bg-white/90 backdrop-blur-md shadow-2xl border-rose-200">
          <CardHeader>
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex justify-center mb-4"
            >
              <Heart className="w-16 h-16 text-rose-500 fill-rose-500" />
            </motion.div>
            <CardTitle className="text-3xl md:text-4xl font-dancing text-rose-600 mb-4">
              {CONSTANTS.proposal.question}
            </CardTitle>
          </CardHeader>

          <CardContent className="flex flex-col md:flex-row gap-8 md:gap-4 items-center justify-center mt-8 w-full">
            <Button
              size="lg"
              className="bg-green-500 hover:bg-green-600 text-white text-xl px-8 py-6 rounded-full shadow-lg hover:scale-110 transition-transform duration-200 w-full md:w-auto z-10"
              onClick={handleYesClick}
            >
              {CONSTANTS.proposal.yesButton}
            </Button>

            <AnimatePresence>
              {showNoButton && (
                <motion.div
                  initial={false}
                  animate={{ x: noPosition.x, y: noPosition.y }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  onHoverStart={moveNoButton}
                  onClick={moveNoButton}
                  className="relative block w-full md:w-auto"
                >
                  <Button
                    variant="outline"
                    size="lg"
                    className="text-xl px-8 py-6 rounded-full border-rose-300 text-rose-500 hover:bg-rose-50 w-full md:w-auto"
                  >
                    {CONSTANTS.proposal.noButton}
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>

        </Card>
      </motion.div>
    </div>
  )
}

