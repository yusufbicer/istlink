
import React from 'react';

interface IstLinqLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const IstLinqLogo = ({ className = '', size = 'md' }: IstLinqLogoProps) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <svg
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Gradient definitions */}
        <defs>
          <linearGradient id="istlinqGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3563E9" />
            <stop offset="50%" stopColor="#4E7AFF" />
            <stop offset="100%" stopColor="#7b66fc" />
          </linearGradient>
          <linearGradient id="istlinqAccent" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7b66fc" />
            <stop offset="100%" stopColor="#9392ff" />
          </linearGradient>
        </defs>
        
        {/* Background circle with gradient */}
        <circle cx="20" cy="20" r="18" fill="url(#istlinqGradient)" />
        
        {/* Istanbul bridge silhouette - representing connection */}
        <path
          d="M6 22 Q12 18, 20 22 Q28 18, 34 22"
          stroke="white"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          opacity="0.9"
        />
        
        {/* Bridge towers */}
        <rect x="11" y="16" width="1.5" height="8" fill="white" opacity="0.8" />
        <rect x="27.5" y="16" width="1.5" height="8" fill="white" opacity="0.8" />
        
        {/* Export containers/cargo representation */}
        <rect x="8" y="24" width="3" height="2" rx="0.5" fill="white" opacity="0.7" />
        <rect x="17" y="24" width="3" height="2" rx="0.5" fill="white" opacity="0.9" />
        <rect x="26" y="24" width="3" height="2" rx="0.5" fill="white" opacity="0.7" />
        
        {/* Connection lines representing logistics network */}
        <path
          d="M20 12 L16 16 L20 20 L24 16 Z"
          fill="white"
          opacity="0.8"
        />
        
        {/* Subtle highlight ring */}
        <circle cx="20" cy="20" r="16" fill="none" stroke="white" strokeWidth="0.5" opacity="0.3" />
      </svg>
    </div>
  );
};

export default IstLinqLogo;
