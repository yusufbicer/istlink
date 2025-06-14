import React from 'react';

interface BundleistLogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showText?: boolean;
}

const BundleistLogo = ({ size = 'md', className = '', showText = true }: BundleistLogoProps) => {
  const sizeClasses = {
    sm: showText ? 'h-6' : 'w-6 h-6',
    md: showText ? 'h-8' : 'w-8 h-8',
    lg: showText ? 'h-12' : 'w-12 h-12'
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-xl'
  };

  return (
    <div className={`flex items-center ${className}`}>
      {/* Logo Icon */}
      <div className={`${sizeClasses[size]} ${showText ? 'mr-2' : ''}`}>
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Elegant geometric logo with consolidation concept */}
          <g>
            {/* Outer circle with sophisticated gradient */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="url(#mainGradient)"
              stroke="url(#borderGradient)"
              strokeWidth="2"
              className="drop-shadow-lg"
            />
            
            {/* Inner design representing smart consolidation */}
            <g transform="translate(50, 50)">
              {/* Central sophisticated hub */}
              <circle 
                cx="0" 
                cy="0" 
                r="8" 
                fill="url(#centerGradient)" 
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="1"
              />
              
              {/* Elegant connecting paths */}
              <path
                d="M 0,-20 Q -15,-10 0,0 Q 15,-10 0,-20"
                fill="none"
                stroke="url(#pathGradient)"
                strokeWidth="2.5"
                opacity="0.9"
              />
              <path
                d="M 20,0 Q 10,15 0,0 Q 10,-15 20,0"
                fill="none"
                stroke="url(#pathGradient)"
                strokeWidth="2.5"
                opacity="0.9"
              />
              <path
                d="M 0,20 Q 15,10 0,0 Q -15,10 0,20"
                fill="none"
                stroke="url(#pathGradient)"
                strokeWidth="2.5"
                opacity="0.9"
              />
              <path
                d="M -20,0 Q -10,-15 0,0 Q -10,15 -20,0"
                fill="none"
                stroke="url(#pathGradient)"
                strokeWidth="2.5"
                opacity="0.9"
              />
              
              {/* Sophisticated outer nodes */}
              <circle cx="0" cy="-20" r="3" fill="url(#nodeGradient)" className="drop-shadow-sm" />
              <circle cx="20" cy="0" r="3" fill="url(#nodeGradient)" className="drop-shadow-sm" />
              <circle cx="0" cy="20" r="3" fill="url(#nodeGradient)" className="drop-shadow-sm" />
              <circle cx="-20" cy="0" r="3" fill="url(#nodeGradient)" className="drop-shadow-sm" />
              
              {/* Accent dots for elegance */}
              <circle cx="14" cy="-14" r="1.5" fill="url(#accentGradient)" opacity="0.8" />
              <circle cx="14" cy="14" r="1.5" fill="url(#accentGradient)" opacity="0.8" />
              <circle cx="-14" cy="14" r="1.5" fill="url(#accentGradient)" opacity="0.8" />
              <circle cx="-14" cy="-14" r="1.5" fill="url(#accentGradient)" opacity="0.8" />
            </g>
          </g>
          
          <defs>
            {/* Main sophisticated gradient */}
            <linearGradient id="mainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0f766e" />
              <stop offset="30%" stopColor="#0d9488" />
              <stop offset="70%" stopColor="#0ea5e9" />
              <stop offset="100%" stopColor="#2563eb" />
            </linearGradient>
            
            {/* Border gradient */}
            <linearGradient id="borderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="50%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#1d4ed8" />
            </linearGradient>
            
            {/* Center hub gradient */}
            <radialGradient id="centerGradient" cx="50%" cy="50%" r="70%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="50%" stopColor="#f1f5f9" />
              <stop offset="100%" stopColor="#cbd5e1" />
            </radialGradient>
            
            {/* Path gradient */}
            <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="50%" stopColor="#e2e8f0" />
              <stop offset="100%" stopColor="#cbd5e1" />
            </linearGradient>
            
            {/* Node gradient */}
            <radialGradient id="nodeGradient" cx="50%" cy="50%" r="70%">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="50%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#d97706" />
            </radialGradient>
            
            {/* Accent gradient */}
            <radialGradient id="accentGradient" cx="50%" cy="50%" r="70%">
              <stop offset="0%" stopColor="#a78bfa" />
              <stop offset="100%" stopColor="#7c3aed" />
            </radialGradient>
          </defs>
        </svg>
      </div>
      
      {/* Elegant Bundleist Text */}
      {showText && (
        <span 
          className={`font-semibold bg-gradient-to-r from-slate-800 via-blue-900 to-emerald-800 bg-clip-text text-transparent ${textSizes[size]} tracking-wide`}
          style={{ fontFamily: 'Playfair Display, serif' }}
        >
          Bundleist
        </span>
      )}
    </div>
  );
};

export default BundleistLogo;