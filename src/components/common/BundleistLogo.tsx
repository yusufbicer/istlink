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
      {/* AI Logistics Tech Logo */}
      <div className={`${sizeClasses[size]} relative`}>
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* AI Logistics Design */}
          <g>
            {/* Main container/box shape */}
            <rect
              x="8"
              y="8"
              width="32"
              height="32"
              rx="6"
              fill="url(#primaryGradient)"
              className="drop-shadow-sm"
            />
            
            {/* AI Brain/Circuit pattern */}
            <g transform="translate(24, 24)">
              {/* Central processing unit */}
              <rect 
                x="-4" 
                y="-4" 
                width="8" 
                height="8" 
                rx="2"
                fill="white"
                opacity="0.9"
              />
              
              {/* Circuit pathways - representing logistics routes */}
              <g stroke="white" strokeWidth="2" opacity="0.7" fill="none">
                {/* Horizontal paths */}
                <path d="M -4 -8 L -12 -8 L -12 -4" strokeLinecap="round" />
                <path d="M 4 -8 L 12 -8 L 12 -4" strokeLinecap="round" />
                <path d="M -4 8 L -12 8 L -12 4" strokeLinecap="round" />
                <path d="M 4 8 L 12 8 L 12 4" strokeLinecap="round" />
                
                {/* Vertical paths */}
                <path d="M -8 -4 L -8 -12 L -4 -12" strokeLinecap="round" />
                <path d="M -8 4 L -8 12 L -4 12" strokeLinecap="round" />
                <path d="M 8 -4 L 8 -12 L 4 -12" strokeLinecap="round" />
                <path d="M 8 4 L 8 12 L 4 12" strokeLinecap="round" />
              </g>
              
              {/* Data nodes - representing logistics hubs */}
              <circle cx="-12" cy="-8" r="2" fill="white" opacity="0.8" />
              <circle cx="12" cy="-8" r="2" fill="white" opacity="0.8" />
              <circle cx="-12" cy="8" r="2" fill="white" opacity="0.8" />
              <circle cx="12" cy="8" r="2" fill="white" opacity="0.8" />
              
              {/* Corner connection points */}
              <circle cx="-8" cy="-12" r="1.5" fill="white" opacity="0.6" />
              <circle cx="8" cy="-12" r="1.5" fill="white" opacity="0.6" />
              <circle cx="-8" cy="12" r="1.5" fill="white" opacity="0.6" />
              <circle cx="8" cy="12" r="1.5" fill="white" opacity="0.6" />
            </g>
          </g>
          
          <defs>
            {/* Primary gradient for logo */}
            <linearGradient id="primaryGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="50%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#0891b2" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      
      {/* Clean Bundleist Text */}
      {showText && (
        <span 
          className={`font-semibold text-gray-800 ${textSizes[size]} tracking-wide`}
          style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
        >
          Bundleist
        </span>
      )}
    </div>
  );
};

export default BundleistLogo;