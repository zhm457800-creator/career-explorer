import React, { useState } from 'react';

interface CyberpunkImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackText?: string;
}

export const CyberpunkImage: React.FC<CyberpunkImageProps> = ({ 
  src, 
  alt, 
  className = '', 
  fallbackText = 'IMAGE_PENDING',
  ...props 
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div 
        className={`flex items-center justify-center bg-black/80 border border-[#D8A7B1] ${className}`}
        style={{ minHeight: '100px', minWidth: '100px' }}
      >
        <span className="text-[#D8A7B1] font-mono text-xs tracking-widest uppercase animate-pulse">
          [{fallbackText}]
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setHasError(true)}
      {...props}
    />
  );
};
