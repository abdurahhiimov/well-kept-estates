import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Mechanical press. A hard offset shadow sits under the button like the side
 * of a physical key; pressing drops the face onto it and the shadow collapses,
 * so the button reads as travelling down rather than sliding or tilting.
 *
 * Kept to 100ms: press feedback has to feel instant or it reads as lag.
 */
const buttonVariants = cva(
  [
    "relative inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-sm",
    "font-mono uppercase tracking-[0.09em]",
    "transition-[transform,box-shadow,background-color,border-color] duration-100 ease-out",
    "translate-y-0 active:translate-y-[3px] active:shadow-none",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
    "motion-reduce:transition-none motion-reduce:active:translate-y-0",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-[0_3px_0_0_rgb(0_0_0/0.32)] hover:bg-primary/90",
        ink: "bg-foreground text-background shadow-[0_3px_0_0_rgb(0_0_0/0.45)] hover:bg-foreground/90",
        paper:
          "bg-paper text-ink shadow-[0_3px_0_0_rgb(0_0_0/0.34)] hover:bg-paper/90",
        outline:
          "border border-foreground/25 bg-transparent text-foreground shadow-[0_3px_0_0_rgb(0_0_0/0.22)] hover:border-foreground/50 hover:bg-foreground/[0.05]",
        glass: "glass glass-pill border-0 text-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-[0_3px_0_0_rgb(0_0_0/0.18)] hover:bg-secondary/80",
        ghost: "hover:bg-secondary hover:text-secondary-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      /*
        Horizontal padding and type size step up at `sm`. The labels here are
        long ("Request a free walkthrough") and the base style is `nowrap`, so
        at desktop padding the longest one measured 313px — wider than the
        279px a 375px phone actually leaves inside the form's padding. A button
        that cannot shrink drags its whole grid column with it, which is what
        was making the contact page scroll sideways on a phone.
      */
      size: {
        default: "h-12 px-5 text-[0.74rem] sm:px-7 sm:text-[0.78rem]",
        sm: "h-10 px-4 text-[0.7rem] sm:px-5 sm:text-[0.72rem]",
        lg: "h-14 px-5 text-[0.76rem] sm:px-9 sm:text-[0.84rem]",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
