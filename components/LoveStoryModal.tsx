"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ArrowRight, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"

interface LoveStoryModalProps {
  isOpen: boolean
  onClose: () => void
}

const STORY_STEPS = [
  {
    image: "/images/rose_day_cartoon.png",
    text: "It started with a rose... and a promise of love. 🌹",
    title: "The Beginning"
  },
  {
    image: "/images/propose_day_cartoon.png",
    text: "Then I asked you to be mine forever... and you said YES! 💍",
    title: "The Proposal"
  },
  {
    image: "/images/kiss_day_cartoon.png",
    text: "Sealed with a kiss, our bond grew stronger every day. 💋",
    title: "The Passion"
  },
  {
    image: "/images/valentine_day_cartoon.png",
    text: "Now here we are, celebrating our love. You are my world, Shreya! ❤️",
    title: "Forever & Always"
  }
]

export function LoveStoryModal({ isOpen, onClose }: LoveStoryModalProps) {
  const [currentStep, setCurrentStep] = useState(0)

  // Reset step when opening
  useEffect(() => {
    if (isOpen) setCurrentStep(0)
  }, [isOpen])

  const nextStep = () => {
    if (currentStep < STORY_STEPS.length - 1) {
      setCurrentStep(prev => prev + 1)
    } else {
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="relative bg-white rounded-3xl overflow-hidden max-w-2xl w-full shadow-2xl border-4 border-rose-300"
          >
             {/* Progress Bar */}
             <div className="absolute top-0 left-0 w-full h-2 bg-gray-200">
               <motion.div 
                 className="h-full bg-rose-500"
                 initial={{ width: "0%" }}
                 animate={{ width: `${((currentStep + 1) / STORY_STEPS.length) * 100}%` }}
               />
             </div>

             <Button 
               onClick={onClose}
               variant="ghost" 
               className="absolute top-4 right-4 z-20 text-gray-500 hover:text-rose-600"
             >
               <X className="w-6 h-6" />
             </Button>

             <div className="p-8 flex flex-col items-center text-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.5 }}
                    className="w-full flex flex-col items-center"
                  >
                     <h2 className="text-3xl font-dancing font-bold text-rose-600 mb-6 drop-shadow-sm">
                       {STORY_STEPS[currentStep].title}
                     </h2>
                     
                     <div className="relative w-full aspect-video md:aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border-2 border-rose-100 mb-6">
                        <img 
                          src={STORY_STEPS[currentStep].image} 
                          alt="Story" 
                          className="w-full h-full object-cover"
                        />
                     </div>

                     <p className="text-xl md:text-2xl font-serif italic text-rose-800 mb-8 min-h-[4rem]">
                       {STORY_STEPS[currentStep].text}
                     </p>
                  </motion.div>
                </AnimatePresence>

                <Button 
                  onClick={nextStep}
                  className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-6 rounded-full text-xl shadow-lg hover:scale-105 transition-all w-full md:w-auto"
                >
                  {currentStep < STORY_STEPS.length - 1 ? (
                    <span className="flex items-center">Next Chapter <ArrowRight className="ml-2 w-5 h-5"/></span>
                  ) : (
                    <span className="flex items-center">I Love You! <Heart className="ml-2 w-5 h-5 fill-white"/></span>
                  )}
                </Button>
             </div>
          </motion.div>

        </div>
      )}
    </AnimatePresence>
  )
}
