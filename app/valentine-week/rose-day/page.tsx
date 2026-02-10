"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import confetti from "canvas-confetti"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { SurpriseReveal } from "@/components/SurpriseReveal"
import { SpecialSurpriseModal } from "@/components/SpecialSurpriseModal"
import { CONSTANTS } from "@/lib/constants"

export default function RoseDay() {
  const [roseCount, setRoseCount] = useState(0)
  const [showSpecialMessage, setShowSpecialMessage] = useState(false)
  const [isSurpriseOpen, setIsSurpriseOpen] = useState(false)
  const [petals, setPetals] = useState<any[]>([])

  // Trigger special surprise after 5 roses
  useEffect(() => {
    if (roseCount === 5) {
      setTimeout(() => setShowSpecialMessage(true), 500)
    }
  }, [roseCount])

  // Background petals state
  useEffect(() => {
    // Generate petals only once on mount
    const newPetals = [...Array(30)].map((_, i) => ({
      id: i,
      left: Math.random() * 100 + "%",
      duration: Math.random() * 5 + 5,
      delay: Math.random() * 5,
      char: ["🌹", "🌸", "🌺"][Math.floor(Math.random() * 3)]
    }))
    setPetals(newPetals)
  }, [])

  const giveRose = () => {
    setRoseCount(prev => prev + 1)
    
    // Blast roses from random directions
    const randomOriginX = Math.random()
    const randomOriginY = Math.random() > 0.5 ? 1 : 0 // Top or bottom

    confetti({
      particleCount: 40,
      spread: 60,
      origin: { x: randomOriginX, y: 0.8 },
      colors: ['#e11d48', '#be123c', '#fb7185'],
      shapes: ['circle'], // Fallback shape
      scalar: 2,
    })
    
    // We can simulate rose shapes with text if supported or just use red confetti
    // For more impact, let's fire specifically from sides
    confetti({
      particleCount: 30,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: ['#e11d48', '#ff0000']
    })
    confetti({
      particleCount: 30,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: ['#e11d48', '#ff0000']
    })
  }

  return (
    <SurpriseReveal color="rose">
      <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden bg-rose-50">
        
        {/* Heavy Rose Petal Rain */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <AnimatePresence>
            {petals.map((petal) => (
              <motion.div
                key={petal.id}
                initial={{ y: -100, x: 0, opacity: 0, rotate: 0 }}
                animate={{ 
                  y: "110vh", 
                  opacity: [0, 1, 0],
                  rotate: 360 
                }}
                transition={{ 
                  duration: petal.duration,
                  repeat: Infinity,
                  ease: "linear",
                  delay: petal.delay
                }}
                className="absolute text-4xl opacity-60"
                style={{ left: petal.left }}
              >
                {petal.char}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <motion.div 
          layout
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 1 }}
          className="z-10 text-center space-y-8 max-w-lg w-full"
        >
          <h1 className="text-5xl md:text-7xl font-dancing text-rose-600 drop-shadow-md">
            {CONSTANTS.roseDay.title}
          </h1>

          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="text-[10rem] cursor-pointer drop-shadow-2xl filter"
            onClick={giveRose}
          >
            💐
          </motion.div>

          {!showSpecialMessage ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              key="instruction"
            >
              <p className="text-xl md:text-2xl text-rose-800 font-medium mb-4">
                "{CONSTANTS.roseDay.bouquetText}"
              </p>
              <Button 
                size="lg" 
                variant="default" 
                onClick={giveRose}
                className="text-xl px-12 py-8 rounded-full shadow-rose-500/40 hover:shadow-rose-500/60 animate-pulse bg-rose-500 hover:bg-rose-600"
              >
                {CONSTANTS.roseDay.buttonText}
              </Button>
              <p className="text-sm text-rose-500 mt-4">{CONSTANTS.roseDay.hintText}</p>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring" }}
              className="mt-8"
            >
              <Card className="bg-white/90 backdrop-blur-xl border-2 border-rose-300 shadow-2xl overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-r from-rose-100 to-pink-100 opacity-50" />
                <CardContent className="p-8 relative">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <h3 className="text-3xl font-dancing text-rose-600 font-bold mb-4">{CONSTANTS.roseDay.cardTitle}</h3>
                    <p className="text-xl text-rose-900 italic leading-relaxed" dangerouslySetInnerHTML={{ __html: CONSTANTS.roseDay.cardMessage }} />
                    <div className="mt-6 flex justify-center gap-4 text-4xl">
                      <motion.span animate={{ y: [0,-10,0] }} transition={{ repeat: Infinity, delay: 0 }}>🌹</motion.span>
                      <motion.span animate={{ y: [0,-10,0] }} transition={{ repeat: Infinity, delay: 0.2 }}>💑</motion.span>
                      <motion.span animate={{ y: [0,-10,0] }} transition={{ repeat: Infinity, delay: 0.4 }}>🌹</motion.span>
                    </div>
                  </motion.div>
                </CardContent>
              </Card>
              
              <Button 
                variant="outline"
                className="mt-8 text-rose-500 border-rose-200 hover:bg-rose-50"
                onClick={giveRose}
              >
                 {CONSTANTS.roseDay.sendMoreButton} ({roseCount}) 💝
              </Button>

            
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1 }}
              className="mt-8"
            >
              <Button
                  onClick={() => setIsSurpriseOpen(true)}
                  className="bg-gradient-to-r from-red-500 to-rose-600 text-white animate-pulse hover:scale-105 transition-transform shadow-lg rounded-full px-8 py-4 text-lg"
              >
                  {CONSTANTS.roseDay.surpriseButton}
              </Button>
            </motion.div>

          </motion.div>
        )}
      </motion.div>

      <SpecialSurpriseModal 
        isOpen={isSurpriseOpen}
        onClose={() => setIsSurpriseOpen(false)}
        imageSrc="/images/rose_day_cartoon.png"
        title={CONSTANTS.roseDay.modalTitle}
        message={CONSTANTS.roseDay.modalMessage}
      />
    </div>
    </SurpriseReveal>
  )
}
