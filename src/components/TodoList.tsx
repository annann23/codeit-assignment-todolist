'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import './TodoList.scss';
import Image from 'next/image'
import todoIcon from '../assets/todo.svg';
import doneIcon from '../assets/done.svg';
import emptyTodo from '../assets/empty_todo_large.svg';
import emptyDone from '../assets/empty_done_large.svg';
import checkboxIcon from '../assets/checkbox.svg';
import checkboxActiveIcon from '../assets/checkbox-active.svg';
import { Item } from './MainPage';

interface TodoListProps {
  items: Item[];
  onItemStatusChange: (itemId: string, newStatus: boolean) => void;
}

function TodoList({ items, onItemStatusChange }: TodoListProps) {
  const router = useRouter();

  const handleItemClick = (itemId: string) => {
    router.push(`/items/${itemId}`);
  };

  const handleCheckboxClick = (e: React.MouseEvent, itemId: string, currentStatus: boolean) => {
    e.stopPropagation();
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
              <div 
                key={item.id} 
                className="item-card todo"
                onClick={() => handleItemClick(item.id)}
              >
                <div className="item-content">
                  <div 
                    className="checkbox-wrapper"
                    onClick={(e) => handleCheckboxClick(e, item.id, item.isCompleted)}
                  >
                    <Image 
                      src={checkboxIcon} 
                      alt='check' 
                      className='checkbox-icon'
                      width={20}
                      height={20}
                    />
                  </div>
                  <div className="item-title">{item.name}</div>
                </div>
              </div>
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
              <div 
                key={item.id} 
                className="item-card done"
                onClick={() => handleItemClick(item.id)}
              >
                <div className="item-content">
                  <div 
                    className="checkbox-wrapper active"
                    onClick={(e) => handleCheckboxClick(e, item.id, item.isCompleted)}
                  >
                    <Image 
                      src={checkboxActiveIcon} 
                      alt='check-active' 
                      className='checkbox-icon'
                      width={20}
                      height={20}
                    />
                  </div>
                  <div className="item-title">{item.name}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default TodoList;
