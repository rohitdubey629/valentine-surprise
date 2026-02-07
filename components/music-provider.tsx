
"use client"

import { createContext, useContext, useEffect, useRef, useState } from "react"

const MusicContext = createContext({
  play: () => {},
  pause: () => {},
  isPlaying: false,
})

export const useMusic = () => useContext(MusicContext)

export function MusicProvider({ children }: { children: React.ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    audioRef.current = new Audio("/bgm.mp3")
    audioRef.current.loop = true
    audioRef.current.volume = 0.4
    
    // Cleanup
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  const play = () => {
    if (audioRef.current) {
      audioRef.current.play().catch((err) => console.log("Audio play failed:", err))
      setIsPlaying(true)
    }
  }

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      setIsPlaying(false)
    }
  }

  return (
    <MusicContext.Provider value={{ play, pause, isPlaying }}>
      {children}
    </MusicContext.Provider>
  )
}
