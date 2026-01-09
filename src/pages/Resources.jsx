import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  ChevronDown,
  ChevronUp,
  BookOpen,
  Shield,
  Users,
  Heart,
  MessageCircle,
} from "lucide-react";

const Resources = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const [query, setQuery] = useState("");

  /* =======================
     FAQS – CHILD FRIENDLY
  ======================== */
  const faqs = [
    {
      question: "🌟 What are children's rights?",
      answer:
        "Imagine special rules that protect YOU 💙 These rules make sure you can learn 📚, play 🎮, stay safe 🛡️, and be treated kindly. These rules are called children's rights, and every child in the world has them!",
      action: "Try this 👉 Tell a friend one right you learned today!",
    },
    {
      question: "🌍 Who made these rights?",
      answer:
        "Grown-ups from almost every country came together in 1989 and promised to protect children. This promise is called the UNCRC. It’s like a big global pinky promise 🤝 to take care of kids!",
    },
    {
      question: "💬 What if someone doesn’t respect my rights?",
      answer:
        "That can feel scary, but you are not alone ❤️ Talk to a parent, teacher, counselor, or another trusted adult. Asking for help is a brave thing!",
      action: "You are brave when you speak up 💪",
    },
    {
      question: "⚖️ Do all children have the same rights?",
      answer:
        "YES! 🎉 Every child is equal — no matter where they live, what language they speak, or how they look. All children deserve fairness and respect.",
    },
    {
      question: "📚 Why should I learn about my rights?",
      answer:
        "When you know your rights, you can protect yourself and help others too! Knowledge is like a superpower 🦸 that helps you make smart and safe choices.",
    },
    {
      question: "🦸 Can I help other kids?",
      answer:
        "Absolutely! You can share what you learn with friends, siblings, or classmates. When you help others, you become a Rights Hero 🌈",
      action: "Hero Mission 👉 Share one right today!",
    },
  ];

  const filteredFaqs = faqs.filter((f) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      f.question.toLowerCase().includes(q) ||
      f.answer.toLowerCase().includes(q)
    );
  });

  /* =======================
     ARTICLES – FUN TITLES
  ======================== */
  const articles = [
    {
      title: "📘 School Is Your Superpower",
      description:
        "Learn why education helps you dream big and build your future.",
      emoji: "📚",
      variant: "blue",
      age: "Ages 6–12",
       link: "/comic/education",
    },
    {
      title: "🛡️ Staying Safe Everywhere",
      description:
        "Easy tips to stay safe online, at school, and at home.",
      emoji: "🛡️",
      variant: "green",
      age: "Ages 8–16",
    },
    {
      title: "🤝 Fairness for Everyone",
      description:
        "Why treating everyone equally makes the world better.",
      emoji: "🤝",
      variant: "purple",
      age: "Ages 10–16",
    },
    {
      title: "❤️ Taking Care of Your Health",
      description:
        "Your right to be healthy and how to care for yourself.",
      emoji: "❤️",
      variant: "pink",
      age: "All Ages",
    },
  ];

  const gradientClasses = {
    blue: "gradient-card-blue",
    green: "gradient-card-green",
    purple: "gradient-card-purple",
    pink: "gradient-card-pink",
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 py-10">
        <div className="container mx-auto px-4">

          {/* ================= HERO ================= */}
          <div className="mb-10 rounded-2xl p-6 md:p-10 bg-muted">
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div>
                <span className="text-5xl block mb-3">💡</span>
                <h1 className="font-display font-bold text-4xl mb-3">
                  Learn Your Rights
                </h1>
                <p className="text-lg text-muted-foreground">
                  Hi! I’m <strong>Rex the Rights Fox 🦊</strong><br />
                  I’ll help you learn your rights in a fun and simple way!
                </p>
              </div>

              {/* RIGHT OF THE DAY */}
              <div className="rounded-2xl p-6 bg-gradient-to-r from-indigo-400 to-pink-400 text-white shadow-lg">
                🌟 <strong>Right of the Day</strong>
                <p className="mt-2 text-lg">
                  You have the right to be heard. Your thoughts and feelings matter 💬
                </p>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-10">

            {/* ================= FAQ ================= */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <MessageCircle className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold">
                  Curious Questions Kids Ask ❓
                </h2>
              </div>

              <input
                className="w-full mb-4 p-3 rounded-lg border bg-card"
                placeholder="Search your question..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />

              <div className="space-y-4">
                {filteredFaqs.map((faq, index) => (
                  <div key={index} className="rounded-2xl bg-card shadow">
                    <button
                      className="w-full p-5 flex justify-between items-center"
                      onClick={() =>
                        setOpenFaq(openFaq === index ? null : index)
                      }
                    >
                      <span className="font-semibold text-left">
                        {faq.question}
                      </span>
                      {openFaq === index ? <ChevronUp /> : <ChevronDown />}
                    </button>

                    {openFaq === index && (
                      <div className="px-5 pb-5">
                        <p className="mb-3">{faq.answer}</p>

                        {faq.action && (
                          <div className="bg-primary/10 p-3 rounded-xl text-sm">
                            👉 <strong>{faq.action}</strong>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* ================= ARTICLES ================= */}
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-primary" />
                Learn More & Explore 🚀
              </h2>

              <div className="space-y-5">
                {articles.map((article, index) => (
                  <div
                    key={index}
                    className="rounded-2xl p-5 bg-card shadow"
                  >
                    <div className="flex gap-4">
                      <div
                        className={`w-14 h-14 flex items-center justify-center rounded-full ${gradientClasses[article.variant]}`}
                      >
                        {article.emoji}
                      </div>
                      <div>
                        <h3 className="font-bold">{article.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {article.description}
                        </p>
                        <span className="text-xs bg-muted px-2 py-1 rounded-full mt-2 inline-block">
                          {article.age}
                        </span>
                        <div className="mt-3">
                          <Link to={article.link}>
                            <Button size="sm">Read 📖</Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* HELP */}
              <div className="mt-6 p-6 rounded-2xl bg-primary/10 text-center">
                <span className="text-5xl">🆘</span>
                <h3 className="font-bold mt-2">Need Help Right Now?</h3>
                <p className="text-sm mt-2">
                  Feeling scared or confused? That’s okay ❤️  
                  Talking to someone can help.
                </p>
                <div className="mt-4 flex justify-center gap-3">
                  <Link to="/feedback">
                    <Button>Talk to a Helper 💬</Button>
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Resources;
