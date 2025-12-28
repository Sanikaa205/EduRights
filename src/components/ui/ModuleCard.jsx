import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const ModuleCard = ({ title, description, icon: Icon, emoji, variant = "blue", progress = 0, href = "/modules", className }) => {
  const borderColors = { blue: "border-primary", yellow: "border-secondary", purple: "border-accent", green: "border-success", pink: "border-pink", orange: "border-orange" };
  const bgColors = { blue: "bg-primary/5 hover:bg-primary/10", yellow: "bg-secondary/10 hover:bg-secondary/20", purple: "bg-accent/5 hover:bg-accent/10", green: "bg-success/5 hover:bg-success/10", pink: "bg-pink/5 hover:bg-pink/10", orange: "bg-orange/5 hover:bg-orange/10" };
  const progressColors = { blue: "bg-primary", yellow: "bg-secondary", purple: "bg-accent", green: "bg-success", pink: "bg-pink", orange: "bg-orange" };
  const shadowColors = { blue: "shadow-[0_8px_0_hsl(200_50%_85%)]", yellow: "shadow-[0_8px_0_hsl(45_50%_85%)]", purple: "shadow-[0_8px_0_hsl(280_50%_85%)]", green: "shadow-[0_8px_0_hsl(145_50%_80%)]", pink: "shadow-[0_8px_0_hsl(330_50%_85%)]", orange: "shadow-[0_8px_0_hsl(25_50%_85%)]" };

  const isComplete = progress === 100;

  return (
    <div className={cn("bg-card rounded-2xl p-8 border-4 transition-all duration-200 hover:translate-y-[-4px]", borderColors[variant], bgColors[variant], shadowColors[variant], "hover:shadow-[0_12px_0_hsl(200_50%_80%)]", className)}>
      <div className="flex items-start gap-4">
        <div className="relative">
          {Icon ? (
            <Icon className="w-10 h-10 text-primary-foreground" />
          ) : (
            <span className="text-6xl float-animation relative">{emoji}</span>
          )}
          {isComplete && (
            <div className="absolute -top-1 -right-1 w-7 h-7 bg-success rounded-full flex items-center justify-center shadow-[0_3px_0_hsl(var(--success-depth))]">
              <CheckCircle className="w-5 h-5 text-success-foreground" />
            </div>
          )}
        </div>
        <div className="flex-1">
          <h3 className="font-display font-bold text-xl text-foreground mb-2">{title}</h3>
          <p className="text-muted-foreground font-body text-sm leading-relaxed mb-4">{description}</p>
          
          {progress > 0 && (
            <div className="mb-4">
              <div className="flex justify-between text-xs font-body font-semibold mb-2">
                <span className="text-muted-foreground">Progress</span>
                <span className="text-foreground">{progress}%</span>
              </div>
              <div className="h-3 bg-muted rounded-full overflow-hidden shadow-inner">
                <div className={cn("h-full rounded-full transition-all duration-500", progressColors[variant])} style={{ width: `${progress}%` }} />
              </div>
            </div>
          )}
          
          <Link to={href}>
            <Button variant={isComplete ? "success" : "outline"} size="sm" className="gap-2">
              {isComplete ? "Review" : progress > 0 ? "Continue" : "Start Module"}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ModuleCard;
