"use client";
import { Search, MapPin } from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export const SearchBar = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [locationValue, setLocationValue] = useState('');

  return (
    <motion.div 
      className="w-full"
    >
      <div className="grid grid-cols-1 md:grid-cols-[45%_45%_10%] gap-4 w-full">
        <div className="relative">
          <Search className={cn(
            "w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none transition-colors duration-200",
            isFocused ? "text-primary" : "text-gray-400"
          )} />
          <input
            type="text"
            placeholder="Search creators..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={cn(
              "w-full h-12 pl-12 pr-4 rounded-lg transition-all duration-200",
              "border border-[#E5E7EB] bg-white",
              "text-base placeholder:text-gray-500",
              "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30",
              "hover:border-gray-300 hover:shadow-sm",
              isFocused && "border-primary/30 ring-2 ring-primary/20"
            )}
          />
          <AnimatePresence>
            {searchValue && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                onClick={() => setSearchValue('')}
              >
                ×
              </motion.button>
            )}
          </AnimatePresence>
        </div>
        <div className="relative">
          <MapPin className={cn(
            "w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none transition-colors duration-200",
            isFocused ? "text-primary" : "text-gray-400"
          )} />
          <input
            type="text"
            placeholder="Location"
            value={locationValue}
            onChange={(e) => setLocationValue(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={cn(
              "w-full h-12 pl-12 pr-4 rounded-lg transition-all duration-200",
              "border border-[#E5E7EB] bg-white",
              "text-base placeholder:text-gray-500",
              "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30",
              "hover:border-gray-300 hover:shadow-sm",
              isFocused && "border-primary/30 ring-2 ring-primary/20"
            )}
          />
          <AnimatePresence>
            {locationValue && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                onClick={() => setLocationValue('')}
              >
                ×
              </motion.button>
            )}
          </AnimatePresence>
        </div>
        <Button 
          className={cn(
            "h-12 w-full md:w-fit px-6",
            "bg-gray-900 text-white font-medium rounded-lg",
            "transition-all duration-200",
            "hover:bg-gray-800 hover:shadow-lg hover:shadow-gray-900/10",
            "active:scale-[0.98]",
            "disabled:opacity-50 disabled:cursor-not-allowed"
          )}
          disabled={!searchValue && !locationValue}
        >
          Search
        </Button>
      </div>
    </motion.div>
  );
};