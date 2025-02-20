import React from 'react';
import { Search, Users, CreditCard, FileCheck } from 'lucide-react';
import { Button } from './ui/button';

const HowItWorks = () => {
  const steps = [
    {
      icon: <Search className="w-6 h-6" />,
      title: "Search & Filter",
      description: "Find the perfect creator based on your specific needs"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Browse & Compare",
      description: "Review portfolios and compare creator profiles"
    },
    {
      icon: <CreditCard className="w-6 h-6" />,
      title: "Book & Pay Securely",
      description: "Schedule and pay through our secure platform"
    },
    {
      icon: <FileCheck className="w-6 h-6" />,
      title: "Receive & Approve",
      description: "Get your content and approve the final deliverables"
    }
  ];

  return (
    <section className="section-padding bg-secondary/30">
      <div className="mx-auto max-w-7xl">
        <h2 className="section-title">
          How Luxe Content Connect Works
        </h2>
        <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          A seamless process to connect you with top-tier content creators
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {steps.map((step, index) => (
            <div
              key={index}
              className="group relative p-6 rounded-lg bg-background hover:shadow-lg transition-all duration-300"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  {step.icon}
                </div>
                <h3 className="font-semibold">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" className="px-8">
            Find Your Creator
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
