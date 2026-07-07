// Feel-good random score in the 82-100 range, with a solid ~1-in-5 shot at a
// perfect 100. Call this once per attempt (e.g. inside a click handler), not
// during render.
export function randomLoveScore(): number {
  if (Math.random() < 0.2) return 100
  return 82 + Math.floor(Math.random() * 18)
}

export function loveVerdict(score: number): { title: string; message: string } {
  if (score >= 96) {
    return {
      title: "Perfect Match! 💍",
      message: "Ye jodi toh upar se hi banai gayi hai... made for each other!",
    }
  }
  if (score >= 89) {
    return {
      title: "Zabardast Jodi! 💞",
      message: "Bohot hi cute connection hai — pyaar aur bhi gehra hone wala hai.",
    }
  }
  return {
    title: "Bohot Achha! 💕",
    message: "Thodi aur understanding, aur ye jodi rocket ban jayegi 🚀",
  }
}
