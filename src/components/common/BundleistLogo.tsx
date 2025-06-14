import React from 'react';

interface BundleistLogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showText?: boolean;
}

const BundleistLogo = ({ size = 'md', className = '', showText = true }: BundleistLogoProps) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {/* Geometric B Logo - Two separate blocks forming B */}
      <div className={`${sizeClasses[size]} relative`}>
        <svg 
          width="100%" 
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          viewBox="0 0 512 512"
        >
          <defs />
          <path d="M 348,345 L 348,349 L 355,349 L 356,350 L 356,370 L 360,370 L 360,350 L 361,349 L 368,349 L 368,345 Z" fill="black" />
          <path d="M 330,345 L 329,346 L 328,346 L 326,348 L 326,349 L 325,350 L 325,354 L 326,355 L 326,356 L 328,358 L 330,358 L 331,359 L 333,359 L 334,360 L 336,360 L 339,363 L 339,365 L 338,366 L 337,366 L 336,367 L 331,367 L 330,366 L 329,366 L 327,364 L 325,364 L 325,365 L 324,366 L 324,367 L 326,369 L 328,369 L 329,370 L 332,370 L 333,371 L 336,371 L 337,370 L 339,370 L 343,366 L 343,361 L 342,360 L 342,359 L 341,359 L 339,357 L 337,357 L 336,356 L 334,356 L 333,355 L 331,355 L 329,353 L 329,351 L 331,349 L 332,349 L 333,348 L 334,348 L 335,349 L 338,349 L 339,350 L 340,350 L 341,351 L 341,350 L 342,349 L 342,347 L 341,347 L 340,346 L 339,346 L 338,345 Z" fill="black" />
          <path d="M 312,345 L 312,370 L 316,370 L 316,345 Z" fill="black" />
          <path d="M 285,345 L 285,370 L 304,370 L 304,367 L 290,367 L 289,366 L 289,360 L 290,359 L 302,359 L 302,356 L 290,356 L 289,355 L 289,350 L 290,349 L 303,349 L 303,345 Z" fill="black" />
          <path d="M 262,345 L 262,370 L 278,370 L 278,367 L 266,367 L 265,366 L 266,365 L 266,346 L 265,345 Z" fill="black" />
          <path d="M 231,345 L 231,370 L 245,370 L 246,369 L 247,369 L 248,368 L 249,368 L 252,365 L 252,364 L 253,363 L 253,361 L 254,360 L 254,355 L 253,354 L 253,352 L 248,347 L 247,347 L 246,346 L 244,346 L 243,345 Z" fill="black" />
          <path d="M 200,345 L 200,370 L 204,370 L 204,355 L 205,354 L 208,357 L 208,358 L 212,362 L 212,363 L 215,366 L 215,367 L 218,370 L 221,370 L 221,345 L 218,345 L 218,361 L 217,362 L 213,358 L 213,357 L 210,354 L 210,353 L 206,349 L 206,348 L 203,345 Z" fill="black" />
          <path d="M 170,345 L 169,346 L 169,360 L 170,361 L 170,364 L 171,365 L 171,366 L 175,370 L 178,370 L 179,371 L 182,371 L 183,370 L 185,370 L 187,368 L 188,368 L 188,367 L 190,365 L 190,363 L 191,362 L 191,345 L 187,345 L 187,362 L 186,363 L 186,364 L 184,366 L 183,366 L 182,367 L 178,367 L 177,366 L 176,366 L 175,365 L 175,364 L 174,363 L 174,361 L 173,360 L 173,345 Z" fill="black" />
          <path d="M 142,345 L 141,346 L 141,370 L 158,370 L 159,369 L 160,369 L 161,368 L 161,367 L 162,366 L 162,361 L 161,360 L 161,359 L 160,358 L 159,358 L 158,357 L 160,355 L 160,354 L 161,353 L 161,350 L 160,349 L 160,348 L 158,346 L 156,346 L 155,345 Z" fill="black" />
          <path d="M 188,140 L 187,141 L 187,317 L 275,317 L 275,316 L 288,303 L 289,303 L 289,302 L 325,266 L 265,206 L 263,206 L 258,211 L 232,211 L 232,246 L 258,246 L 271,259 L 271,260 L 277,266 L 277,267 L 262,282 L 223,282 L 222,281 L 222,177 L 223,176 L 262,176 L 277,191 L 277,192 L 271,198 L 294,221 L 324,191 L 324,190 L 274,140 Z" fill="black" />
        </svg>
      </div>
      
      {/* Bundleist Text */}
      {showText && (
        <div 
          className={`text-gray-800 dark:text-gray-200 ${textSizes[size]} tracking-widest uppercase font-precision`}
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