import { useEffect, useState } from "react";
import { levels } from "@/data/levelsData";

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProgressBar from "@/components/ui/ProgressBar";
import StatCard from "@/components/ui/StatCard";

import {
  Trophy,
  Star,
  Award,
  BookOpen,
  HelpCircle,
  ArrowRight,
  Zap,
  Lock,
} from "lucide-react";

const Dashboard = () => {
  // ---------------- STATE ----------------
  const [user, setUser] = useState({
    name: "",
    level: 0,
    points: 0,
    badges: 0,
    progress: 0,
  });

  const [badges, setBadges] = useState([]);
  const [loading, setLoading] = useState(true);

  // ---------------- FETCH DASHBOARD ----------------
 useEffect(() => {
  const storedUser = localStorage.getItem("user");
  if (!storedUser) {
    setLoading(false);   // <-- fixed
    return;
  }

  const userData = JSON.parse(storedUser);

  setUser(prev => ({ ...prev, name: userData.name }));

  fetch(`http://localhost:5000/api/user/${userData.id}/dashboard`)
    .then((res) => res.json())
    .then((data) => {
      setUser({
        name: data.name,
        level: data.level,
        points: data.points,
        badges: data.badges?.length || 0,
        progress: data.progress,
      });
      setBadges(data.badges || []);
      setLoading(false);
    })
    .catch(() => setLoading(false));
}, []);


  // ---------------- BADGE LOGIC ----------------
const earnedLevelIds = badges.map((b) => b.levelId);


  // ---------------- QUICK ACTIONS ----------------
  const quickActions = [
    {
      title: "Learning Modules",
      description: "Continue learning about your rights",
      icon: BookOpen,
      href: "/modules",
      gradient: "gradient-card-blue",
      shadow: "shadow-[0_8px_0_hsl(210_90%_45%)]",
    },
    {
      title: "Games",
      description: "Play and learn with interactive games",
      icon: Zap,
      href: "/games",
      gradient: "gradient-card-purple",
      shadow: "shadow-[0_8px_0_hsl(290_75%_50%)]",
    },
    {
      title: "Resources",
      description: "Find helpful articles and FAQs",
      icon: HelpCircle,
      href: "/resources",
      gradient: "gradient-card-green",
      shadow: "shadow-[0_8px_0_hsl(145_80%_32%)]",
    },
  ];

  // ---------------- LOADING ----------------
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="text-xl font-bold">Loading Dashboard...</span>
      </div>
    );
  }

  // ---------------- UI ----------------
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 py-8 md:py-12">
        <div className="container mx-auto px-4">

          {/* WELCOME */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold">
              Welcome back, {user.name}
            </h1>
            <p className="text-muted-foreground">
              Track your learning journey
            </p>
          </div>

          {/* PROGRESS */}
          <div className="mb-8">
            <h2 className="font-bold text-xl mb-2">Your Progress</h2>
            <ProgressBar value={user.progress} />
          </div>

          {/* STATS */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <StatCard
              title="Current Level"
              value={user.level}
              icon={Trophy}
              variant="yellow"
            />
            <StatCard
              title="Total Points"
              value={(user.points ?? 0).toLocaleString()}
              icon={Star}
              variant="purple"
            />
            <StatCard
              title="Badges Earned"
              value={user.badges}
              icon={Award}
              variant="green"
            />
          </div>

          {/* BADGES */}
          <div className="mb-10">
            <h2 className="font-bold text-2xl mb-4">Your Badges</h2>

            <div className="flex flex-wrap gap-3">
              {levels.map((level) => {
                const earned = earnedLevelIds.includes(level.id);


                return (
                  <div
                    key={level.id}
                    className={`flex items-center gap-2 px-4 py-3 rounded-xl ${
                      earned
                        ? "bg-secondary"
                        : "bg-muted opacity-60"
                    }`}
                  >
                    {earned ? <Award /> : <Lock />}
                    <span>{level.badge}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* QUICK ACTIONS */}
          <h2 className="font-bold text-2xl mb-4">Continue Learning</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {quickActions.map((action, index) => (
              <Link key={index} to={action.href}>
                <div
                  className={`p-6 rounded-xl ${action.gradient} ${action.shadow}`}
                >
                  <action.icon className="w-8 h-8 mb-3" />
                  <h3 className="font-bold text-lg mb-2">
                    {action.title}
                  </h3>
                  <p className="text-sm mb-4">
                    {action.description}
                  </p>
                  <Button size="sm" className="gap-2">
                    Go Now <ArrowRight className="w-4 h-4" />
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
