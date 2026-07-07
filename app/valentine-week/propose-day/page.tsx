"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import confetti from "canvas-confetti"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { SurpriseReveal } from "@/components/SurpriseReveal"
import { SpecialSurpriseModal } from "@/components/SpecialSurpriseModal"
import { CONSTANTS } from "@/lib/constants"
import { useFormattedText, useNames } from "@/lib/names-context"

export default function ProposeDay() {
  const t = useFormattedText()
  const { names } = useNames()
  const [proposalAccepted, setProposalAccepted] = useState(false)
  const [isBoxOpen, setIsBoxOpen] = useState(false)
  const [isSurpriseOpen, setIsSurpriseOpen] = useState(false)

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
    <SurpriseReveal color="pink">
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
        layout
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="z-10 bg-white/70 backdrop-blur-md p-12 rounded-3xl shadow-2xl border-2 border-rose-200 max-w-2xl w-full"
      >
        <h1 className="text-4xl md:text-6xl font-dancing text-rose-600 mb-8 drop-shadow-sm">
          {CONSTANTS.proposeDay.title}
        </h1>

        {/* Ring Box Animation */}
        <div className="h-40 flex items-center justify-center mb-8 cursor-pointer" onClick={() => setIsBoxOpen(!isBoxOpen)}>
          <AnimatePresence mode="wait">
            {!isBoxOpen ? (
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                whileHover={{ scale: 1.1 }}
                key="closed-box"
                className="text-8xl"
              >
                🎁
                <p className="text-sm text-gray-500 mt-2 font-dancing">{CONSTANTS.proposeDay.tapToOpen}</p>
              </motion.div>
            ) : (
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                key="open-box"
                className="text-8xl relative"
              >
                💍
                <motion.div 
                   className="absolute -top-4 -right-4 text-4xl"
                   animate={{ y: [0, -10, 0], rotate: [0, 10, -10, 0] }}
                   transition={{ repeat: Infinity, duration: 2 }}
                >
                   ✨
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {!proposalAccepted ? (
          <>
            <motion.p 
              className="text-2xl md:text-3xl text-rose-800 font-medium mb-10"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              "{CONSTANTS.proposeDay.question}"
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
                {CONSTANTS.proposeDay.yesButton}
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

            <h2 className="text-3xl md:text-5xl font-dancing text-green-600 mt-4 mb-8">
              {t(CONSTANTS.proposeDay.successTitle)}
            </h2>
            
            {/* Proposal Certificate */}
            <Card className="bg-amber-50 border-4 border-double border-amber-200 p-6 rotate-1 hover:rotate-0 transition-transform duration-500 shadow-xl">
              <CardContent className="space-y-4">
                 <div className="border-b-2 border-amber-200 pb-2">
                    <h3 className="font-serif text-2xl text-amber-800 font-bold uppercase tracking-widest">{CONSTANTS.proposeDay.certificateTitle}</h3>
                 </div>
                 <p className="font-dancing text-3xl text-rose-600">{CONSTANTS.proposeDay.certificateSubtitle}</p>
                 <p className="text-amber-900/60 text-sm">Est. {new Date().getFullYear()}</p>
                 
                 <div className="flex justify-between items-end pt-8 px-4">
                    <div className="text-center">
                       <div className="font-dancing text-xl border-t border-amber-800 w-32 pt-1">{names.me}</div>
                    </div>
                    <div className="text-4xl">🤝</div>
                    <div className="text-center">
                       <div className="font-dancing text-xl border-t border-amber-800 w-32 pt-1">{names.partner}</div>
                    </div>
                 </div>
              </CardContent>
            </Card>


            <p className="text-lg text-rose-700 mt-8 animate-pulse">
              {CONSTANTS.proposeDay.pulseMessage}
            </p>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1 }}
              className="mt-8"
            >
              <Button
                  onClick={() => setIsSurpriseOpen(true)}
                  className="bg-gradient-to-r from-pink-500 to-rose-500 text-white animate-pulse hover:scale-105 transition-transform shadow-lg rounded-full px-8 py-4 text-lg"
              >
                  {CONSTANTS.proposeDay.surpriseButton}
              </Button>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
      
      <SpecialSurpriseModal 
        isOpen={isSurpriseOpen}
        onClose={() => setIsSurpriseOpen(false)}
        imageSrc="/images/propose_day_cartoon.png"
        title={CONSTANTS.proposeDay.modalTitle}
        message={CONSTANTS.proposeDay.modalMessage}
      />

    </div>
    </SurpriseReveal>
  )
}
