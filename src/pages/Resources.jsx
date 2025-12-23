import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, BookOpen, Shield, Users, Heart, MessageCircle } from "lucide-react";

const Resources = () => {
  const [openFaq, setOpenFaq] = useState(0);

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
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 gradient-hero rounded-3xl shadow-button mb-6">
              <span className="text-4xl">💡</span>
            </div>
            <h1 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-3">
              Resources & Help
            </h1>
            <p className="font-body text-muted-foreground text-lg max-w-2xl mx-auto">
              Find answers to your questions and learn more about your rights! 
              Knowledge is your superpower! 🦸
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* FAQs Section */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <MessageCircle className="w-6 h-6 text-primary" />
                <h2 className="font-display font-bold text-2xl text-foreground">
                  Frequently Asked Questions
                </h2>
              </div>

              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="card-playful !p-0 overflow-hidden"
                  >
                    <button
                      className="w-full p-4 flex items-center justify-between text-left hover:bg-muted/50 transition-colors"
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{faq.emoji}</span>
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
                    {openFaq === index && (
                      <div className="px-4 pb-4 pt-0">
                        <div className="bg-muted/50 rounded-2xl p-4">
                          <p className="font-body text-foreground leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
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

              <div className="space-y-4">
                {articles.map((article, index) => (
                  <div
                    key={index}
                    className={`card-playful ${gradientClasses[article.variant]} text-primary-foreground`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="text-4xl">{article.emoji}</div>
                      <div className="flex-1">
                        <h3 className="font-display font-bold text-lg mb-2">
                          {article.title}
                        </h3>
                        <p className="font-body text-primary-foreground/80 text-sm mb-4">
                          {article.description}
                        </p>
                        <Button variant="secondary" size="sm">
                          Read Article 📖
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Help Card */}
              <div className="card-playful mt-6 border-2 border-primary bg-primary/5">
                <div className="text-center">
                  <span className="text-4xl mb-4 block">🆘</span>
                  <h3 className="font-display font-bold text-lg text-foreground mb-2">
                    Need Help Right Now?
                  </h3>
                  <p className="font-body text-muted-foreground text-sm mb-4">
                    If you feel unsafe or need help, talk to a trusted adult. 
                    You can also ask a teacher, counselor, or call a helpline.
                  </p>
                  <p className="font-display font-bold text-primary">
                    You are never alone! 💙
                  </p>
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
