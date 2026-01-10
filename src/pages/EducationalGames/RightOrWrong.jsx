import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { rightOrWrongData } from "@/data/rightOrWrongData"

export default function RightOrWrong() {
  const [current, setCurrent] = useState(0)
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(3)
  const [timeLeft, setTimeLeft] = useState(5)
  const [gameOver, setGameOver] = useState(false)

  const statement = rightOrWrongData[current]

  // TIMER LOGIC
  useEffect(() => {
    if (gameOver) return

    if (timeLeft === 0) {
      setLives(lives - 1)
      nextQuestion()
      return
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1)
    }, 1000)

    return () => clearTimeout(timer)
  }, [timeLeft, gameOver])

  const handleAnswer = (answer) => {
    if (answer === statement.correct) {
      setScore(score + 10)
    } else {
      setLives(lives - 1)
    }
    nextQuestion()
  }

  const nextQuestion = () => {
    setTimeLeft(5)

    if (current + 1 < rightOrWrongData.length && lives > 1) {
      setCurrent(current + 1)
    } else {
      setGameOver(true)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-2xl">
            ⚡ Right or Wrong
          </CardTitle>
        </CardHeader>

        <CardContent className="text-center">

          {!gameOver ? (
            <>
              {/* SCORE & LIVES */}
              <div className="flex justify-between mb-4">
                <Badge>⭐ Score: {score}</Badge>
                <Badge variant="destructive">❤️ {lives}</Badge>
              </div>

              {/* TIMER */}
              <Progress value={(timeLeft / 5) * 100} className="mb-4" />
              <p className="text-sm mb-6">⏱ {timeLeft} seconds left</p>

              {/* STATEMENT */}
              <p className="text-lg font-semibold mb-6">
                {statement.statement}
              </p>

              {/* BUTTONS */}
              <div className="flex gap-4">
                <Button
                  className="w-full text-lg"
                  onClick={() => handleAnswer(true)}
                >
                  ✅ RIGHT
                </Button>

                <Button
                  variant="destructive"
                  className="w-full text-lg"
                  onClick={() => handleAnswer(false)}
                >
                  ❌ WRONG
                </Button>
              </div>
            </>
          ) : (
            <>
              {/* GAME OVER */}
              <h2 className="text-2xl font-bold mb-2">🎮 Game Over!</h2>
              <p className="mb-4">
                You scored ⭐ {score} points
              </p>
              <Badge>Great Job! 🎉</Badge>
            </>
          )}

        </CardContent>
      </Card>
    </div>
  )
}
