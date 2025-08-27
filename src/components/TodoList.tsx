'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image'

import CheckboxItem from './CheckboxItem';
import { Item } from '@/utill/types';
import './TodoList.scss';


import todoIcon from '../assets/todo.svg';
import doneIcon from '../assets/done.svg';
import emptyTodo from '../assets/empty_todo_large.svg';
import emptyDone from '../assets/empty_done_large.svg';

interface TodoListProps {
  items: Item[];
  onItemStatusChange: (itemId: string, newStatus: boolean) => void;
}

function TodoList({ items, onItemStatusChange }: TodoListProps) {
  const router = useRouter();

  const handleItemClick = (itemId: string) => {
    router.push(`/items/${itemId}`);
  };

  const handleCheckboxClick = (itemId: string, currentStatus: boolean) => {
    const newStatus = !currentStatus;
    onItemStatusChange(itemId, newStatus);
  };

  return (
    <div className="todo-list">        
      <div className="todo-section">
        <Image src={todoIcon} alt='todo' className='todo-icon' width={101} height={36}/>
        
        {items.filter(item => !item.isCompleted).length === 0 ? (
          <div className="empty-state">
            <Image src={emptyTodo} alt='todo' className='empty-todo-image' width={240} height={240}/>
            <p>할 일이 없어요.<br/>TODO를 새롭게 추가해주세요!</p>
          </div>
        ) : (
          <div className="items-list">
            {items.filter(item => !item.isCompleted).map((item) => (
              <CheckboxItem 
                key={item.id} 
                className="item"
                text={item.name}
                isLarge={false}
                isActive={false}
                onClickItem={() => handleItemClick(item.id)}
                onClickCheckbox={(e) => handleCheckboxClick(item.id, item.isCompleted)}
              />
            ))}
          </div>
        )}
      </div>
      
      <div className="done-section">
        <Image src={doneIcon} alt='done' className='done-icon' width={101} height={36}/>
        
        {items.filter(item => item.isCompleted).length === 0 ? (
          <div className="empty-state">
            <Image src={emptyDone} alt='done' className='empty-done-image' width={240} height={240}/>
            <p>아직 다 한 일이 없어요.<br/>해야 할 일을 체크해보세요!</p>
          </div>
        ) : (
          <div className="items-list">
            {items.filter(item => item.isCompleted).map((item) => (
              <CheckboxItem 
                key={item.id}
                className="item"
                text={item.name}
                isLarge={false}
                isActive={true}
                onClickItem={() => handleItemClick(item.id)}
                onClickCheckbox={(e) => handleCheckboxClick(item.id, item.isCompleted)}
              />  
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default TodoList;
