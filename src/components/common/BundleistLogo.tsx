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
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Simple elegant B logo */}
        <g>
          {/* Main B shape with elegant curves */}
          <path
            d="M30 25 L30 75 L50 75 C57 75 62 70 62 63 C62 58 59 54 55 52 C58 50 60 46 60 41 C60 34 55 25 48 25 L30 25 Z M35 30 L47 30 C51 30 54 33 54 37 C54 41 51 44 47 44 L35 44 L35 30 Z M35 49 L49 49 C53 49 57 52 57 56 C57 60 53 63 49 63 L35 63 L35 49 Z"
            fill="url(#bGradient)"
            className="drop-shadow-sm"
          />
          {/* Subtle accent dot */}
          <circle cx="65" cy="35" r="2" fill="url(#bGradient)" opacity="0.8" />
        </g>
        
        <defs>
          <linearGradient id="bGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#3B82F6" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default BundleistLogo;