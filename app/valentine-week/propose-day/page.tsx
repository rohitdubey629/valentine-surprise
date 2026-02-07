
"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import confetti from "canvas-confetti"
import { Button } from "@/components/ui/button"

export default function ProposeDay() {
  const [proposalAccepted, setProposalAccepted] = useState(false)

  const handleYes = () => {
    setProposalAccepted(true)
    confetti({
      particleCount: 200,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff69b4', '#ff1493', '#ff0000']
    })
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden bg-rose-50 text-center">

      {/* Heartbeat Background */}
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="absolute inset-0 z-0 flex items-center justify-center opacity-10"
      >
        <span className="text-[50vw] text-rose-300">❤️</span>
      </motion.div>

      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="z-10 bg-white/70 backdrop-blur-md p-12 rounded-3xl shadow-2xl border-2 border-rose-200"
      >
        <h1 className="text-4xl md:text-6xl font-dancing text-rose-600 mb-8 drop-shadow-sm">
          My Heart beats for you... 💍
        </h1>

        <motion.div
           animate={{ rotate: [0, 5, -5, 0] }}
           transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
           className="text-8xl mb-8"
        >
          💑
        </motion.div>

        {!proposalAccepted ? (
          <>
            <motion.p 
              className="text-2xl md:text-3xl text-rose-800 font-medium mb-10"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              "Will you always stay with me? 💍"
            </motion.p>

            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
               <Button
                size="lg"
                className="bg-green-500 hover:bg-green-600 text-white text-2xl px-12 py-8 rounded-full shadow-lg transition-transform duration-200"
                onClick={handleYes}
              >
                YES, FOREVER! 💖
              </Button>
            </motion.div>
          </>
        ) : (
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring" }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-5xl font-dancing text-green-600 mt-4">
              I Love You Too! 😘❤️
            </h2>
            <p className="text-lg text-rose-700 mt-2">Best decision ever!</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
