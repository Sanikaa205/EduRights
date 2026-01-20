import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import mascot from "@/assets/mascot.png";
import { schoolLevels } from "./schoolElements";
import API_BASE_URL from "@/config/api";

const UNLOCK_KEY = "buildSchoolLevel";

export default function BuildSchoolLevels() {
  const navigate = useNavigate();
  const [unlockedLevel, setUnlockedLevel] = useState(1);
  const [completedLevels, setCompletedLevels] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch progress from database
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      fetch(`${API_BASE_URL}/api/user/${userData.id}/dashboard`)
        .then((res) => res.json())
        .then((data) => {
          const badges = data.allBadges?.buildSchool || [];
          if (badges.length === 0) {
            // New user - only level 1 unlocked
            setUnlockedLevel(1);
            setCompletedLevels([]);
            localStorage.setItem(UNLOCK_KEY, "1");
          } else {
            // User has badges
            const completedIds = badges.map(b => b.levelId);
            const highestCompleted = Math.max(...completedIds);
            const nextLevel = Math.min(highestCompleted + 1, schoolLevels.length);
            setCompletedLevels(completedIds);
            setUnlockedLevel(nextLevel);
            localStorage.setItem(UNLOCK_KEY, String(nextLevel));
          }
          setLoading(false);
        })
        .catch(() => {
          const stored = Number(localStorage.getItem(UNLOCK_KEY)) || 1;
          setUnlockedLevel(stored);
          setLoading(false);
        });
    } else {
      const stored = Number(localStorage.getItem(UNLOCK_KEY)) || 1;
      setUnlockedLevel(stored);
      setLoading(false);
    }
  }, []);

  const stats = {
    total: schoolLevels.length,
    completed: completedLevels.length,
    unlocked: Math.min(unlockedLevel, schoolLevels.length),
  };

  const handlePlay = (levelNumber) => {
    navigate(`/games/build-your-school/level/${levelNumber}`);
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-[#FFF8F0]">
          <div className="flex flex-col items-center gap-4">
            <div className="w-14 h-14 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <span className="text-xl font-semibold text-gray-700">Loading your progress...</span>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="container mx-auto px-4 py-10">
        {/* HEADER */}
        <section className="flex flex-col gap-6 mb-10 text-center lg:text-left lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4 justify-center lg:justify-start">
            <img src={mascot} alt="EduRights mascot" className="w-20 h-20" />
            <div>
              <p className="text-sm font-semibold text-primary uppercase tracking-wide">
                Build Your School
              </p>
              <h1 className="text-4xl font-black text-slate-900 leading-tight">
                Choose your level
              </h1>
              <p className="text-muted-foreground max-w-xl mt-2">
                Build a safe and fair school by selecting the right elements.
                Unlock new levels as you complete each stage!
              </p>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4 lg:justify-end">
            <div className="px-4 py-3 rounded-2xl bg-primary/10 border border-primary/20 text-primary text-center">
              <p className="text-3xl font-black">{stats.completed}</p>
              <p className="text-sm font-semibold">Levels Completed</p>
            </div>
            <div className="px-4 py-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-center">
              <p className="text-3xl font-black">
                {stats.unlocked}/{stats.total}
              </p>
              <p className="text-sm font-semibold">Unlocked</p>
            </div>
          </div>
        </section>

        {/* LEVEL GRID */}
        <section>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {schoolLevels.map((level, idx) => {
              const levelNumber = idx + 1;
              const importantCount = level.elements.filter(
                (e) => e.type === "important"
              ).length;
              const distractionCount = level.elements.filter(
                (e) => e.type !== "important"
              ).length;

              const unlocked = levelNumber <= unlockedLevel;
              const completed = completedLevels.includes(levelNumber);

              const statusBadge = completed
                ? {
                    label: "Completed",
                    className: "bg-emerald-100 text-emerald-800",
                  }
                : unlocked
                ? { label: "Unlocked", className: "bg-blue-100 text-blue-800" }
                : { label: "Locked", className: "bg-gray-100 text-gray-600" };

              // Extract unique rights from this level
              const rights = [
                ...new Set(
                  level.elements
                    .filter((e) => e.type === "important" && e.right)
                    .map((e) => e.right)
                ),
              ];

              return (
                <motion.div
                  key={levelNumber}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.08 }}
                >
                  <div className="relative">
                    {/* 🔒 LOCKED BLUR OVERLAY */}
                    {!unlocked && (
                      <div className="absolute inset-0 z-10 bg-white/70 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                        <div className="text-center">
                          <p className="text-lg font-bold text-gray-600">
                            🔒 Locked
                          </p>
                          <p className="text-sm text-gray-500">
                            Complete previous level
                          </p>
                        </div>
                      </div>
                    )}

                    <Card
                      className={`h-full border-2 ${
                        unlocked
                          ? "hover:shadow-lg transition-transform hover:-translate-y-1"
                          : "opacity-60"
                      }`}
                    >
                      <CardHeader className="flex flex-row justify-between items-start gap-4">
                        <div className="flex-1">
                          <CardTitle className="text-xl font-bold">
                            Level {levelNumber}
                          </CardTitle>
                          <p className="text-sm text-muted-foreground mt-1">
                            {level.name.replace(`Level ${levelNumber}: `, "")}
                          </p>
                        </div>

                        <Badge className={statusBadge.className}>
                          {statusBadge.label}
                        </Badge>
                      </CardHeader>

                      <CardContent className="flex flex-col gap-4">
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="secondary">
                            🎯 {importantCount} Rights
                          </Badge>
                          <Badge variant="secondary">
                            🚫 {distractionCount} Distractions
                          </Badge>
                        </div>

                        <div className="flex flex-wrap gap-1">
                          {rights.slice(0, 3).map((right) => (
                            <Badge
                              key={right}
                              variant="outline"
                              className="text-xs"
                            >
                              {right}
                            </Badge>
                          ))}
                          {rights.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{rights.length - 3} more
                            </Badge>
                          )}
                        </div>

                        <p className="text-sm text-muted-foreground">
                          Build your school by selecting the most important
                          elements. Avoid distractions!
                        </p>

                        <div className="flex justify-end">
                          <Button
                            size="sm"
                            onClick={() => unlocked && handlePlay(levelNumber)}
                            disabled={!unlocked}
                          >
                            {completed ? "Replay" : "Play"}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
