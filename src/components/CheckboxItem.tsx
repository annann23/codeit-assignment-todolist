import React from 'react';
import Image from 'next/image';
import checkboxIcon from '@/assets/checkbox.svg';
import checkboxActiveIcon from '@/assets/checkbox-active.svg';
import './CheckboxItem.scss';

interface CheckListProps {
  isLarge?: boolean;
  isActive?: boolean;
  className?: string;
  text: string;
  onClickCheckbox?: (e: React.MouseEvent) => void;
  onClickItem?: (e: React.MouseEvent) => void;
}

function CheckList({ // 공통적으로 쓰이는 체크박스 포함된 컴포넌트. Large, small과 active 선택에 따라 스타일 달라짐.
  isLarge = false,
  isActive = false,
  text = '',
  className,
  onClickCheckbox,
  onClickItem
}: CheckListProps) {

  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClickCheckbox?.(e);
  };

  return (
    <div 
      className={`check-list ${className} ${isLarge ? 'large' : 'small'} ${isActive ? 'active' : ''}`} 
      onClick={onClickItem}
    >
      <Image 
        src={isActive ? checkboxActiveIcon : checkboxIcon} 
        alt='check' 
        className='checkbox-icon'
        width={isLarge ? 32 : 20}
        height={isLarge ? 32 : 20}
        onClick={handleCheckboxClick}
        />
      <div className="item-title">{text}</div>
    </div>
  );
}

export default CheckList;
