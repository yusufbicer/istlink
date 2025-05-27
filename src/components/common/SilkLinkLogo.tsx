
import React from 'react';

interface SilkLinkLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const SilkLinkLogo = ({ className = '', size = 'md' }: SilkLinkLogoProps) => {
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
          <linearGradient id="silkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3563E9" />
            <stop offset="50%" stopColor="#4E7AFF" />
            <stop offset="100%" stopColor="#7b66fc" />
          </linearGradient>
          <linearGradient id="silkAccent" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7b66fc" />
            <stop offset="100%" stopColor="#9392ff" />
          </linearGradient>
        </defs>
        
        {/* Background circle with gradient */}
        <circle cx="20" cy="20" r="18" fill="url(#silkGradient)" />
        
        {/* Silk road path - flowing curves representing trade routes */}
        <path
          d="M8 20 Q15 12, 25 20 Q30 25, 32 20"
          stroke="white"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          opacity="0.9"
        />
        
        {/* Second silk path */}
        <path
          d="M8 24 Q18 16, 28 24 Q32 28, 32 24"
          stroke="white"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          opacity="0.7"
        />
        
        {/* Connection nodes representing cities/ports */}
        <circle cx="12" cy="22" r="2" fill="white" opacity="0.9" />
        <circle cx="20" cy="20" r="2.5" fill="white" />
        <circle cx="28" cy="22" r="2" fill="white" opacity="0.9" />
        
        {/* Subtle highlight */}
        <circle cx="20" cy="20" r="16" fill="none" stroke="white" strokeWidth="0.5" opacity="0.3" />
      </svg>
    </div>
  );
};

export default SilkLinkLogo;
