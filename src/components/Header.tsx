
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from "framer-motion";
import { Magnetic } from './ui/magnetic';
import { SpotlightCard } from './ui/spotlight-card';
import { ButtonColorful } from './ui/button-colorful';

const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  const NavLinks = ({ className, onClick }: { className?: string, onClick?: () => void }) => (
    <nav className={cn("flex items-center gap-8", className)}>
      {[
        { to: "/search", label: "Find Creators" },
        { to: "/how-it-works", label: "How It Works" },
        { to: "/pricing", label: "Pricing" }
      ].map((link) => (
        <Magnetic key={link.to} intensity={0.5} range={50}>
          <Link 
            to={link.to} 
            className={cn(
              "text-base font-medium transition-colors relative py-1",
              "before:absolute before:inset-x-0 before:bottom-0 before:h-0.5 before:scale-x-0 before:origin-right",
              "before:transition-transform before:duration-300 hover:before:scale-x-100 hover:before:origin-left",
              "before:bg-primary",
              location.pathname === link.to 
                ? "text-foreground before:scale-x-100" 
                : "text-muted-foreground hover:text-foreground"
            )}
            onClick={onClick}
          >
            {link.label}
          </Link>
        </Magnetic>
      ))}
    </nav>
  );

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border/40">
      <div className="container flex h-[4.5rem] items-center justify-between px-4">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <SpotlightCard />
        </div>
        <Link 
          to="/" 
          className="relative flex items-center gap-2 transition-opacity active:opacity-80"
        >
          <motion.div 
            initial={false}
            animate={{ scale: isOpen ? 0.95 : 1 }}
            className="text-xl font-semibold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent"
          >
            CreativeEstate
          </motion.div>
        </Link>

        <NavLinks className="hidden md:flex" />

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-12 w-12 rounded-full hover:bg-accent active:scale-95 transition-all duration-200"
            >
              <Menu 
                className="h-6 w-6 transition-all duration-300" 
                style={{ 
                  transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                  opacity: isOpen ? 0.5 : 1
                }}
              />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent 
            side="right" 
            className="w-full sm:w-[380px] pr-0 border-l border-border/40"
          >
            <div className="flex flex-col gap-8 mt-8">
              <NavLinks 
                onClick={() => setIsOpen(false)} 
                className="flex-col items-start gap-8"
              />
              <div className="flex flex-col gap-4 mt-4">
                <AnimatePresence>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4"
                  >
                    <Button 
                      variant="ghost" 
                      asChild 
                      onClick={() => setIsOpen(false)}
                      className="w-full justify-start text-base font-medium h-14"
                    >
                      <Link to="/login">Log In</Link>
                    </Button>
                    <Button 
                      asChild 
                      onClick={() => setIsOpen(false)}
                      className="w-full justify-start text-base font-medium h-14 bg-primary hover:bg-primary/90"
                    >
                      <Link to="/signup">Sign Up</Link>
                    </Button>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        <div className="hidden md:flex items-center gap-4">
          <Button 
            variant="ghost" 
            asChild 
            className="h-11 px-6 text-base font-medium hover:bg-accent/50"
          >
            <Link to="/login">Log In</Link>
          </Button>
          <Button 
            asChild 
            className="h-11 px-6 text-base font-medium bg-primary hover:bg-primary/90 hover:shadow-lg transition-all duration-200"
          >
            <Link to="/signup">Sign Up</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
