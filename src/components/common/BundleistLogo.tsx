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
        {/* Main circular background with gradient */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="url(#gradient)"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="1"
        />
        
        {/* Multiple parcels being bundled together */}
        <g className="parcels-group">
          {/* Individual parcels/boxes in different sizes and positions */}
          
          {/* Left side parcels (before bundling) */}
          <g className="left-parcels" opacity="0.9">
            {/* Parcel 1 */}
            <rect x="18" y="20" width="8" height="6" rx="1" fill="white" opacity="0.9" />
            <rect x="19" y="21" width="6" height="4" rx="0.5" fill="none" stroke="rgba(220,38,38,0.6)" strokeWidth="0.5" />
            
            {/* Parcel 2 */}
            <rect x="12" y="30" width="10" height="8" rx="1" fill="white" opacity="0.85" />
            <rect x="13" y="31" width="8" height="6" rx="0.5" fill="none" stroke="rgba(220,38,38,0.6)" strokeWidth="0.5" />
            
            {/* Parcel 3 */}
            <rect x="20" y="42" width="6" height="10" rx="1" fill="white" opacity="0.8" />
            <rect x="21" y="43" width="4" height="8" rx="0.5" fill="none" stroke="rgba(220,38,38,0.6)" strokeWidth="0.5" />
            
            {/* Parcel 4 */}
            <rect x="15" y="55" width="12" height="7" rx="1" fill="white" opacity="0.75" />
            <rect x="16" y="56" width="10" height="5" rx="0.5" fill="none" stroke="rgba(220,38,38,0.6)" strokeWidth="0.5" />
          </g>
          
          {/* Central bundled container (consolidation) */}
          <g className="central-bundle">
            {/* Main bundle container */}
            <rect x="42" y="35" width="16" height="30" rx="2" fill="white" opacity="0.95" stroke="url(#bundleStroke)" strokeWidth="2" />
            
            {/* Bundle straps/ties */}
            <rect x="40" y="42" width="20" height="2" rx="1" fill="url(#strapGradient)" opacity="0.8" />
            <rect x="40" y="52" width="20" height="2" rx="1" fill="url(#strapGradient)" opacity="0.8" />
            <rect x="40" y="58" width="20" height="2" rx="1" fill="url(#strapGradient)" opacity="0.8" />
            
            {/* Bundle label/tag */}
            <rect x="45" y="38" width="10" height="4" rx="0.5" fill="url(#labelGradient)" />
            <circle cx="48" cy="40" r="0.5" fill="white" opacity="0.9" />
            <circle cx="52" cy="40" r="0.5" fill="white" opacity="0.9" />
          </g>
          
          {/* Right side parcels (after bundling/shipping) */}
          <g className="right-parcels" opacity="0.85">
            {/* Destination parcel 1 */}
            <rect x="72" y="25" width="9" height="7" rx="1" fill="white" opacity="0.9" />
            <rect x="73" y="26" width="7" height="5" rx="0.5" fill="none" stroke="rgba(124,58,237,0.6)" strokeWidth="0.5" />
            
            {/* Destination parcel 2 */}
            <rect x="75" y="35" width="7" height="9" rx="1" fill="white" opacity="0.85" />
            <rect x="76" y="36" width="5" height="7" rx="0.5" fill="none" stroke="rgba(124,58,237,0.6)" strokeWidth="0.5" />
            
            {/* Destination parcel 3 */}
            <rect x="70" y="50" width="11" height="8" rx="1" fill="white" opacity="0.8" />
            <rect x="71" y="51" width="9" height="6" rx="0.5" fill="none" stroke="rgba(124,58,237,0.6)" strokeWidth="0.5" />
          </g>
        </g>
        
        {/* Flow arrows showing consolidation process */}
        <g className="flow-arrows" stroke="white" strokeWidth="1.5" opacity="0.7" fill="none">
          {/* Arrows from left parcels to center */}
          <path d="M28 25 Q35 30 40 40" strokeLinecap="round" markerEnd="url(#arrowhead)" />
          <path d="M25 35 Q32 40 40 45" strokeLinecap="round" markerEnd="url(#arrowhead)" />
          <path d="M28 50 Q35 50 40 50" strokeLinecap="round" markerEnd="url(#arrowhead)" />
          <path d="M28 60 Q35 55 40 55" strokeLinecap="round" markerEnd="url(#arrowhead)" />
          
          {/* Arrow from center to right */}
          <path d="M60 50 Q65 45 70 40" strokeLinecap="round" markerEnd="url(#arrowhead)" />
        </g>
        
        {/* Animated consolidation effect */}
        <g className="consolidation-pulse" opacity="0.3">
          <circle cx="50" cy="50" r="20" fill="none" stroke="white" strokeWidth="1">
            <animate attributeName="r" values="18;22;18" dur="3s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.3;0.1;0.3" dur="3s" repeatCount="indefinite" />
          </circle>
        </g>
        
        <defs>
          {/* Main background gradient */}
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#DC2626" />
            <stop offset="50%" stopColor="#EA580C" />
            <stop offset="100%" stopColor="#7C3AED" />
          </linearGradient>
          
          {/* Bundle container stroke */}
          <linearGradient id="bundleStroke" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EF4444" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
          
          {/* Bundle straps gradient */}
          <linearGradient id="strapGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#EF4444" />
          </linearGradient>
          
          {/* Label gradient */}
          <linearGradient id="labelGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
          
          {/* Arrow marker */}
          <marker id="arrowhead" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
            <polygon points="0 0, 6 2, 0 4" fill="white" opacity="0.8" />
          </marker>
        </defs>
      </svg>
    </div>
  );
};

export default BundleistLogo;