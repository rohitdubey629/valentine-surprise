
"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Flower } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function RoseDay() {
  const [roseCount, setRoseCount] = useState(0)

  const giveRose = () => {
    setRoseCount(prev => prev + 1)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden bg-rose-50">
      
      {/* Falling Petals Background */}
      <AnimatePresence>
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: -100, x: Math.random() * 100 + "%", opacity: 0, rotate: 0 }}
            animate={{ 
              y: "110vh", 
              opacity: [0, 1, 0],
              rotate: 360 
            }}
            transition={{ 
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5
            }}
            className="absolute text-rose-400 text-2xl z-0"
          >
            🌸
          </motion.div>
        ))}
      </AnimatePresence>

      <motion.div 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", duration: 1 }}
        className="z-10 text-center space-y-8"
      >
        <h1 className="text-5xl md:text-7xl font-dancing text-rose-600 drop-shadow-md">
          Happy Rose Day 🌹
        </h1>

        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="text-9xl cursor-pointer"
          onClick={giveRose}
        >
          🌹
        </motion.div>

        <p className="text-xl md:text-2xl text-rose-800 font-medium max-w-md mx-auto">
          "For my forever love, this rose is only for you ❤️"
        </p>

        <div className="space-y-4">
          <Button 
            size="lg" 
            variant="romantic"
            onClick={giveRose}
            className="text-xl px-10 py-6 rounded-full shadow-rose-500/40 hover:shadow-rose-500/60"
          >
            Give Another Rose 🌹
          </Button>
          
          {roseCount > 0 && (
            <motion.p 
              key={roseCount}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-rose-600 font-bold text-lg"
            >
              You gave {roseCount} roses! 🌸
            </motion.p>
          )}
        </div>
      </motion.div>
    </div>
  )
}
