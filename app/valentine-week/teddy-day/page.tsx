"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

import { Button } from "@/components/ui/button"
import confetti from "canvas-confetti"
import { SurpriseReveal } from "@/components/SurpriseReveal"
import { CONSTANTS } from "@/lib/constants"

export default function TeddyDay() {
  const [isHugging, setIsHugging] = useState(false)
  const [loveMeter, setLoveMeter] = useState(0)
  const [message, setMessage] = useState("")

  const handleHug = () => {
    setIsHugging(true)
    const randomMsg = CONSTANTS.teddyDay.messages[Math.floor(Math.random() * CONSTANTS.teddyDay.messages.length)]
    setMessage(randomMsg)
    
    // Increase meter
    if (loveMeter < 100) {
      const newMeter = Math.min(loveMeter + 20, 100)
      setLoveMeter(newMeter)
      
      if (newMeter === 100) {
       // Big confetti explosion
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#f97316', '#fbbf24', '#ffedd5']
        })
      } else {
        // Small confetti
        confetti({
            particleCount: 30,
            spread: 50,
            origin: { y: 0.6 },
            colors: ['#f97316', '#fbbf24']
        })
      }
    }

    setTimeout(() => setIsHugging(false), 800)
  }

  return (
    <SurpriseReveal color="orange">
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden bg-orange-50 text-center">

        {/* Falling Bears Background (faint) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
            {[...Array(10)].map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ y: -100, x: Math.random() * 100 + "%" }}
                    animate={{ y: "110vh", rotate: 360 }}
                    transition={{ 
                        duration: Math.random() * 15 + 10, 
                        repeat: Infinity, 
                        ease: "linear",
                        delay: Math.random() * 20
                    }}
                    className="absolute text-4xl"
                >
                    🧸
                </motion.div>
            ))}
        </div>


      <motion.div 
        layout 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="z-10 bg-white/80 p-8 md:p-16 rounded-[3rem] shadow-2xl backdrop-blur-md border-4 border-orange-200 flex flex-col items-center gap-8 max-w-xl w-full"
      >
        <h1 className="text-4xl md:text-6xl font-dancing text-orange-600 mb-2 drop-shadow-sm">
          {CONSTANTS.teddyDay.title}
        </h1>

        <div className="w-full space-y-2">
            <div className="flex justify-between text-sm text-orange-700 font-bold uppercase tracking-wider">
               <span>{CONSTANTS.teddyDay.loveMeter}</span>
               <span>{loveMeter}%</span>
            </div>
            <div className="h-4 bg-orange-100 rounded-full overflow-hidden border border-orange-200">
               <motion.div 
                 initial={{ width: 0 }}
                 animate={{ width: `${loveMeter}%` }}
                 className="h-full bg-gradient-to-r from-orange-400 to-red-400"
               />
            </div>
        </div>

        <div className="relative w-64 h-64 flex items-center justify-center mt-4">
            {/* Talking Bubble */}
            <AnimatePresence>
               {message && (
                 <motion.div
                   initial={{ opacity: 0, y: 10, scale: 0.8 }}
                   animate={{ opacity: 1, y: 0, scale: 1 }}
                   exit={{ opacity: 0 }}
                   key={message}
                   className="absolute -top-12 bg-white border-2 border-orange-300 px-4 py-2 rounded-xl rounded-bl-none shadow-md whitespace-nowrap z-20"
                 >
                   <p className="text-orange-800 font-medium">{message}</p>
                 </motion.div>
               )}
            </AnimatePresence>

            {/* Teddy Animation Logic */}
            <motion.div
              animate={isHugging ? { 
                scale: [1, 1.1, 0.9, 1],
                rotate: [0, -10, 10, 0]
              } : { 
                y: [0, -5, 0] 
              }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-[10rem] cursor-pointer origin-bottom filter drop-shadow-lg"
              onClick={handleHug}
            >
              🧸
            </motion.div>
            
            {loveMeter === 100 && (
              <motion.div
                 initial={{ scale: 0 }}
                 animate={{ scale: 1.5 }}
                 className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
              >
                <div className="text-6xl">💖</div>
              </motion.div>
            )}
        </div>

        <p className="text-xl text-orange-700 font-medium italic">
          {loveMeter === 100 ? CONSTANTS.teddyDay.fullMessage : CONSTANTS.teddyDay.tapMessage}
        </p>
  
        <Button 
          size="lg" 
          className="bg-orange-400 hover:bg-orange-500 text-white text-xl px-12 py-6 rounded-full shadow-lg transition-transform duration-200 active:scale-95"
          onClick={handleHug}
          disabled={loveMeter === 100}
        >
          {loveMeter === 100 ? CONSTANTS.teddyDay.maxCuteness : CONSTANTS.teddyDay.squeezeButton}
        </Button>
      </motion.div>
    </div>
    </SurpriseReveal>
  )
}
