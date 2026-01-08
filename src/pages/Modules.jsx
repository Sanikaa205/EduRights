
import React, { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ModuleCard from "@/components/ui/ModuleCard";
import CircularProgress from "@/components/ui/CircularProgress";
import {
  BookOpen,
  Shield,
  Star,
  Zap,
  Heart,
  MessageSquare,
  Trophy
} from "lucide-react";

const Modules = () => {
  // ================= MODULE DATA =================
  const modules = [
    {
      title: "Right to Education",
      description:
        "Every child has the right to learn and go to school. Discover why education is important for their future.",
      icon: BookOpen,
      variant: "blue",
      key: "module-1-progress",
      route: "/module-1"
    },
    {
      title: "Right to Safety",
      description:
        "You deserve to feel safe at home, school, and everywhere. Learn how to stay protected.",
      icon: Shield,
      variant: "green",
      key: "module-2-progress",
      route: "/module-2"
    },
    {
      title: "Right to Equality",
      description:
        "Everyone deserves to be treated fairly. Explore what equality means.",
      icon: Star,
      variant: "purple",
      key: "module-3-progress",
      route: "/module-3"
    },
    {
      title: "Right to Play",
      description:
        "Playing is important for growing up healthy and happy. Learn about your right to recreation.",
      icon: Zap,
      variant: "yellow",
      key: "module-4-progress",
      route: "/module-4"
    },
    {
      title: "Right to Health",
      description:
        "You have the right to be healthy and receive medical care when needed.",
      icon: Heart,
      variant: "pink",
      key: "module-5-progress",
      route: "/module-5"
    },
    {
      title: "Right to Be Heard",
      description:
        "Your voice matters. Learn how to share your thoughts and be heard.",
      icon: MessageSquare,
      variant: "orange",
      key: "module-6-progress",
      route: "/module-6"
    }
  ];


  // Dynamic progress state
  const [progresses, setProgresses] = useState(() =>
    modules.map((m) => {
      if (typeof window === "undefined") return 0;
      const value = localStorage.getItem(m.key);
      return value ? parseInt(value, 10) : 0;
    })
  );

  useEffect(() => {
    const updateProgress = () => {
      setProgresses(
        modules.map((m) => {
          const value = localStorage.getItem(m.key);
          return value ? parseInt(value, 10) : 0;
        })
      );
    };
    window.addEventListener("focus", updateProgress);
    window.addEventListener("storage", updateProgress);
    return () => {
      window.removeEventListener("focus", updateProgress);
      window.removeEventListener("storage", updateProgress);
    };
  }, [modules]);

  const modulesWithProgress = modules.map((m, i) => {
    const progress = progresses[i];
    // All modules are always unlocked
    return {
      ...m,
      progress,
      locked: false
    };
  });

  // ================= PROGRESS CALCULATIONS =================
  const completedCount = modulesWithProgress.filter((m) => m.progress === 100).length;
  const averageProgress = Math.round(
    modulesWithProgress.reduce((sum, m) => sum + m.progress, 0) / modulesWithProgress.length
  );

  // ================= UI =================
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 py-8 md:py-12">
        <div className="container mx-auto px-4">

          {/* ================= HEADER ================= */}
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

          {/* ================= PROGRESS OVERVIEW ================= */}
          <div className="card-playful rounded-2xl bg-card text-foreground grid md:grid-cols-3 gap-6 items-center mb-10 p-8 shadow-lg relative overflow-hidden">

            <div
              className="absolute -top-3 left-6 right-6 h-1 rounded-full
              bg-gradient-to-r from-sky-400 via-cyan-400 to-teal-400 opacity-80"
              aria-hidden="true"
            />

            {/* Completed */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl gradient-hero-teal flex items-center justify-center text-white">
                <Trophy className="w-7 h-7" />
              </div>
              <div>
                <p className="text-muted-foreground mb-1">
                  Modules Completed
                </p>
                <p className="font-display font-bold text-3xl">
                  {completedCount} / {modules.length}
                </p>
              </div>
            </div>

            {/* Average Progress */}
            <div className="flex items-center justify-center gap-4">
              <div className="w-24 h-24">
                <CircularProgress value={averageProgress} size={96} />
              </div>

              <div className="hidden md:block text-left">
                <p className="text-muted-foreground">Average progress</p>
                <p className="font-display font-bold text-2xl">
                  {averageProgress}%
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {completedCount} completed
                </p>
              </div>

              <div className="md:hidden text-center">
                <p className="text-muted-foreground">
                  {averageProgress}% average — {completedCount} done
                </p>
              </div>
            </div>

            {/* Motivation */}
            <div className="text-center md:text-right">
              <p className="text-muted-foreground">
                Keep going — you’re making progress!
              </p>
            </div>
          </div>

          {/* ================= MODULE GRID ================= */}
          <div className="grid md:grid-cols-2 gap-6">
            {modulesWithProgress.map((module, index) => (
              <ModuleCard
                key={index}
                title={module.title}
                description={module.description}
                icon={module.icon}
                variant={module.variant}
                progress={module.progress}
                route={module.route}
                locked={module.locked}
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
