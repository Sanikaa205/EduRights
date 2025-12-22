import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-display font-bold ring-offset-background transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 btn-3d select-none",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground rounded-2xl shadow-[0_6px_0_hsl(var(--primary-depth))] hover:shadow-[0_4px_0_hsl(var(--primary-depth))] active:shadow-[0_2px_0_hsl(var(--primary-depth))]",
        destructive:
          "bg-destructive text-destructive-foreground rounded-2xl shadow-[0_6px_0_hsl(0_70%_45%)]",
        outline:
          "border-4 border-primary bg-card text-primary hover:bg-primary/10 rounded-2xl shadow-[0_6px_0_hsl(var(--border))] hover:shadow-[0_4px_0_hsl(var(--border))] active:shadow-[0_2px_0_hsl(var(--border))]",
        secondary:
          "bg-secondary text-secondary-foreground rounded-2xl shadow-[0_6px_0_hsl(var(--secondary-depth))] hover:shadow-[0_4px_0_hsl(var(--secondary-depth))] active:shadow-[0_2px_0_hsl(var(--secondary-depth))]",
        ghost: "hover:bg-muted hover:text-foreground rounded-2xl",
        link: "text-primary underline-offset-4 hover:underline",
        hero:
          "gradient-hero text-primary-foreground rounded-full shadow-[0_6px_0_hsl(280_70%_45%),0_10px_30px_hsl(280_85%_60%/0.3)] hover:shadow-[0_4px_0_hsl(280_70%_45%),0_8px_25px_hsl(280_85%_60%/0.4)] active:shadow-[0_2px_0_hsl(280_70%_45%)]",
        success:
          "bg-success text-success-foreground rounded-2xl shadow-[0_6px_0_hsl(var(--success-depth))] hover:shadow-[0_4px_0_hsl(var(--success-depth))] active:shadow-[0_2px_0_hsl(var(--success-depth))]",
        accent:
          "bg-accent text-accent-foreground rounded-2xl shadow-[0_6px_0_hsl(var(--accent-depth))] hover:shadow-[0_4px_0_hsl(var(--accent-depth))] active:shadow-[0_2px_0_hsl(var(--accent-depth))]",
        pink:
          "bg-pink text-pink-foreground rounded-2xl shadow-[0_6px_0_hsl(var(--pink-depth))] hover:shadow-[0_4px_0_hsl(var(--pink-depth))] active:shadow-[0_2px_0_hsl(var(--pink-depth))]",
        orange:
          "bg-orange text-orange-foreground rounded-2xl shadow-[0_6px_0_hsl(var(--orange-depth))] hover:shadow-[0_4px_0_hsl(var(--orange-depth))] active:shadow-[0_2px_0_hsl(var(--orange-depth))]",
        mint:
          "bg-mint text-mint-foreground rounded-2xl shadow-[0_6px_0_hsl(var(--mint-depth))] hover:shadow-[0_4px_0_hsl(var(--mint-depth))] active:shadow-[0_2px_0_hsl(var(--mint-depth))]",
        lime:
          "bg-lime text-lime-foreground rounded-2xl shadow-[0_6px_0_hsl(var(--lime-depth))] hover:shadow-[0_4px_0_hsl(var(--lime-depth))] active:shadow-[0_2px_0_hsl(var(--lime-depth))]",
        quiz:
          "bg-card text-foreground border-4 border-muted hover:border-primary hover:bg-primary/5 rounded-2xl shadow-[0_6px_0_hsl(var(--border))] hover:shadow-[0_4px_0_hsl(var(--primary-depth))] active:shadow-[0_2px_0_hsl(var(--primary-depth))] text-left",
      },
      size: {
        default: "h-14 px-7 py-3 text-lg [&_svg]:size-5",
        sm: "h-11 px-5 py-2 text-base [&_svg]:size-4",
        lg: "h-16 px-9 py-4 text-xl [&_svg]:size-6",
        xl: "h-20 px-12 py-5 text-2xl [&_svg]:size-7",
        icon: "h-14 w-14 [&_svg]:size-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
