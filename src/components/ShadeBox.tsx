import React from 'react';
import './ShadeBox.scss';

interface ShadeBoxProps {
  children: React.ReactNode;
  class?: string;
  onClick?: () => void;
}

function ShadeBox({ // 공통적으로 쓰이는 그림자 버튼 컴포넌트
  children,
  class: className,
  onClick
}: ShadeBoxProps) {
  return (
    <div className={`shade-box ${className}`} onClick={onClick}>
      {children}
    </div>
  );
}

export default ShadeBox;
