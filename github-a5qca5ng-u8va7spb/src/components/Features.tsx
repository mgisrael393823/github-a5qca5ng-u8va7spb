"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Camera, Plane, Video, Instagram, UserCheck, Clock, CreditCard, Award, ArrowRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";

const features = [{
  title: "Professional Photography",
  description: "High-quality, professionally edited real estate photography that showcases properties at their best.",
  icon: Camera,
  color: "bg-blue-500/10 text-blue-500"
}, {
  title: "Drone Aerial Coverage",
  description: "FAA-certified drone operators capturing stunning aerial views and property surroundings.",
  icon: Plane,
  color: "bg-indigo-500/10 text-indigo-500"
}, {
  title: "Video Production",
  description: "Cinematic property tours and promotional videos that tell your property's unique story.",
  icon: Video,
  color: "bg-purple-500/10 text-purple-500"
}, {
  title: "Social Media Content",
  description: "Engaging content optimized for all major social platforms and marketing channels.",
  icon: Instagram,
  color: "bg-pink-500/10 text-pink-500"
}, {
  title: "Verified Creators",
  description: "Every creator is thoroughly vetted and verified for quality and professionalism.",
  icon: UserCheck,
  color: "bg-green-500/10 text-green-500"
}, {
  title: "24/7 Availability",
  description: "Book creators any time, with flexible scheduling to meet your deadlines.",
  icon: Clock,
  color: "bg-yellow-500/10 text-yellow-500"
}, {
  title: "Transparent Pricing",
  description: "Clear, upfront pricing with no hidden fees. Pay only for what you need.",
  icon: CreditCard,
  color: "bg-orange-500/10 text-orange-500"
}, {
  title: "Quality Guaranteed",
  description: "100% satisfaction guarantee on all content. Your property deserves the best.",
  icon: Award,
  color: "bg-red-500/10 text-red-500"
}];

export function FeaturesSectionWithHoverEffects() {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="section-title mb-4 font-space tracking-tight">
            Elevate Your Property Marketing
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Unlock the power of professional content creation with our comprehensive real estate media services.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {features.map((feature, index) => (
            <Feature
              key={index}
              title={feature.title}
              description={feature.description}
              Icon={feature.icon}
              color={feature.color}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface FeatureProps {
  title: string;
  description: string;
  Icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const Feature = ({ title, description, Icon, color }: FeatureProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isMobile = useIsMobile();
  
  const handleClick = () => {
    if (isMobile) {
      setIsExpanded(!isExpanded);
    }
  };
  
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
      className={cn(
        "w-full text-left",
        "rounded-xl transition-colors duration-200",
        "bg-white hover:bg-white",
        "border border-gray-200/50 hover:border-gray-300/50",
        "p-6 sm:p-8",
        "group focus:outline-none focus:ring-2 focus:ring-primary/20 relative",
        "hover:shadow-xl hover:shadow-gray-100/50"
      )}
      onClick={handleClick}
      aria-expanded={isMobile ? isExpanded : undefined}
    >
      <div className="flex flex-col gap-4">
        <div className={cn(
          "w-12 h-12 rounded-xl flex items-center justify-center",
          color,
          "transition-transform duration-300 group-hover:scale-110"
        )}>
          <Icon className={cn(
          "w-6 h-6 shrink-0",
          "transition-transform duration-200",
          isMobile && isExpanded && "transform rotate-90"
        )} />
        </div>
        <div className="w-full">
          <h3 className={cn(
            "text-lg font-semibold leading-6 font-space mb-3",
            "text-gray-900 group-hover:text-primary transition-colors"
          )}>
            {title}
            <ArrowRight className="w-4 h-4 inline-block ml-2 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
          </h3>
          <div className={cn(
            "overflow-hidden transition-[max-height,opacity] duration-200",
            isMobile && !isExpanded ? "max-h-0 opacity-0" : "max-h-32 opacity-100"
          )}>
            <p className="text-sm text-gray-600 font-medium leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </div>
    </motion.button>
  );
};