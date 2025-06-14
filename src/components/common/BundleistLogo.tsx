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
      {/* Istanbul Bundling Expert Logo */}
      <div className={`${sizeClasses[size]} relative`}>
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Bundling/Packaging Design */}
          <g>
            {/* Main circular background with Istanbul blue */}
            <circle
              cx="24"
              cy="24"
              r="22"
              fill="url(#bundlingGradient)"
              className="drop-shadow-lg"
            />
            
            {/* Package bundling representation */}
            <g transform="translate(24, 24)">
              {/* Main package/bundle */}
              <rect x="-8" y="-6" width="16" height="12" fill="white" opacity="0.9" rx="2" />
              
              {/* Bundling straps/ties */}
              <rect x="-9" y="-2" width="18" height="2" fill="#fbbf24" opacity="0.9" rx="1" />
              <rect x="-2" y="-7" width="4" height="14" fill="#fbbf24" opacity="0.9" rx="1" />
              
              {/* Multiple packages being bundled together */}
              <rect x="-14" y="-3" width="8" height="6" fill="white" opacity="0.7" rx="1" />
              <rect x="6" y="-3" width="8" height="6" fill="white" opacity="0.7" rx="1" />
              <rect x="-6" y="-12" width="12" height="4" fill="white" opacity="0.7" rx="1" />
              
              {/* Istanbul crescent moon symbol (subtle) */}
              <path 
                d="M -16 -8 Q -14 -10 -12 -8 Q -14 -6 -16 -8" 
                fill="white" 
                opacity="0.6"
              />
              <circle cx="-13" cy="-9" r="0.8" fill="white" opacity="0.6" />
              
              {/* Smart bundling connections */}
              <g stroke="white" strokeWidth="1" opacity="0.6">
                <line x1="-10" y1="0" x2="-6" y2="0" strokeLinecap="round" />
                <line x1="6" y1="0" x2="10" y2="0" strokeLinecap="round" />
                <line x1="0" y1="-8" x2="0" y2="-4" strokeLinecap="round" />
              </g>
              
              {/* Tech dots for AI/smart bundling */}
              <circle cx="-10" cy="-6" r="1" fill="#06b6d4" opacity="0.8" />
              <circle cx="10" cy="-6" r="1" fill="#06b6d4" opacity="0.8" />
              <circle cx="0" cy="8" r="1" fill="#06b6d4" opacity="0.8" />
            </g>
          </g>
          
          <defs>
            {/* Istanbul/Turkish inspired gradient */}
            <linearGradient id="bundlingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#dc2626" />
              <stop offset="50%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#0891b2" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      
      {/* Bundleist Text */}
      {showText && (
        <span 
          className={`font-bold text-gray-800 ${textSizes[size]} tracking-tight`}
          style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
        >
          Bundleist
        </span>
      )}
    </div>
  );
};

export default BundleistLogo;