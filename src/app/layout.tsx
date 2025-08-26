import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import './App.scss'
import Header from '../components/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Codeit TodoList',
  description: 'A simple todo list application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <div className="App">
          <Header />
          {children}
        </div>
      </body>
    </html>
  )
}
