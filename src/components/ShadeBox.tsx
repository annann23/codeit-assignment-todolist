import React from 'react';
import './ShadeBox.scss';

interface ShadeBoxProps {
  color?: string;
  backgroundColor?: string;
  height?: string;
  children: React.ReactNode;
  class?: string;
  onClick?: () => void;
}

function ShadeBox({ // 공통적으로 쓰이는 그림자 버튼 컴포넌트. props로 배경색, 글자색, 높이 등 변경 가능 
  color = "#000",
  backgroundColor = "#F1F5F9",
  height = "56px",
  children,
  class: className,
  onClick
}: ShadeBoxProps) {
  return (
    <div 
      className={`shade-box ${className}`} 
      style={{color: color, background: backgroundColor, height: height}}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

export default ShadeBox;
