import { cn } from "@/lib/utils";

const ProgressBar = ({
  value,
  max = 100,
  showLabel = true,
  size = "md",
  variant = "primary",
  className,
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const sizeClasses = {
    sm: "h-3",
    md: "h-5",
    lg: "h-7",
  };

  const variantClasses = {
    primary: "bg-primary",
    success: "bg-success",
    accent: "bg-accent",
    rainbow: "gradient-hero",
  };

  return (
    <div className={cn("w-full", className)}>
      <div
        className={cn(
          "w-full bg-muted rounded-full overflow-hidden shadow-inner border-2 border-border",
          sizeClasses[size]
        )}
      >
        <div
          className={cn(
            "h-full rounded-full transition-all duration-700 ease-out relative",
            variantClasses[variant]
          )}
          style={{ width: `${percentage}%` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent rounded-full" />
        </div>
      </div>

      {showLabel && (
        <div className="flex justify-between items-center mt-2 text-sm font-body font-semibold">
          <span className="text-muted-foreground">Progress</span>
          <span className="text-foreground font-display text-lg">
            {Math.round(percentage)}%
          </span>
        </div>
      )}
    </div>
  );
};

export default ProgressBar;
