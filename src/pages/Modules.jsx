import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ModuleCard from "@/components/ui/ModuleCard";
import ProgressBar from "@/components/ui/ProgressBar";
import CircularProgress from "@/components/ui/CircularProgress";
import { BookOpen, Shield, Star, Zap, Heart, MessageSquare, Users, Lock, Trophy } from "lucide-react";

const Modules = () => {
  const modules = [
    {
      title: "Right to Education",
      description: "Every child has the right to learn and go to school. Discover why education is important for their future.",
      icon: BookOpen,
      variant: "blue",
      progress: 100,
    },
    {
      title: "Right to Safety",
      description: "You deserve to feel safe at home, school, and everywhere. Learn how to stay protected.",
      icon: Shield,
      variant: "green",
      progress: 75,
    },
    {
      title: "Right to Equality",
      description: "Everyone deserves to be treated fairly. Explore what equality means.",
      icon: Star,
      variant: "purple",
      progress: 50,
    },
    {
      title: "Right to Play",
      description: "Playing is important for growing up healthy and happy. Learn about your right to recreation.",
      icon: Zap,
      variant: "yellow",
      progress: 25,
    },
    {
      title: "Right to Health",
      description: "You have the right to be healthy and receive medical care when needed.",
      icon: Heart,
      variant: "pink",
      progress: 0,
    },
    {
      title: "Right to Be Heard",
      description: "Your voice matters. Learn how to share your thoughts and be heard.",
      icon: MessageSquare,
      variant: "orange",
      progress: 0,
    },
    {
      title: "Right to Family",
      description: "Every child deserves a supportive family. Discover why family bonds matter.",
      icon: Users,
      variant: "blue",
      progress: 0,
    },
    {
      title: "Right to Privacy",
      description: "You have the right to keep personal information private. Learn how to protect it.",
      icon: Lock,
      variant: "purple",
      progress: 0,
    },
  ];

  const completedCount = modules.filter((m) => m.progress === 100).length;
  const averageProgress = Math.round(modules.reduce((s, m) => s + m.progress, 0) / modules.length);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 py-8 md:py-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 gradient-hero rounded-2xl shadow-button mb-6">
              <BookOpen className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-3">
              Learning Modules
            </h1>
            <p className="font-body text-muted-foreground text-lg max-w-2xl mx-auto">
              Explore lessons about your rights. Each module covers an important topic.
            </p>
          </div>

          {/* Progress Overview */}
          <div className="card-playful rounded-2xl bg-card text-foreground grid md:grid-cols-3 gap-4 items-center mb-10 p-6 shadow-lg relative overflow-hidden">
            <div className="absolute -top-3 left-6 right-6 h-1 rounded-full bg-gradient-to-r from-sky-400 via-cyan-400 to-teal-400 opacity-80" aria-hidden="true" />

            <div className="flex items-center gap-4 md:col-span-1">
              <div className="w-16 h-16 rounded-xl gradient-hero-teal flex items-center justify-center text-white">
                <Trophy className="w-7 h-7" />
              </div>
              <div>
                <p className="font-body text-muted-foreground mb-1">Modules Completed</p>
                <p className="font-display font-bold text-3xl">{completedCount} / {modules.length}</p>
              </div>
            </div>

            <div className="md:col-span-1 flex items-center justify-center md:justify-center gap-4">
              <div className="relative">
                <div className="inline-block">
                  <div className="relative">
                    <div className="flex items-center justify-center">
                      <div className="w-24 h-24">
                        <CircularProgress value={averageProgress} size={96} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="hidden md:block text-left">
                <p className="text-muted-foreground">Average progress</p>
                <p className="font-display font-bold text-2xl">{averageProgress}%</p>
                <p className="text-sm text-muted-foreground mt-1">{completedCount} completed</p>
              </div>
              <div className="md:hidden text-center">
                <p className="text-muted-foreground">{averageProgress}% average — {completedCount} done</p>
              </div>
            </div>

            <div className="md:col-span-1 text-center md:text-right">
              <p className="text-muted-foreground">Keep going — you’re making progress!</p>
              <a href="/modules" className="inline-flex items-center mt-2 gap-2 text-primary font-semibold">
                Continue
              </a>
            </div>
          </div>

          {/* Module Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {modules.map((module, index) => (
              <ModuleCard
                key={index}
                title={module.title}
                description={module.description}
                icon={module.icon}
                variant={module.variant}
                progress={module.progress}
                href={`/quiz`}
              />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Modules;
