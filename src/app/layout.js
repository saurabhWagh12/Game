import { Inter } from 'next/font/google'
import './globals.css'
import ContextProvider from './Context/ContextProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Fun-Games',
  description: 'Created to play fun games and earn rewards',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ContextProvider>
      <body className={inter.className}>{children}</body>
      </ContextProvider>
    </html>
  )
}
