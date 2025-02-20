
import React from 'react';
import { Star } from 'lucide-react';

interface CreatorRatingProps {
  rating: number;
  reviews: number;
}

export const CreatorRating: React.FC<CreatorRatingProps> = ({ rating, reviews }) => {
  return (
    <div className="flex items-center gap-2">
      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
      <span className="text-base font-medium">{rating}</span>
      <span className="text-sm text-muted-foreground">
        ({reviews} reviews)
      </span>
    </div>
  );
};
