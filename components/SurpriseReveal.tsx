"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface SurpriseRevealProps {
  children: React.ReactNode
  color?: string
}

export function SurpriseReveal({ children, color = "rose" }: SurpriseRevealProps) {
  const [isOpen, setIsOpen] = useState(false)

  const variants = {
    closed: { scale: 1, rotate: 0 },
    hover: { scale: 1.05, rotate: [0, -2, 2, -2, 2, 0], transition: { duration: 0.5 } },
    opening: { scale: 1.5, opacity: 0, rotate: 0 },
  }

  // Map color names to Tailwind classes
  const colorMap: Record<string, string> = {
    rose: "bg-rose-500",
    red: "bg-red-500",
    pink: "bg-pink-500",
    blue: "bg-blue-500",
    green: "bg-green-500",
    yellow: "bg-yellow-500",
    orange: "bg-orange-500",
    purple: "bg-purple-500",
    amber: "bg-amber-500",
  }

  const bgColor = colorMap[color] || "bg-rose-500"

  return (
    <div className="relative w-full h-full min-h-screen flex items-center justify-center">
      <AnimatePresence>
        {!isOpen ? (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
          >
            <motion.div
              variants={variants}
              initial="closed"
              whileHover="hover"
              onClick={() => setIsOpen(true)}
              className={`cursor-pointer ${bgColor} w-40 h-40 md:w-60 md:h-60 rounded-2xl shadow-2xl flex items-center justify-center border-4 border-white/50 relative overflow-hidden group`}
            >
              {/* Ribbon Vertical */}
              <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-8 md:w-12 bg-white/30" />
              {/* Ribbon Horizontal */}
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-8 md:h-12 bg-white/30" />
              
              <div className="z-10 text-white text-center">
                <span className="text-4xl md:text-6xl block mb-2">🎁</span>
                <span className="font-dancing text-xl md:text-2xl font-bold">Tap to Open</span>
              </div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", duration: 0.8 }}
            className="w-full"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
