
"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import confetti from "canvas-confetti"
import { Card, CardContent } from "@/components/ui/card"

export default function ChocolateDay() {
  const [chocolateCount, setChocolateCount] = useState(0)

  // Chocolate rain effect
  useEffect(() => {
    const interval = setInterval(() => {
      confetti({
        particleCount: 2,
        angle: 90,
        spread: 45,
        startVelocity: 5,
        decay: 0.95,
        scalar: 1,
        colors: ['#3e2723', '#5d4037', '#795548', '#8d6e63'], // chocolate browns
        ticks: 200,
        origin: { x: Math.random(), y: -0.1 },
        shapes: ["circle", "square"]
      })
    }, 300)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden bg-amber-50">
      
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center z-10 space-y-8"
      >
        <h1 className="text-5xl md:text-7xl font-dancing text-amber-800 drop-shadow-md">
          Sweet Chocolate Day 🍫
        </h1>
        
        <div className="relative w-64 h-64 mx-auto perspective-1000">
           {/* Simple 3D Card Effect */}
          <motion.div
            initial={{ rotateY: 0 }}
             animate={{ rotateY: 360 }}
             transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
             style={{ transformStyle: "preserve-3d" }}
             className="w-full h-full bg-gradient-to-br from-amber-700 to-orange-900 rounded-3xl shadow-2xl flex items-center justify-center text-white text-4xl font-bold border-4 border-amber-300"
          >
            <div className="flex flex-col items-center gap-4">
               <span className="text-6xl drop-shadow-lg">🍫</span>
               <span className="font-dancing text-3xl">For You</span>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-white/80 p-8 rounded-2xl shadow-xl backdrop-blur-sm max-w-lg mx-auto"
        >
          <p className="text-2xl text-amber-900 font-serif italic mb-4">
            "Because you are sweeter than any chocolate in the world ❤️"
          </p>
          <p className="text-amber-700 font-medium">
            Take a sweet bite!
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}
