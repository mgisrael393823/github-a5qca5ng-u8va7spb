
import { useState } from "react";
import { cn } from "@/lib/utils";
import { IconChevronDown } from "@tabler/icons-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion, useInView } from "framer-motion";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Info } from "lucide-react";
import { useRef } from "react";
import { useNumberFlow } from "@number-flow/react";

export function Pricing() {
  return (
    <section id="pricing" className="py-12 sm:py-16 lg:py-20 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 rounded-2xl py-12 bg-white/50 backdrop-blur-sm">
        <motion.div 
          className="text-center mb-8 sm:mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight mb-3">
            Simple, transparent pricing
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Choose the perfect plan for your property marketing needs
          </p>
        </motion.div>
        
        <div className="mt-8 grid grid-cols-1 gap-6 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <PricingCard
            title="Basic"
            price={299}
            features={[
              "Professional photography (up to 25 photos)",
              "Basic photo editing",
              "24-hour turnaround",
              "Digital delivery",
              "Limited revisions"
            ]}
            description="Perfect for single-family homes and small properties"
            cta="Get Started"
          />
          <div className="relative group">
            <div className="absolute -inset-[2px] rounded-2xl bg-gradient-to-r from-purple-500 via-cyan-300 to-emerald-400 opacity-75 blur-lg transition-all group-hover:opacity-100 group-hover:blur-xl" />
            <PricingCard
              title="Professional"
              price={499}
              features={[
                "Everything in Basic, plus:",
                "Up to 40 professional photos",
                "Drone aerial photography",
                "Virtual tour",
                "Advanced photo editing",
                "Social media optimized images",
                "Unlimited revisions"
              ]}
              description="Ideal for luxury homes and medium-sized properties"
              cta="Go Professional"
              highlighted
            />
          </div>
          <PricingCard
            title="Premium"
            price={799}
            features={[
              "Everything in Professional, plus:",
              "Unlimited professional photos",
              "4K video tour",
              "3D virtual walkthrough",
              "Premium photo editing",
              "Marketing materials",
              "Dedicated support",
              "Rush delivery available"
            ]}
            description="Best for luxury estates and commercial properties"
            cta="Go Premium"
          />
        </div>
      </div>
    </section>
  );
}

const PricingCard = ({
  title,
  price,
  description,
  features,
  cta,
  highlighted = false,
  highlighted = false,
}: {
  title: string;
  price: number;
  description: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
  highlighted?: boolean;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isMobile = useIsMobile();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const animatedPrice = useNumberFlow(price, {
    duration: 1000,
    delay: 200,
    isEnabled: isInView
  });

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn(
        "relative rounded-2xl p-6 shadow-xl transition-all duration-300",
        "bg-white hover:scale-[1.02]",
        "touch-manipulation overflow-hidden",
        highlighted && "ring-2 ring-primary/50 shadow-2xl scale-[1.02]"
      )}
      onClick={isMobile ? toggleExpand : undefined}
      onMouseEnter={() => !isMobile && setIsExpanded(true)}
      onMouseLeave={() => !isMobile && setIsExpanded(false)}
    >
      <div className="flex items-center justify-between mb-4 relative z-10">
        <h3 className="text-lg font-semibold leading-tight text-slate-900">
          {title}
        </h3>
        {highlighted && (
          <span className="px-3 py-1 text-xs font-medium text-primary bg-primary/10 rounded-full">
            Popular
          </span>
        )}
      </div>
      
      <div className="mt-3 flex items-baseline text-slate-900 relative z-10">
        <span className="text-4xl font-bold tracking-tight">
          ${Math.round(animatedPrice)}
        </span>
        <span className="ml-1 text-sm font-medium text-slate-600">/project</span>
      </div>

      <p className="mt-3 text-sm text-slate-600 relative z-10">
        {description}
      </p>

      <div 
        className={cn(
          "mt-4 overflow-hidden transition-all duration-300 relative z-10",
          isExpanded ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <ul className="mt-6 space-y-3 text-sm text-slate-600">
          {features.map((feature) => (
            <li key={feature} className="flex">
              <svg
                aria-hidden="true"
                className={cn(
                  "h-5 w-5 flex-shrink-0",
                  highlighted ? "text-primary" : "text-muted-foreground"
                )}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="ml-3 flex items-center gap-2">
                {feature.includes("(?)") ? (
                  <>
                    {feature.replace(" (?)", "")}
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="w-4 h-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>{feature.split("(?)")[1]}</TooltipContent>
                    </Tooltip>
                  </>
                ) : feature}
              </span>
            </li>
          ))}
        </ul>

        <button
          className={cn(
            "mt-6 block w-full rounded-lg py-3 px-6 text-center text-sm font-semibold leading-5",
            highlighted
              ? "bg-primary text-white hover:bg-primary/90"
            highlighted ? "bg-primary text-white hover:bg-primary/90" : "bg-slate-800 text-white hover:bg-slate-900"
          )}
        >
          {cta}
        </button>
      </div>

      <div className="flex items-center justify-center pt-4 mt-4 border-t">
        <button 
          className="text-base sm:text-sm text-slate-600 hover:text-primary flex items-center gap-2 group/btn transition-all duration-300 py-2 touch-manipulation"
          onClick={(e) => {
            e.stopPropagation();
            toggleExpand();
          }}
        >
          See Features
          <IconChevronDown 
            className={cn(
              "w-5 h-5 sm:w-4 sm:h-4 transition-transform duration-300",
              isExpanded ? "rotate-180" : "group-hover/btn:translate-y-0.5"
            )}
          />
        </button>
      </div>
    </motion.div>
  );
};

export default Pricing;
