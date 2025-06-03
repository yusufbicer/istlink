
import React from 'react';

interface IstLinqLogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const IstLinqLogo = ({ size = 'md', className = '' }: IstLinqLogoProps) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Hexagonal background */}
        <path
          d="M50 5L85 25V75L50 95L15 75V25L50 5Z"
          fill="url(#gradient)"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="2"
        />
        
        {/* Enhanced network pattern with linking effect */}
        <circle cx="25" cy="30" r="2.5" fill="white" opacity="0.9" />
        <circle cx="50" cy="20" r="2.5" fill="white" opacity="0.9" />
        <circle cx="75" cy="30" r="2.5" fill="white" opacity="0.9" />
        <circle cx="30" cy="50" r="2.5" fill="white" opacity="0.9" />
        <circle cx="70" cy="50" r="2.5" fill="white" opacity="0.9" />
        <circle cx="25" cy="70" r="2.5" fill="white" opacity="0.9" />
        <circle cx="75" cy="70" r="2.5" fill="white" opacity="0.9" />
        
        {/* Connection lines forming a network */}
        <line x1="25" y1="30" x2="50" y2="20" stroke="white" strokeWidth="1.5" opacity="0.7" />
        <line x1="50" y1="20" x2="75" y2="30" stroke="white" strokeWidth="1.5" opacity="0.7" />
        <line x1="25" y1="30" x2="30" y2="50" stroke="white" strokeWidth="1.5" opacity="0.7" />
        <line x1="75" y1="30" x2="70" y2="50" stroke="white" strokeWidth="1.5" opacity="0.7" />
        <line x1="30" y1="50" x2="25" y2="70" stroke="white" strokeWidth="1.5" opacity="0.7" />
        <line x1="70" y1="50" x2="75" y2="70" stroke="white" strokeWidth="1.5" opacity="0.7" />
        <line x1="25" y1="70" x2="75" y2="70" stroke="white" strokeWidth="1.5" opacity="0.7" />
        
        {/* Central hub representing consolidation */}
        <circle cx="50" cy="50" r="8" fill="white" opacity="0.95" />
        <circle cx="50" cy="50" r="5" fill="url(#centerGradient)" />
        
        {/* Enhanced "Q" effect - proper Q shape with linking tail */}
        <g transform="translate(50, 50)">
          {/* Q circle part */}
          <circle cx="0" cy="0" r="2.5" fill="none" stroke="white" strokeWidth="1.2" opacity="0.9" />
          
          {/* Q tail extending outward to show linking */}
          <path 
            d="M 1.5 1.5 L 4 4 L 6 6" 
            stroke="white" 
            strokeWidth="1.2" 
            fill="none" 
            opacity="0.9"
            strokeLinecap="round"
          />
          
          {/* Small connection point at the end of Q tail */}
          <circle cx="6" cy="6" r="1" fill="white" opacity="0.8" />
          
          {/* Animated linking lines extending from Q */}
          <g className="animate-pulse" opacity="0.6">
            <line x1="6" y1="6" x2="12" y2="12" stroke="white" strokeWidth="0.8" strokeDasharray="2,2" />
            <line x1="6" y1="6" x2="10" y2="2" stroke="white" strokeWidth="0.8" strokeDasharray="2,2" />
          </g>
        </g>
        
        {/* Additional linking effects around the logo */}
        <g className="animate-pulse" opacity="0.4">
          <circle cx="20" cy="20" r="1" fill="white" />
          <circle cx="80" cy="20" r="1" fill="white" />
          <circle cx="20" cy="80" r="1" fill="white" />
          <circle cx="80" cy="80" r="1" fill="white" />
          
          {/* Subtle connection lines */}
          <line x1="20" y1="20" x2="25" y2="30" stroke="white" strokeWidth="0.5" strokeDasharray="1,1" />
          <line x1="80" y1="20" x2="75" y2="30" stroke="white" strokeWidth="0.5" strokeDasharray="1,1" />
          <line x1="20" y1="80" x2="25" y2="70" stroke="white" strokeWidth="0.5" strokeDasharray="1,1" />
          <line x1="80" y1="80" x2="75" y2="70" stroke="white" strokeWidth="0.5" strokeDasharray="1,1" />
        </g>
        
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="50%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#0D9488" />
          </linearGradient>
          <linearGradient id="centerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60A5FA" />
            <stop offset="100%" stopColor="#34D399" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default IstLinqLogo;
