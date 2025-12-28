import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronUp, BookOpen, Shield, Users, Heart, MessageCircle } from "lucide-react";

const Resources = () => {
  const [openFaq, setOpenFaq] = useState(0);
  const [query, setQuery] = useState("");

  const faqs = [
    {
      question: "What are children's rights?",
      answer: "Children's rights are special protections that every child in the world deserves. They include things like the right to education, safety, healthcare, and being treated fairly. These rights help make sure every child can grow up happy and healthy!",
      emoji: "🌟",
    },
    {
      question: "Who made these rights?",
      answer: "The United Nations created the Convention on the Rights of the Child (UNCRC) in 1989. Almost every country in the world agreed to protect these rights. It's like a promise from grown-ups to take care of all children!",
      emoji: "🌍",
    },
    {
      question: "What should I do if my rights are not respected?",
      answer: "Talk to a trusted adult like a parent, teacher, or school counselor. They can help you! Remember, it's never your fault, and there are always people who want to help you stay safe and happy.",
      emoji: "💬",
    },
    {
      question: "Do all children have the same rights?",
      answer: "Yes! Every child in the world has the same rights, no matter where they live, what language they speak, or what they look like. All children are equal and deserve to be treated fairly!",
      emoji: "⚖️",
    },
    {
      question: "Why is learning about rights important?",
      answer: "When you know your rights, you can stand up for yourself and others! It helps you understand what's fair and how to ask for help when needed. Knowledge is power! 💪",
      emoji: "📚",
    },
    {
      question: "Can I help other children learn about their rights?",
      answer: "Absolutely! You can share what you learn with friends and family. Teaching others makes you a Rights Champion! The more kids who know their rights, the better the world becomes!",
      emoji: "🦸",
    },
  ];

  const filteredFaqs = faqs.filter((f) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q)
    );
  });

  const articles = [
    {
      title: "Understanding Your Right to Education",
      description: "Learn why going to school is one of the most important things for your future!",
      icon: BookOpen,
      emoji: "📚",
      variant: "blue",
    },
    {
      title: "Staying Safe Online and Offline",
      description: "Tips to keep yourself protected in the real world and on the internet.",
      icon: Shield,
      emoji: "🛡️",
      variant: "green",
    },
    {
      title: "What Does Equality Mean?",
      description: "Discover why treating everyone fairly makes the world a better place!",
      icon: Users,
      emoji: "🤝",
      variant: "purple",
    },
    {
      title: "Taking Care of Your Health",
      description: "Your right to be healthy and how to take care of yourself.",
      icon: Heart,
      emoji: "❤️",
      variant: "pink",
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
          {/* Header */}
          <div className="resources-hero mb-10 rounded-2xl p-6 md:p-12">
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div className="text-left">
                <div className="inline-flex items-center justify-center w-24 h-24 gradient-hero rounded-3xl shadow-glow mb-4">
                  <span className="text-5xl">💡</span>
                </div>
                <h1 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-3">
                  Resources & Help
                </h1>
                <p className="font-body text-muted-foreground text-lg md:text-xl max-w-2xl">
                  Find answers to your questions and learn more about your rights! <span className="text-gradient font-semibold">Knowledge is your superpower!</span> 🦸
                </p>
              </div>

              <div className="hidden md:flex justify-center items-center">
                {/* Friendly illustrative SVG (simple shapes, original art) */}
                <svg className="resources-hero-illustration" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Children learning illustration">
                  <defs>
                    <linearGradient id="g1" x1="0" x2="1" y1="0" y2="1">
                      <stop offset="0%" stopColor="#7dd3fc" />
                      <stop offset="100%" stopColor="#c084fc" />
                    </linearGradient>
                    <linearGradient id="g2" x1="0" x2="1">
                      <stop offset="0%" stopColor="#f97316" />
                      <stop offset="100%" stopColor="#f43f5e" />
                    </linearGradient>
                  </defs>

                  {/* Background blob */}
                  <ellipse cx="110" cy="110" rx="80" ry="64" fill="url(#g1)" opacity="0.15" />

                  {/* Book */}
                  <rect x="48" y="102" width="104" height="56" rx="6" fill="#fff" stroke="#e6eef8" />
                  <rect x="48" y="102" width="52" height="56" rx="6" fill="url(#g2)" opacity="0.12" />

                  {/* Child left (simple shapes) */}
                  <circle cx="80" cy="78" r="14" fill="#ffdca8" />
                  <rect x="68" y="92" width="24" height="20" rx="4" fill="#60a5fa" />

                  {/* Child right */}
                  <circle cx="124" cy="70" r="12" fill="#ffdca8" />
                  <rect x="116" y="84" width="20" height="18" rx="4" fill="#f472b6" />

                  {/* Stars / Sparkles */}
                  <g fill="#fff" opacity="0.9">
                    <polygon points="160,38 164,48 174,48 166,54 170,64 160,58 150,64 154,54 146,48 156,48" opacity="0.9" fill="#fef08a" />
                    <circle cx="40" cy="40" r="5" fill="#7dd3fc" opacity="0.9" />
                  </g>
                </svg>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* FAQs Section */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <MessageCircle className="w-6 h-6 text-primary" />
                <h2 className="font-display font-bold text-2xl text-foreground">
                  Frequently Asked Questions
                </h2>
              </div>

              {/* Search */}
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
                  <div
                    key={index}
                    className="resources-card overflow-hidden rounded-2xl"
                  >
                    <button
                      className="w-full p-5 flex items-center justify-between text-left transition-colors hover:bg-muted/50"
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      aria-expanded={openFaq === index}
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-3xl">{faq.emoji}</span>
                        <span className="font-display font-semibold text-foreground">
                          {faq.question}
                        </span>
                      </div>
                      {openFaq === index ? (
                        <ChevronUp className="w-5 h-5 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-muted-foreground" />
                      )}
                    </button>

                    <div className={`accordion-content px-5 pb-5 pt-0 ${openFaq === index ? 'open' : ''}`}>
                      <div className="bg-muted/50 rounded-2xl p-4">
                        <p className="font-body text-foreground leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}

                {filteredFaqs.length === 0 && (
                  <div className="p-4 rounded-lg bg-card text-muted-foreground">No results found. Try different keywords.</div>
                )}
              </div>
            </div>

            {/* Articles Section */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <BookOpen className="w-6 h-6 text-primary" />
                <h2 className="font-display font-bold text-2xl text-foreground">
                  Learn More
                </h2>
              </div>

              <div className="space-y-5">
                {articles.map((article, index) => (
                  <div
                    key={index}
                    className="article-card rounded-2xl p-5 shadow-card bg-card"
                  >
                    <div className="flex items-start gap-5">
                      <div className={`w-14 h-14 rounded-full flex items-center justify-center ${gradientClasses[article.variant]} text-primary-foreground text-xl ring-1 ring-white/25`}>{article.emoji}</div>
                      <div className="flex-1">
                        <h3 className="font-display font-bold text-lg mb-1">
                          {article.title}
                        </h3>
                        <p className="font-body text-muted-foreground text-sm mb-3">
                          {article.description}
                        </p>
                        <Button asChild size="sm">
                          <Link to="#">Read Article 📖</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Help Card */}
              <div className="resources-help-card mt-6 rounded-2xl">
                <div className="text-center p-6 bg-primary/6 border border-primary/20 rounded-2xl">
                  <span className="text-6xl mb-4 block">🆘</span>
                  <h3 className="font-display font-bold text-lg text-foreground mb-2">
                    Need Help Right Now?
                  </h3>
                  <p className="font-body text-muted-foreground text-sm mb-4">
                    If you feel unsafe or need help, talk to a trusted adult. 
                    You can also ask a teacher, counselor, or call a helpline.
                  </p>
                  <p className="font-display font-bold text-primary mb-4">
                    You are never alone! 💙
                  </p>
                  <div className="flex items-center justify-center gap-3">
                    <Link to="/feedback">
                      <Button variant="primary" className="px-6 py-2">Contact Support</Button>
                    </Link>
                    <Button variant="ghost" className="px-4 py-2">Call Helpline</Button>
                  </div>
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
