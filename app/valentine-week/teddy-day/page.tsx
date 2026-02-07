
"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"

export default function TeddyDay() {
  const [isHugging, setIsHugging] = useState(false)

  const toggleHug = () => setIsHugging(!isHugging)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden bg-orange-50 text-center">

      <AnimatePresence>
        {isHugging && (
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1.5, opacity: 0.2 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 bg-yellow-100 rounded-full flex items-center justify-center z-0"
          >
             <div className="w-[100vw] h-[100vw] rounded-full bg-yellow-200/50 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-3xl animate-pulse" />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        layout 
        className="z-10 bg-white/80 p-12 md:p-16 rounded-[3rem] shadow-2xl backdrop-blur-md border-4 border-orange-200 flex flex-col items-center gap-8 max-w-2xl w-full"
      >
        <h1 className="text-5xl md:text-7xl font-dancing text-orange-600 mb-4 drop-shadow-sm">
          Happy Teddy Day 🧸
        </h1>

        <div className="relative w-64 h-64 flex items-center justify-center">
            {/* Teddy Animation Logic */}
            <motion.div
              animate={isHugging ? { 
                scale: [1, 0.9, 1],
                rotate: [0, -5, 5, 0],
                x: [0, -10, 10, 0] 
              } : { 
                y: [0, -10, 0] 
              }}
              transition={isHugging ? { 
                duration: 0.5, 
                repeat: Infinity,
                repeatType: "mirror"
              } : {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="text-[10rem] cursor-pointer origin-bottom"
              onClick={toggleHug}
            >
              🧸
            </motion.div>
            
            {isHugging && (
              <motion.div
                 initial={{ scale: 0, opacity: 0 }}
                 animate={{ scale: 1.2, opacity: 1, y: -20 }}
                 className="absolute top-0 right-0 text-6xl"
              >
                ❤️
              </motion.div>
            )}
        </div>

        <p className="text-2xl text-orange-800 font-medium italic">
          {isHugging ? "Big warm bear Hugs! 🤗" : "Sending you a warm bear hug..."}
        </p>
  
        <Button 
          size="lg" 
          className="bg-orange-400 hover:bg-orange-500 text-white text-xl px-12 py-6 rounded-full shadow-lg transition-transform duration-200 active:scale-95"
          onClick={toggleHug}
        >
          {isHugging ? "Release Hug 😅" : "Give Teddy a Hug 🤗"}
        </Button>
      </motion.div>
    </div>
  )
}
