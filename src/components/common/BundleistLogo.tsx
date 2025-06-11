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
        {/* Diamond-shaped modern container */}
        <path
          d="M50 10 L80 30 L80 70 L50 90 L20 70 L20 30 Z"
          fill="url(#mainGradient)"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="1"
        />
        
        {/* Individual parcels - representing items being bundled */}
        <g className="parcels">
          {/* Top left parcel */}
          <rect
            x="30"
            y="25"
            width="10"
            height="10"
            rx="1.5"
            fill="white"
            opacity="0.9"
          />
          
          {/* Top right parcel */}
          <rect
            x="60"
            y="25"
            width="10"
            height="10"
            rx="1.5"
            fill="white"
            opacity="0.9"
          />
          
          {/* Bottom left parcel */}
          <rect
            x="30"
            y="65"
            width="10"
            height="10"
            rx="1.5"
            fill="white"
            opacity="0.9"
          />
          
          {/* Bottom right parcel */}
          <rect
            x="60"
            y="65"
            width="10"
            height="10"
            rx="1.5"
            fill="white"
            opacity="0.9"
          />
          
          {/* Central bundle - larger to show consolidation */}
          <rect
            x="40"
            y="40"
            width="20"
            height="20"
            rx="3"
            fill="url(#bundleGradient)"
            opacity="0.95"
          />
        </g>
        
        {/* Elegant connection lines showing consolidation */}
        <g className="consolidation-lines" stroke="white" strokeWidth="1.5" opacity="0.7">
          <path d="M35 35 L45 45" strokeLinecap="round" />
          <path d="M65 35 L55 45" strokeLinecap="round" />
          <path d="M35 70 L45 55" strokeLinecap="round" />
          <path d="M65 70 L55 55" strokeLinecap="round" />
        </g>
        
        {/* Central binding element */}
        <circle
          cx="50"
          cy="50"
          r="4"
          fill="white"
          opacity="0.8"
        />
        <circle
          cx="50"
          cy="50"
          r="2"
          fill="url(#centerGradient)"
        />
        
        <defs>
          <linearGradient id="mainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#059669" />
            <stop offset="100%" stopColor="#2563EB" />
          </linearGradient>
          <linearGradient id="bundleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#3B82F6" />
          </linearGradient>
          <linearGradient id="centerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#059669" />
            <stop offset="100%" stopColor="#2563EB" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default BundleistLogo;