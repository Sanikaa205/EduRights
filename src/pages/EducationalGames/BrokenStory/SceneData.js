export const sceneData = [
  {
    id: "education",
    title: "Right to Education",
    hint: "Books and a school help children learn.",
    zones: [
      { id: "school", label: "School" },
      { id: "home", label: "Home" }
    ],
    items: [
      { id: "b1", text: "Books", correctZone: "school" },
      { id: "b2", text: "Playground", correctZone: "school" },
      { id: "b3", text: "Tools", correctZone: "home" }
    ]
  },
  {
    id: "health",
    title: "Right to Health",
    hint: "Medicine and clinics keep children healthy.",
    zones: [
      { id: "clinic", label: "Clinic" },
      { id: "home", label: "Home" }
    ],
    items: [
      { id: "h1", text: "Medicine", correctZone: "clinic" },
      { id: "h2", text: "Water", correctZone: "clinic" },
      { id: "h3", text: "Toys", correctZone: "home" }
    ]
  },
  {
    id: "protection",
    title: "Right to Protection",
    hint: "Safe places and adults who care protect children.",
    zones: [
      { id: "safehouse", label: "Safe House" },
      { id: "street", label: "Street" }
    ],
    items: [
      { id: "p1", text: "Guardian", correctZone: "safehouse" },
      { id: "p2", text: "Lamp", correctZone: "safehouse" },
      { id: "p3", text: "Litter", correctZone: "street" }
    ]
  },
  {
    id: "identity",
    title: "Right to Identity",
    hint: "Names and documents help identify children.",
    zones: [
      { id: "office", label: "Records Office" },
      { id: "home", label: "Home" }
    ],
    items: [
      { id: "i1", text: "Birth Cert.", correctZone: "office" },
      { id: "i2", text: "Photo", correctZone: "office" },
      { id: "i3", text: "Shoe", correctZone: "home" }
    ]
  },
  {
    id: "family",
    title: "Right to Family",
    hint: "Families should be together and cared for.",
    zones: [
      { id: "home", label: "Home" },
      { id: "center", label: "Support Center" }
    ],
    items: [
      { id: "f1", text: "Photo Album", correctZone: "home" },
      { id: "f2", text: "Letter", correctZone: "center" },
      { id: "f3", text: "Bed", correctZone: "home" }
    ]
  },
  {
    id: "participation",
    title: "Right to Participation",
    hint: "Children have a say in things that affect them.",
    zones: [
      { id: "forum", label: "Community Forum" },
      { id: "school", label: "School" }
    ],
    items: [
      { id: "pa1", text: "Speaking Mic", correctZone: "forum" },
      { id: "pa2", text: "Suggestion Box", correctZone: "forum" },
      { id: "pa3", text: "Backpack", correctZone: "school" }
    ]
  },
  {
    id: "leisure",
    title: "Right to Play & Leisure",
    hint: "Playgrounds and toys are important.",
    zones: [
      { id: "park", label: "Park" },
      { id: "home", label: "Home" }
    ],
    items: [
      { id: "l1", text: "Ball", correctZone: "park" },
      { id: "l2", text: "Swing", correctZone: "park" },
      { id: "l3", text: "Desk", correctZone: "home" }
    ]
  },
  {
    id: "equality",
    title: "Right to Equality",
    hint: "Everyone should be treated the same.",
    zones: [
      { id: "school", label: "School" },
      { id: "community", label: "Community" }
    ],
    items: [
      { id: "e1", text: "Uniform", correctZone: "school" },
      { id: "e2", text: "Sign", correctZone: "community" },
      { id: "e3", text: "Book", correctZone: "school" }
    ]
  }
]
