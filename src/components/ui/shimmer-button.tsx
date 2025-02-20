
import { cn } from "@/lib/utils";
import { HTMLAttributes, forwardRef } from "react";

interface ShimmerButtonProps extends HTMLAttributes<HTMLDivElement> {
  background?: string;
  shimmerColor?: string;
  shimmerSize?: string;
  shimmerDuration?: string;
}

export const ShimmerButton = forwardRef<HTMLDivElement, ShimmerButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "group relative inline-flex h-11 cursor-pointer items-center justify-center rounded-xl px-8 py-2 font-medium text-primary-foreground transition-all",
          "before:absolute before:inset-0 before:z-0 before:h-[100%] before:w-[20%]",
          "before:animate-shimmer-slide before:bg-gradient-to-r",
          "before:from-transparent before:via-white/10 before:to-transparent",
          "bg-primary hover:bg-primary/90",
          className
        )}
        style={{ '--speed': '1.5s' } as React.CSSProperties}
        {...props}
      >
        <div className="relative flex items-center justify-center gap-3">
          {children}
        </div>
      </div>
    );
  }
);
ShimmerButton.displayName = "ShimmerButton";
