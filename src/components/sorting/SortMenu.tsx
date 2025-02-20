
import React from 'react';
import { Button } from '../ui/button';
import { SortAsc } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface SortOption {
  label: string;
  value: string;
}

interface SortMenuProps {
  options: SortOption[];
  onSort?: (value: string) => void;
  defaultValue?: string;
}

export const SortMenu: React.FC<SortMenuProps> = ({
  options,
  onSort,
  defaultValue
}) => {
  const [selected, setSelected] = React.useState(defaultValue);

  const handleSelect = (value: string) => {
    setSelected(value);
    onSort?.(value);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="sm"
          className="gap-2 bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 border-[#E5E7EB] rounded-lg"
        >
          <SortAsc className="w-4 h-4" />
          Sort By
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        {options.map((option) => (
          <DropdownMenuItem
            key={option.value}
            className={selected === option.value ? "bg-accent" : ""}
            onClick={() => handleSelect(option.value)}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
