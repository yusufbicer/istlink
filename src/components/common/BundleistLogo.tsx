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
        {/* Modern geometric B inspired by convrt logo */}
        <g>
          <rect x="20" y="20" width="6" height="60" fill="url(#bGradient)" rx="3" />
          <rect x="20" y="20" width="35" height="6" fill="url(#bGradient)" rx="3" />
          <rect x="20" y="47" width="30" height="6" fill="url(#bGradient)" rx="3" />
          <rect x="20" y="74" width="35" height="6" fill="url(#bGradient)" rx="3" />
          <rect x="49" y="26" width="6" height="15" fill="url(#bGradient)" rx="3" />
          <rect x="49" y="59" width="6" height="15" fill="url(#bGradient)" rx="3" />
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