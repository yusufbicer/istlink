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
        {/* Simple line-based bundling concept */}
        <g className="lines">
          {/* Multiple lines coming together */}
          <path d="M20 30 L45 50" stroke="#10B981" strokeWidth="3" strokeLinecap="round" />
          <path d="M20 45 L45 50" stroke="#10B981" strokeWidth="3" strokeLinecap="round" />
          <path d="M20 60 L45 50" stroke="#10B981" strokeWidth="3" strokeLinecap="round" />
          
          {/* Central convergence point */}
          <circle cx="45" cy="50" r="3" fill="#3B82F6" />
          
          {/* Single output line */}
          <path d="M45 50 L80 50" stroke="#3B82F6" strokeWidth="4" strokeLinecap="round" />
          
          {/* Arrow indicating bundling */}
          <path d="M75 47 L80 50 L75 53" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </g>
      </svg>
    </div>
  );
};

export default BundleistLogo;