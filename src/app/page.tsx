import logo from '../assets/logo.svg'
import Image from 'next/image'
import MainPage from '../components/MainPage'
import './App.scss'

export default function Home() {
  return (
    <div className="App">
      <header className="gnb">
        <div className='container'>
          <Image src={logo.src} className="App-logo" alt="logo" width={151} height={40} />
        </div>
      </header>
      <MainPage/>
    </div>
  )
}
