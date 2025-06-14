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
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Modern hexagonal logo with interconnected elements */}
        <g>
          {/* Main hexagonal shape */}
          <path
            d="M40 8 L60 20 L60 44 L40 56 L20 44 L20 20 Z"
            fill="url(#hexGradient)"
            stroke="url(#borderGradient)"
            strokeWidth="1.5"
            className="drop-shadow-md"
          />
          
          {/* Inner geometric pattern representing consolidation */}
          <g transform="translate(40, 32)">
            {/* Central hub */}
            <circle cx="0" cy="0" r="4" fill="url(#centerGradient)" />
            
            {/* Connection lines radiating outward */}
            <line x1="0" y1="0" x2="0" y2="-12" stroke="url(#lineGradient)" strokeWidth="2" opacity="0.8" />
            <line x1="0" y1="0" x2="10" y2="-6" stroke="url(#lineGradient)" strokeWidth="2" opacity="0.8" />
            <line x1="0" y1="0" x2="10" y2="6" stroke="url(#lineGradient)" strokeWidth="2" opacity="0.8" />
            <line x1="0" y1="0" x2="0" y2="12" stroke="url(#lineGradient)" strokeWidth="2" opacity="0.8" />
            <line x1="0" y1="0" x2="-10" y2="6" stroke="url(#lineGradient)" strokeWidth="2" opacity="0.8" />
            <line x1="0" y1="0" x2="-10" y2="-6" stroke="url(#lineGradient)" strokeWidth="2" opacity="0.8" />
            
            {/* Outer nodes */}
            <circle cx="0" cy="-12" r="2" fill="url(#nodeGradient)" />
            <circle cx="10" cy="-6" r="2" fill="url(#nodeGradient)" />
            <circle cx="10" cy="6" r="2" fill="url(#nodeGradient)" />
            <circle cx="0" cy="12" r="2" fill="url(#nodeGradient)" />
            <circle cx="-10" cy="6" r="2" fill="url(#nodeGradient)" />
            <circle cx="-10" cy="-6" r="2" fill="url(#nodeGradient)" />
          </g>
        </g>
        
        <defs>
          {/* Hexagon gradient */}
          <linearGradient id="hexGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0d9488" />
            <stop offset="50%" stopColor="#0ea5e9" />
            <stop offset="100%" stopColor="#2563eb" />
          </linearGradient>
          
          {/* Border gradient */}
          <linearGradient id="borderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
          
          {/* Center hub gradient */}
          <radialGradient id="centerGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#cbd5e1" />
          </radialGradient>
          
          {/* Connection lines gradient */}
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#cbd5e1" />
          </linearGradient>
          
          {/* Node gradient */}
          <radialGradient id="nodeGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#f59e0b" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
};

export default BundleistLogo;