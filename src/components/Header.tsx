'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import logo from '../assets/logo.svg';
import './Header.scss';

export default function Header() {
  const router = useRouter();

  const handleLogoClick = () => {
    router.push('/');
  };

  return (
    <header className="gnb">
      <div className='container'>
        <Image 
          src={logo.src} 
          className="App-logo" 
          alt="logo" 
          width={151} 
          height={40}
          onClick={handleLogoClick}
          style={{ cursor: 'pointer' }}
        />
      </div>
    </header>
  );
}
