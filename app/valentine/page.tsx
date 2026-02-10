
"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { useMusic } from "@/components/music-provider"
import { CONSTANTS } from "@/lib/constants"

export default function ValentinePage() {
  const { play } = useMusic()
  
  useEffect(() => {
    play()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="max-w-2xl w-full"
      >
        <Card className="bg-white/80 backdrop-blur-md shadow-xl border-rose-200 p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-rose-400 via-pink-500 to-rose-400" />
          
          <CardContent className="space-y-6">
            {CONSTANTS.valentineDay.letter.map((line, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 1.5 + 0.5, duration: 1 }}
                className={`text-xl md:text-3xl ${index === 0 ? "font-dancing text-4xl md:text-5xl font-bold text-rose-600 mb-8" : "font-medium text-rose-800"}`}
              >
                {line}
              </motion.p>
            ))}

            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: CONSTANTS.valentineDay.letter.length * 1.5 + 1, type: "spring" }}
              className="pt-8"
            >
              <div className="text-8xl animate-bounce">
                😘
              </div>
              <p className="text-sm text-pink-400 mt-4 italic">Forever Yours</p>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

