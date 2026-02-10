"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import confetti from "canvas-confetti"
import { useMusic } from "@/components/music-provider"
import { Button } from "@/components/ui/button"
import { SurpriseReveal } from "@/components/SurpriseReveal"
import { SpecialSurpriseModal } from "@/components/SpecialSurpriseModal"
import { LoveStoryModal } from "@/components/LoveStoryModal"
import { CONSTANTS } from "@/lib/constants"

export default function ValentineDay() {
  const { play } = useMusic()
  const [accepted, setAccepted] = useState(false)
  const [activeSurprise, setActiveSurprise] = useState<string | null>(null)
  const [showStory, setShowStory] = useState(false)

  // Ensure music plays when the component mounts (which is after SurpriseReveal opens)
  useEffect(() => {
    play()
  }, [])

  const handleAccept = () => {
    setAccepted(true)
    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  }

  return (
    <SurpriseReveal color="rose">
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden bg-rose-950 text-rose-50 text-center">
      
      {/* Magical Background */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-rose-950 via-rose-900/40 to-black/80 pointer-events-none" />

      <div className="z-10 max-w-4xl w-full p-4 md:p-8 relative">
        {!accepted ? (
            <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            >
            <div className="mb-12 space-y-6">
                {CONSTANTS.valentineDay.letter.map((line, index) => (
                <motion.p
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.8 + 0.5, duration: 1 }}
                    className={`text-xl md:text-3xl ${index === 0 || index === CONSTANTS.valentineDay.letter.length - 1 ? "font-dancing text-rose-300 font-bold text-3xl md:text-5xl my-4" : "font-serif italic text-rose-100/90 leading-relaxed"}`}
                >
                    {line}
                </motion.p>
                ))}
            </div>

            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: CONSTANTS.valentineDay.letter.length * 0.8 + 1, type: "spring" }}
                className="mt-12"
            >

                <Button
                size="lg"
                className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white text-2xl md:text-3xl py-8 px-12 rounded-full shadow-[0_0_50px_rgba(225,29,72,0.6)] animate-bounce"
                onClick={handleAccept}
                >
                {CONSTANTS.valentineDay.proposalButton}
                </Button>
            </motion.div>
            </motion.div>
        ) : (
            <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex flex-col items-center justify-center min-h-[50vh] gap-8"
            >
                <h1 className="text-5xl md:text-8xl font-dancing text-rose-400 drop-shadow-[0_0_20px_rgba(251,113,133,0.8)]">
                {CONSTANTS.valentineDay.successTitle}
                </h1>

                <p className="text-2xl text-rose-200/80 font-serif">
                {CONSTANTS.valentineDay.successMessage}
                </p>
                
                {/* Floating Memories */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                {[
                  "/images/rose_day_cartoon.png",
                  "/images/propose_day_cartoon.png",
                  "/images/kiss_day_cartoon.png",
                  "/images/valentine_day_cartoon.png"
                ].map((src, i) => (
                    <motion.div 
                    key={i}
                    animate={{ y: [0, -20, 0] }}
                    transition={{ delay: i * 0.2, duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="w-32 h-40 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 flex items-center justify-center overflow-hidden shadow-lg hover:scale-110 transition-transform cursor-pointer"
                    >
                      <img src={src} className="w-full h-full object-cover opacity-90" alt="Memory" />
                    </motion.div>
                ))}
                </div>

                {/* Extra Surprise Options */}
                <div className="mt-12 flex flex-wrap justify-center gap-6">
                   <Button
                      onClick={() => setActiveSurprise("cartoon")}
                      className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white hover:scale-105 transition-transform"
                   >
                      {CONSTANTS.valentineDay.cartoonButton}
                   </Button>

                   <Button
                      onClick={() => setShowStory(true)}
                      className="bg-gradient-to-r from-red-500 via-rose-500 to-pink-500 text-white text-xl px-8 py-6 rounded-full shadow-[0_0_30px_rgba(225,29,72,0.5)] animate-pulse hover:scale-110 transition-transform border-4 border-white/20"
                   >
                      {CONSTANTS.valentineDay.storyButton}
                   </Button>
                   
                   <Button
                      onClick={() => setActiveSurprise("poem")}
                      className="bg-gradient-to-r from-pink-500 to-rose-600 text-white hover:scale-105 transition-transform"
                   >
                      {CONSTANTS.valentineDay.poemButton}
                   </Button>
                </div>
            </motion.div>
        )}
      </div>

      {/* Modals for Surprises */}
      <SpecialSurpriseModal 
        isOpen={activeSurprise === "cartoon"}
        onClose={() => setActiveSurprise(null)}
        imageSrc="/images/valentine_day_cartoon.png"
        title={CONSTANTS.valentineDay.surprises.cartoon.title}
        message={CONSTANTS.valentineDay.surprises.cartoon.message}
      />
      
      <SpecialSurpriseModal 
        isOpen={activeSurprise === "poem"}
        onClose={() => setActiveSurprise(null)}
        imageSrc="🌹" // Fallback to emoji
        title={CONSTANTS.valentineDay.surprises.poem.title}
        message={CONSTANTS.valentineDay.surprises.poem.message}
      />

       <SpecialSurpriseModal 
        isOpen={activeSurprise === "photo"}
        onClose={() => setActiveSurprise(null)}
        imageSrc="/images/propose_day_cartoon.png" // Reusing for now or could be another
        title={CONSTANTS.valentineDay.surprises.photo.title}
        message={CONSTANTS.valentineDay.surprises.photo.message}
      />

      <LoveStoryModal isOpen={showStory} onClose={() => setShowStory(false)} />

    </div>
    </SurpriseReveal>
  )
}
