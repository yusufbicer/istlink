
import React from 'react';

interface IstLinqLogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const IstLinqLogo = ({ size = 'md', className = '' }: IstLinqLogoProps) => {
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
        {/* Hexagonal background */}
        <path
          d="M50 5L85 25V75L50 95L15 75V25L50 5Z"
          fill="url(#gradient)"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="2"
        />
        
        {/* Network pattern */}
        <circle cx="30" cy="35" r="3" fill="white" opacity="0.9" />
        <circle cx="50" cy="25" r="3" fill="white" opacity="0.9" />
        <circle cx="70" cy="35" r="3" fill="white" opacity="0.9" />
        <circle cx="35" cy="55" r="3" fill="white" opacity="0.9" />
        <circle cx="65" cy="55" r="3" fill="white" opacity="0.9" />
        <circle cx="50" cy="70" r="3" fill="white" opacity="0.9" />
        
        {/* Connection lines */}
        <line x1="30" y1="35" x2="50" y2="25" stroke="white" strokeWidth="1.5" opacity="0.7" />
        <line x1="50" y1="25" x2="70" y2="35" stroke="white" strokeWidth="1.5" opacity="0.7" />
        <line x1="30" y1="35" x2="35" y2="55" stroke="white" strokeWidth="1.5" opacity="0.7" />
        <line x1="70" y1="35" x2="65" y2="55" stroke="white" strokeWidth="1.5" opacity="0.7" />
        <line x1="35" y1="55" x2="50" y2="70" stroke="white" strokeWidth="1.5" opacity="0.7" />
        <line x1="65" y1="55" x2="50" y2="70" stroke="white" strokeWidth="1.5" opacity="0.7" />
        
        {/* Central hub */}
        <circle cx="50" cy="50" r="6" fill="white" />
        <circle cx="50" cy="50" r="3" fill="url(#centerGradient)" />
        
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="50%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#0D9488" />
          </linearGradient>
          <linearGradient id="centerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60A5FA" />
            <stop offset="100%" stopColor="#34D399" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default IstLinqLogo;
