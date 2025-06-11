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
        {/* Simple elegant background circle */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="url(#gradient)"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="1"
        />
        
        {/* Three simple parcels being bundled */}
        <g className="parcels">
          {/* Left parcel */}
          <rect x="28" y="38" width="12" height="12" rx="2" fill="white" opacity="0.9" />
          <rect x="30" y="40" width="8" height="8" rx="1" fill="url(#parcelGradient)" />
          
          {/* Right parcel */}
          <rect x="60" y="38" width="12" height="12" rx="2" fill="white" opacity="0.9" />
          <rect x="62" y="40" width="8" height="8" rx="1" fill="url(#parcelGradient)" />
          
          {/* Center bundle (slightly larger) */}
          <rect x="43" y="50" width="14" height="14" rx="2" fill="white" opacity="0.95" />
          <rect x="45" y="52" width="10" height="10" rx="1" fill="url(#bundleGradient)" />
        </g>
        
        {/* Simple connecting lines */}
        <g className="bundle-lines" stroke="white" strokeWidth="2" opacity="0.6">
          <path d="M40 44 L48 56" strokeLinecap="round" />
          <path d="M60 44 L52 56" strokeLinecap="round" />
        </g>
        
        {/* Central bundling symbol */}
        <circle cx="50" cy="57" r="2" fill="white" opacity="0.9" />
        
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#059669" />
            <stop offset="100%" stopColor="#2563eb" />
          </linearGradient>
          <linearGradient id="parcelGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
          <linearGradient id="bundleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#059669" />
            <stop offset="50%" stopColor="#0891b2" />
            <stop offset="100%" stopColor="#2563eb" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default BundleistLogo;