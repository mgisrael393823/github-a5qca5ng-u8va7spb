
import React from 'react';
import { Link } from 'react-router-dom';
import { ShimmerButton } from './ui/shimmer-button';

interface CallToActionProps {
  type: 'primary' | 'secondary';
  text: string;
  href: string;
}

const CallToAction = ({ type, text, href }: CallToActionProps) => {
  return (
    <Link to={href} className="inline-block">
      <ShimmerButton
        className={`text-base font-medium ${type === 'primary' ? 'text-white' : 'text-primary'}`}
        background={type === 'primary' ? '#1A1F2C' : '#F6F6F7'}
        shimmerColor={type === 'primary' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}
        shimmerSize="0.1em"
        shimmerDuration="2s"
      >
        {text}
      </ShimmerButton>
    </Link>
  );
};

export default CallToAction;
