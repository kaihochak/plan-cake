import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  // "w-full text-input inline-flex items-center justify-center whitespace-nowrap rounded-md ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-default border-2 hover:bg-default rounded-sm hover:bg-opacity-100 ",

        input:  "bg-default hover:bg-default rounded-sm hover:bg-opacity-10 ",
        select: "bg-primary border-2 hover:bg-default/90 hover:text-primary rounded-sm hover:bg-opacity-100",

        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-transparent shadow-sm text-foreground hover:border-accent hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary border border-secondary text-secondary hover:bg-secondary/30",
        accent:
          "bg-accent text-accent-foreground hover:bg-accent/90 hover:text-accent-foreground transition-colors duration-200",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-accent underline-offset-4 hover:underline",
        filter:
          "border border-primary-light/70 bg-transparent shadow-sm text-foreground-dark hover:bg-primary-light/70 hover:text-foreground",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)
const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return (
    (<Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props} />)
  );
})
Button.displayName = "Button"

export { Button, buttonVariants }