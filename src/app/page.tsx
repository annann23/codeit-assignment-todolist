'use client';

import './App.scss';
import React, {useEffect, useState} from 'react';
import ShadeBox from '@/components/ShadeBox';
import PlusIcon from '@/components/icons/PlusIcon';
import TodoList from '@/components/TodoList';
import { colors } from '@/styles/colors';
import { Item } from '@/utill/types';

export default function MainPage() {
  const [newTodo, setNewTodo] = useState('');
  const [items, setItems] = useState<Item[]>([]);

  const getData = async () => {
    try{
      const response = await fetch('https://assignment-todolist-api.vercel.app/api/annann5026/items');
      const data = await response.json();
      setItems(data);
    }catch(error){
      console.error('Error fetching data:', error);
      alert('todo 목록 조회에 실패했습니다. 다시 시도해주세요.');
    }
  }

  const postData = async (name: string) => {
    try{
      const response = await fetch('https://assignment-todolist-api.vercel.app/api/annann5026/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({name: name}),
      });

      const data = await response.json();
      setItems([data, ...items]);
      setNewTodo('');
    }catch(error){
      console.error('Error posting data:', error);
      alert('todo 등록에 실패했습니다. 다시 시도해주세요.');
    }
  }

  const updateTodoStatus = async (itemId: string, isCompleted: boolean) => {
    try {
      const response = await fetch(`https://assignment-todolist-api.vercel.app/api/annann5026/items/${itemId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({isCompleted: isCompleted}),
      });

      const data = await response.json();
      setItems(prevItems => 
        prevItems.map(item => 
          item.id === itemId 
            ? data
            : item
        )
      );      
    } catch (error) {
      console.error('Error updating todo status:', error);
      alert('todo 상태 변경에 실패했습니다. 다시 시도해주세요.');
    }
  }
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      postData(newTodo);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="main-page">
      <div className='container'>
        <div className="input-section">
          <ShadeBox class="search-bar"> {/* 검색창 영역 */}
            <input 
              className='input-text' 
              placeholder='할 일을 입력해주세요'
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </ShadeBox> 
          <ShadeBox //todo 추가 버튼 영역
            class='add-button' 
            backgroundColor={newTodo.trim() ? colors.violet600 : colors.gray200} 
            color={newTodo.trim() ? 'white' : 'black'} 
            onClick={() => postData(newTodo)}
          >
            <PlusIcon 
              width={16} 
              height={16} 
              strokeColor={newTodo.trim() ? 'white' : 'black'} 
              className='plus-icon'
            />
            <span className='button-text'>추가하기</span>
          </ShadeBox>
        </div>
        <TodoList items={items} onItemStatusChange={updateTodoStatus} />
      </div>
    </div>
  );
}

