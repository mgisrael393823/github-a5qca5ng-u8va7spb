
"use client";

import React from 'react';
import { ShimmerButton } from './ui/shimmer-button';
import { AuroraBackground } from './ui/aurora-background';

const CallToActionSection = () => {
  return (
    <AuroraBackground showRadialGradient={false} className="py-10 sm:py-12 lg:py-14">
      <div className="mx-auto max-w-7xl text-center relative z-10 px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 text-slate-950 dark:text-white">
          Elevate Your Real Estate Marketing Today
        </h2>
        <p className="text-slate-700 dark:text-slate-300 max-w-2xl mx-auto mb-6 sm:mb-8 text-sm sm:text-base lg:text-lg">
          Join thousands of property managers and content creators who trust Luxe Content Connect for their marketing needs
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-lg mx-auto">
          <ShimmerButton
            className="h-11 sm:h-12 w-full sm:w-auto text-base font-medium px-6 bg-white text-slate-950 hover:bg-slate-100"
          >
            Find a Creator
          </ShimmerButton>
          <ShimmerButton
            className="h-11 sm:h-12 w-full sm:w-auto text-base font-medium px-6 bg-slate-900 text-white hover:bg-slate-800"
          >
            Join as a Creator
          </ShimmerButton>
        </div>
      </div>
    </AuroraBackground>
  );
};

export default CallToActionSection;
