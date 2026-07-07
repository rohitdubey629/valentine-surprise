import {
  Coffee,
  Zap,
  Brain,
  Sparkles,
  PartyPopper,
  Music,
  Moon,
} from "lucide-react"

export type DailyVibe = {
  day: string
  title: string
  emoji: string
  icon: typeof Coffee
  gradient: string
  message: string
  task: string
  bonus: string
}

// Indexed by JS Date.getDay() -> 0 = Sunday ... 6 = Saturday
export const DAILY_VIBES: DailyVibe[] = [
  {
    day: "Sunday",
    title: "Sunday Sukoon",
    emoji: "🥰",
    icon: Moon,
    gradient: "from-indigo-400 to-purple-500",
    message: "No rush today, {{partner}}. Just lounge, laugh, and let me spoil you a little.",
    task: "Aaj ka kaam: kuch mat socho, sirf araam karo. 🛋️",
    bonus: "Aaj ki chhutti sirf tumhare naam hai, {{me}} promise karta hai."
  },
  {
    day: "Monday",
    title: "Monday Motivation",
    emoji: "💪",
    icon: Zap,
    gradient: "from-orange-400 to-rose-500",
    message: "New week, {{partner}}, but same old fact — you're the best thing in it.",
    task: "Aaj ka kaam: apne aap ko mirror me dekh ke bolo 'main kamaal hoon'. 🪞",
    bonus: "Har Monday thoda easy lagta hai jab pata ho ki {{me}} tumhare saath hai."
  },
  {
    day: "Tuesday",
    title: "Tuesday Thoughts",
    emoji: "🧠",
    icon: Brain,
    gradient: "from-sky-400 to-blue-500",
    message: "Random thought of the day: {{partner}}, tumhari smile abhi bhi meri favorite notification hai.",
    task: "Aaj ka kaam: ek purani photo dhundo jo tumhe hasa de. 📱",
    bonus: "{{me}} soch raha tha tumhare baare mein... phir se. Kabhi rukta nahi."
  },
  {
    day: "Wednesday",
    title: "Wednesday Wishes",
    emoji: "✨",
    icon: Sparkles,
    gradient: "from-emerald-400 to-teal-500",
    message: "Halfway through the week, {{partner}} — thoda sa extra pyaar tumhare liye. ✨",
    task: "Aaj ka kaam: khud ko ek coffee/chai treat karo, mere taraf se. ☕",
    bonus: "Wish list mein sabse pehle: hamesha tumhe khush rakhna."
  },
  {
    day: "Thursday",
    title: "Throwback Thursday",
    emoji: "📸",
    icon: Coffee,
    gradient: "from-amber-400 to-orange-500",
    message: "Yaad hai {{partner}}, hum kitne random baaton pe hass jaate the? Aaj wahi feeling chahiye.",
    task: "Aaj ka kaam: ek purani memory {{me}} ko bhejo, 'yaad hai?' ke saath. 🕰️",
    bonus: "Best throwback hamesha wahi hoga jisme tum ho."
  },
  {
    day: "Friday",
    title: "Fun Friday",
    emoji: "🎉",
    icon: PartyPopper,
    gradient: "from-pink-400 to-fuchsia-500",
    message: "Weekend loading... {{partner}}, koi plan banaye? Ya bas ek dusre ke saath time?",
    task: "Aaj ka kaam: apna favorite gaana laga ke thoda dance karo. 💃",
    bonus: "Friday feeling + tumhara saath = perfect combo."
  },
  {
    day: "Saturday",
    title: "Special Saturday",
    emoji: "💑",
    icon: Music,
    gradient: "from-rose-400 to-red-500",
    message: "Poora din tumhare naam, {{partner}}. Aaj koi rules nahi, sirf hum. ❤️",
    task: "Aaj ka kaam: kuch naya try karo, saath mein.",
    bonus: "Har Saturday ek chhota sa reminder hai ki {{me}} kitna lucky hai."
  },
]
