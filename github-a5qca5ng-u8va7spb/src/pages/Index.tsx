import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { Hero } from '../components/Hero';
import PreviewSearch from '../components/PreviewSearch';
import Testimonials from '../components/Testimonials';
import CallToActionSection from '../components/CallToActionSection';
import Footer from '../components/Footer';
import HowItWorksSection from '../components/HowItWorksSection';
import { BottomNav } from '../components/navigation/BottomNav';
import { Banner } from '@/components/ui/banner';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import { GlowDialog } from '@/components/ui/glow-dialog';
import { SectionSpotlight } from '@/components/ui/section-spotlight';

const Index = () => {
  const [showBanner, setShowBanner] = useState(() => {
    const bannerDismissed = localStorage.getItem('bannerDismissed');
    return !bannerDismissed;
  });
  const [showGlowDialog, setShowGlowDialog] = useState(false);

  useEffect(() => {
    // Show dialog on first visit
    const hasVisited = localStorage.getItem('hasVisited');
    if (!hasVisited) {
      setShowGlowDialog(true);
      localStorage.setItem('hasVisited', 'true');
    }
  }, []);

  const handleTryNowClick = () => {
    setShowGlowDialog(true);
  };

  const handleBannerClose = () => {
    setShowBanner(false);
    localStorage.setItem('bannerDismissed', 'true');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {showBanner && (
        <Banner
          variant="default"
          size="lg"
          className="animate-in fade-in slide-in-from-top duration-500 bg-primary text-primary-foreground"
          icon={<Star className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary-foreground flex-shrink-0" />}
          action={
            <Button 
              variant="secondary" 
              size="sm" 
              className="flex text-xs sm:text-sm items-center whitespace-nowrap px-3 py-2 sm:px-3 sm:py-2 ml-auto sm:ml-3 min-w-[120px] sm:min-w-0 justify-center"
              onClick={handleTryNowClick}
            >
              Join Waitlist
            </Button>
          }
          layout="complex"
          isClosable
          onClose={handleBannerClose}
        >
          <p className="text-xs sm:text-sm">
            <span className="font-medium">New:</span> We've launched our creator marketplace! 🎉
          </p>
        </Banner>
      )}
      <main className="flex-1 pb-16 sm:pb-20">
        <Hero />
        
        <SectionSpotlight className="space-y-4 sm:space-y-6 lg:space-y-8">
          <div className="bg-gradient-to-b from-white via-gray-50 to-white py-8 sm:py-10 lg:py-12">
            <SectionSpotlight spotlightClassName="from-indigo-800/20 via-indigo-600/20 to-indigo-400/20">
              <HowItWorksSection />
            </SectionSpotlight>
          </div>
          
          <div className="py-4 sm:py-6 lg:py-8">
            <SectionSpotlight spotlightClassName="from-purple-800/20 via-purple-600/20 to-purple-400/20">
              <PreviewSearch />
            </SectionSpotlight>
          </div>
          
          <div className="bg-gradient-to-b from-white via-[#FEF9F6] to-white py-6 sm:py-8 lg:py-10">
            <SectionSpotlight spotlightClassName="from-cyan-800/20 via-cyan-600/20 to-cyan-400/20">
              <Testimonials />
            </SectionSpotlight>
          </div>
          
          <div className="pt-6 sm:pt-8 lg:pt-10">
            <SectionSpotlight spotlightClassName="from-emerald-800/20 via-emerald-600/20 to-emerald-400/20">
              <CallToActionSection />
            </SectionSpotlight>
          </div>
        </SectionSpotlight>

        <Footer />
      </main>
      <BottomNav />
      <GlowDialog 
        open={showGlowDialog} 
        onOpenChange={setShowGlowDialog}
      />
    </div>
  );
};

export default Index;