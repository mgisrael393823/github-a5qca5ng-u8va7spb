
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative group overflow-hidden",
  {
    variants: {
      variant: {
        default: [
          "bg-primary text-primary-foreground hover:bg-primary/90",
          "before:absolute before:inset-0 before:z-0 before:h-[100%] before:w-[20%]",
          "before:animate-shimmer-slide before:bg-gradient-to-r",
          "before:from-transparent before:via-white/10 before:to-transparent",
        ],
        destructive: [
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
          "before:absolute before:inset-0 before:z-0 before:h-[100%] before:w-[20%]",
          "before:animate-shimmer-slide before:bg-gradient-to-r",
          "before:from-transparent before:via-white/10 before:to-transparent",
        ],
        outline: [
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
          "before:absolute before:inset-0 before:z-0 before:h-[100%] before:w-[20%]",
          "before:animate-shimmer-slide before:bg-gradient-to-r",
          "before:from-transparent before:via-black/5 before:to-transparent",
        ],
        secondary: [
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
          "before:absolute before:inset-0 before:z-0 before:h-[100%] before:w-[20%]",
          "before:animate-shimmer-slide before:bg-gradient-to-r",
          "before:from-transparent before:via-black/5 before:to-transparent",
        ],
        ghost: [
          "hover:bg-accent hover:text-accent-foreground",
          "before:absolute before:inset-0 before:z-0 before:h-[100%] before:w-[20%]",
          "before:animate-shimmer-slide before:bg-gradient-to-r",
          "before:from-transparent before:via-black/5 before:to-transparent",
        ],
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, style, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        style={{ '--speed': '1.5s', ...style } as React.CSSProperties}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
