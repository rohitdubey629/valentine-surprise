"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import confetti from "canvas-confetti"
import { SurpriseReveal } from "@/components/SurpriseReveal"
import { CONSTANTS } from "@/lib/constants"

export default function ChocolateDay() {
  const [isUnwrapped, setIsUnwrapped] = useState(false)

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
    <SurpriseReveal color="amber">
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden bg-amber-50">
      
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center z-10 space-y-12"
      >
        <h1 className="text-5xl md:text-7xl font-dancing text-amber-800 drop-shadow-md">
          {CONSTANTS.chocolateDay.title}
        </h1>
        
        <div className="relative w-72 h-96 mx-auto cursor-pointer perspective-1000" onClick={() => setIsUnwrapped(true)}>
           {/* Chocolate Bar Wrapper */}
           <AnimatePresence>
             {!isUnwrapped && (
               <motion.div
                 initial={{ y: 0 }}
                 exit={{ y: -1000, opacity: 0, rotate: -20 }}
                 transition={{ duration: 1, ease: "anticipate" }}
                 className="absolute inset-0 z-20 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-xl shadow-2xl flex items-center justify-center border-4 border-amber-400"
               >
                 <div className="text-center">
                    <p className="font-bold text-amber-300 text-4xl font-serif">{CONSTANTS.chocolateDay.wrapperText}</p>
                    <p className="text-white mt-4 font-dancing text-2xl animate-pulse">{CONSTANTS.chocolateDay.tapText}</p>
                 </div>
               </motion.div>
             )}
           </AnimatePresence>

           {/* Inner Golden Ticket */}
           <motion.div
             className="absolute inset-0 z-10 bg-gradient-to-br from-yellow-300 via-amber-200 to-yellow-400 rounded-xl shadow-xl flex flex-col items-center justify-center border-8 border-double border-amber-600 p-6"
           >
             <div className="border-4 border-dashed border-amber-800/30 w-full h-full flex flex-col items-center justify-center p-4">
                <p className="text-5xl mb-4">🎫</p>
                <h3 className="text-2xl font-bold text-amber-900 uppercase tracking-widest mb-2">{CONSTANTS.chocolateDay.ticketTitle}</h3>
                <p className="font-dancing text-amber-800 text-xl">
                  {CONSTANTS.chocolateDay.ticketMessage}
                </p>
                <p className="mt-6 text-xs text-amber-900/50 uppercase">{CONSTANTS.chocolateDay.ticketFooter}</p>
             </div>
           </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isUnwrapped ? 1 : 0, y: isUnwrapped ? 0 : 20 }}
          transition={{ delay: 0.5 }}
          className="bg-white/80 p-8 rounded-2xl shadow-xl backdrop-blur-sm max-w-lg mx-auto"
        >
          <p className="text-2xl text-amber-900 font-serif italic mb-4">
            "{CONSTANTS.chocolateDay.quote}"
          </p>
        </motion.div>
      </motion.div>
    </div>
    </SurpriseReveal>
  )
}
