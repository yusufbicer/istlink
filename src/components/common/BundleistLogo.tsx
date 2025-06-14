import React from 'react';

interface BundleistLogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showText?: boolean;
}

const BundleistLogo = ({ size = 'md', className = '', showText = true }: BundleistLogoProps) => {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-24 h-24',
    lg: 'w-28 h-28'
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-2xl',
    lg: 'text-3xl'
  };

  return (
    <div className={`flex items-center space-x-0 ${className}`}>
      {/* Geometric B Logo */}
      <div className={`${sizeClasses[size]} relative`}>
        <svg 
          width="100%" 
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          viewBox="0 0 512 512"
        >
          <defs />
          {/* Only the geometric B symbol - removing the BUNDLEIST text from SVG */}
          <path d="M 188,140 L 187,141 L 187,317 L 275,317 L 275,316 L 288,303 L 289,303 L 289,302 L 325,266 L 265,206 L 263,206 L 258,211 L 232,211 L 232,246 L 258,246 L 271,259 L 271,260 L 277,266 L 277,267 L 262,282 L 223,282 L 222,281 L 222,177 L 223,176 L 262,176 L 277,191 L 277,192 L 271,198 L 294,221 L 324,191 L 324,190 L 274,140 Z" fill="#1976d2" />
        </svg>
      </div>
      
      {/* Bundleist Text */}
      {showText && (
        <div 
          className={`text-blue-600 ${textSizes[size]} tracking-widest uppercase font-precision`}
          style={{ 
            letterSpacing: '0.12em'
          }}
        >
          <span className="font-light">BUNDLE</span>
          <span className="font-medium">IST</span>
        </div>
      )}
    </div>
  );
};

export default BundleistLogo;