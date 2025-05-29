
import React from 'react';

interface IstLinqLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const IstLinqLogo = ({ className = '', size = 'md' }: IstLinqLogoProps) => {
  const sizeClasses = {
    sm: 'h-8',
    md: 'h-10',
    lg: 'h-12',
    xl: 'h-16'
  };

  return (
    <div className={`${className}`}>
      <img
        src="/lovable-uploads/c80585ad-0491-4879-a726-17aed489f919.png"
        alt="IstLinq - Smart Export Consolidation Services"
        className={`${sizeClasses[size]} w-auto object-contain`}
      />
    </div>
  );
};

export default IstLinqLogo;
