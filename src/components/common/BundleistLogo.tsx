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
      {/* Clean AI Tech Logo */}
      <div className={`${sizeClasses[size]} relative`}>
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Clean, Modern Logo Design */}
          <g>
            {/* Outer circle with gradient */}
            <circle
              cx="24"
              cy="24"
              r="22"
              fill="url(#primaryGradient)"
              className="drop-shadow-sm"
            />
            
            {/* Inner design - network/connection concept */}
            <g transform="translate(24, 24)">
              {/* Central hub */}
              <circle 
                cx="0" 
                cy="0" 
                r="4" 
                fill="white"
                opacity="0.9"
              />
              
              {/* Connection nodes */}
              <circle cx="0" cy="-12" r="2.5" fill="white" opacity="0.8" />
              <circle cx="10" cy="-6" r="2.5" fill="white" opacity="0.8" />
              <circle cx="10" cy="6" r="2.5" fill="white" opacity="0.8" />
              <circle cx="0" cy="12" r="2.5" fill="white" opacity="0.8" />
              <circle cx="-10" cy="6" r="2.5" fill="white" opacity="0.8" />
              <circle cx="-10" cy="-6" r="2.5" fill="white" opacity="0.8" />
              
              {/* Connection lines */}
              <g stroke="white" strokeWidth="1.5" opacity="0.6">
                <line x1="0" y1="-4" x2="0" y2="-9.5" />
                <line x1="3" y1="-2" x2="7.5" y2="-4.5" />
                <line x1="3" y1="2" x2="7.5" y2="4.5" />
                <line x1="0" y1="4" x2="0" y2="9.5" />
                <line x1="-3" y1="2" x2="-7.5" y2="4.5" />
                <line x1="-3" y1="-2" x2="-7.5" y2="-4.5" />
              </g>
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