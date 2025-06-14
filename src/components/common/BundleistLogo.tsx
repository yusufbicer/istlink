import React from 'react';

interface BundleistLogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showText?: boolean;
}

const BundleistLogo = ({ size = 'md', className = '', showText = true }: BundleistLogoProps) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {/* Professional Bundling Logo */}
      <div className={`${sizeClasses[size]} relative`}>
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <defs>
            <linearGradient id="primaryGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e40af" />
              <stop offset="50%" stopColor="#0369a1" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>
            <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#dc2626" />
              <stop offset="100%" stopColor="#ea580c" />
            </linearGradient>
          </defs>
          
          {/* Professional network design representing bundling and logistics */}
          <g strokeLinecap="round" strokeLinejoin="round">
            {/* Central hub - refined circle */}
            <circle 
              cx="24" 
              cy="24" 
              r="5" 
              fill="url(#primaryGradient)" 
              stroke="white" 
              strokeWidth="1.5"
            />
            
            {/* Primary connection nodes */}
            <g fill="url(#accentGradient)" stroke="white" strokeWidth="1">
              <circle cx="12" cy="12" r="2.5" />
              <circle cx="36" cy="12" r="2.5" />
              <circle cx="12" cy="36" r="2.5" />
              <circle cx="36" cy="36" r="2.5" />
            </g>
            
            {/* Connection lines - clean and professional */}
            <g stroke="url(#primaryGradient)" strokeWidth="2" fill="none">
              <path d="M 14.5 14.5 L 21.5 21.5" opacity="0.8" />
              <path d="M 33.5 14.5 L 26.5 21.5" opacity="0.8" />
              <path d="M 14.5 33.5 L 21.5 26.5" opacity="0.8" />
              <path d="M 33.5 33.5 L 26.5 26.5" opacity="0.8" />
            </g>
            
            {/* Secondary network points */}
            <g fill="url(#primaryGradient)" opacity="0.6">
              <circle cx="24" cy="8" r="1.5" />
              <circle cx="24" cy="40" r="1.5" />
              <circle cx="8" cy="24" r="1.5" />
              <circle cx="40" cy="24" r="1.5" />
            </g>
            
            {/* Subtle connecting lines to secondary points */}
            <g stroke="url(#primaryGradient)" strokeWidth="1.5" fill="none" opacity="0.4">
              <path d="M 24 19 L 24 13" />
              <path d="M 24 29 L 24 35" />
              <path d="M 19 24 L 13 24" />
              <path d="M 29 24 L 35 24" />
            </g>
            
            {/* Professional accent - geometric element */}
            <path 
              d="M 20 4 Q 24 2, 28 4" 
              stroke="url(#accentGradient)" 
              strokeWidth="2" 
              fill="none" 
              opacity="0.7"
            />
          </g>
        </svg>
      </div>
      
      {/* Professional Typography */}
      {showText && (
        <div className={`text-gray-900 dark:text-gray-100 ${textSizes[size]} font-semibold tracking-wide`}>
          <span className="text-blue-700 dark:text-blue-400 font-bold">BUNDLE</span>
          <span className="text-gray-700 dark:text-gray-300 font-medium">IST</span>
        </div>
      )}
    </div>
  );
};

export default BundleistLogo;