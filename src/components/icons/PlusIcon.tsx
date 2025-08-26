import React from 'react';

interface PlusIconProps {
  width?: number;
  height?: number;
  strokeColor?: string;
  className?: string;
}

const PlusIcon: React.FC<PlusIconProps> = ({ 
  width = 16, 
  height = 16, 
  strokeColor = 'currentColor',
  className = ''
}) => {
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path 
        d="M3 12L21 12" 
        stroke={strokeColor} 
        strokeWidth="3" 
        strokeLinecap="round"
      />
      <path 
        d="M12 21L12 3" 
        stroke={strokeColor} 
        strokeWidth="3" 
        strokeLinecap="round"
      />
    </svg>
  );
};

export default PlusIcon;
