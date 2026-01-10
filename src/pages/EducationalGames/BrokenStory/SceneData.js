import schoolBg from "@/assets/edu_broken.jpeg";
import schoolFixedBg from "@/assets/edu_fixed.jpeg";

import safetyBroken from "@/assets/protection_broken.jpeg";
import safetyFixed from "@/assets/protection_fixed.jpeg";

import equalityBroken from "@/assets/equality_broken.jpeg";
import equalityFixed from "@/assets/equality_fixed.jpeg";

import playBroken from "@/assets/righttoplay_broken.jpeg";
import playFixed from "@/assets/righttoplay_fixed.jpeg";

import healthBroken from "@/assets/health_broken.jpeg";
import healthFixed from "@/assets/health_fixed.jpeg";

import heardBroken from "@/assets/heard_broken.jpeg";
import heardFixed from "@/assets/heard_fixed.jpeg";

import dignityBroken from "@/assets/dignity_broken.png";
import dignityFixed from "@/assets/dignity_fixed.png";


export const sceneData = [
  {
    id: "education",
    title: "Right to Education",
    hint: "Education needs access, teachers, and a proper learning space.",
    brokenBg: schoolBg,
    fixedBg: schoolFixedBg,
    zones: [
      { id: "access", label: "Education is every child's right" },
      { id: "teacher", label: "Teacher" },
      { id: "learning", label: "Learning Space" }
    ],
    items: [
      { id: "schoolopen", text: "🏫 Open School", correctZone: "access" },
      { id: "teacheritem", text: "👩‍🏫 Teacher", correctZone: "teacher" },
      { id: "classroom", text: "📖 Classroom", correctZone: "learning" },

      { id: "book", text: "📚 Book", correctZone: null },
      { id: "pencil", text: "✏️ Pencil", correctZone: null },
      { id: "meal", text: "🍎 Midday Meal", correctZone: null }
    ]
  },

  {
    id: "safety",
    title: "Right to Safety",
    hint: "Children stay safe by speaking up and seeking help.",
    brokenBg: safetyBroken,
    fixedBg: safetyFixed,
    zones: [
      { id: "voice", label: "Speak Up" },
      { id: "elder", label: "Trusted Elder" },
      { id: "boundary", label: "Say No" }
    ],
    items: [
      { id: "raisevoice", text: "🗣️ Raise Voice", correctZone: "voice" },
      { id: "telladult", text: "👨‍👩‍👧 Tell Elder", correctZone: "elder" },
      { id: "sayno", text: "✋ Say NO to Wrong", correctZone: "boundary" },

      { id: "guard", text: "👮 Guard", correctZone: null },
      { id: "stopsign", text: "🛑 Stop Sign", correctZone: null },
      { id: "ramp", text: "♿ Ramp", correctZone: null }
    ]
  },

  {
    id: "equality",
    title: "Right to Equality",
    hint: "Equality means fair access for everyone.",
    brokenBg: equalityBroken,
    fixedBg: equalityFixed,
    zones: [
      { id: "All are equal", label: "All are equal" },
      { id: "inclusion", label: "Inclusion" },
      { id: "entry", label: "Equal Entry" }
    ],
    items: [
      { id: "rampitem", text: "⚖️ Equality", correctZone: "All are equal" },
      { id: "hands", text: "🤝 Inclusion", correctZone: "inclusion" },
      { id: "door", text: "🚪 Equal Entry", correctZone: "entry" },

      { id: "bench", text: "🪑 Bench", correctZone: null },
      { id: "slide", text: "🛝 Slide", correctZone: null },
      { id: "fence", text: "🚧 Fence", correctZone: null }
    ]
  },

  {
    id: "play",
    title: "Right to Play",
    hint: "Every child deserves space and opportunity to play.",
    brokenBg: playBroken,
    fixedBg: playFixed,
    zones: [
      { id: "space", label: "Place to Play" },
      { id: "access", label: "Inclusive Access" },
      { id: "activity", label: "Equipment for All" }
    ],
    items: [
      { id: "ground", text: "🏞️ Playground", correctZone: "space" },
      { id: "rampp", text: "♿ Ramp for Play", correctZone: "access" },
      { id: "football", text: "⚽ Football for Everyone", correctZone: "activity" },

      { id: "swing", text: "🎡 Swing", correctZone: null },
      { id: "helmet", text: "⛑️ Helmet", correctZone: null },
      { id: "cone", text: "🚧 Cone", correctZone: null }
    ]
  },

  {
    id: "health",
    title: "Right to Health",
    hint: "Health comes from daily care, not just medical tools.",
    brokenBg: healthBroken,
    fixedBg: healthFixed,
    zones: [
      { id: "doctor", label: "Everyone deserves Care" },
      { id: "water", label: "Everyone deserves Clean Water" },
      { id: "nutrition", label: "Everyone deserves Nutrition" }
    ],
    items: [
      { id: "doctoritem", text: "👨‍⚕️ Doctor", correctZone: "doctor" },
      { id: "wateritem", text: "💧 Clean Water", correctZone: "water" },
      { id: "fruititem", text: "🍎 Healthy Fruits", correctZone: "nutrition" },

      { id: "pizza", text: "🍕 Pizza", correctZone: null },
      { id: "clothes", text: "👕 Clothes", correctZone: null },
      { id: "syringe", text: "💉 Syringe", correctZone: null }
    ]
  },

  {
  id: "heard",
  title: "Right to Be Heard",
  hint: "Every child has the right to express their thoughts and be listened to.",
  brokenBg: heardBroken,
  fixedBg: heardFixed,
  zones: [
    { id: "voice", label: "Everyone deserves a Voice" },
    { id: "listener", label: "Everyone deserves to be Heard" },
    { id: "respect", label: "Everyone deserves Respect" }
  ],
  items: [
    { id: "raisevoice", text: "🗣️ Speak Up", correctZone: "voice" },
    { id: "adultlisten", text: "👂 Listening Adult", correctZone: "listener" },
    { id: "sayopinion", text: "💬 Share Opinion", correctZone: "respect" },

   
    { id: "mute", text: "🔇 Silence", correctZone: null },
    { id: "whistle", text: "📣 Whistle", correctZone: null },
    { id: "paper", text: "📄 Paper", correctZone: null }
  ]
},

{
  id: "dignity",
  title: "Right to Dignity",
  hint: "Every child deserves respect, kindness, and to be treated with dignity.",
  brokenBg: dignityBroken,
  fixedBg: dignityFixed,
  zones: [
    { id: "respect", label: "Everyone deserves Respect" },
    { id: "care", label: "Everyone deserves Kind Treatment" },
    { id: "confidence", label: "Everyone deserves Self-Worth" }
  ],
  items: [
    { id: "kindwords", text: "💖 Kind Words", correctZone: "respect" },
    { id: "helpinghand", text: "🤝 Helping Hand", correctZone: "care" },
    { id: "confidence", text: "🌟 Self Confidence", correctZone: "confidence" },

    
    { id: "shout", text: "📢 Shouting", correctZone: null },
    { id: "pointing", text: "👉 Pointing Finger", correctZone: null },
    { id: "laugh", text: "😂 Mocking Laugh", correctZone: null }
  ]
}


];
