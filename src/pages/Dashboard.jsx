import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProgressBar from "@/components/ui/ProgressBar";
import StatCard from "@/components/ui/StatCard";
import { Trophy, Star, Award, BookOpen, Brain, HelpCircle, ArrowRight, Zap } from "lucide-react";

const Dashboard = () => {
  // Demo user data
  const user = {
    name: "Alex",
    level: 5,
    points: 1250,
    badges: 8,
    progress: 65,
  };

  const badges = [
    { name: "First Steps", emoji: "👶", earned: true },
    { name: "Quiz Master", emoji: "🧠", earned: true },
    { name: "Safety Star", emoji: "⭐", earned: true },
    { name: "Rights Hero", emoji: "🦸", earned: true },
    { name: "Super Learner", emoji: "📚", earned: true },
    { name: "Helper Badge", emoji: "🤝", earned: true },
    { name: "Champion", emoji: "🏆", earned: true },
    { name: "Explorer", emoji: "🔍", earned: true },
    { name: "Equality Pro", emoji: "⚖️", earned: false },
    { name: "Voice Hero", emoji: "📢", earned: false },
  ];

  const quickActions = [
    {
      title: "Learning Modules",
      description: "Continue learning about your rights",
      icon: BookOpen,
      emoji: "📖",
      href: "/modules",
      gradient: "gradient-card-blue",
      shadow: "shadow-[0_8px_0_hsl(210_90%_45%)]",
    },
    {
      title: "Quiz Zone",
      description: "Test your knowledge and earn points",
      icon: Brain,
      emoji: "🎯",
      href: "/quiz",
      gradient: "gradient-card-purple",
      shadow: "shadow-[0_8px_0_hsl(290_75%_50%)]",
    },
    {
      title: "Resources",
      description: "Find helpful articles and FAQs",
      icon: HelpCircle,
      emoji: "💡",
      href: "/resources",
      gradient: "gradient-card-green",
      shadow: "shadow-[0_8px_0_hsl(145_80%_32%)]",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 py-8 md:py-12 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-10 right-10 text-4xl float-slow opacity-60">⭐</div>
        <div className="absolute bottom-20 left-10 text-5xl float-animation opacity-60">🎈</div>
        <div className="absolute top-1/3 right-[5%] text-3xl float-animation stagger-2 opacity-60">✨</div>

        <div className="container mx-auto px-4">
          {/* Welcome Header */}
          <div className="mb-8 animate-slide-up">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-16 h-16 gradient-hero rounded-2xl flex items-center justify-center shadow-[0_6px_0_hsl(280_70%_45%)] bounce-animation">
                <span className="text-3xl">👋</span>
              </div>
              <div>
                <h1 className="font-display font-bold text-4xl md:text-5xl text-foreground">
                  Hi {user.name}! <span className="inline-block animate-bounce-in">🎉</span>
                </h1>
                <p className="font-body font-semibold text-muted-foreground text-lg">
                  Ready to continue your learning adventure? Let's go!
                </p>
              </div>
            </div>
          </div>

          {/* Progress Section */}
          <div className="card-cartoon mb-8 border-4 border-primary/30">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 gradient-hero rounded-2xl flex items-center justify-center shadow-[0_6px_0_hsl(280_70%_45%)]">
                <Trophy className="w-8 h-8 text-primary-foreground" />
              </div>
              <div>
                <h2 className="font-display font-bold text-2xl text-foreground">
                  Your Progress
                </h2>
                <p className="font-body font-semibold text-muted-foreground">
                  Keep going, you're doing amazing! ⭐
                </p>
              </div>
              <div className="ml-auto hidden md:flex items-center gap-2 bg-secondary/20 px-4 py-2 rounded-xl">
                <Zap className="w-5 h-5 text-secondary" />
                <span className="font-display font-bold text-secondary-foreground">5 Day Streak!</span>
              </div>
            </div>
            <ProgressBar value={user.progress} variant="rainbow" size="lg" />
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <StatCard
              title="Current Level"
              value={user.level}
              icon={Trophy}
              emoji="🎮"
              variant="yellow"
            />
            <StatCard
              title="Total Points"
              value={user.points.toLocaleString()}
              icon={Star}
              emoji="⭐"
              variant="purple"
            />
            <StatCard
              title="Badges Earned"
              value={user.badges}
              icon={Award}
              emoji="🏆"
              variant="green"
            />
          </div>

          {/* Badges Section */}
          <div className="card-cartoon mb-8 border-4 border-secondary/30">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-4xl">🏅</span>
              <h2 className="font-display font-bold text-2xl text-foreground">
                Your Badges
              </h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {badges.map((badge, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-2 px-4 py-3 rounded-2xl font-body font-semibold transition-all duration-200 ${
                    badge.earned
                      ? "bg-secondary shadow-[0_4px_0_hsl(var(--secondary-depth))] hover:translate-y-[-2px] hover:shadow-[0_6px_0_hsl(var(--secondary-depth))] cursor-pointer"
                      : "bg-muted opacity-60 shadow-[0_4px_0_hsl(var(--border))]"
                  }`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <span className="text-2xl">{badge.emoji}</span>
                  <span className="text-sm text-foreground">
                    {badge.name}
                  </span>
                  {!badge.earned && (
                    <span className="text-xs">🔒</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-4xl">🚀</span>
            <h2 className="font-display font-bold text-2xl text-foreground">
              Continue Learning
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {quickActions.map((action, index) => (
              <Link key={index} to={action.href}>
                <div
                  className={`card-cartoon p-6 ${action.gradient} ${action.shadow} h-full hover:translate-y-[-6px] hover:shadow-[0_12px_0_hsl(200_50%_40%)]`}
                >
                  <div className="text-5xl mb-4 bounce-animation" style={{ animationDelay: `${index * 0.15}s` }}>
                    {action.emoji}
                  </div>
                  <div className="w-12 h-12 bg-primary-foreground/20 rounded-2xl flex items-center justify-center mb-4">
                    <action.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-display font-bold text-xl text-primary-foreground mb-2">
                    {action.title}
                  </h3>
                  <p className="font-body text-primary-foreground/80 text-sm mb-4">
                    {action.description}
                  </p>
                  <Button variant="secondary" size="sm" className="gap-2">
                    Go Now
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
