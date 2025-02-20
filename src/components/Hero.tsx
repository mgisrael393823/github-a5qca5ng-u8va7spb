"use client";

import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Building, UserPlus } from "lucide-react";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { ButtonColorful } from "@/components/ui/button-colorful";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { useIsMobile } from "@/hooks/use-mobile";

export function Hero() {
  const [titleNumber, setTitleNumber] = useState(0);
  const isMobile = useIsMobile();
  const titles = useMemo(() => ["engages", "converts", "impresses", "stands out", "educates"], []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles.length]);

  return (
    <div className="w-full">
      <AuroraBackground className="w-full">
        <div className="relative flex gap-4 sm:gap-6 lg:gap-8 items-center justify-center flex-col px-4 sm:px-6 py-12 sm:py-6 lg:py-8 min-h-[calc(100vh-4.5rem)] sm:min-h-0">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md mx-auto flex justify-center mb-8 cursor-pointer"
          >
            <Link to="/chat">
              <ButtonColorful 
                label="Fire Your Digital Marketing Agency"
                className="h-12 px-8 text-base font-medium"
              />
            </Link>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white/80 pointer-events-none touch-none"
          />
          <div className="flex gap-3 sm:gap-4 flex-col max-w-4xl mx-auto w-full">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-[2.25rem] sm:text-5xl md:text-6xl tracking-wide leading-[1.15] sm:leading-normal text-center py-3 sm:py-4 my-4 sm:my-6 font-bold lg:text-7xl text-shadow-sm"
            >
              <span className="text-primary inline whitespace-normal sm:whitespace-nowrap tracking-wide font-light">
                Property Content that
              </span>
              <span className="relative flex w-full justify-center h-[1.4em] sm:h-[1.2em] overflow-hidden mt-2 sm:mt-0">
                {titles.map((title, index) => (
                  <motion.span 
                    key={index}
                    className="absolute font-playfair tracking-wide"
                    initial={{
                      opacity: 0,
                      y: 30,
                      scale: 0.95
                    }}
                    animate={titleNumber === index ? {
                      y: 0,
                      opacity: 1,
                      scale: 1
                    } : {
                      y: titleNumber > index ? -30 : 30,
                      opacity: 0,
                      scale: 0.95
                    }}
                    transition={{
                      type: "tween",
                      duration: 0.4,
                      ease: "easeOut"
                    }}
                  >
                    {title}
                  </motion.span>
                ))}
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-sm sm:text-base lg:text-lg leading-relaxed tracking-wide text-black relative z-20 max-w-2xl text-center mx-auto px-2 sm:px-4 [word-spacing:0.12em] sm:[word-spacing:0.16em] font-medium"
            >
              Connect with top-tier creators for photography, videography, and marketing content that elevates your
              property portfolio.
            </motion.p>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col gap-4 w-full px-3 sm:px-4 max-w-md mx-auto mt-6 sm:mt-6 relative z-10"
          >
            <ShimmerButton
              className="w-full text-base font-medium gap-3 min-h-[3.5rem] touch-manipulation tracking-wide [word-spacing:0.16em] active:scale-[0.98] transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/20" 
              background="rgba(255, 255, 255, 0.15)"
            >
              I Need Content <Building className="w-5 h-5" />
            </ShimmerButton>
            <ShimmerButton 
              className="w-full text-base font-medium gap-3 min-h-[3.5rem] touch-manipulation tracking-wide [word-spacing:0.16em] active:scale-[0.98] transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/20"
            >
              I Create Content <UserPlus className="w-5 h-5" />
            </ShimmerButton>
          </motion.div>
        </div>
      </AuroraBackground>
    </div>
  );
}

export default Hero;