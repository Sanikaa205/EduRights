import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ModuleCard from "@/components/ui/ModuleCard";

const Modules = () => {
  const modules = [
    {
      title: "Right to Education",
      description: "Every child has the right to learn and go to school. Discover why education is so important for your future!",
      emoji: "📚",
      variant: "blue",
      progress: 100,
    },
    {
      title: "Right to Safety",
      description: "You deserve to feel safe at home, school, and everywhere! Learn how to stay protected.",
      emoji: "🛡️",
      variant: "green",
      progress: 75,
    },
    {
      title: "Right to Equality",
      description: "Everyone deserves to be treated fairly, no matter who they are. Explore what equality means!",
      emoji: "⚖️",
      variant: "purple",
      progress: 50,
    },
    {
      title: "Right to Play",
      description: "Playing is important for growing up healthy and happy. Learn about your right to have fun!",
      emoji: "🎮",
      variant: "yellow",
      progress: 25,
    },
    {
      title: "Right to Health",
      description: "You have the right to be healthy and get medical care when you need it. Stay healthy and strong!",
      emoji: "🏥",
      variant: "pink",
      progress: 0,
    },
    {
      title: "Right to Be Heard",
      description: "Your voice matters! Learn how you can share your thoughts and be listened to by adults.",
      emoji: "📢",
      variant: "orange",
      progress: 0,
    },
    {
      title: "Right to Family",
      description: "Every child deserves a loving family. Discover why family bonds are so special!",
      emoji: "👨‍👩‍👧‍👦",
      variant: "blue",
      progress: 0,
    },
    {
      title: "Right to Privacy",
      description: "You have the right to keep some things private. Learn about protecting your personal space!",
      emoji: "🔐",
      variant: "purple",
      progress: 0,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 py-8 md:py-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 gradient-hero rounded-3xl shadow-button mb-6">
              <span className="text-4xl">📖</span>
            </div>
            <h1 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-3">
              Learning Modules
            </h1>
            <p className="font-body text-muted-foreground text-lg max-w-2xl mx-auto">
              Explore fun lessons about your rights! Each module teaches you something 
              important. Complete them all to become a Rights Champion! 🏆
            </p>
          </div>

          {/* Progress Overview */}
          <div className="card-playful gradient-hero text-primary-foreground text-center mb-10 p-6">
            <p className="font-body text-primary-foreground/80 mb-1">Modules Completed</p>
            <p className="font-display font-bold text-4xl">
              2 of {modules.length} 🌟
            </p>
          </div>

          {/* Module Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {modules.map((module, index) => (
              <ModuleCard
                key={index}
                title={module.title}
                description={module.description}
                emoji={module.emoji}
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
