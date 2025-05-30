
import React from 'react';

interface IstLinqLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  customHeight?: string;
}

const IstLinqLogo = ({ className = '', size = 'md', customHeight }: IstLinqLogoProps) => {
  const sizeClasses = {
    sm: 'h-12',
    md: 'h-16',
    lg: 'h-20',
    xl: 'h-24'
  };

  const heightClass = customHeight || sizeClasses[size];

  return (
    <div className={`${className}`}>
      <img
        src="/lovable-uploads/c80585ad-0491-4879-a726-17aed489f919.png"
        alt="IstLinq - Smart Export Consolidation Services"
        className={`${heightClass} w-auto object-contain`}
      />
    </div>
  );
};

export default IstLinqLogo;
