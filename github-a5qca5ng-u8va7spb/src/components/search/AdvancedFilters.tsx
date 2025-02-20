import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import { Switch } from '../ui/switch';
import { Calendar } from '../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

interface AdvancedFiltersProps {
  isOpen: boolean;
  onDateSelect: (date: Date | undefined) => void;
  onProCreatorsToggle: (checked: boolean) => void;
  selectedDate?: Date;
  proCreatorsOnly: boolean;
  contentTypes: string[];
  selectedTypes: string[];
  onTypeSelect: (type: string) => void;
}

export const AdvancedFilters: React.FC<AdvancedFiltersProps> = ({
  isOpen,
  onDateSelect,
  onProCreatorsToggle,
  selectedDate,
  proCreatorsOnly,
  contentTypes,
  selectedTypes,
  onTypeSelect,
}) => {
  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ 
        height: isOpen ? 'auto' : 0,
        opacity: isOpen ? 1 : 0
      }}
      transition={{ duration: 0.3 }}
      className="overflow-hidden"
    >
      <div className="py-4 space-y-6">
        {/* Content Type Filter */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-gray-700">Content Type</h3>
          <div className="flex flex-wrap gap-2">
            {contentTypes.map((type) => (
              <Button
                key={type}
                variant={selectedTypes.includes(type) ? "default" : "outline"}
                size="sm"
                onClick={() => onTypeSelect(type)}
                className="rounded-full"
              >
                {type}
              </Button>
            ))}
          </div>
        </div>

        {/* Availability Filter */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-gray-700">Availability</h3>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !selectedDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={onDateSelect}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Pro Creators Toggle */}
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h3 className="text-sm font-medium text-gray-700">Pro Creators Only</h3>
            <p className="text-sm text-gray-500">Show only verified professional creators</p>
          </div>
          <Switch
            checked={proCreatorsOnly}
            onCheckedChange={onProCreatorsToggle}
          />
        </div>
      </div>
    </motion.div>
  );
};