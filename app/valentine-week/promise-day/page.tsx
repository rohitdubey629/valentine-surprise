"use client"


import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import confetti from "canvas-confetti"
import { Check, HandHeart } from "lucide-react"
import { SurpriseReveal } from "@/components/SurpriseReveal"
import { CONSTANTS } from "@/lib/constants"

export default function PromiseDay() {
  const [checkedPromises, setCheckedPromises] = useState<number[]>([])
  const [isScanning, setIsScanning] = useState(false)
  const [isScannerComplete, setIsScannerComplete] = useState(false)
  const scanTimerRef = useRef<NodeJS.Timeout | null>(null)

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

  const allChecked = checkedPromises.length === CONSTANTS.promiseDay.promises.length

  const handleTouchStart = () => {
    if (isScannerComplete) return
    setIsScanning(true)
    
    // Start 2s timer
    scanTimerRef.current = setTimeout(() => {
      setIsScanning(false)
      setIsScannerComplete(true)
      handleFinalPromise()
    }, 2000)
  }

  const handleTouchEnd = () => {
    if (isScannerComplete) return
    setIsScanning(false)
    if (scanTimerRef.current) {
      clearTimeout(scanTimerRef.current)
      scanTimerRef.current = null
    }
  }

  const handleFinalPromise = () => {
    confetti({
      particleCount: 200,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#3b82f6', '#1e40af', '#60a5fa']
    })
  }


  return (
    <SurpriseReveal color="blue">
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
            {CONSTANTS.promiseDay.title}
          </h1>
          <p className="text-blue-800/80 mt-2 italic">{CONSTANTS.promiseDay.subtitle}</p>
        </div>


        <div className="space-y-4 relative z-20">
          {CONSTANTS.promiseDay.promises.map((promise, index) => {
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
              className="pt-4 flex flex-col items-center gap-4"
            >
              {!isScannerComplete ? (
                <div 
                  className="relative group cursor-pointer"
                  onMouseDown={handleTouchStart}
                  onMouseUp={handleTouchEnd}
                  onMouseLeave={handleTouchEnd}
                  onTouchStart={handleTouchStart}
                  onTouchEnd={handleTouchEnd}
                >
                  <div className={`w-24 h-24 rounded-full border-4 ${isScanning ? "border-blue-500 animate-pulse" : "border-gray-300"} flex items-center justify-center bg-blue-50 relative overflow-hidden transition-all duration-300 transform group-hover:scale-110`}>
                     {/* Scanning Line */}
                     {isScanning && (
                       <motion.div 
                         layoutId="scanner"
                         className="absolute top-0 left-0 w-full h-1 bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]"
                         animate={{ top: ["0%", "100%", "0%"] }}
                         transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                       />
                     )}
                     <span className="text-4xl text-blue-300 select-none">☝️</span>
                  </div>
                  
                  {/* Progress Ring */}
                  {isScanning && (
                    <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none scale-110">
                      <circle
                        cx="50%"
                        cy="50%"
                        r="45%"
                        fill="transparent"
                        stroke="#e0e7ff"
                        strokeWidth="4"
                      />
                      <motion.circle
                        cx="50%"
                        cy="50%"
                        r="45%"
                        fill="transparent"
                        stroke="#3b82f6"
                        strokeWidth="4"
                        strokeDasharray="283"
                        strokeDashoffset="283"
                        animate={{ strokeDashoffset: 0 }}
                        transition={{ duration: 2, ease: "linear" }}
                      />
                    </svg>
                  )}
                  
                  <p className="mt-4 text-blue-600 font-semibold animate-bounce">
                    {isScanning ? CONSTANTS.promiseDay.scanning : CONSTANTS.promiseDay.holdToSeal}
                  </p>
                </div>
              ) : (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-center space-y-2"
                >
                   <div className="text-6xl mb-2">🔒</div>
                   <h3 className="text-2xl font-dancing font-bold text-blue-600">{CONSTANTS.promiseDay.sealedTitle}</h3>
                   <div className="bg-blue-100 p-4 rounded-lg border border-blue-200 mt-2">
                     <p className="font-serif italic text-blue-900">"{CONSTANTS.promiseDay.sealedQuote}"</p>
                     <p className="text-right text-xs mt-2 text-blue-400">{CONSTANTS.promiseDay.verified}</p>
                   </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>


      </motion.div>
    </div>
    </SurpriseReveal>
  )
}
