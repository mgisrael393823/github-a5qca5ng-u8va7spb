import React from 'react';
import { motion } from 'framer-motion';

export const SearchHeader = () => {
  return (
    <div className="text-center mb-12">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl sm:text-5xl font-semibold text-gray-900 tracking-[-0.02em] mb-6"
      >
        Discover Local Creators
      </motion.h2>
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
      >
        Connect with professional photographers, videographers, and content creators in your area
      </motion.p>
    </div>
  );
};