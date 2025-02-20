"use client";
import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";
import { Spotlight } from "@/components/ui/spotlight";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) => {
  return (
    <div>
      <div
        className={cn( 
          "relative flex flex-col min-h-[50vh] items-center justify-center bg-gradient-to-b from-white via-white to-white text-slate-950 transition-all",
          className
        )}
        {...props}
      >
      <Spotlight
        className="from-blue-800/20 via-blue-600/20 to-blue-400/20 blur-3xl"
        size={300}
      />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className={cn(
              "absolute inset-0 bg-gradient-to-b from-blue-50/50 via-indigo-50/50 to-violet-50/50",
              showRadialGradient &&
                `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)]`
            )}
          ></div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default AuroraBackground;