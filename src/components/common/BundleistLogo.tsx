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
      {/* Geometric B Logo - Two separate blocks forming B */}
      <div className={`${sizeClasses[size]} relative`}>
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Left vertical block */}
          <rect x="10" y="10" width="15" height="80" fill="#1976d2" />
          
          {/* Top right block */}
          <polygon 
            points="25,10 70,10 85,25 70,40 25,40 25,25" 
            fill="#1976d2" 
          />
          
          {/* Bottom right block */}
          <polygon 
            points="25,50 75,50 90,65 75,80 25,80 25,65" 
            fill="#1976d2" 
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