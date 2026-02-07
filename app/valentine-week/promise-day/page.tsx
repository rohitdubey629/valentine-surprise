
"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import confetti from "canvas-confetti"
import { Check, HandHeart } from "lucide-react"
import { Button } from "@/components/ui/button"

const PROMISES = [
  "Always love you ❤️",
  "Protect you 🤝",
  "Support you 💪",
  "Make you smile 😘"
]

export default function PromiseDay() {
  const [checkedPromises, setCheckedPromises] = useState<number[]>([])

  const togglePromise = (index: number) => {
    if (checkedPromises.includes(index)) {
      setCheckedPromises(prev => prev.filter(i => i !== index))
    } else {
      setCheckedPromises(prev => [...prev, index])
      // Confetti for each check
      confetti({
        particleCount: 50,
        spread: 30,
        origin: { x: 0.5, y: 0.5 },
        colors: ['#3b82f6', '#1e40af'],
        shapes: ['star']
      })
    }
  }

  const allChecked = checkedPromises.length === PROMISES.length

  const handleFinalPromise = () => {
    confetti({
      particleCount: 200,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#3b82f6', '#1e40af', '#60a5fa']
    })
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden bg-blue-50">
      
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="z-10 bg-white/80 p-8 md:p-12 rounded-3xl shadow-xl backdrop-blur-md border border-blue-100 max-w-lg w-full space-y-8"
      >
        <div className="text-center">
          <HandHeart className="w-16 h-16 mx-auto text-blue-500 mb-4 animate-pulse" />
          <h1 className="text-4xl md:text-6xl font-dancing text-blue-600 drop-shadow-sm">
            My Promise to You 🤝
          </h1>
          <p className="text-blue-800/80 mt-2 italic">Check each promise to seal it!</p>
        </div>

        <div className="space-y-4">
          {PROMISES.map((promise, index) => {
            const isChecked = checkedPromises.includes(index)
            return (
              <motion.div
                key={index}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.2 }}
                onClick={() => togglePromise(index)}
                className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all duration-300 border-2 ${isChecked ? "bg-blue-100 border-blue-400 scale-105 shadow-md" : "bg-white border-gray-200 hover:border-blue-200"}`}
              >
                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors ${isChecked ? "bg-blue-500 border-blue-500" : "border-gray-300"}`}>
                  {isChecked && <Check className="w-5 h-5 text-white" />}
                </div>
                <span className={`text-xl font-medium ${isChecked ? "text-blue-900" : "text-gray-600"}`}>{promise}</span>
              </motion.div>
            )
          })}
        </div>

        <AnimatePresence>
          {allChecked && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="pt-4 text-center"
            >
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 text-white text-xl px-10 py-6 rounded-full shadow-blue-500/30 shadow-lg w-full animate-bounce"
                onClick={handleFinalPromise}
              >
                I Promise Forever! 💙
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

      </motion.div>
    </div>
  )
}
