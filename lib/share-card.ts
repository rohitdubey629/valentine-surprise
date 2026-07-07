type LoveCardInput = {
  me: string
  partner: string
  score: number
  title: string
}

export async function generateLoveCardBlob({ me, partner, score, title }: LoveCardInput): Promise<Blob> {
  const canvas = document.createElement("canvas")
  canvas.width = 1080
  canvas.height = 1080
  const ctx = canvas.getContext("2d")
  if (!ctx) throw new Error("Canvas not supported")

  const gradient = ctx.createLinearGradient(0, 0, 1080, 1080)
  gradient.addColorStop(0, "#fb7185")
  gradient.addColorStop(0.5, "#ec4899")
  gradient.addColorStop(1, "#c026d3")
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, 1080, 1080)

  ctx.fillStyle = "rgba(255,255,255,0.10)"
  ctx.beginPath()
  ctx.arc(120, 120, 220, 0, Math.PI * 2)
  ctx.fill()
  ctx.beginPath()
  ctx.arc(970, 960, 260, 0, Math.PI * 2)
  ctx.fill()

  ctx.textAlign = "center"
  ctx.fillStyle = "#ffffff"

  ctx.font = "600 40px 'Segoe UI', sans-serif"
  ctx.fillText("L O V E   M E T E R", 540, 220)

  ctx.font = "700 56px 'Segoe UI', sans-serif"
  const names = `${me}  ♥  ${partner}`
  ctx.fillText(names, 540, 340)

  ctx.font = "800 260px 'Segoe UI', sans-serif"
  ctx.fillText(`${score}%`, 540, 620)

  ctx.font = "600 50px 'Segoe UI', sans-serif"
  ctx.fillText(title, 540, 730)

  ctx.font = "italic 30px Georgia, serif"
  ctx.fillStyle = "rgba(255,255,255,0.85)"
  ctx.fillText("made with love, just for us", 540, 1000)

  return await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob)
      else reject(new Error("Failed to generate image"))
    }, "image/png")
  })
}

export async function shareOrDownloadLoveCard(input: LoveCardInput) {
  const blob = await generateLoveCardBlob(input)
  const file = new File([blob], "love-meter.png", { type: "image/png" })

  if (navigator.canShare && navigator.canShare({ files: [file] }) && navigator.share) {
    try {
      await navigator.share({
        files: [file],
        title: "Our Love Meter",
        text: `${input.me} ❤ ${input.partner} — ${input.score}% match!`,
      })
      return
    } catch {
      // fall through to download if share is cancelled/fails
    }
  }

  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = "love-meter.png"
  link.click()
  URL.revokeObjectURL(url)
}
