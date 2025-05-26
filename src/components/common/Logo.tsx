
import { Link } from 'react-router-dom';
import { Package, Layers3 } from 'lucide-react';
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
      <div className={`flex items-center justify-center ${sizeClasses[size]} rounded-xl bg-gradient-to-br ${BRAND.colors.gradient} relative overflow-hidden shadow-lg`}>
        <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent"></div>
        <Layers3 className={`${size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-6 h-6' : 'w-5 h-5'} text-white relative z-10`} />
      </div>
      <div className="ml-3">
        <span className={`font-bold ${textSizeClasses[size]} text-gray-900`}>
          {BRAND.name}
        </span>
        {showTagline && (
          <div className={`${taglineSizeClasses[size]} text-${BRAND.colors.primary} font-medium`}>
            {BRAND.tagline}
          </div>
        )}
      </div>
    </Link>
  );
};

export default Logo;
