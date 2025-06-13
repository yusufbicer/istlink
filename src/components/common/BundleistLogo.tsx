import React from 'react';

interface BundleistLogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const BundleistLogo = ({ size = 'md', className = '' }: BundleistLogoProps) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <svg
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Elegant modern B logo */}
        <g>
          {/* Outer ring with gradient */}
          <circle 
            cx="60" 
            cy="60" 
            r="50" 
            stroke="url(#ringGradient)" 
            strokeWidth="2" 
            fill="none"
            opacity="0.15"
          />
          
          {/* Main B letterform - modern geometric design */}
          <path
            d="M35 30 L35 90 L65 90 C75 90 83 82 83 72 C83 66 80 61 75 58.5 C79 56 82 51 82 45 C82 35 74 30 65 30 L35 30 Z M42 37 L63 37 C68 37 72 41 72 45 C72 49 68 53 63 53 L42 53 L42 37 Z M42 60 L65 60 C70 60 75 64 75 70 C75 76 70 80 65 80 L42 80 L42 60 Z"
            fill="url(#primaryGradient)"
          />
          
          {/* Subtle highlight on the B */}
          <path
            d="M42 37 L63 37 C68 37 72 41 72 45 C72 46.5 71.5 47.8 70.5 48.8 L42 48.8 L42 37 Z"
            fill="url(#highlightGradient)"
            opacity="0.3"
          />
          
          {/* Modern accent dots */}
          <circle cx="90" cy="45" r="2" fill="url(#accentGradient)" opacity="0.8" />
          <circle cx="95" cy="52" r="1.5" fill="url(#accentGradient)" opacity="0.6" />
          <circle cx="88" cy="58" r="1" fill="url(#accentGradient)" opacity="0.4" />
        </g>
        
        <defs>
          {/* Primary gradient for the B */}
          <linearGradient id="primaryGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0EA5E9" />
            <stop offset="50%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#6366F1" />
          </linearGradient>
          
          {/* Ring gradient */}
          <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06B6D4" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
          
          {/* Highlight gradient */}
          <linearGradient id="highlightGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#F1F5F9" />
          </linearGradient>
          
          {/* Accent gradient */}
          <radialGradient id="accentGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#059669" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
};

export default BundleistLogo;