"use client"

import { useNames } from "@/lib/names-context"

export function CoupleSignature() {
  const { names } = useNames()

  if (!names.me || !names.partner) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 pointer-events-none animate-pulse">
      <p className="font-dancing text-xl md:text-2xl text-rose-600 drop-shadow-sm bg-white/80 backdrop-blur-sm px-6 py-2 rounded-full border border-rose-200 shadow-lg">
        {names.me} ❤️ {names.partner}
      </p>
    </div>
  )
}
