import { Sparkles, Flame, HeartHandshake } from "lucide-react"

export type ChoiceCard = {
  type: "choice"
  optionA: string
  optionB: string
}

export type PromptCard = {
  type: "truth" | "dare" | "talk"
  text: string
}

export type ActivityCard = ChoiceCard | PromptCard

export type ActivityMode = {
  key: string
  label: string
  emoji: string
  icon: typeof Sparkles
  gradient: string
  tagline: string
  cards: ActivityCard[]
}

export const TOGETHER_MODES: ActivityMode[] = [
  {
    key: "thisOrThat",
    label: "This or That",
    emoji: "🎯",
    icon: Sparkles,
    gradient: "from-pink-400 to-rose-500",
    tagline: "Jaldi se bolo, jo pehle mann mein aaye!",
    cards: [
      { type: "choice", optionA: "🍕 Pizza Night", optionB: "🍔 Burger Night" },
      { type: "choice", optionA: "🏖️ Beach Trip", optionB: "🏔️ Mountain Trip" },
      { type: "choice", optionA: "🎬 Movie at Home", optionB: "🎟️ Movie Theatre" },
      { type: "choice", optionA: "🌅 Morning Person", optionB: "🌙 Night Owl" },
      { type: "choice", optionA: "💌 Long Messages", optionB: "📞 Long Calls" },
      { type: "choice", optionA: "🐶 Puppy", optionB: "🐱 Kitten" },
      { type: "choice", optionA: "☕ Chai", optionB: "☕ Coffee" },
      { type: "choice", optionA: "🚗 Road Trip", optionB: "✈️ Flight" },
      { type: "choice", optionA: "🎂 Surprise Party", optionB: "🍽️ Quiet Dinner" },
      { type: "choice", optionA: "🥱 Lazy Sunday", optionB: "🎉 Adventure Sunday" },
    ],
  },
  {
    key: "truthOrDare",
    label: "Truth or Dare",
    emoji: "🔥",
    icon: Flame,
    gradient: "from-purple-500 to-indigo-600",
    tagline: "Thoda daring, thoda honest — chalo shuru karein!",
    cards: [
      { type: "truth", text: "Sabse pehli baar tumhe mujhse pyaar kab hua tha?" },
      { type: "dare", text: "{{partner}} ko abhi 10 second ke liye tight hug do. 🤗" },
      { type: "truth", text: "Meri sabse cute habit kya hai, sach sach batao." },
      { type: "dare", text: "{{me}} ko ek filmy dialogue bol ke propose karo. 🎬" },
      { type: "truth", text: "Humari koi ek yaad jo tum kabhi bhool nahi paoge?" },
      { type: "dare", text: "3 baar bolo 'main tumse bohot pyaar karta/karti hoon' — bina hase! 😂" },
      { type: "truth", text: "Agar ek din sirf mere saath bitana ho, kya karoge?" },
      { type: "dare", text: "Ek chhota sa forehead kiss do. ❤️" },
      { type: "truth", text: "Mujhme sabse pehli baar kya notice kiya tha?" },
      { type: "dare", text: "Dono ek saath ek selfie lo, sabse silly expression ke saath. 📸" },
    ],
  },
  {
    key: "deepTalk",
    label: "Deep Talk",
    emoji: "💬",
    icon: HeartHandshake,
    gradient: "from-sky-400 to-blue-600",
    tagline: "Thoda ruk ke, dil se baat karte hain.",
    cards: [
      { type: "talk", text: "Humari sabse favorite memory kaunsi hai, dono batao." },
      { type: "talk", text: "5 saal baad hum dono kaha hona chahte hain?" },
      { type: "talk", text: "Ek cheez jo tum ek dusre se seekhna chahte ho?" },
      { type: "talk", text: "Agar kal hum saath trip pe jaayein, kaha jaana chahoge?" },
      { type: "talk", text: "Ek chhoti si baat jo tumhe roz khush kar deti hai?" },
      { type: "talk", text: "Rishtey mein tumhe sabse zyada kya important lagta hai?" },
      { type: "talk", text: "Ek dream jo tum dono saath poora karna chahte ho?" },
      { type: "talk", text: "Agar aaj ki shaam bilkul perfect honi ho, kaisi hogi?" },
    ],
  },
]
