import { cn } from "@/lib/utils";

// PropTypes for runtime prop validation
import PropTypes from "prop-types";

const StatCard = ({
  title,
  value,
  icon: Icon,
  emoji,
  variant = "blue",
  className,
}) => {
  const gradientClasses = {
    blue: "gradient-card-blue shadow-[0_8px_0_hsl(210_90%_45%)]",
    yellow: "gradient-card-yellow shadow-[0_8px_0_hsl(35_100%_40%)]",
    purple: "gradient-card-purple shadow-[0_8px_0_hsl(290_75%_50%)]",
    green: "gradient-card-green shadow-[0_8px_0_hsl(145_80%_32%)]",
    pink: "gradient-card-pink shadow-[0_8px_0_hsl(330_90%_50%)]",
    orange: "gradient-card-orange shadow-[0_8px_0_hsl(25_100%_45%)]",
    lime: "gradient-card-lime shadow-[0_8px_0_hsl(85_75%_40%)]",
  };

  return (
    <div
      className={cn(
        "card-cartoon text-card p-8 rounded-3xl transition-all duration-200 hover:translate-y-[-4px]",
        gradientClasses[variant],
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-primary-foreground/80 text-sm font-body font-semibold mb-1">
            {title}
          </p>
          <p className="text-primary-foreground text-4xl font-display font-bold drop-shadow-md">
            {value} {emoji && <span className="text-3xl">{emoji}</span>}
          </p>
        </div>
        <div className="w-14 h-14 bg-primary-foreground/25 rounded-2xl flex items-center justify-center shadow-inner">
          <Icon className="w-7 h-7 text-primary-foreground" />
        </div>
      </div>
    </div>
  );
};

StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  icon: PropTypes.elementType.isRequired,
  emoji: PropTypes.string,
  variant: PropTypes.oneOf([
    "blue",
    "yellow",
    "purple",
    "green",
    "pink",
    "orange",
    "lime",
  ]),
  className: PropTypes.string,
};

export default StatCard;
