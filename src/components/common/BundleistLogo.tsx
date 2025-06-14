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
        {/* Premium minimalist B logo */}
        <g>
          {/* Subtle outer glow */}
          <circle 
            cx="50" 
            cy="50" 
            r="45" 
            stroke="url(#glowGradient)" 
            strokeWidth="1" 
            fill="none"
            opacity="0.1"
          />
          
          {/* Clean geometric B with perfect proportions */}
          <path
            d="M25 20 L25 80 L55 80 C63 80 70 74 70 66 C70 61 67.5 57 64 55 C67 53 69 49 69 44 C69 36 63 20 54 20 L25 20 Z M32 27 L53 27 C57.5 27 61 30 61 34 C61 38 57.5 41 53 41 L32 41 L32 27 Z M32 48 L55 48 C59.5 48 63 51 63 55 C63 59 59.5 62 55 62 L32 62 L32 48 Z"
            fill="url(#primaryGradient)"
            className="drop-shadow-sm"
          />
          
          {/* Premium highlight effect */}
          <path
            d="M32 27 L53 27 C57.5 27 61 30 61 34 C61 35.2 60.6 36.3 59.9 37.2 L32 37.2 L32 27 Z"
            fill="url(#shineGradient)"
            opacity="0.4"
          />
          
          {/* Elegant connecting elements */}
          <circle cx="73" cy="38" r="1.8" fill="url(#accentGradient)" opacity="0.9" />
          <circle cx="76" cy="43" r="1.2" fill="url(#accentGradient)" opacity="0.7" />
          <circle cx="74" cy="48" r="0.8" fill="url(#accentGradient)" opacity="0.5" />
        </g>
        
        <defs>
          {/* Primary sophisticated gradient */}
          <linearGradient id="primaryGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#059669" />
            <stop offset="40%" stopColor="#0891b2" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </linearGradient>
          
          {/* Subtle glow effect */}
          <linearGradient id="glowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
          
          {/* Premium shine effect */}
          <linearGradient id="shineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#f8fafc" />
          </linearGradient>
          
          {/* Refined accent gradient */}
          <radialGradient id="accentGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#16a34a" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
};

export default BundleistLogo;