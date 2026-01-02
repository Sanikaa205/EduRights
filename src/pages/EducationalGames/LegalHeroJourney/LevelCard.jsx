import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";

export default function LevelCard({ level }) {
  return (
    <Card
  className={`transition ${
    level.unlocked
      ? "hover:scale-105 hover:shadow-lg"
      : "opacity-50 cursor-not-allowed"
  }`}
>

      <CardHeader>
        <CardTitle>{level.title}</CardTitle>
      </CardHeader>

      <CardContent>
        <p className="text-muted-foreground mb-4">
          {level.description}
        </p>

        {level.unlocked ? (
          <Button
  className="w-full"
  onClick={() =>
    window.location.href = `/games/legal-hero-journey/level-${level.id}`
  }
>
  Enter Level 🚀
</Button>

        ) : (
          <Button variant="outline" className="w-full" disabled>
            <Lock className="w-4 h-4 mr-2" /> Locked
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
