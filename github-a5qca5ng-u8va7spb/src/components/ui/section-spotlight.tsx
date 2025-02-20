import React from 'react';
import { cn } from '@/lib/utils';
import { Spotlight } from './spotlight';

interface SectionSpotlightProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  spotlightSize?: number;
  spotlightClassName?: string;
}

export function SectionSpotlight({
  children,
  className,
  spotlightSize = 300,
  spotlightClassName,
  ...props
}: SectionSpotlightProps) {
  return (
    <div className={cn("relative overflow-hidden", className)} {...props}>
      <Spotlight
        className={cn(
          "from-blue-800/20 via-blue-600/20 to-blue-400/20 blur-3xl",
          spotlightClassName
        )}
        size={spotlightSize}
      />
      {children}
    </div>
  );
}