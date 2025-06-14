import React from 'react';

interface BundleistLogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showText?: boolean;
}

const BundleistLogo = ({ size = 'md', className = '', showText = true }: BundleistLogoProps) => {
  const sizeClasses = {
    sm: showText ? 'h-7' : 'w-7 h-7',
    md: showText ? 'h-9' : 'w-9 h-9',
    lg: showText ? 'h-12' : 'w-12 h-12'
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* AI Tech-Oriented Logo Icon */}
      <div className={`${sizeClasses[size]} flex-shrink-0`}>
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* AI Tech-Oriented Logo Design */}
          <g>
            {/* Modern hexagonal outer frame */}
            <path
              d="M 50 8 L 78 25 L 78 59 L 50 76 L 22 59 L 22 25 Z"
              fill="url(#techGradient)"
              stroke="url(#borderGradient)"
              strokeWidth="1.5"
              className="drop-shadow-lg"
            />
            
            {/* Central AI brain/chip design */}
            <g transform="translate(50, 50)">
              {/* Core processor */}
              <rect 
                x="-12" 
                y="-12" 
                width="24" 
                height="24" 
                rx="3"
                fill="url(#coreGradient)"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="1"
              />
              
              {/* Circuit connections */}
              <g opacity="0.9">
                {/* Horizontal circuits */}
                <rect x="-18" y="-2" width="6" height="4" rx="2" fill="url(#circuitGradient)" />
                <rect x="12" y="-2" width="6" height="4" rx="2" fill="url(#circuitGradient)" />
                <rect x="-18" y="6" width="6" height="4" rx="2" fill="url(#circuitGradient)" />
                <rect x="12" y="6" width="6" height="4" rx="2" fill="url(#circuitGradient)" />
                
                {/* Vertical circuits */}
                <rect x="-2" y="-18" width="4" height="6" rx="2" fill="url(#circuitGradient)" />
                <rect x="-2" y="12" width="4" height="6" rx="2" fill="url(#circuitGradient)" />
                <rect x="6" y="-18" width="4" height="6" rx="2" fill="url(#circuitGradient)" />
                <rect x="6" y="12" width="4" height="6" rx="2" fill="url(#circuitGradient)" />
              </g>
              
              {/* Data flow lines */}
              <g stroke="url(#dataFlowGradient)" strokeWidth="2" fill="none" opacity="0.7">
                <path d="M -12,0 L -18,0" />
                <path d="M 12,0 L 18,0" />
                <path d="M 0,-12 L 0,-18" />
                <path d="M 0,12 L 0,18" />
                <path d="M -12,8 L -18,8" />
                <path d="M 12,8 L 18,8" />
                <path d="M 8,-12 L 8,-18" />
                <path d="M 8,12 L 8,18" />
              </g>
              
              {/* AI neural nodes */}
              <circle cx="-8" cy="-8" r="2" fill="url(#nodeGradient)" className="drop-shadow-sm" />
              <circle cx="8" cy="-8" r="2" fill="url(#nodeGradient)" className="drop-shadow-sm" />
              <circle cx="-8" cy="8" r="2" fill="url(#nodeGradient)" className="drop-shadow-sm" />
              <circle cx="8" cy="8" r="2" fill="url(#nodeGradient)" className="drop-shadow-sm" />
              
              {/* Central processing indicator */}
              <circle cx="0" cy="0" r="3" fill="url(#processingGradient)" opacity="0.8" />
            </g>
          </g>
          
          <defs>
            {/* Tech-oriented gradients */}
            <linearGradient id="techGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e40af" />
              <stop offset="30%" stopColor="#3b82f6" />
              <stop offset="70%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#0891b2" />
            </linearGradient>
            
            {/* Border gradient */}
            <linearGradient id="borderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0ea5e9" />
              <stop offset="50%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#1d4ed8" />
            </linearGradient>
            
            {/* Core processor gradient */}
            <linearGradient id="coreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1f2937" />
              <stop offset="50%" stopColor="#374151" />
              <stop offset="100%" stopColor="#4b5563" />
            </linearGradient>
            
            {/* Circuit gradient */}
            <linearGradient id="circuitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
            
            {/* Data flow gradient */}
            <linearGradient id="dataFlowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#60a5fa" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
            
            {/* Node gradient */}
            <radialGradient id="nodeGradient" cx="50%" cy="50%" r="70%">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="50%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#d97706" />
            </radialGradient>
            
            {/* Processing indicator gradient */}
            <radialGradient id="processingGradient" cx="50%" cy="50%" r="70%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="50%" stopColor="#e0f2fe" />
              <stop offset="100%" stopColor="#0ea5e9" />
            </radialGradient>
          </defs>
        </svg>
      </div>
      
      {/* AI Tech Bundleist Text */}
      {showText && (
        <span 
          className={`font-bold bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700 bg-clip-text text-transparent ${textSizes[size]} tracking-wider uppercase`}
          style={{ fontFamily: 'Inter, system-ui, sans-serif', letterSpacing: '0.15em' }}
        >
          Bundleist
        </span>
      )}
    </div>
  );
};

export default BundleistLogo;