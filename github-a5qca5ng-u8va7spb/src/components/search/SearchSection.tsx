import React, { useState, useRef } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { SearchHeader } from './SearchHeader';
import { SearchBar } from './SearchBar';
import { AdvancedFilters } from './AdvancedFilters';
import { CreatorsList } from './CreatorsList';

const contentTypes = [
  "Photography",
  "Videography",
  "Drone",
  "3D Tours",
  "Virtual Staging",
  "Floor Plans",
  "Social Media",
  "Copywriting"
];

const mockCreators = [
  {
    name: "Sarah Johnson",
    services: ["Photography", "Drone"],
    price: 499,
    rating: 4.9,
    reviews: 124,
    location: "New York, NY",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=500&h=500",
    workExamples: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=500&h=500",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=500&h=500",
      "https://images.unsplash.com/photo-1600607687920-4e110a238409?auto=format&fit=crop&w=500&h=500"
    ]
  },
  {
    name: "Michael Chen",
    services: ["Videography", "Editing"],
    price: 599,
    rating: 4.8,
    reviews: 98,
    location: "Los Angeles, CA",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&h=500",
    workExamples: [
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=500&h=500",
      "https://images.unsplash.com/photo-1600566753190-17146b2b6a97?auto=format&fit=crop&w=500&h=500",
      "https://images.unsplash.com/photo-1600566753104-685f4f24cb4d?auto=format&fit=crop&w=500&h=500"
    ]
  },
  {
    name: "Emily Rodriguez",
    services: ["3D Tours", "Photography"],
    price: 699,
    rating: 5.0,
    reviews: 156,
    location: "Miami, FL",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=500&h=500",
    workExamples: [
      "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=500&h=500",
      "https://images.unsplash.com/photo-1600573472602-49793e00a8e8?auto=format&fit=crop&w=500&h=500",
      "https://images.unsplash.com/photo-1600573472573-8f225c5b0256?auto=format&fit=crop&w=500&h=500"
    ]
  }
];

export const SearchSection = () => {
  const [isAdvancedFiltersOpen, setIsAdvancedFiltersOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [proCreatorsOnly, setProCreatorsOnly] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('rating');
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  
  const imageObserver = useRef<IntersectionObserver | null>(null);

  const handleTypeSelect = (type: string) => {
    setSelectedTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  return (
    <section className="relative section-padding overflow-hidden py-4 sm:py-8 my-0">
      <div className="relative mx-auto max-w-7xl my-0 py-4 sm:py-8">
        <div className="mx-6 sm:mx-0 mb-8">
          <Card className="p-4 sm:p-8 md:p-10 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 shadow-lg">
            <SearchHeader />
            
            <div className="my-8">
              <SearchBar />
            </div>
            
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                onClick={() => setIsAdvancedFiltersOpen(!isAdvancedFiltersOpen)}
                className="text-sm font-medium text-gray-600 hover:text-gray-900"
              >
                Advanced Filters
                {isAdvancedFiltersOpen ? (
                  <ChevronUp className="ml-2 h-4 w-4" />
                ) : (
                  <ChevronDown className="ml-2 h-4 w-4" />
                )}
              </Button>
              
              {proCreatorsOnly && (
                <span className="px-2.5 py-0.5 text-xs font-medium bg-primary/10 text-primary rounded-full">
                  PRO
                </span>
              )}
            </div>
            
            <AdvancedFilters
              isOpen={isAdvancedFiltersOpen}
              onDateSelect={setSelectedDate}
              onProCreatorsToggle={setProCreatorsOnly}
              selectedDate={selectedDate}
              proCreatorsOnly={proCreatorsOnly}
              contentTypes={contentTypes}
              selectedTypes={selectedTypes}
              onTypeSelect={handleTypeSelect}
            />
            
            <motion.div 
              className="mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <CreatorsList
                creators={mockCreators}
                sortBy={sortBy}
                onSort={setSortBy}
                onImageLoad={(src) => setLoadedImages(prev => new Set(prev.add(src)))}
                loadedImages={loadedImages}
                imageRef={(node) => {
                  if (node) {
                    imageObserver.current?.observe(node);
                  }
                }}
              />
            </motion.div>
          </Card>
        </div>
      </div>
    </section>
  );
};