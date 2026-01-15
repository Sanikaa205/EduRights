
const schoolBg = "/assets/edu_broken.jpeg";
const schoolFixedBg = "/assets/edu_fixed.jpeg";

const safetyBroken = "/assets/pro_broken.png";
const safetyFixed = "/assets/pro_fixed.png";

const equalityBroken = "/assets/equality_broken.jpeg";
const equalityFixed = "/assets/equality_fixed.jpeg";

const playBroken = "/assets/righttoplay_broken.jpeg";
const playFixed = "/assets/righttoplay_fixed.jpeg";

const healthBroken = "/assets/health_broken.jpeg";
const healthFixed = "/assets/health_fixed.jpeg";

const heardBroken = "/assets/heard_broken.jpeg";
const heardFixed = "/assets/heard_fixed.jpeg";

const dignityBroken = "/assets/dignity_broken.png";
const dignityFixed = "/assets/dignity_fixed.png";

const infoBroken = "/assets/info_broken.png";
const infoFixed = "/assets/info_fixed.png";

const labourBroken = "/assets/labour_broken.png";
const labourFixed = "/assets/labour_fixed.png";

const marriageBroken = "/assets/marraige_broken.png";
const marriageFixed = "/assets/marraige_fixed.png";

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
    { id: "respect", label: "Everyone opinion is valuable" }
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
    
    { id: "politetalk", text: "🗣️ Polite Words", correctZone: "respect" },
    { id: "helpinghand", text: "🤝 Helping Someone", correctZone: "care" },
    { id: "encourage", text: "🌟 Self Confidence", correctZone: "confidence" },

   
    { id: "bully", text: "😠 Bullying", correctZone: null },
    { id: "insult", text: "❌ Insulting Words", correctZone: null },
    { id: "humiliate", text: "🙈 Public Humiliation", correctZone: null }
  ]
},


{
  id: "information",
  title: "Right to Information",
  hint: "Children have the right to access safe and useful information.",
  brokenBg: infoBroken,
  fixedBg: infoFixed,
  zones: [
    { id: "learning", label: "Right Information" },
    { id: "media", label: "Safe Media" },
    { id: "guidance", label: "Proper Guidance" }
  ],
  items: [
    { id: "bookinfo", text: "📘 Knowledge Book", correctZone: "learning" },
    { id: "safeinternet", text: "🌐 Safe Internet", correctZone: "media" },
    { id: "mentor", text: "🧑‍🏫 Guidance Adult", correctZone: "guidance" },

    { id: "fake", text: "❌ Fake News", correctZone: null },
    { id: "warning", text: "⚠️ Warning", correctZone: null },
    { id: "random", text: "📺 Random Media", correctZone: null }
  ]
},

{
  id: "childlabour",
  title: "Right to Protection from Child Labour",
  hint: "Children should learn and grow, not work to survive.",
  brokenBg: labourBroken,
  fixedBg: labourFixed,
  zones: [
    { id: "education", label: "School not Work" },
    { id: "safety", label: "Safe Childhood" },
    { id: "support", label: "Support & Care" }
  ],
  items: [
    { id: "schoolbag", text: "🎒 School Bag", correctZone: "education" },
    { id: "safeplace", text: "🛡️ Safe Environment", correctZone: "safety" },
    { id: "helpadult", text: "👨‍👩‍👧 Adult Support", correctZone: "support" },

    { id: "tool", text: "🔨 Work Tools", correctZone: null },
    { id: "brick", text: "🧱 Bricks", correctZone: null },
    { id: "money", text: "💰 Earn Money", correctZone: null }
  ]
},

{
  id: "earlymarriage",
  title: "Right against Early Marriage",
  hint: "Children must grow, learn, and decide their future before marriage.",
  brokenBg: marriageBroken,
  fixedBg: marriageFixed,
  zones: [
    { id: "education", label: "Education First" },
    { id: "choice", label: "Right to Choose" },
    { id: "protection", label: "Protection & Support" }
  ],
  items: [
    { id: "school", text: "🎓 Continue Education", correctZone: "education" },
    { id: "decision", text: "🗣️ Freedom to Choose", correctZone: "choice" },
    { id: "support", text: "🛡️ Legal & Family Support", correctZone: "protection" },

    { id: "ring", text: "💍 Marriage Ring", correctZone: null },
    { id: "calendar", text: "📅 Early Age", correctZone: null },
    { id: "pressure", text: "⚠️ Family Pressure", correctZone: null }
  ]
}




];
