
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
        src="/lovable-uploads/590a1b07-9b6c-4c24-84aa-e856b8d764c5.png"
        alt="IstLinq - Smart Export Consolidation Services"
        className={`${sizeClasses[size]} w-auto object-contain`}
      />
    </div>
  );
};

export default IstLinqLogo;
