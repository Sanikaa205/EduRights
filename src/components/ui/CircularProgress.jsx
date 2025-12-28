import React from "react";
import { cn } from "@/lib/utils";

const CircularProgress = ({ value = 0, size = 72, strokeWidth = 8, className, label }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.max(0, Math.min(100, Math.round(value)));
  const offset = circumference - (circumference * clamped) / 100;
  const gradId = `grad-${Math.round(Math.random() * 1e6)}`;

  return (
    <div
      className={cn("inline-flex items-center justify-center", className)}
      role="img"
      aria-label={label || `Progress: ${clamped}%`}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="block">
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7DD3FC" />
            <stop offset="50%" stopColor="#06B6D4" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeOpacity="0.08"
          stroke="#000"
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          stroke={`url(#${gradId})`}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          fill="none"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>

      <div className="absolute flex items-center justify-center" style={{ width: size, height: size }}>
        <div className="text-center">
          <div className="font-display font-bold text-lg">{clamped}%</div>
          {label && <div className="text-xs text-muted-foreground">{label}</div>}
        </div>
      </div>
    </div>
  );
};

export default CircularProgress;
