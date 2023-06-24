'use client'
import './globals.css'
import Footer from '@/components/footer/Footer'
import { Header } from '@/components/header/header'
import { AuthProvider } from '@/Context/AuthContext'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body className="min-h-screen w-full flex flex-col items-center">
        <AuthProvider>
          <Header />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  )
}