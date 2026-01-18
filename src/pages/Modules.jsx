
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

// ================= MODULE DATA =================
const MODULES = [
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

const Modules = () => {


  // Dynamic progress state
  const [progresses, setProgresses] = useState(() =>
    MODULES.map((m) => {
      if (typeof window === "undefined") return 0;
      const value = localStorage.getItem(m.key);
      return value ? parseInt(value, 10) : 0;
    })
  );

  useEffect(() => {
    const updateProgress = () => {
      setProgresses(
        MODULES.map((m) => {
          const value = localStorage.getItem(m.key);
          return value ? parseInt(value, 10) : 0;
        })
      );
    };

    // Update immediately when component mounts
    updateProgress();

    // Listen for storage changes from other tabs
    window.addEventListener("storage", updateProgress);

    // Listen for visibility changes (returning to tab)
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        updateProgress();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("storage", updateProgress);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const modulesWithProgress = MODULES.map((m, i) => {
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
    <div className="min-h-screen flex flex-col bg-[#FFF8F0] relative overflow-hidden">
      {/* Decorative Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated blobs */}
        <div className="absolute -top-16 -left-16 w-64 h-64 bg-blue-200/40 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/4 -right-20 w-72 h-72 bg-purple-200/40 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}} />
        <div className="absolute bottom-32 left-1/4 w-56 h-56 bg-green-200/40 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}} />
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-pink-200/40 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1.5s'}} />
        
        {/* Floating emojis */}
        <div className="absolute top-20 left-[12%] text-4xl animate-bounce opacity-30" style={{animationDuration: '3s'}}>📖</div>
        <div className="absolute top-36 right-[18%] text-3xl animate-bounce opacity-30" style={{animationDuration: '2.5s', animationDelay: '0.5s'}}>🎓</div>
        <div className="absolute bottom-48 left-[8%] text-4xl animate-bounce opacity-30" style={{animationDuration: '3.5s', animationDelay: '1s'}}>⭐</div>
        <div className="absolute top-1/2 right-[5%] text-3xl animate-bounce opacity-30" style={{animationDuration: '2.8s', animationDelay: '1.5s'}}>🌟</div>
        <div className="absolute bottom-28 right-[25%] text-4xl animate-bounce opacity-30" style={{animationDuration: '3.2s', animationDelay: '2s'}}>📚</div>
        <div className="absolute top-2/3 left-[4%] text-3xl animate-pulse opacity-30" style={{animationDuration: '2s'}}>✨</div>
        <div className="absolute top-32 left-[40%] text-3xl animate-bounce opacity-30" style={{animationDuration: '2.7s', animationDelay: '0.8s'}}>🏅</div>
      </div>
      
      <Navbar />

      <main className="flex-1 py-8 md:py-12 relative z-10">
        <div className="max-w-[95%] xl:max-w-[1400px] mx-auto px-4">

          {/* ================= HEADER ================= */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-lg mb-6">
              <BookOpen className="w-8 h-8 text-white" />
            </div>

            <h1 className="font-bold text-3xl md:text-4xl text-gray-800 mb-3">
              Learning Modules
            </h1>

            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Explore lessons about your rights. Each module covers an important topic.
            </p>
          </div>

          {/* ================= PROGRESS OVERVIEW ================= */}
          <div className="rounded-3xl bg-white text-gray-800 grid md:grid-cols-3 gap-6 items-center mb-10 p-8 shadow-sm border border-gray-100 relative overflow-hidden">

            <div
              className="absolute -top-3 left-6 right-6 h-1 rounded-full
              bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 opacity-80"
              aria-hidden="true"
            />

            {/* Completed */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white shadow-lg">
                <Trophy className="w-7 h-7" />
              </div>
              <div>
                <p className="text-gray-500 mb-1">
                  Modules Completed
                </p>
                <p className="font-bold text-3xl text-gray-800">
                  {completedCount} / {MODULES.length}
                </p>
              </div>
            </div>

            {/* Average Progress */}
            <div className="flex items-center justify-center gap-4">
              <div className="w-24 h-24">
                <CircularProgress value={averageProgress} size={96} />
              </div>

              <div className="hidden md:block text-left">
                <p className="text-gray-500">Average progress</p>
                <p className="font-bold text-2xl">
                  {averageProgress}%
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {completedCount} completed
                </p>
              </div>

              <div className="md:hidden text-center">
                <p className="text-gray-500">
                  {averageProgress}% average — {completedCount} done
                </p>
              </div>
            </div>

            {/* Motivation */}
            <div className="text-center md:text-right">
              <p className="text-gray-500">
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
