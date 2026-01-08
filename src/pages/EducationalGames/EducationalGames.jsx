
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { useNavigate } from "react-router-dom"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"

export default function EducationalGames() {
  const navigate = useNavigate()

  return (
    <>
    <Navbar />
    <div className="container mx-auto px-4 py-8">

      {/* ===================== HERO SECTION ===================== */}
      <section className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold mb-3">
          🎮 Learn Your Rights Through Games!
        </h1>

        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Play fun missions, earn stars ⭐, and become a Legal Hero 🦸‍♂️  
          Learning your rights has never been this exciting!
        </p>

        <div className="mt-6 flex justify-center gap-4">
          <Badge className="text-base px-4 py-2">⭐ Earn Rewards</Badge>
          <Badge variant="secondary" className="text-base px-4 py-2">
            🏆 Level Up
          </Badge>
        </div>
      </section>

      {/* ===================== PROGRESS BAR ===================== */}
      <section className="mb-10 max-w-xl mx-auto">
        <div className="flex justify-between mb-2 text-sm font-medium">
          <span>Your Learning Journey</span>
          <span>40%</span>
        </div>
        <Progress value={40} />
      </section>

      {/* ===================== GAMES GRID ===================== */}
      <section className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">

        {/* -------- Rights Rescue -------- */}
        <Card className="transition-transform hover:scale-[1.02] hover:shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🚨 Rights Rescue
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-muted-foreground mb-4">
              Help children by choosing the right action in real-life situations.
              Every good choice earns you stars!
            </p>

            <div className="flex items-center justify-between mb-4">
              <Badge>⭐ Beginner</Badge>
              <Badge variant="secondary">🎯 Story Game</Badge>
            </div>

            <Button
              className="w-full text-lg"
              onClick={() => navigate("/games/rights-rescue")}
            >
              Start Mission 🚀
            </Button>
          </CardContent>
        </Card>

        {/* -------- Match The Right -------- */}
        <Card className="transition-transform hover:scale-[1.02] hover:shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🧩 Match The Right
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-muted-foreground mb-4">
              Drag and match situations with the correct child rights.
              Think fast and score more!
            </p>

            <div className="flex items-center justify-between mb-4">
              <Badge>⭐ Easy</Badge>
              <Badge variant="secondary">🧠 Puzzle</Badge>
            </div>

            <Button variant="outline" className="w-full text-lg">
              Coming Soon
            </Button>
          </CardContent>
        </Card>

        {/* -------- Right or Wrong -------- */}
       <Card className="transition-transform hover:scale-[1.02] hover:shadow-lg">
  <CardHeader>
    <CardTitle className="flex items-center gap-2">🛠️ Broken Story</CardTitle>
  </CardHeader>
  <CardContent>
    <p className="text-muted-foreground mb-4">
      Scenes are broken and need fixing! Drag and drop items to restore them and learn about children's rights through interactive puzzles.
    </p>
    <div className="flex items-center justify-between mb-4">
      <Badge>⭐ Interactive</Badge>
      <Badge variant="secondary">🧩 Puzzle</Badge>
    </div>
    <Button className="w-full text-lg" onClick={() => navigate("/games/broken-story")}>
      Fix the Scene 🚀
    </Button>
  </CardContent>
</Card>

        {/* -------- Legal Hero Journey -------- */}
        <Card className="transition-transform hover:scale-[1.02] hover:shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🦸‍♀️ Legal Hero Journey
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-muted-foreground mb-4">
              Complete levels, unlock badges, and become a true Legal Hero.
              Your journey starts here!
            </p>

            <div className="flex items-center justify-between mb-4">
              <Badge>⭐ Adventure</Badge>
              <Badge variant="secondary">🗺 Levels</Badge>
            </div>

            <Button
  className="w-full text-lg"
  onClick={() => navigate("/games/legal-hero-journey")}
>
  Start Journey 🗺
</Button>

          </CardContent>
        </Card>
      </section>

      {/* ===================== FUN FACT BUBBLE ===================== */}
      <section className="mt-12 max-w-2xl mx-auto">
        <Card className="bg-muted">
          <CardContent className="text-center py-6">
            <p className="text-lg font-semibold">
              💡 Did you know?
            </p>
            <p className="text-muted-foreground mt-2">
              Every child has the right to education, safety, and to be heard.
              Learning your rights helps you protect yourself and others!
            </p>
          </CardContent>
        </Card>
      </section>

    </div>
    <Footer />
    </>
  )
}
