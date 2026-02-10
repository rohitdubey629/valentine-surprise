"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface SpecialSurpriseModalProps {
  isOpen: boolean
  onClose: () => void
  imageSrc: string
  title?: string
  message?: string
}

export function SpecialSurpriseModal({ 
  isOpen, 
  onClose, 
  imageSrc, 
  title = "Surprise! 🎉", 
  message = "Just for you! ❤️"
}: SpecialSurpriseModalProps) {
  
  if (!isOpen) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ scale: 0.5, opacity: 0, rotateX: 90 }}
            animate={{ scale: 1, opacity: 1, rotateX: 0 }}
            exit={{ scale: 0.5, opacity: 0, rotateX: 90 }}
            transition={{ type: "spring", damping: 15 }}
            className="relative bg-white/90 backdrop-blur-xl border-4 border-rose-300 rounded-3xl shadow-2xl overflow-hidden max-w-md w-full"
          >
             {/* Close Button */}
             <button 
               onClick={onClose}
               className="absolute top-4 right-4 z-20 bg-white/50 hover:bg-white rounded-full p-2 transition-colors"
             >
               <X className="w-6 h-6 text-rose-600" />
             </button>

             {/* Content */}
             <div className="p-6 flex flex-col items-center text-center space-y-6">
                
                <motion.div
                   initial={{ y: -20, opacity: 0 }}
                   animate={{ y: 0, opacity: 1 }}
                   transition={{ delay: 0.2 }}
                >
                   <h2 className="text-3xl font-dancing font-bold text-rose-600 drop-shadow-sm">{title}</h2>
                </motion.div>

                <motion.div
                   initial={{ scale: 0.8 }}
                   animate={{ scale: 1 }}
                   transition={{ delay: 0.3, type: "spring" }}
                   className="relative w-64 h-64 rounded-2xl overflow-hidden border-4 border-white shadow-lg mx-auto"
                >
                   {/* We use standard next/image or fallback if src is special */}
                   {imageSrc.startsWith("/") || imageSrc.startsWith("http") ? (
                      <div className="relative w-full h-full">
                         {/* Using regular img tag to avoid complex next/image config for now if external */}
                        <img 
                          src={imageSrc} 
                          alt="Special Surprise" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                   ) : (
                      <div className="w-full h-full bg-rose-100 flex items-center justify-center text-6xl">
                         {imageSrc}
                      </div>
                   )}
                </motion.div>

                <motion.p
                   initial={{ y: 20, opacity: 0 }}
                   animate={{ y: 0, opacity: 1 }}
                   transition={{ delay: 0.4 }}
                   className="text-lg font-serif italic text-rose-900"
                >
                   {message}
                </motion.p>

                <Button 
                   onClick={onClose}
                   className="bg-rose-500 hover:bg-rose-600 text-white rounded-full px-8"
                >
                   Love it! ❤️
                </Button>
             </div>
             
             {/* Decorative Background Elements */}
             <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-rose-400 via-pink-400 to-rose-400" />
             <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-rose-400 via-pink-400 to-rose-400" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
