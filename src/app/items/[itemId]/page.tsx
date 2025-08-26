'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import './ItemDetailPage.scss';
import { Item } from '@/utill/types';

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

  return (
    <div className="item-detail-page">
      <div className="container">    
        <div>{item?.memo}</div>   
        <div>{item?.name}</div>
      </div>
    </div>
  );
}
