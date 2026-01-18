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
    blue: "bg-gradient-to-r from-blue-400 to-blue-600",
    green: "bg-gradient-to-r from-green-400 to-emerald-600",
    purple: "bg-gradient-to-r from-purple-400 to-purple-600",
    pink: "bg-gradient-to-r from-pink-400 to-rose-600",
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF8F0] relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 text-6xl animate-bounce opacity-20">💡</div>
        <div className="absolute top-40 right-20 text-5xl animate-pulse opacity-20">📚</div>
        <div className="absolute bottom-32 left-1/4 text-4xl animate-bounce opacity-20" style={{animationDelay: '0.5s'}}>🌟</div>
        <div className="absolute top-1/3 right-10 text-5xl animate-pulse opacity-20" style={{animationDelay: '1s'}}>🦸</div>
        <div className="absolute bottom-20 right-1/4 text-4xl animate-bounce opacity-20" style={{animationDelay: '1.5s'}}>❓</div>
        <div className="absolute top-1/2 left-5 text-3xl animate-pulse opacity-20" style={{animationDelay: '2s'}}>✨</div>
      </div>
      <Navbar />

      <main className="flex-1 py-8 md:py-12 relative z-10">
        <div className="container mx-auto px-4 max-w-[95%] xl:max-w-[1400px]">

          {/* ---------- Header ---------- */}
          <div className="mb-10 rounded-2xl p-6 md:p-12 bg-gradient-to-r from-amber-100 to-orange-100 shadow-lg">
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div className="text-left">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-amber-400 to-orange-500 rounded-3xl shadow-lg mb-4">
                  <span className="text-5xl">💡</span>
                </div>
                <h1 className="font-display font-bold text-4xl md:text-5xl text-gray-800 mb-3">
                  Knowledge Hub
                </h1>
                <p className="font-body text-gray-500 text-lg md:text-xl max-w-2xl">
                  Learn about your rights and stay safe! <span className="text-amber-600 font-semibold">Knowledge is your superpower! 🦸</span>
                </p>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">

            {/* ---------- FAQs ---------- */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <h2 className="font-display font-bold text-2xl text-gray-800">FAQs</h2>
              </div>

              <div className="mb-4">
                <label htmlFor="faq-search" className="sr-only">Search FAQs</label>
                <div className="flex items-center gap-3 p-3 rounded-lg border-0 bg-white/80 backdrop-blur-sm shadow-lg">
                  <input
                    id="faq-search"
                    className="flex-1 bg-transparent outline-none text-base text-gray-800 p-1"
                    placeholder="Search questions or keywords..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                  <span className="text-gray-500 text-sm">{query ? `${filteredFaqs.length} results` : ""}</span>
                </div>
              </div>

              <div className="space-y-4">
                {filteredFaqs.map((faq, index) => (
                  <div key={index} className="overflow-hidden rounded-2xl bg-white/80 backdrop-blur-sm shadow-lg border-0">
                    <button
                      className="w-full p-5 flex items-center justify-between text-left transition-colors hover:bg-white/90"
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      aria-expanded={openFaq === index}
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-3xl">{faq.emoji}</span>
                        <span className="font-display font-semibold text-gray-800">{faq.question}</span>
                      </div>
                      {openFaq === index ? <ChevronUp className="w-5 h-5 text-gray-500" /> : <ChevronDown className="w-5 h-5 text-gray-500" />}
                    </button>
                    <div className={`accordion-content px-5 pb-5 pt-0 ${openFaq === index ? 'open' : ''}`}>
                      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-4">
                        <p className="font-body text-gray-700 leading-relaxed">{faq.answer}</p>
                      </div>
                    </div>
                  </div>
                ))}
                {filteredFaqs.length === 0 && <div className="p-4 rounded-lg bg-white/80 text-gray-500">No results found. Try different keywords.</div>}
              </div>
            </div>

            {/* ---------- Bite-sized Articles ---------- */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <h2 className="font-display font-bold text-2xl text-gray-800">Bite-sized Articles</h2>
              </div>

              <div className="space-y-5">
                {articles.map((article, index) => (
                  <div key={index} className="rounded-2xl p-5 shadow-lg bg-white/80 backdrop-blur-sm border-0 hover:scale-105 transition-transform duration-300 cursor-pointer" onClick={() => setSelectedArticle(article)}>
                    <div className="flex items-start gap-5">
                      <div className={`w-14 h-14 rounded-full flex items-center justify-center ${gradientClasses[article.variant]} text-white text-xl ring-2 ring-white shadow-lg`}>
                        {article.emoji}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-display font-bold text-lg text-gray-800 mb-1">{article.title}</h3>
                        <p className="font-body text-gray-500 text-sm mb-3">{article.description}</p>
                        <Button size="sm" className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">Read Article 📖</Button>
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
