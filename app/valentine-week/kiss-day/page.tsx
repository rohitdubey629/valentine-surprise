"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import confetti from "canvas-confetti"
import { Button } from "@/components/ui/button"
import { SurpriseReveal } from "@/components/SurpriseReveal"
import { SpecialSurpriseModal } from "@/components/SpecialSurpriseModal"
import { CONSTANTS } from "@/lib/constants"

export default function KissDay() {
  const [kissCount, setKissCount] = useState(0)
  const [kisses, setKisses] = useState<{id: number, x: number, y: number, rotation: number}[]>([])
  const [isSurpriseOpen, setIsSurpriseOpen] = useState(false)
  
  const handleContainerClick = (e: React.MouseEvent) => {
    // Add a lipstick mark at click position
    const newKiss = {
      id: Date.now(),
      x: e.clientX,
      y: e.clientY,
      rotation: Math.random() * 40 - 20
    }
    setKisses(prev => [...prev, newKiss])
  }

  const sendKiss = (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent container click
    setKissCount(prev => prev + 1)
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#e11d48', '#be123c'],
      shapes: ['heart' as any] 
    })
  }

  return (
    <SurpriseReveal color="rose">
    <div 
      className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden bg-rose-50 text-center cursor-crosshair"
      onClick={handleContainerClick}
    >
      
      {/* Lipstick Marks */}
      <AnimatePresence>
        {kisses.map((kiss) => (
          <motion.div
            key={kiss.id}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 0.6, scale: 1 }}
            exit={{ opacity: 0 }}
            className="absolute text-4xl text-rose-600 pointer-events-none z-0"
            style={{ 
              left: kiss.x, 
              top: kiss.y, 
              rotate: kiss.rotation,
              translateX: "-50%",
              translateY: "-50%"
            }}
          >
            💋
          </motion.div>
        ))}
      </AnimatePresence>

      <motion.div 
        layout
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="z-10 bg-white/70 backdrop-blur-md p-12 md:p-16 rounded-[4rem] shadow-xl border-2 border-rose-200"
        onClick={(e) => e.stopPropagation()} // Prevent adding kisses when clicking card
      >
        <h1 className="text-5xl md:text-7xl font-dancing text-rose-600 mb-8 drop-shadow-sm select-none">
          {CONSTANTS.kissDay.title}
        </h1>
        <p className="text-sm text-rose-400 mb-4">{CONSTANTS.kissDay.subtitle}</p>

        <div className="relative h-[12rem] mb-12 flex items-center justify-center">

            {/* Flying Kiss Logic */}
            <motion.div
              whileTap={{ scale: 0.9 }}
              animate={kissCount > 0 ? { 
                scale: [1, 1.2, 0.9, 1.1, 1],
                rotate: [0, -10, 10, -5, 5, 0] 
              } : {}}
              onClick={sendKiss}
              className="text-[10rem] cursor-pointer select-none z-10 hover:drop-shadow-lg transition-all"
            >
              💋
            </motion.div>
            
            <AnimatePresence>
              {kissCount > 0 && [...Array(5)].map((_, i) => (
                <motion.div
                   key={`${kissCount}-${i}`}
                   initial={{ x: 0, y: 0, opacity: 1, scale: 0.5 }}
                   animate={{ 
                     x: (Math.random() - 0.5) * 300, 
                     y: -300 - Math.random() * 200, 
                     opacity: 0, 
                     scale: 2,
                     rotate: Math.random() * 360
                   }}
                   exit={{ opacity: 0 }}
                   transition={{ duration: 2, ease: "easeOut", delay: i * 0.1 }}
                   className="absolute text-5xl text-rose-500 pointer-events-none"
                >
                  😘
                </motion.div>
              ))}
            </AnimatePresence>
        </div>


        <p className="text-2xl text-rose-800 font-medium italic mb-8">
          "{CONSTANTS.kissDay.quote}"
        </p>

        <div className="flex flex-col gap-4">
            <Button 
                size="lg" 
                variant="default" // Changed from 'romantic' to 'default' or standard variant if 'romantic' is custom and might break
                className="bg-rose-500 hover:bg-rose-600 text-white text-xl px-12 py-6 rounded-full shadow-rose-500/30 hover:shadow-rose-500/50 hover:scale-105 transition-all active:scale-95"
                onClick={sendKiss}
            >
                {CONSTANTS.kissDay.button}
            </Button>
            
            <Button
                onClick={() => setIsSurpriseOpen(true)}
                className="bg-gradient-to-r from-pink-500 to-rose-500 text-white animate-pulse hover:scale-105 transition-transform shadow-lg rounded-full px-8 py-4 text-lg"
            >
                {CONSTANTS.kissDay.surpriseButton}
            </Button>
        </div>


        {kissCount > 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-rose-400 mt-6 font-semibold"
          >
            Kisses Sent: {kissCount} 💋
          </motion.div>
        )}

      </motion.div>
      
      <SpecialSurpriseModal 
        isOpen={isSurpriseOpen}
        onClose={() => setIsSurpriseOpen(false)}
        imageSrc="/images/kiss_day_cartoon.png"
        title={CONSTANTS.kissDay.modalTitle}
        message={CONSTANTS.kissDay.modalMessage}
      />

    </div>
    </SurpriseReveal>
  )
}
