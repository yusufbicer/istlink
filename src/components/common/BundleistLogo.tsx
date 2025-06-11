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
        {/* Simple parcels representing bundling */}
        <g className="parcels">
          {/* Left parcel */}
          <rect x="25" y="40" width="16" height="20" rx="2" fill="#10B981" />
          <path d="M25 50 L41 50" stroke="white" strokeWidth="2" />
          <path d="M33 40 L33 60" stroke="white" strokeWidth="2" />
          
          {/* Right parcel */}
          <rect x="59" y="40" width="16" height="20" rx="2" fill="#3B82F6" />
          <path d="M59 50 L75 50" stroke="white" strokeWidth="2" />
          <path d="M67 40 L67 60" stroke="white" strokeWidth="2" />
          
          {/* Connecting band showing bundling */}
          <rect x="45" y="48" width="10" height="4" rx="2" fill="url(#gradient)" />
        </g>
        
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#3B82F6" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default BundleistLogo;