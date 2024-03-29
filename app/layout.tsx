import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from "./components/Header/Header"
import  ContextProvider  from './components/Log/Logout'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Todo App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ContextProvider>
          <>
          <Header/>
          {children}
          </>
          </ContextProvider>
        </body>
    </html>
  )
}
