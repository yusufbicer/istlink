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
        {/* Elegant B letter design */}
        <path
          d="M25 20 L25 80 L55 80 C62 80 68 76 68 68 C68 62 64 58 58 56 C62 54 65 50 65 44 C65 36 59 20 50 20 L25 20 Z M35 30 L48 30 C52 30 55 33 55 37 C55 41 52 44 48 44 L35 44 L35 30 Z M35 54 L50 54 C54 54 58 57 58 61 C58 65 54 68 50 68 L35 68 L35 54 Z"
          fill="url(#bGradient)"
          strokeWidth="0"
        />
        
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