import * as React from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { motion, useAnimationFrame, useMotionTemplate, useMotionValue, useTransform } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { Squares } from "@/components/ui/squares";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

const MovingBorder = ({
  children,
  duration = 2000,
  rx = "30%",
  ry = "30%",
  ...otherProps
}: {
  children: React.ReactNode;
  duration?: number;
  rx?: string;
  ry?: string;
  [key: string]: any;
}) => {
  const pathRef = useRef<SVGRectElement>(null);
  const progress = useMotionValue<number>(0);
  useAnimationFrame(time => {
    const length = pathRef.current?.getTotalLength() || 0;
    if (length) {
      const pxPerMillisecond = length / duration;
      progress.set(time * pxPerMillisecond % length);
    }
  });

  const x = useTransform(progress, val => pathRef.current?.getPointAtLength(val)?.x ?? 0);
  const y = useTransform(progress, val => pathRef.current?.getPointAtLength(val)?.y ?? 0);
  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;

  return <>
      <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="absolute h-full w-full" width="100%" height="100%" {...otherProps} stroke="white" strokeWidth="2">
        <rect fill="none" width="100%" height="100%" rx={rx} ry={ry} ref={pathRef} strokeDasharray="2" />
      </svg>
      <motion.div style={{
      position: "absolute",
      top: 0,
      left: 0,
      display: "inline-block",
      transform,
      zIndex: 1
    }}>
        {children}
      </motion.div>
    </>;
};

interface GlowDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function GlowDialog({
  open,
  onOpenChange
}: GlowDialogProps) {
  const [email, setEmail] = React.useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle email submission here
    console.log("Email submitted:", email);
    onOpenChange(false);
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl md:max-w-3xl overflow-hidden border-none bg-transparent">
        <motion.div
          className="bg-transparent relative text-xl p-[1px] overflow-hidden rounded-lg"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }} 
        >
          <div className="absolute inset-0">
            <MovingBorder duration={3000} rx="12px" ry="12px">
              <div className="h-32 w-32 opacity-[0.8] bg-[radial-gradient(#3275F8_40%,transparent_60%)]" />
            </MovingBorder>
          </div>
          
          <div className="relative bg-[#060606]/90 border border-slate-800/60 backdrop-blur-xl text-white w-full h-full rounded-lg p-6 sm:p-8 md:p-10">
            <DialogTitle className="sr-only">Join CreativeEstate Waitlist</DialogTitle>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4 md:mb-6 text-white leading-tight">
              The Future of Real Estate Marketing is Here
            </h2>
            <p className="text-center text-gray-300 mb-8 max-w-2xl mx-auto text-sm sm:text-base md:text-lg">
              Our cutting-edge content marketplace connects property managers with expert creators for high-quality real estate marketing. From photography to 3D tours—get the content you need, when you need it.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 justify-center items-stretch max-w-xl mx-auto">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 h-11 sm:h-12 px-4 rounded-lg bg-white/10 border border-white/20 text-white text-base placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all z-10"
              />
              <HoverBorderGradient 
                type="submit"
                className="!bg-white !text-black hover:!bg-white/90 h-11 sm:h-12 px-6 sm:px-8 text-sm sm:text-base font-medium whitespace-nowrap min-w-[140px] sm:min-w-[160px] z-10"
                duration={1.5}
              >
                Join Waitlist
              </HoverBorderGradient>
            </form>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
