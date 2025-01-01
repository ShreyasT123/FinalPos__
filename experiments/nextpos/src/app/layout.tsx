'use client'

import './globals.css'
import { useState, useEffect } from 'react'
import { ThemeProvider } from './theme-provider'
import { Navigation } from '@/components/ui/navigation'
import { ChatWindow } from '@/components/ui/ChatWindow'
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [mounted, setMounted] = useState(false)

  // Ensure the component is only mounted after the client has loaded
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    // Prevent hydration error by not rendering ThemeProvider until mounted
    return (
      <html lang="en" className="dark" suppressHydrationWarning>
        <body className="min-h-screen bg-black text-gray-100" />
      </html>
    )
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 dark:from-black dark:to-gray-900 text-gray-900 dark:text-gray-100 overflow-x-hidden">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {/* Background grid */}
          <div className="fixed inset-0 bg-grid-white/[0.02] bg-[length:50px_50px] pointer-events-none" />
          <div className="fixed inset-0 bg-gradient-to-br from-transparent to-cyan-500/20 pointer-events-none" />

          {/* Navigation Bar */}
          <Navigation />

          {/* Page Content */}
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            {children}
          </main>
          <ChatWindow/>
        </ThemeProvider>
      </body>
    </html>
  )
}
