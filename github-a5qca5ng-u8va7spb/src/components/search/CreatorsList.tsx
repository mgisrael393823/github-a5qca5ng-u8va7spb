import React from 'react';
import { CreatorCard } from '../creator/CreatorCard';
import { SortMenu } from '../sorting/SortMenu';
import { motion } from 'framer-motion';
import { Skeleton } from '../ui/skeleton';

interface Creator {
  name: string;
  services: string[];
  price: number;
  rating: number;
  reviews: number;
  location: string;
  image: string;
  workExamples: string[];
}

interface CreatorsListProps {
  creators: Creator[];
  sortBy: string;
  onSort: (value: string) => void;
  onImageLoad: (imageSrc: string) => void;
  loadedImages: Set<string>;
  imageRef: (node: HTMLImageElement | null) => void;
  isLoading?: boolean;
}

const LoadingSkeleton = () => (
  <div className="animate-pulse">
    <div className="rounded-lg bg-gray-200 aspect-[4/3] mb-4"></div>
    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
  </div>
);

export const CreatorsList: React.FC<CreatorsListProps> = ({
  creators,
  sortBy,
  onSort,
  onImageLoad,
  loadedImages,
  imageRef,
  isLoading = false,
}) => {
  const sortOptions = [
    { label: 'Rating', value: 'rating' },
    { label: 'Price: Low to High', value: 'price_asc' },
    { label: 'Price: High to Low', value: 'price_desc' },
    { label: 'Distance', value: 'distance' }
  ];

  return (
    <div className="mb-8">
      <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 w-full gap-4">
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 tracking-[-0.02em]">
          Featured Creators
        </h2>
        <div className="w-full sm:w-auto sm:absolute sm:right-0">
          <SortMenu 
            options={sortOptions}
            onSort={onSort}
            defaultValue={sortBy}
          />
        </div>
      </div>

      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {isLoading ? (
          <>
            <LoadingSkeleton />
            <LoadingSkeleton />
            <LoadingSkeleton />
          </>
        ) : creators?.map((creator, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <CreatorCard
              creator={creator}
              onImageLoad={onImageLoad}
              loadedImages={loadedImages}
              imageRef={imageRef}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};