import { useEffect, useState } from "react";
import { levels } from "@/data/levelsData";
import { levels as brokenStoryLevels } from "@/pages/EducationalGames/BrokenStory/levelsData";
import { schoolLevels } from "@/pages/EducationalGames/BuildYourSchool/schoolElements";
import { levels as matchTheRightLevels } from "@/pages/EducationalGames/MatchTheRight/data";
import API_BASE_URL from "@/config/api";

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

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
    gamesProgress: 0,
    learnProgress: 0,
  });

  const [allBadges, setAllBadges] = useState({
    legalHero: [],
    brokenStory: [],
    buildSchool: [],
    matchTheRight: [],
  });
  const [loading, setLoading] = useState(true);

  // ---------------- FETCH DASHBOARD ----------------
 useEffect(() => {
  const storedUser = localStorage.getItem("user");
  if (!storedUser) {
    setLoading(false);
    return;
  }

  const userData = JSON.parse(storedUser);

  setUser(prev => ({ ...prev, name: userData.name }));

  fetch(`${API_BASE_URL}/api/user/${userData.id}/dashboard`)
    .then((res) => res.json())
    .then((data) => {
      const totalBadges = data.totalBadges || 
        (data.allBadges ? 
          data.allBadges.legalHero.length + 
          data.allBadges.brokenStory.length + 
          data.allBadges.buildSchool.length + 
          data.allBadges.matchTheRight.length : 0);
      
      setUser({
        name: data.name,
        level: data.level,
        points: data.points,
        badges: totalBadges,
        progress: data.progress,
        gamesProgress: data.gamesProgress || 0,
        learnProgress: data.learnProgress || 0,
      });
      setAllBadges(data.allBadges || {
        legalHero: data.badges || [],
        brokenStory: [],
        buildSchool: [],
        matchTheRight: [],
      });
      setLoading(false);
    })
    .catch(() => setLoading(false));
}, []);


  // ---------------- BADGE LOGIC ----------------
  const earnedLegalHeroIds = allBadges.legalHero.map((b) => b.levelId);
  const earnedBrokenStoryIds = allBadges.brokenStory.map((b) => b.levelId);
  const earnedBuildSchoolIds = allBadges.buildSchool.map((b) => b.levelId);
  const earnedMatchRightIds = allBadges.matchTheRight.map((b) => b.levelId);


  // ---------------- QUICK ACTIONS ----------------
  const quickActions = [
    {
      title: "📚 Learning Modules",
      description: "Continue learning about your rights",
      icon: BookOpen,
      href: "/modules",
      gradient: "from-cyan-500 to-blue-800",
    },
    {
      title: "🎮 Games",
      description: "Play and learn with interactive games",
      icon: Zap,
      href: "/games",
      gradient: "from-red-400 to-red-800",
    },
    {
      title: "📖 Resources",
      description: "Find helpful articles and FAQs",
      icon: HelpCircle,
      href: "/resources",
      gradient: "from-yellow-400 to-yellow-600",
    },
  ];

  // ---------------- LOADING ----------------
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFF8F0]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-14 h-14 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-xl font-semibold text-gray-700">Loading Dashboard...</span>
        </div>
      </div>
    );
  }

  // ---------------- UI ----------------
  return (
    <div className="min-h-screen flex flex-col bg-[#FFF8F0] overflow-x-hidden relative">
      {/* Decorative Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated blobs */}
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-purple-200/40 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/3 -left-20 w-64 h-64 bg-blue-200/40 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}} />
        <div className="absolute bottom-20 right-1/4 w-56 h-56 bg-pink-200/40 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}} />
        
        {/* Floating emojis */}
        <div className="absolute top-24 left-[10%] text-4xl animate-bounce opacity-30" style={{animationDuration: '3s'}}>🎯</div>
        <div className="absolute top-40 right-[15%] text-3xl animate-bounce opacity-30" style={{animationDuration: '2.5s', animationDelay: '0.5s'}}>⭐</div>
        <div className="absolute bottom-40 left-[5%] text-4xl animate-bounce opacity-30" style={{animationDuration: '3.5s', animationDelay: '1s'}}>🏆</div>
        <div className="absolute top-60 right-[8%] text-3xl animate-bounce opacity-30" style={{animationDuration: '2.8s', animationDelay: '1.5s'}}>📚</div>
        <div className="absolute bottom-60 right-[20%] text-4xl animate-bounce opacity-30" style={{animationDuration: '3.2s', animationDelay: '2s'}}>✨</div>
        <div className="absolute top-1/2 left-[3%] text-3xl animate-pulse opacity-30" style={{animationDuration: '2s'}}>🌟</div>
      </div>
      
      <Navbar />

      <main className="flex-1 py-8 md:py-12 relative z-10">
        <div className="max-w-[95%] xl:max-w-[1400px] mx-auto px-4 md:px-8">

          {/* WELCOME HEADER */}
          <div className="flex items-center gap-5 mb-10">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-3xl md:text-4xl">📚</span>
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800">
                Welcome back, {user.name || "Guest"}.
              </h1>
              <p className="text-gray-500 text-base md:text-lg mt-1">
                Continue where you left off and track your progress.
              </p>
            </div>
          </div>

          {/* YOUR PROGRESS CARD */}
          <div className="bg-white rounded-3xl p-6 md:p-8 mb-8 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <Trophy className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="font-bold text-xl md:text-2xl text-gray-800">Your Progress</h2>
                  <p className="text-base text-gray-500">
                    Keep up the progress — you're at {user.progress || 0}%.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Overall Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600 font-medium">📊 Overall Progress</span>
                <span className="font-bold text-gray-700">{user.progress || 0}%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-5 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-5 rounded-full transition-all duration-500"
                  style={{ width: `${user.progress || 0}%` }}
                />
              </div>
            </div>

            {/* Games & Learn Progress */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Games Progress */}
              <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-4 border border-red-100">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600 font-medium">🎮 Games Progress</span>
                  <span className="font-bold text-red-600">{user.gamesProgress || 0}%</span>
                </div>
                <div className="w-full bg-white rounded-full h-3 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-red-400 to-orange-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${user.gamesProgress || 0}%` }}
                  />
                </div>
              </div>

              {/* Learn Progress */}
              <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-2xl p-4 border border-cyan-100">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600 font-medium">📚 Learn Progress</span>
                  <span className="font-bold text-cyan-600">{user.learnProgress || 0}%</span>
                </div>
                <div className="w-full bg-white rounded-full h-3 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-cyan-400 to-blue-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${user.learnProgress || 0}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* STATS CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
            {/* Current Level */}
              {/* <div className="bg-gradient-to-br from-green-500 to-emerald-900 rounded-3xl p-6 relative overflow-hidden min-h-[200px] flex flex-col shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all cursor-pointer">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10"></div>
              <div className="absolute bottom-0 left-0 w-20 h-20 bg-white/10 rounded-full -ml-8 -mb-8"></div>
              <div className="flex items-center justify-between mb-3">
                <p className="text-white text-xl font-black tracking-wide drop-shadow-md">🏆 Current Level</p>
                <div className="w-10 h-10 bg-white/30 backdrop-blur-sm rounded-xl flex items-center justify-center animate-pulse">
                  <Trophy className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-4 py-3 mb-4 border border-white/30">
                <p className="text-white text-sm font-semibold leading-relaxed">
                  📈 Level up by learning more! Keep going champ!
                </p>
              </div>
              <p className="text-white text-7xl font-black mt-auto drop-shadow-lg" style={{textShadow: '3px 3px 0 rgba(0,0,0,0.2)'}}>{user.level || 1}</p>
            </div> */}

            {/* Total Points */}
              <div className="bg-gradient-to-br from-green-500 to-green-900 rounded-3xl p-6 relative overflow-hidden min-h-[200px] flex flex-col shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all cursor-pointer">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10"></div>
              <div className="absolute bottom-0 left-0 w-20 h-20 bg-white/10 rounded-full -ml-8 -mb-8"></div>
              <div className="flex items-center justify-between mb-3">
                <p className="text-white text-xl font-black tracking-wide drop-shadow-md">⭐ Total Points</p>
                <div className="w-10 h-10 bg-white/30 backdrop-blur-sm rounded-xl flex items-center justify-center animate-pulse">
                  <Star className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-4 py-3 mb-4 border border-white/30">
                <p className="text-white text-sm font-semibold leading-relaxed">
                  🎯 Score high in quizzes & become a star!
                </p>
              </div>
              <p className="text-white text-7xl font-black mt-auto drop-shadow-lg" style={{textShadow: '3px 3px 0 rgba(0,0,0,0.2)'}}>{user.points || 0}</p>
            </div>

            {/* Badges Earned */}
               <div className="bg-gradient-to-br from-violet-500 to-violet-900 rounded-3xl p-6 relative overflow-hidden min-h-[200px] flex flex-col shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all cursor-pointer">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10"></div>
              <div className="absolute bottom-0 left-0 w-20 h-20 bg-white/10 rounded-full -ml-8 -mb-8"></div>
              <div className="flex items-center justify-between mb-3">
                <p className="text-white text-xl font-black tracking-wide drop-shadow-md">🏅 Badges Earned</p>
                <div className="w-10 h-10 bg-white/30 backdrop-blur-sm rounded-xl flex items-center justify-center animate-pulse">
                  <Award className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-4 py-3 mb-4 border border-white/30">
                <p className="text-white text-sm font-semibold leading-relaxed">
                  🎮 Play games & collect awesome badges!
                </p>
              </div>
              <p className="text-white text-7xl font-black mt-auto drop-shadow-lg" style={{textShadow: '3px 3px 0 rgba(0,0,0,0.2)'}}>{user.badges || 0}</p>
            </div>
          </div>

          {/* YOUR BADGES SECTION */}
          <div className="bg-white rounded-3xl p-6 md:p-8 mb-8 shadow-sm border border-gray-100">
            <h2 className="font-bold text-lg md:text-xl text-gray-800 mb-6">Your Badges</h2>
            
            {/* Legal Hero Journey Badges */}
            <div className="mb-6">
              <h3 className="font-semibold text-md text-gray-700 mb-3 flex items-center gap-2">
                🗺️ Legal Hero Journey
              </h3>
              <div className="flex flex-wrap gap-3">
                {levels.map((level) => {
                  const earned = earnedLegalHeroIds.includes(level.id);
                  return (
                    <div
                      key={`lh-${level.id}`}
                      className={`flex items-center gap-3 px-5 py-3 rounded-full border-2 transition-all ${
                        earned
                          ? "bg-blue-50 border-blue-200 text-blue-700"
                          : "bg-gray-50 border-gray-200 text-gray-400"
                      }`}
                    >
                      <Award className="w-5 h-5" />
                      <span className="text-base font-semibold">{level.badge}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Broken Story Badges */}
            <div className="mb-6">
              <h3 className="font-semibold text-md text-gray-700 mb-3 flex items-center gap-2">
                🧩 Broken Story
              </h3>
              <div className="flex flex-wrap gap-3">
                {brokenStoryLevels.map((level) => {
                  const earned = earnedBrokenStoryIds.includes(level.id);
                  return (
                    <div
                      key={`bs-${level.id}`}
                      className={`flex items-center gap-3 px-5 py-3 rounded-full border-2 transition-all ${
                        earned
                          ? "bg-green-50 border-green-200 text-green-700"
                          : "bg-gray-50 border-gray-200 text-gray-400"
                      }`}
                    >
                      <Award className="w-5 h-5" />
                      <span className="text-base font-semibold">{level.badge}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Build Your School Badges */}
            <div className="mb-6">
              <h3 className="font-semibold text-md text-gray-700 mb-3 flex items-center gap-2">
                🏗️ Build Your School
              </h3>
              <div className="flex flex-wrap gap-3">
                {schoolLevels.map((level, idx) => {
                  const earned = earnedBuildSchoolIds.includes(idx + 1);
                  return (
                    <div
                      key={`bys-${idx}`}
                      className={`flex items-center gap-3 px-5 py-3 rounded-full border-2 transition-all ${
                        earned
                          ? "bg-purple-50 border-purple-200 text-purple-700"
                          : "bg-gray-50 border-gray-200 text-gray-400"
                      }`}
                    >
                      <Award className="w-5 h-5" />
                      <span className="text-base font-semibold">{level.badge}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Match The Right Badges */}
            <div>
              <h3 className="font-semibold text-md text-gray-700 mb-3 flex items-center gap-2">
                🎯 Match The Right
              </h3>
              <div className="flex flex-wrap gap-3">
                {matchTheRightLevels.map((level) => {
                  const earned = earnedMatchRightIds.includes(level.level);
                  return (
                    <div
                      key={`mtr-${level.level}`}
                      className={`flex items-center gap-3 px-5 py-3 rounded-full border-2 transition-all ${
                        earned
                          ? "bg-amber-50 border-amber-200 text-amber-700"
                          : "bg-gray-50 border-gray-200 text-gray-400"
                      }`}
                    >
                      <Award className="w-5 h-5" />
                      <span className="text-base font-semibold">{level.badge}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* CONTINUE LEARNING SECTION */}
          <div className="flex items-center gap-3 mb-6">
            <Zap className="w-7 h-7 text-amber-500" />
            <h2 className="font-bold text-xl md:text-2xl text-gray-800">Continue Learning</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {quickActions.map((action, index) => (
              <Link key={index} to={action.href} className="group">
                <div
                  className={`bg-gradient-to-br ${action.gradient} rounded-3xl p-6 h-full min-h-[240px] transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl relative overflow-hidden`}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-10 -mb-10"></div>
                  <div className="flex flex-col h-full relative z-10">
                    {/* Icon */}
                    <div className="mb-4">
                      <div className="w-14 h-14 bg-white/25 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform">
                        <action.icon className="w-7 h-7 text-white" />
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="mt-auto">
                      <h3 className="font-black text-2xl text-white mb-2 drop-shadow-md">
                        {action.title}
                      </h3>
                      <p className="text-white/90 text-base font-medium mb-4">
                        {action.description}
                      </p>
                      <button className="flex items-center gap-2 bg-white/25 hover:bg-white/40 text-white font-bold px-5 py-3 rounded-full transition-all border border-white/30 group-hover:translate-x-1">
                        Let's Go! <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
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
