"use client"

import { useState, type ReactNode } from "react"
import { motion } from "framer-motion"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useNames } from "@/lib/names-context"

export function NameGate({ children }: { children: ReactNode }) {
  const { names, setNames, isLoaded } = useNames()
  const [meInput, setMeInput] = useState("")
  const [partnerInput, setPartnerInput] = useState("")

  if (!isLoaded) {
    return null
  }

  if (names.me && names.partner) {
    return <>{children}</>
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!meInput.trim() || !partnerInput.trim()) return
    setNames({ me: meInput.trim(), partner: partnerInput.trim() })
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="space-y-6 max-w-md w-full"
      >
        <Heart className="w-16 h-16 text-rose-500 fill-rose-500 mx-auto animate-pulse" />

        <h1 className="text-3xl md:text-4xl font-dancing text-rose-600 drop-shadow-sm">
          Apna Naam Likho ❤️
        </h1>
        <p className="text-rose-800/80">
          Surprise shuru karne se pehle, apna aur apne partner ka naam daalo
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Aapka naam"
            value={meInput}
            onChange={(e) => setMeInput(e.target.value)}
            className="text-center text-lg h-12 bg-white/80"
            autoFocus
          />
          <Input
            placeholder="Partner ka naam"
            value={partnerInput}
            onChange={(e) => setPartnerInput(e.target.value)}
            className="text-center text-lg h-12 bg-white/80"
          />
          <Button
            type="submit"
            size="lg"
            variant="romantic"
            className="w-full rounded-full text-lg"
            disabled={!meInput.trim() || !partnerInput.trim()}
          >
            Shuru Karein 💖
          </Button>
        </form>
      </motion.div>
    </div>
  )
}
