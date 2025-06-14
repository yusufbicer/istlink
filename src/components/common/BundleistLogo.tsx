import React from 'react';

interface BundleistLogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showText?: boolean;
}

const BundleistLogo = ({ size = 'md', className = '', showText = true }: BundleistLogoProps) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-xl'
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {/* Istanbul Bridge AI Logo */}
      <div className={`${sizeClasses[size]} relative`}>
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Istanbul Bridge Inspired Design */}
          <g>
            {/* Main circular background */}
            <circle
              cx="24"
              cy="24"
              r="22"
              fill="url(#bridgeGradient)"
              className="drop-shadow-lg"
            />
            
            {/* Bridge structure - representing connection between continents */}
            <g transform="translate(24, 24)">
              {/* Bridge towers */}
              <rect x="-2" y="-15" width="4" height="30" fill="white" opacity="0.9" rx="1" />
              <rect x="-12" y="-10" width="3" height="20" fill="white" opacity="0.7" rx="1" />
              <rect x="9" y="-10" width="3" height="20" fill="white" opacity="0.7" rx="1" />
              
              {/* Bridge cables - AI neural network pattern */}
              <g stroke="white" strokeWidth="1.5" opacity="0.8">
                {/* Main suspension cables */}
                <path d="M -15 0 Q 0 -8 15 0" fill="none" strokeLinecap="round" />
                <path d="M -15 4 Q 0 -4 15 4" fill="none" strokeLinecap="round" />
                
                {/* Vertical support cables */}
                <line x1="-8" y1="0" x2="-8" y2="-6" strokeLinecap="round" />
                <line x1="-4" y1="0" x2="-4" y2="-7" strokeLinecap="round" />
                <line x1="4" y1="0" x2="4" y2="-7" strokeLinecap="round" />
                <line x1="8" y1="0" x2="8" y2="-6" strokeLinecap="round" />
              </g>
              
              {/* AI nodes at connection points */}
              <circle cx="-15" cy="0" r="2" fill="white" opacity="0.9" />
              <circle cx="15" cy="0" r="2" fill="white" opacity="0.9" />
              <circle cx="0" cy="-8" r="2.5" fill="white" opacity="1" />
              
              {/* Data flow indicators */}
              <circle cx="-8" cy="2" r="1" fill="#fbbf24" opacity="0.8" />
              <circle cx="0" cy="2" r="1" fill="#fbbf24" opacity="0.8" />
              <circle cx="8" cy="2" r="1" fill="#fbbf24" opacity="0.8" />
            </g>
          </g>
          
          <defs>
            {/* Istanbul bridge inspired gradient */}
            <linearGradient id="bridgeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e40af" />
              <stop offset="30%" stopColor="#3b82f6" />
              <stop offset="70%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#0891b2" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      
      {/* Istanbul AI Logistics Text */}
      {showText && (
        <div className="flex flex-col">
          <span 
            className={`font-bold text-gray-800 ${textSizes[size]} tracking-tight leading-tight`}
            style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
          >
            BridgeLogist
          </span>
          <span 
            className="text-xs text-gray-500 tracking-wider font-medium"
            style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
          >
            Istanbul AI
          </span>
        </div>
      )}
    </div>
  );
};

export default BundleistLogo;