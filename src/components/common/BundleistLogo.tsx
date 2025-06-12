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
            d="M28 22 L28 78 L52 78 C59 78 65 73 65 66 C65 61 62 57 58 55 C61 53 63 49 63 44 C63 37 58 22 50 22 L28 22 Z M34 28 L49 28 C53 28 56 31 56 35 C56 39 53 42 49 42 L34 42 L34 28 Z M34 48 L51 48 C55 48 59 51 59 55 C59 59 55 62 51 62 L34 62 L34 48 Z"
            fill="url(#bGradient)"
            className="drop-shadow-lg"
          />
          {/* Refined accent elements */}
          <circle cx="67" cy="33" r="1.5" fill="url(#bGradient)" opacity="0.9" />
          <circle cx="70" cy="37" r="1" fill="url(#bGradient)" opacity="0.7" />
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