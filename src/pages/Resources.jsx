import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronUp, BookOpen, MessageCircle } from "lucide-react";

const Resources = () => {
  const [openFaq, setOpenFaq] = useState(0);
  const [query, setQuery] = useState("");
  const [selectedArticle, setSelectedArticle] = useState(null);

  // ---------- FAQs ----------
  const faqs = [
    {
      question: "What are children's rights?",
      answer: "Children's rights are special protections that every child deserves: education, safety, healthcare, and fairness. They make sure kids grow happy and healthy!",
      emoji: "🌟",
    },
    {
      question: "Who made these rights?",
      answer: "The UN created the Convention on the Rights of the Child in 1989. Countries agreed to protect kids everywhere!",
      emoji: "🌍",
    },
    {
      question: "What should I do if my rights are not respected?",
      answer: "Talk to a trusted adult: parent, teacher, or counselor. They want to help you stay safe and happy.",
      emoji: "💬",
    },
    {
      question: "Do all children have the same rights?",
      answer: "Yes! Every child has equal rights no matter where they live or who they are.",
      emoji: "⚖️",
    },
    {
      question: "Why is learning about rights important?",
      answer: "Knowing your rights helps you stand up for yourself and others! Knowledge is power! 💪",
      emoji: "📚",
    },
    {
      question: "Can I help other children learn about their rights?",
      answer: "Absolutely! Share what you learn with friends and family. The more kids who know, the better the world becomes! 🦸",
      emoji: "🦸",
    },
  ];

  const filteredFaqs = faqs.filter((f) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q);
  });

  // ---------- Articles ----------
  const articles = [
    {
      title: "Understanding Your Right to Education",
      description: "Going to school helps you learn, grow, and make friends. It’s your superpower! 💪",
      emoji: "📚",
      variant: "blue",
      funFacts: [
        "Over 1 billion children go to school worldwide! 🌎",
        "Learning can be fun with games, books, and stories! 🎨"
      ]
    },
    {
      title: "Staying Safe Online and Offline",
      description: "Learn to protect yourself at school, at home, and on the internet. 🛡️",
      emoji: "🛡️",
      variant: "green",
      funFacts: [
        "Never share your password with strangers! 🔑",
        "Always ask an adult if something online makes you uncomfortable! 👀"
      ]
    },
    {
      title: "What Does Equality Mean?",
      description: "Treating everyone fairly makes the world a better place. 🤝",
      emoji: "🤝",
      variant: "purple",
      funFacts: [
        "Everyone should get the same chances, no matter their background! 🌈",
        "Kindness and fairness are superpowers too! 💖"
      ]
    },
    {
      title: "Taking Care of Your Health",
      description: "Your right to be healthy and happy. Learn to care for your body! ❤️",
      emoji: "❤️",
      variant: "pink",
      funFacts: [
        "Eat fruits and veggies to grow strong! 🍎🥦",
        "Exercise keeps your mind and body happy! 🏃‍♂️"
      ]
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

      <main className="flex-1 py-8 md:py-12">
        <div className="container mx-auto px-4">

          {/* ---------- Header ---------- */}
          <div className="resources-hero mb-10 rounded-2xl p-6 md:p-12">
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div className="text-left">
                <div className="inline-flex items-center justify-center w-24 h-24 gradient-hero rounded-3xl shadow-glow mb-4">
                  <span className="text-5xl">💡</span>
                </div>
                <h1 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-3">
                  Knowledge Hub
                </h1>
                <p className="font-body text-muted-foreground text-lg md:text-xl max-w-2xl">
                  Learn about your rights and stay safe! <span className="text-gradient font-semibold">Knowledge is your superpower! 🦸</span>
                </p>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">

            {/* ---------- FAQs ---------- */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <MessageCircle className="w-6 h-6 text-primary" />
                <h2 className="font-display font-bold text-2xl text-foreground">FAQs</h2>
              </div>

              <div className="mb-4">
                <label htmlFor="faq-search" className="sr-only">Search FAQs</label>
                <div className="faq-search flex items-center gap-3 p-3 rounded-lg border border-border bg-card shadow-sm">
                  <input
                    id="faq-search"
                    className="flex-1 bg-transparent outline-none text-base text-foreground p-1"
                    placeholder="Search questions or keywords..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                  <span className="text-muted-foreground text-sm">{query ? `${filteredFaqs.length} results` : ""}</span>
                </div>
              </div>

              <div className="space-y-4">
                {filteredFaqs.map((faq, index) => (
                  <div key={index} className="resources-card overflow-hidden rounded-2xl">
                    <button
                      className="w-full p-5 flex items-center justify-between text-left transition-colors hover:bg-muted/50"
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      aria-expanded={openFaq === index}
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-3xl">{faq.emoji}</span>
                        <span className="font-display font-semibold text-foreground">{faq.question}</span>
                      </div>
                      {openFaq === index ? <ChevronUp className="w-5 h-5 text-muted-foreground" /> : <ChevronDown className="w-5 h-5 text-muted-foreground" />}
                    </button>
                    <div className={`accordion-content px-5 pb-5 pt-0 ${openFaq === index ? 'open' : ''}`}>
                      <div className="bg-muted/50 rounded-2xl p-4">
                        <p className="font-body text-foreground leading-relaxed">{faq.answer}</p>
                      </div>
                    </div>
                  </div>
                ))}
                {filteredFaqs.length === 0 && <div className="p-4 rounded-lg bg-card text-muted-foreground">No results found. Try different keywords.</div>}
              </div>
            </div>

            {/* ---------- Bite-sized Articles ---------- */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <BookOpen className="w-6 h-6 text-primary" />
                <h2 className="font-display font-bold text-2xl text-foreground">Bite-sized Articles</h2>
              </div>

              <div className="space-y-5">
                {articles.map((article, index) => (
                  <div key={index} className="article-card rounded-2xl p-5 shadow-card bg-card hover:scale-105 transition-transform duration-300 cursor-pointer" onClick={() => setSelectedArticle(article)}>
                    <div className="flex items-start gap-5">
                      <div className={`w-14 h-14 rounded-full flex items-center justify-center ${gradientClasses[article.variant]} text-primary-foreground text-xl ring-1 ring-white/25`}>
                        {article.emoji}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-display font-bold text-lg mb-1">{article.title}</h3>
                        <p className="font-body text-muted-foreground text-sm mb-3">{article.description}</p>
                        <Button size="sm">Read Article 📖</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* ---------- Full-screen Article Modal ---------- */}
    {/* ---------- Full-screen Article Modal ---------- */}
{selectedArticle && (
  <div className="fixed inset-0 z-50 bg-gradient-to-br from-pink-100 via-blue-100 to-indigo-100 overflow-y-auto">
    
    {/* Backdrop overlay (optional for more contrast) */}
    <div className="absolute inset-0 bg-white/30 backdrop-blur-sm"></div>

    {/* Content container */}
    <div className="relative max-w-3xl mx-auto my-12 p-6 bg-white/90 rounded-3xl shadow-xl">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-purple-800">
          {selectedArticle.emoji} {selectedArticle.title}
        </h2>
        <button
          onClick={() => setSelectedArticle(null)}
          className="text-2xl font-bold hover:text-red-500"
        >
          ✖
        </button>
      </div>

      {/* Description */}
      <p className="text-lg text-gray-800 mb-4">{selectedArticle.description}</p>

      {/* Fun Facts */}
      {selectedArticle.funFacts && (
        <ul className="list-disc ml-6 text-gray-700 space-y-2">
          {selectedArticle.funFacts.map((fact, i) => (
            <li key={i} className="bg-white/80 p-3 rounded-xl shadow-sm hover:scale-105 transition-transform">
              {fact}
            </li>
          ))}
        </ul>
      )}

      {/* Close Button */}
      <div className="text-center mt-8">
        <Button
          onClick={() => setSelectedArticle(null)}
          size="lg"
          className="px-8 py-3 font-bold bg-gradient-to-r from-pink-400 via-blue-400 to-indigo-400 text-black hover:scale-105 transition-transform duration-300 shadow-lg"
        >
          Close
        </Button>
      </div>
    </div>
  </div>
)}



      <Footer />
    </div>
  );
};

export default Resources;
