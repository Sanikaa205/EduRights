import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { BookOpen, GamepadIcon, Shield, Star, Users, Award, ArrowRight, Sparkles, Zap } from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: BookOpen,
      title: "Learn Your Rights",
      description: "Discover important rights every child should know through fun stories!",
      emoji: "📖",
      color: "gradient-card-blue",
    },
    {
      icon: GamepadIcon,
      title: "Play & Quiz",
      description: "Test your knowledge with exciting quizzes and earn awesome badges!",
      emoji: "🎮",
      color: "gradient-card-purple",
    },
    {
      icon: Shield,
      title: "Stay Safe",
      description: "Learn how to protect yourself and when to ask for help!",
      emoji: "🛡️",
      color: "gradient-card-green",
    },
    {
      icon: Users,
      title: "Learn Together",
      description: "Join thousands of kids learning in a fun, safe space!",
      emoji: "👫",
      color: "gradient-card-orange",
    },
  ];

  const stats = [
    { value: "10K+", label: "Happy Learners", emoji: "🎉", color: "gradient-card-pink" },
    { value: "50+", label: "Fun Lessons", emoji: "📚", color: "gradient-card-blue" },
    { value: "100+", label: "Quizzes", emoji: "🧠", color: "gradient-card-purple" },
    { value: "25+", label: "Badges to Earn", emoji: "🏆", color: "gradient-card-yellow" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background overflow-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-16 md:py-20">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Animated blobs */}
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-primary/20 blob float-slow" />
          <div className="absolute top-1/3 -left-32 w-80 h-80 bg-accent/20 blob float-animation stagger-2" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-secondary/30 blob float-slow stagger-3" />
          <div className="absolute bottom-1/4 left-1/3 w-48 h-48 bg-pink/20 blob float-animation stagger-4" />
          
          {/* Floating decorations */}
          <div className="absolute top-20 left-[15%] text-5xl float-animation stagger-1">⭐</div>
          <div className="absolute top-40 right-[20%] text-4xl float-slow stagger-2">🌟</div>
          <div className="absolute bottom-32 left-[10%] text-3xl float-animation stagger-3">✨</div>
          <div className="absolute top-60 left-[5%] text-4xl float-slow stagger-4">🎈</div>
          <div className="absolute bottom-48 right-[15%] text-5xl float-animation stagger-5">🎯</div>
          <div className="absolute top-32 right-[10%] text-3xl spin-slow">🌈</div>
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            {/* Mascot */}
            <div className="inline-flex items-center justify-center w-28 h-28 md:w-36 md:h-36 gradient-hero rounded-[2.5rem] shadow-[0_10px_0_hsl(280_70%_45%),0_15px_40px_hsl(280_85%_60%/0.4)] mb-8 animate-bounce-in">
              <span className="text-6xl md:text-7xl">📚</span>
            </div>

            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground rounded-full px-6 py-3 mb-6 font-display font-bold text-base shadow-[0_4px_0_hsl(var(--secondary-depth))] animate-pop-in">
              <Sparkles className="w-5 h-5" />
              Fun Learning for Ages 8-16
              <Zap className="w-5 h-5" />
            </div>

            {/* Main heading */}
            <h1 className="font-display font-bold text-5xl md:text-7xl lg:text-8xl text-foreground mb-6 leading-tight animate-slide-up">
              Learn Your{" "}
              <span className="text-gradient inline-block hover:scale-105 transition-transform cursor-default">Rights</span>
              <br />
              <span className="text-4xl md:text-5xl lg:text-6xl">Through Fun & Games!</span>
            </h1>

            {/* Tagline */}
            <p className="font-body font-semibold text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              EduRights makes learning about your rights exciting! Play games, earn badges, 
              and become a rights champion! 🌟
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
              <Link to="/register">
                <Button variant="hero" size="xl" className="gap-3 min-w-56">
                  <Star className="w-6 h-6 fill-current" />
                  Start Learning
                  <ArrowRight className="w-6 h-6" />
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="xl" className="gap-3 min-w-56">
                  I Have an Account
                </Button>
              </Link>
            </div>

            {/* Character emojis */}
            <div className="flex items-center justify-center gap-6 mt-12">
              <span className="text-5xl md:text-6xl float-animation stagger-1 hover:scale-125 transition-transform cursor-pointer">👧</span>
              <span className="text-6xl md:text-7xl float-animation stagger-2 hover:scale-125 transition-transform cursor-pointer">🦸</span>
              <span className="text-5xl md:text-6xl float-animation stagger-3 hover:scale-125 transition-transform cursor-pointer">👦</span>
            </div>
          </div>
        </div>

        {/* Wave decoration */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" className="w-full h-20 md:h-28 fill-card">
            <path d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,64C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-card relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`card-cartoon text-center p-5 ${stat.color} animate-pop-in`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-4xl mb-3 bounce-animation" style={{ animationDelay: `${index * 0.2}s` }}>
                  {stat.emoji}
                </div>
                <div className="font-display font-bold text-3xl md:text-4xl text-primary-foreground drop-shadow-md">
                  {stat.value}
                </div>
                <div className="font-body font-semibold text-primary-foreground/90 text-sm mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-card relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 text-4xl float-slow">💫</div>
        <div className="absolute bottom-20 right-10 text-5xl float-animation">🎨</div>

        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-accent rounded-3xl shadow-[0_6px_0_hsl(var(--accent-depth))] mb-6">
              <span className="text-4xl">💜</span>
            </div>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-4">
              Why Kids Love EduRights
            </h2>
            <p className="font-body font-semibold text-muted-foreground text-lg max-w-2xl mx-auto">
              We make learning about rights fun and easy to understand!
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`card-cartoon text-center ${feature.color} p-8`}
              >
                <div className="text-6xl mb-4 bounce-animation" style={{ animationDelay: `${index * 0.15}s` }}>
                  {feature.emoji}
                </div>
                <div className="w-14 h-14 bg-primary-foreground/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="font-display font-bold text-xl text-primary-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="font-body text-primary-foreground/90 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-[10%] text-4xl float-animation">🚀</div>
          <div className="absolute bottom-10 right-[10%] text-5xl float-slow">🌈</div>
          <div className="absolute top-1/2 left-[5%] text-3xl float-animation stagger-2">⭐</div>
          <div className="absolute top-1/3 right-[5%] text-4xl float-slow stagger-3">✨</div>
        </div>

        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center gradient-hero rounded-[3rem] p-12 md:p-20 shadow-[0_12px_0_hsl(280_70%_45%),0_20px_60px_hsl(280_85%_60%/0.3)]">
            <div className="text-7xl mb-6 bounce-animation">🚀</div>
            <h2 className="font-display font-bold text-3xl md:text-5xl text-primary-foreground mb-4">
              Ready to Become a Rights Champion?
            </h2>
            <p className="font-body font-semibold text-primary-foreground/90 text-lg md:text-xl mb-8">
              Join thousands of kids who are learning their rights while having fun!
            </p>
            <Link to="/register">
              <Button 
                variant="hero" 
                size="xl" 
                className="gap-3 shadow-[0_18px_40px_rgba(2,6,23,0.12)] hover:shadow-[0_28px_70px_rgba(2,6,23,0.18)] transform-gpu -translate-y-1 hover:-translate-y-2 transition-transform duration-200"
              >
                <Award className="w-6 h-6" />
                Get Started Free
                <Star className="w-6 h-6 fill-current" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
