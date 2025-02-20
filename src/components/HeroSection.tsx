
import React from 'react';
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import CallToAction from './CallToAction';

const HeroSection = () => {
  return <section className="relative z-0 flex min-h-[70vh] w-full flex-col items-center justify-center overflow-hidden rounded-md bg-background">
      <div className="absolute top-0 isolate z-0 flex w-screen flex-1 items-start justify-center">
        <div className="absolute top-0 z-50 h-48 w-screen bg-transparent opacity-10 backdrop-blur-md" />

        {/* Main glow */}
        <div className="absolute inset-auto z-50 h-36 w-[28rem] -translate-y-[-30%] rounded-full bg-primary/60 opacity-80 blur-3xl" />

        {/* Lamp effect */}
        <motion.div initial={{
        width: "8rem"
      }} viewport={{
        once: true
      }} transition={{
        ease: "easeInOut",
        delay: 0.3,
        duration: 0.8
      }} whileInView={{
        width: "16rem"
      }} className="absolute top-0 z-30 h-36 -translate-y-[20%] rounded-full bg-primary/60 blur-2xl" />

        {/* Top line */}
        <motion.div initial={{
        width: "15rem"
      }} viewport={{
        once: true
      }} transition={{
        ease: "easeInOut",
        delay: 0.3,
        duration: 0.8
      }} whileInView={{
        width: "30rem"
      }} className="absolute inset-auto z-50 h-0.5 -translate-y-[-10%] bg-primary/60" />

        {/* Left gradient cone */}
        <motion.div initial={{
        opacity: 0.5,
        width: "15rem"
      }} whileInView={{
        opacity: 1,
        width: "30rem"
      }} transition={{
        delay: 0.3,
        duration: 0.8,
        ease: "easeInOut"
      }} style={{
        backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`
      }} className="absolute inset-auto right-1/2 h-56 overflow-visible w-[30rem] bg-gradient-conic from-primary/60 via-transparent to-transparent [--conic-position:from_70deg_at_center_top]">
          <div className="absolute w-[100%] left-0 bg-background h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
          <div className="absolute w-40 h-[100%] left-0 bg-background bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]" />
        </motion.div>

        {/* Right gradient cone */}
        <motion.div initial={{
        opacity: 0.5,
        width: "15rem"
      }} whileInView={{
        opacity: 1,
        width: "30rem"
      }} transition={{
        delay: 0.3,
        duration: 0.8,
        ease: "easeInOut"
      }} style={{
        backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`
      }} className="absolute inset-auto left-1/2 h-56 w-[30rem] bg-gradient-conic from-transparent via-transparent to-primary/60 [--conic-position:from_290deg_at_center_top]">
          <div className="absolute w-40 h-[100%] right-0 bg-background bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]" />
          <div className="absolute w-[100%] right-0 bg-background h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
        </motion.div>
      </div>

      <motion.div initial={{
      y: 100,
      opacity: 0.5
    }} viewport={{
      once: true
    }} transition={{
      ease: "easeInOut",
      delay: 0.3,
      duration: 0.8
    }} whileInView={{
      y: 0,
      opacity: 1
    }} className="relative z-50 container flex justify-center flex-1 flex-col px-6 sm:px-8 lg:px-10 gap-6 py-12 sm:py-16">
        <div className="text-center">
          <h1 className="font-anek text-4xl font-medium tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
            <span className="block">Premium Content for</span>
            <span className="block mt-3">Real Estate Excellence</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Connect with top-tier creators for photography, videography, and marketing content
            that elevates your property portfolio.
          </p>
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <CallToAction type="primary" text="I Need Content" href="/property-manager" />
            <CallToAction type="primary" text="I Create Content" href="/creator" />
            <CallToAction type="secondary" text="Search Creators" href="/search" />
          </div>
        </div>
      </motion.div>
    </section>;
};

export default HeroSection;
