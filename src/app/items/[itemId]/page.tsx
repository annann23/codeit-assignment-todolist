'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import './ItemDetailPage.scss';
import { colors } from '@/styles/colors';
import PlusIcon from '@/components/icons/PlusIcon';
import Image from 'next/image';
import { Item } from '@/utill/types';
import imageIcon from '@/assets/img_icon.svg';
import CheckboxItem from '@/components/CheckboxItem';
import ShadeBox from '@/components/ShadeBox';
import checkIcon from '@/assets/check.svg';
import editIcon from '@/assets/edit.svg';
import LoadingPage from '@/components/LoadingPage';

export default function ItemDetailPage() { //상세 페이지 영역
  const params = useParams();
  const router = useRouter();
  const itemId = params.itemId as string;
  const [item, setItem] = useState<Item | null>(null); //item 로컬 수정 데이터 저장
  const [originalItem, setOriginalItem] = useState<Item | null>(null); // 변경 감시용 데이터, fetch response로 가져온 item 데이터만 저장
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  async function getItemDetail() { //item detail 데이터 가져오기
    try{
      setIsLoading(true);
      const response = await fetch(`https://assignment-todolist-api.vercel.app/api/annann5026/items/${itemId}`);
      const data = await response.json();
      setItem(data);
      setOriginalItem(data);
    }catch(error){
      console.error('Error fetching item detail:', error);
      alert('요청하신 페이지를 찾을 수 없습니다. 다시 시도해주세요.');
      router.push('/');
    } finally {
      setIsLoading(false);
    }
  }


  const hasChanges = () => {  // orininalItem과 item을 비교해서 수정사항이 있는지 확인하는 함수
    if (!originalItem || !item) return false;
    
    return (
      originalItem.imageUrl !== item.imageUrl ||
      originalItem.isCompleted !== item.isCompleted ||
      originalItem.memo !== item.memo
    );
  };

  const handleMemoChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => { //메모 수정 함수
    if (item) {
      setItem({
        ...item,
        memo: e.target.value
      });
    }
  };

  const handleStatusChange = (newStatus: boolean) => { //isCompleted 변경 함수
    if (item) {
      setItem({
        ...item,
        isCompleted: newStatus
      });
    }
  };

  const imageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => { //이미지 업로드 함수
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('파일 크기는 5MB 이하여야 합니다.');
      return;
    }

    if (!file.type.startsWith('image/')) {
      alert('이미지 파일만 업로드 가능합니다.');
      return;
    }
  
    if (!/^[a-zA-Z]+\.(png|jpg|jpeg|gif|webp)$/i.test(file.name)) {
      alert('이미지 파일명은 영문만 허용되며, 지원되는 이미지 확장자(.png, .jpg, .jpeg, .gif, .webp)가 필요합니다.');
      return;
    }

    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch(`https://assignment-todolist-api.vercel.app/api/annann5026/images/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      setItem(prevItem => prevItem ? { ...prevItem, imageUrl: data.url } : null);      
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('이미지 업로드에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  const clickImageAddButton = () => { //이미지 업로드 버튼 클릭 시 input 실행
    fileInputRef.current?.click();
  };

  async function deleteItem() {
    try{
      setIsLoading(true);
      await fetch(`https://assignment-todolist-api.vercel.app/api/annann5026/items/${itemId}`, {
        method: 'DELETE',
      });

      router.push('/');
    }catch(error){
      console.error('Error deleting item:', error);
      alert('TODO 삭제에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  }

  async function patchItem() {
    if(!item || !hasChanges())return;

    try{
      setIsLoading(true);
      const updateData = {
        memo: item.memo || "",
        imageUrl: item.imageUrl || "",
        isCompleted: Boolean(item.isCompleted)
      };

      let response = await fetch(`https://assignment-todolist-api.vercel.app/api/annann5026/items/${itemId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      if(!response.ok){
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      let data = await response.json();
      setOriginalItem(data);
      
      alert('수정이 완료되었습니다!');
      router.push('/');
    }catch(error){
      console.error('Error updating item:', error);
      alert('수정에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    setIsLoading(true); // 컴포넌트 마운트 시 즉시 로딩 상태 설정
    getItemDetail();
  }, []);

  return (
    <div>
      <LoadingPage isLoading={isLoading} />
      {item && (  
      <div className="item-detail-page">
        <div className="container">    
          <div className='item-content-wrapper'>
            <CheckboxItem //todo 이름
              text={item?.name}
              className='item-detail-name'
              isLarge={true}
              isActive={item?.isCompleted}
              onClickItem={() => {}}
              onClickCheckbox={(e: React.MouseEvent) => handleStatusChange(!item.isCompleted)}
            />
            <div className='content-top'>  
              <div className='item-image'> {/* 이미지 영역 */}
                {item?.imageUrl ? (
                  <div className='item-image-box' style={{backgroundImage: `url(${item.imageUrl})`}}>
                    <div className='edit-button'><Image src={editIcon} alt='edit-icon' width={24} height={24} /></div>
                  </div>
                ) : (
                  <div className='image-empty-box'>
                    <Image src={imageIcon} alt='image-icon' width={64} height={64}/>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={imageUpload}
                      style={{ display: 'none' }}
                    />
                    <button 
                      className='image-add-button'
                      onClick={clickImageAddButton}
                      type="button"
                    >
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
              <div className='item-memo'> {/* 메모 영역 */}
                <span className='item-memo-title'>Memo</span>
                <textarea 
                  className='item-memo-input' 
                  value={item?.memo || ''}
                  onChange={handleMemoChange}
                />  
              </div> 
            </div>
            <div className="button-wrapper">
              {/* 수정 완료 버튼 */}
              <ShadeBox class={`edit-button button ${hasChanges() ? 'active' : ''}`} onClick={patchItem}>
                <Image src={checkIcon} alt='check-icon' width={16} height={16}/>
                <span className='button-text'>수정 완료</span>
              </ShadeBox>

              {/* 삭제 버튼 */}
              <ShadeBox class='button delete-button' onClick={deleteItem}>
                <PlusIcon className='delete-icon' width={16} height={16} strokeColor={colors.white}/>
                <span className='button-text'>삭제하기</span>
              </ShadeBox>
            </div>
          </div>
        </div>
      </div>
      )}
    </div>
  );
}
