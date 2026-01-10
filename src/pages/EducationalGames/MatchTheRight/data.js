export const levels = [
    {
        level: 1,
        title: "Level 1 – Basic Rights",
        time: 10,
        rounds: [
            {
                situations: [
                    "Free and compulsory schooling",
                    "Children should eat healthy food",
                    "Children should be treated equally",
                ],
                rights: [
                    { name: "Right to Education", color: "bg-blue-100 border-blue-400" },
                    { name: "Right to Equality", color: "bg-green-100 border-green-400" },
                ],
                answers: {
                    "Free and compulsory schooling": "Right to Education",
                    "Children should be treated equally": "Right to Equality",
                },
                trap: "Children should eat healthy food",
            },
        ],
    },

    {
        level: 2,
        title: "Level 2 – Safety & Protection",
        time: 15,
        rounds: [
            {
                situations: [
                    "No child should work in factories",
                    "Children must be protected from abuse",
                    "Children should not be punished cruelly",
                    "Children should help parents at home",
                ],
                rights: [
                    { name: "Child Labour Law", color: "bg-red-100 border-red-400" },
                    { name: "Right to Protection", color: "bg-yellow-100 border-yellow-400" },
                    { name: "Right to Dignity", color: "bg-purple-100 border-purple-400" },
                ],
                answers: {
                    "No child should work in factories": "Child Labour Law",
                    "Children must be protected from abuse": "Right to Protection",
                    "Children should not be punished cruelly": "Right to Dignity",
                },
                trap: "Children should help parents at home",
            },
        ],
    },

    {
        level: 3,
        title: "Level 3 – Freedom & Health",
        time: 15,
        rounds: [
            {
                situations: [
                    "Children can express opinions freely",
                    "Every child deserves medical care",
                    "Children have the right to play",
                    "Children must have a safe home",
                    "Children should drink milk every day",
                ],
                rights: [
                    { name: "Right to Expression", color: "bg-purple-100 border-purple-400" },
                    { name: "Right to Health", color: "bg-red-200 border-red-500" },
                    { name: "Right to Recreation", color: "bg-green-200 border-green-500" },
                    { name: "Right to Shelter", color: "bg-blue-200 border-blue-500" },
                ],
                answers: {
                    "Children can express opinions freely": "Right to Expression",
                    "Every child deserves medical care": "Right to Health",
                    "Children have the right to play": "Right to Recreation",
                    "Children must have a safe home": "Right to Shelter",
                },
                trap: "Children should drink milk every day",
            },
        ],
    },

    {
        level: 4,
        title: "Level 4 – Digital & Identity Rights",
        time: 20,
        rounds: [
            {
                situations: [
                    "Every child should have a birth certificate",
                    "Children’s data should not be misused online",
                    "Children can access the internet safely",
                    "Children should not be cyber bullied",
                    "Children can complain if treated unfairly",
                    "Children should use mobile phones less",
                ],
                rights: [
                    { name: "Right to Identity", color: "bg-indigo-100 border-indigo-400" },
                    { name: "Right to Privacy", color: "bg-purple-200 border-purple-500" },
                    { name: "Right to Information", color: "bg-blue-300 border-blue-600" },
                    { name: "Right to Protection", color: "bg-yellow-200 border-yellow-500" },
                    { name: "Right to Justice", color: "bg-green-200 border-green-500" },
                ],
                answers: {
                    "Every child should have a birth certificate": "Right to Identity",
                    "Children’s data should not be misused online": "Right to Privacy",
                    "Children can access the internet safely": "Right to Information",
                    "Children should not be cyber bullied": "Right to Protection",
                    "Children can complain if treated unfairly": "Right to Justice",
                },
                trap: "Children should use mobile phones less",
            },
        ],
    },

    {
        level: 5,
        title: "Level 5 – Community & Environment",
        time: 30,
        rounds: [
            {
                situations: [
                    "Children deserve clean drinking water",
                    "Children should live in pollution-free areas",
                    "Children can participate in community decisions",
                    "Children must be protected during disasters",
                    "Children should receive disaster education",
                    "Children deserve clean playgrounds",
                    "Children should plant trees every year",
                    "Children should wake up early daily",
                ],
                rights: [
                    { name: "Right to Health", color: "bg-red-200 border-red-500" },
                    { name: "Right to Safe Environment", color: "bg-green-200 border-green-500" },
                    { name: "Right to Participation", color: "bg-blue-200 border-blue-500" },
                    { name: "Right to Safety", color: "bg-yellow-200 border-yellow-500" },
                    { name: "Right to Preparedness", color: "bg-purple-100 border-purple-400" },
                    { name: "Right to Recreation", color: "bg-indigo-200 border-indigo-500" },
                ],
                answers: {
                    "Children deserve clean drinking water": "Right to Health",
                    "Children should live in pollution-free areas": "Right to Safe Environment",
                    "Children can participate in community decisions": "Right to Participation",
                    "Children must be protected during disasters": "Right to Safety",
                    "Children should receive disaster education": "Right to Preparedness",
                    "Children deserve clean playgrounds": "Right to Recreation",
                },
                trap: [
                    "Children should plant trees every year",
                    "Children should wake up early daily",
                ],
            },
        ],
    },

    {
        level: 6,
        title: "Level 6 – Advanced Child Protection",
        time: 40,
        rounds: [
            {
                situations: [
                    "Children should not be trafficked",
                    "Children must not be forced into marriage",
                    "Children deserve legal help",
                    "Children in conflict zones need safety",
                    "Children must not be used in crimes",
                    "Children deserve mental health care",
                    "Children should get rehabilitation support",
                    "Children deserve safe foster care",
                    "Children should respect elders always",
                    "Children should finish homework daily",
                ],
                rights: [
                    { name: "Right against Trafficking", color: "bg-red-200 border-red-500" },
                    { name: "Right to Free Choice", color: "bg-yellow-200 border-yellow-500" },
                    { name: "Right to Legal Aid", color: "bg-blue-200 border-blue-500" },
                    { name: "Right to Peace", color: "bg-green-200 border-green-500" },
                    { name: "Right to Protection from Exploitation", color: "bg-purple-100 border-purple-400" },
                    { name: "Right to Mental Health", color: "bg-violet-200 border-violet-500" },
                    { name: "Right to Recovery", color: "bg-indigo-200 border-indigo-500" },
                    { name: "Right to Family Care", color: "bg-teal-200 border-teal-500" },
                ],
                answers: {
                    "Children should not be trafficked": "Right against Trafficking",
                    "Children must not be forced into marriage": "Right to Free Choice",
                    "Children deserve legal help": "Right to Legal Aid",
                    "Children in conflict zones need safety": "Right to Peace",
                    "Children must not be used in crimes": "Right to Protection from Exploitation",
                    "Children deserve mental health care": "Right to Mental Health",
                    "Children should get rehabilitation support": "Right to Recovery",
                    "Children deserve safe foster care": "Right to Family Care",
                },
                trap: [
                    "Children should respect elders always",
                    "Children should finish homework daily",
                ],
            },
        ],
    },

    {
        level: 7,
        title: "Level 7 – Global Child Rights Champion",
        time: 60,
        rounds: [
            {
                situations: [
                    "Children must not be discriminated by nationality",
                    "Children deserve protection in wars",
                    "Refugee children deserve shelter",
                    "Children should receive humanitarian aid",
                    "Children deserve access to technology",
                    "Children should be heard in global forums",
                    "Children deserve protection from climate change",
                    "Children deserve inclusive education",
                    "Children should not face digital addiction",
                    "Children deserve global protection laws",
                    "Children should exercise daily",
                ],
                rights: [
                    { name: "Right to Non-Discrimination", color: "bg-red-200 border-red-500" },
                    { name: "Right under International Law", color: "bg-blue-200 border-blue-500" },
                    { name: "Right to Asylum", color: "bg-green-200 border-green-500" },
                    { name: "Right to Assistance", color: "bg-yellow-200 border-yellow-500" },
                    { name: "Right to Digital Access", color: "bg-purple-100 border-purple-400" },
                    { name: "Right to Global Participation", color: "bg-violet-200 border-violet-500" },
                    { name: "Right to Climate Safety", color: "bg-teal-200 border-teal-500" },
                    { name: "Right to Inclusive Learning", color: "bg-indigo-200 border-indigo-500" },
                    { name: "Right to Balanced Life", color: "bg-red-300 border-red-600" },
                    { name: "Right to International Protection", color: "bg-cyan-100 border-cyan-500" },
                ],
                answers: {
                    "Children must not be discriminated by nationality": "Right to Non-Discrimination",
                    "Children deserve protection in wars": "Right under International Law",
                    "Refugee children deserve shelter": "Right to Asylum",
                    "Children should receive humanitarian aid": "Right to Assistance",
                    "Children deserve access to technology": "Right to Digital Access",
                    "Children should be heard in global forums": "Right to Global Participation",
                    "Children deserve protection from climate change": "Right to Climate Safety",
                    "Children deserve inclusive education": "Right to Inclusive Learning",
                    "Children should not face digital addiction": "Right to Balanced Life",
                    "Children deserve global protection laws": "Right to International Protection",
                },
                trap: "Children should exercise daily",
            },
        ],
    },
];
