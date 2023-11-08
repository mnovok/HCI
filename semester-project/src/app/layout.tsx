import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from './components/NavBar'
import Footer from './components/Footer'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "PlanVoyage",
  description: "Navigation your journey, one adventure at a time",
}

const pages: Record<string, `/${string}`> = {
  home: "/",
  destinations: "/destinations",
  blog: "/blogs?_page=1&_limit=10",
  guides: "/guides",
  signin: "/signin",
}; // ili "as const" ovdje

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar pages={pages}/>
        {children}
        <Footer />
      </body>
    </html>
  )
}
