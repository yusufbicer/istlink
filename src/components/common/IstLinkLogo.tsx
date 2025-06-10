import React from 'react';

interface IstLinkLogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const IstLinkLogo = ({ size = 'md', className = '' }: IstLinkLogoProps) => {
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
        {/* Elegant circular background with subtle gradient */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="url(#gradient)"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="1"
        />
        
        {/* Supply chain network - elegant connection pattern */}
        <g className="supply-chain-network">
          {/* Origin nodes (suppliers) */}
          <circle cx="20" cy="25" r="3" fill="white" opacity="0.9" />
          <circle cx="35" cy="15" r="2.5" fill="white" opacity="0.8" />
          <circle cx="15" cy="40" r="2.5" fill="white" opacity="0.8" />
          <circle cx="30" cy="35" r="2" fill="white" opacity="0.7" />
          
          {/* Central consolidation hub */}
          <circle cx="50" cy="50" r="8" fill="white" opacity="0.95" />
          <circle cx="50" cy="50" r="5" fill="url(#centerGradient)" />
          
          {/* Destination nodes */}
          <circle cx="80" cy="25" r="3" fill="white" opacity="0.9" />
          <circle cx="85" cy="40" r="2.5" fill="white" opacity="0.8" />
          <circle cx="75" cy="35" r="2" fill="white" opacity="0.7" />
          
          {/* Distribution nodes */}
          <circle cx="70" cy="70" r="2.5" fill="white" opacity="0.8" />
          <circle cx="85" cy="75" r="2" fill="white" opacity="0.7" />
          <circle cx="60" cy="80" r="2" fill="white" opacity="0.7" />
        </g>
        
        {/* Elegant connection lines representing supply chain flow */}
        <g className="connection-lines" stroke="white" strokeWidth="1.5" opacity="0.6">
          {/* Inbound connections to hub */}
          <path d="M20 25 Q35 35 42 50" fill="none" strokeLinecap="round" />
          <path d="M35 15 Q42 30 42 50" fill="none" strokeLinecap="round" />
          <path d="M15 40 Q30 45 42 50" fill="none" strokeLinecap="round" />
          <path d="M30 35 Q40 42 42 50" fill="none" strokeLinecap="round" />
          
          {/* Outbound connections from hub */}
          <path d="M58 50 Q65 35 80 25" fill="none" strokeLinecap="round" />
          <path d="M58 50 Q70 45 85 40" fill="none" strokeLinecap="round" />
          <path d="M58 50 Q65 60 70 70" fill="none" strokeLinecap="round" />
          <path d="M58 50 Q70 65 85 75" fill="none" strokeLinecap="round" />
        </g>
        
        {/* Central "Link" symbol - elegant chain link design */}
        <g transform="translate(50, 50)" className="link-symbol">
          {/* First link */}
          <ellipse cx="-3" cy="0" rx="4" ry="2.5" fill="none" stroke="white" strokeWidth="1.2" opacity="0.9" />
          {/* Second link interlocked */}
          <ellipse cx="3" cy="0" rx="4" ry="2.5" fill="none" stroke="white" strokeWidth="1.2" opacity="0.9" />
          
          {/* Subtle connecting elements */}
          <circle cx="0" cy="0" r="1" fill="white" opacity="0.8" />
        </g>
        
        {/* Animated flow indicators */}
        <g className="animate-pulse" opacity="0.4">
          {/* Flow direction indicators */}
          <circle cx="30" cy="30" r="0.8" fill="white">
            <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="70" cy="30" r="0.8" fill="white">
            <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2s" repeatCount="indefinite" begin="0.5s" />
          </circle>
          <circle cx="70" cy="70" r="0.8" fill="white">
            <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2s" repeatCount="indefinite" begin="1s" />
          </circle>
        </g>
        
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E40AF" />
            <stop offset="50%" stopColor="#059669" />
            <stop offset="100%" stopColor="#0D9488" />
          </linearGradient>
          <linearGradient id="centerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#10B981" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default IstLinkLogo;