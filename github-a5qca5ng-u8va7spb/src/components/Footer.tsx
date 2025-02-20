
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t border-border/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              CreativeEstate
            </h3>
            <p className="text-muted-foreground text-sm">
              Connecting properties with creative professionals
            </p>
          </div>

          <div>
            <h4 className="font-medium mb-3 text-foreground">Discover</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/search" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                  Find Creators
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                  How It Works
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-3 text-foreground">Creators</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/join" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                  Join as Creator
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-3 text-foreground">Support</h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href="mailto:hello@creativeestate.com" 
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  hello@creativeestate.com
                </a>
              </li>
              <li className="text-muted-foreground text-sm">
                Available Mon-Fri, 9am-5pm EST
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 mt-6 border-t border-border/40">
          <p className="text-center text-muted-foreground text-sm">
            © {currentYear} CreativeEstate. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
