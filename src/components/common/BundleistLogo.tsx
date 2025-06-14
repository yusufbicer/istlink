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
      {/* Line-Based Bundling Logo */}
      <div className={`${sizeClasses[size]} relative`}>
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="50%" stopColor="#0891b2" />
              <stop offset="100%" stopColor="#dc2626" />
            </linearGradient>
          </defs>
          
          {/* Abstract line art representing bundling and logistics */}
          <g stroke="url(#lineGradient)" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
            {/* Central bundling point */}
            <circle cx="24" cy="24" r="4" />
            
            {/* Connecting lines representing bundling network */}
            <path d="M 8 12 Q 16 8, 24 20" />
            <path d="M 40 12 Q 32 8, 24 20" />
            <path d="M 8 36 Q 16 40, 24 28" />
            <path d="M 40 36 Q 32 40, 24 28" />
            
            {/* Horizontal bundling lines */}
            <path d="M 6 24 L 18 24" />
            <path d="M 30 24 L 42 24" />
            
            {/* Istanbul-inspired architectural element */}
            <path d="M 16 6 Q 24 2, 32 6" strokeWidth="2" opacity="0.7" />
            
            {/* Small connection dots */}
            <circle cx="8" cy="12" r="1.5" fill="url(#lineGradient)" />
            <circle cx="40" cy="12" r="1.5" fill="url(#lineGradient)" />
            <circle cx="8" cy="36" r="1.5" fill="url(#lineGradient)" />
            <circle cx="40" cy="36" r="1.5" fill="url(#lineGradient)" />
            <circle cx="6" cy="24" r="1.5" fill="url(#lineGradient)" />
            <circle cx="42" cy="24" r="1.5" fill="url(#lineGradient)" />
          </g>
        </svg>
      </div>
      
      {/* Bundleist Text */}
      {showText && (
        <div 
          className={`text-gray-800 dark:text-gray-200 ${textSizes[size]} tracking-widest uppercase font-precision`}
          style={{ 
            letterSpacing: '0.12em'
          }}
        >
          <span className="font-light">BUNDLE</span>
          <span className="font-medium">IST</span>
        </div>
      )}
    </div>
  );
};

export default BundleistLogo;