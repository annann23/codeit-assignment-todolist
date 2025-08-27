'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import './ItemDetailPage.scss';
import { colors } from '@/styles/colors';
import PlusIcon from '@/components/icons/PlusIcon';
import Image from 'next/image';
import { Item } from '@/utill/types';
import imageIcon from '@/assets/img_icon.svg';
import CheckboxItem from '@/components/CheckboxItem';

export default function ItemDetailPage() {
  const params = useParams();
  const router = useRouter();
  const itemId = params.itemId as string;
  const [item, setItem] = useState<Item | null>(null);
  
  async function getItemDetail() {
    try{
      const response = await fetch(`https://assignment-todolist-api.vercel.app/api/annann5026/items/${itemId}`);
      const data = await response.json();
      setItem(data);
    }catch(error){
      console.error('Error fetching item detail:', error);
      alert('요청하신 TODO를 찾을 수 없습니다. 다시 시도해주세요.');
      router.push('/');
    }
  }

  async function deleteItem() {
    try{
      await fetch(`https://assignment-todolist-api.vercel.app/api/annann5026/items/${itemId}`, {
        method: 'DELETE',
      });
      router.push('/');
    }catch(error){
      console.error('Error deleting item:', error);
      alert('TODO 삭제에 실패했습니다. 다시 시도해주세요.');
    }
  }

  async function patchItem() {
    try{
      await fetch(`https://assignment-todolist-api.vercel.app/api/annann5026/items/${itemId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({name: item?.name, memo: item?.memo, imageUrl: item?.imageUrl, isCompleted: item?.isCompleted}),
      });
      router.push('/');
    }catch(error){
      console.error('Error deleting item:', error);
      alert('수정에 실패했습니다. 다시 시도해주세요.');
    }
  }

  useEffect(() => {
    getItemDetail();
  }, []);

  if (!item) return null;
  return (
    <div className="item-detail-page">
      <div className="container">    
        <CheckboxItem
          text={item?.name}
          className='item-detail-name'
          isLarge={true}
          isActive={item?.isCompleted}
          onClickItem={() => {}}
          onClickCheckbox={() => {}}
        />
        <div className='item-content-wrapper'>  
          <div className='item-image'>
            {item?.imageUrl ? (
              <img src={item.imageUrl} alt='item-image' width={100} height={100}/> 
            ) : (
              <div className='image-empty-box'>
                <Image src={imageIcon} alt='image-icon' width={64} height={64}/>
                <button className='image-add-button'>
                <PlusIcon 
                  width={18} 
                  height={18} 
                  strokeColor={colors.gray500}
                  className='plus-icon'
                />
                </button>
              </div>
            )}
          </div>
          <div className='item-memo'>
            <span className='item-memo-title'>Memo</span>
            <textarea className='item-memo-input' value={item?.memo}/>  
          </div> 
        </div>  
      </div>
    </div>
  );
}
