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
    <div className={`flex items-center space-x-2 ${className}`}>
      {/* Geometric B Logo */}
      <div className={`${sizeClasses[size]} relative`}>
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Geometric B shape - identical to reference */}
          <path
            d="M15 10 L15 90 L55 90 C68 90 78 80 78 67 C78 58 72 50 64 47 C70 44 74 37 74 29 C74 18 66 10 55 10 L15 10 Z M30 25 L50 25 C55 25 59 29 59 34 C59 39 55 43 50 43 L30 43 L30 25 Z M30 57 L52 57 C58 57 63 62 63 68 C63 74 58 75 52 75 L30 75 L30 57 Z"
            fill="#1e88e5"
          />
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