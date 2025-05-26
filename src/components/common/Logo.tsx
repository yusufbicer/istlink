
import { Link } from 'react-router-dom';
import { Zap } from 'lucide-react';
import { BRAND } from '@/config/brand';

interface LogoProps {
  className?: string;
  showTagline?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const Logo = ({ className = '', showTagline = true, size = 'md' }: LogoProps) => {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10', 
    lg: 'h-12 w-12'
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  const taglineSizeClasses = {
    sm: 'text-xs',
    md: 'text-xs',
    lg: 'text-sm'
  };

  return (
    <Link to="/" className={`inline-flex items-center ${className}`}>
      <div className={`flex items-center justify-center ${sizeClasses[size]} rounded-lg bg-gradient-to-r ${BRAND.colors.gradient} relative overflow-hidden`}>
        <Zap className={`${size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-6 h-6' : 'w-5 h-5'} text-white absolute`} />
      </div>
      <div className="ml-3">
        <span className={`font-bold ${textSizeClasses[size]} text-gray-900`}>
          {BRAND.name}
        </span>
        {showTagline && (
          <span className={`block ${taglineSizeClasses[size]} text-${BRAND.colors.primary} font-medium tracking-wide uppercase`}>
            {BRAND.tagline}
          </span>
        )}
      </div>
    </Link>
  );
};

export default Logo;
