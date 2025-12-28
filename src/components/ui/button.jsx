import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-display font-bold ring-offset-background transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 select-none",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground rounded-2xl",
        destructive: "bg-destructive text-destructive-foreground rounded-2xl",
        outline: "border-4 border-primary bg-card text-primary hover:bg-primary/10 rounded-2xl",
        secondary: "bg-secondary text-secondary-foreground rounded-2xl",
        ghost: "hover:bg-muted hover:text-foreground rounded-2xl",
        link: "text-primary underline-offset-4 hover:underline",
        hero: "gradient-hero-teal text-primary-foreground rounded-full shadow-sm hover:shadow-md transform-gpu hover:scale-[1.01] active:scale-[0.995] transition-transform duration-150 focus-visible:ring-4 focus-visible:ring-primary/30 focus-visible:ring-offset-2",
        success: "bg-success text-success-foreground rounded-2xl",
        accent: "bg-accent text-accent-foreground rounded-2xl",
        pink: "bg-pink text-pink-foreground rounded-2xl",
        orange: "bg-orange text-orange-foreground rounded-2xl",
        mint: "bg-mint text-mint-foreground rounded-2xl",
        lime: "bg-lime text-lime-foreground rounded-2xl",
        quiz: "bg-card text-foreground border-4 border-muted hover:border-primary hover:bg-primary/5 rounded-2xl text-left",
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
