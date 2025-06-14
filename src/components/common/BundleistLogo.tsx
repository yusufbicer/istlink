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
      {/* Blue B Logo */}
      <div className={`${sizeClasses[size]} relative`}>
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Blue geometric B shape */}
          <path
            d="M8 6 L8 42 L28 42 C34.627 42 40 36.627 40 30 C40 26.5 38.2 23.4 35.4 21.6 C37.4 19.6 38.5 16.9 38.5 14 C38.5 9.029 34.471 5 29.5 5 L8 6 Z M16 14 L29.5 14 C30.328 14 31 14.672 31 15.5 C31 16.328 30.328 17 29.5 17 L16 17 V14 Z M16 25 L28 25 C30.209 25 32 26.791 32 29 C32 31.209 30.209 33 28 33 L16 33 V25 Z"
            fill="#1976d2"
            className="fill-blue-600"
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