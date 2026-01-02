import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useNavigate } from "react-router-dom"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"


export default function EducationalGames() {
  const navigate = useNavigate()

  return (
    <>
    <Navbar/>
    <div className="container mx-auto px-4 py-10">

      {/* 🌈 HERO SECTION */}
      <section className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          🎮 Let’s Play & Learn Your Rights!
        </h1>

        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          Complete fun missions, earn stars ⭐ and become a <b>Legal Hero</b>!
        </p>

        <div className="mt-6 flex justify-center gap-4">
          <Badge className="text-sm px-4 py-1">Beginner Friendly</Badge>
          <Badge variant="secondary" className="text-sm px-4 py-1">
            Ages 8–12
          </Badge>
        </div>
      </section>

      {/* 🧠 PROGRESS MOTIVATOR */}
      <section className="mb-12 max-w-xl mx-auto">
        <Card className="shadow-md">
          <CardContent className="pt-6">
            <p className="font-semibold mb-2 text-center">
              🌟 Your Hero Progress
            </p>
            <Progress value={30} />
            <p className="text-sm text-muted-foreground text-center mt-2">
              Complete games to level up!
            </p>
          </CardContent>
        </Card>
      </section>

      {/* 🎯 GAMES GRID */}
      <section className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

        {/* 🎮 RIGHTS RESCUE */}
        <Card className="group hover:scale-[1.03] transition-transform duration-300 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Rights Rescue
              <Badge>⭐ 50 pts</Badge>
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Help kids in real-life situations by choosing the right action.
            </p>

            <div className="mb-4">
              <p className="text-xs font-semibold mb-1">
                Skills You’ll Learn
              </p>
              <div className="flex gap-2 flex-wrap">
                <Badge variant="secondary">Education</Badge>
                <Badge variant="secondary">Safety</Badge>
                <Badge variant="secondary">Equality</Badge>
              </div>
            </div>

            <Button
              className="w-full group-hover:animate-pulse"
              onClick={() => navigate("/games/rights-rescue")}
            >
              🚀 Start Mission
            </Button>
          </CardContent>
        </Card>

        {/* 🧩 MATCH THE RIGHT */}
        <Card className="opacity-80">
          <CardHeader>
            <CardTitle>Match the Right</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Drag and match situations with the correct child rights.
            </p>
            <Button variant="outline" className="w-full">
              🔒 Unlock Soon
            </Button>
          </CardContent>
        </Card>

        {/* ⚡ RIGHT OR WRONG */}
        <Card className="opacity-80">
          <CardHeader>
            <CardTitle>Right or Wrong</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Quick tap game to test your rights knowledge.
            </p>
            <Button variant="outline" className="w-full">
              🔒 Unlock Soon
            </Button>
          </CardContent>
        </Card>

      </section>

      {/* 💡 FUN FACT */}
      <section className="mt-16 max-w-2xl mx-auto">
        <Card className="bg-muted">
          <CardContent className="pt-6 text-center">
            <p className="font-semibold mb-2">
              🤔 Did You Know?
            </p>
            <p className="text-sm text-muted-foreground">
              Every child in India has the right to free and compulsory education
              until the age of 14.
            </p>
          </CardContent>
        </Card>
      </section>

    </div>
  
    <Footer/>
  </>
  )
}
