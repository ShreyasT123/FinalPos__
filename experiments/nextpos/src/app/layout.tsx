'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Moon, Sun } from 'lucide-react'
import { Button } from "@/components/ui/button"
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isDarkMode, setIsDarkMode] = useState<boolean | null>(null)

  useEffect(() => {
    const root = window.document.documentElement
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    // Set initial theme based on user preference
    setIsDarkMode(prefersDark)
  }, [])

  useEffect(() => {
    if (isDarkMode !== null) {
      const root = window.document.documentElement
      root.classList.toggle('dark', isDarkMode)
    }
  }, [isDarkMode])

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev)
  }

  if (isDarkMode === null) {
    // Prevent hydration mismatch by not rendering until the theme is determined
    return null
  }

  return (
    <html lang="en" className={isDarkMode ? 'dark overflow-auto' : 'overflow-auto'}>
      <body className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 dark:from-black dark:to-gray-900 transition-colors duration-300">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="quantum-bg"></div>
        </div>
        <nav className="bg-white dark:bg-black shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <Link href="/" className="text-2xl font-bold text-navy-600 dark:text-navy-300">
                SuperPos
                </Link>
                <div className="ml-10 flex items-baseline space-x-4">
                  <NavLink href="/simulator">Simulator</NavLink>
                  <NavLink href="/documentation">Documentation</NavLink>
                  <NavLink href="/course">Online Course</NavLink>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={toggleTheme}>
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                <span className="sr-only">Toggle theme</span>
              </Button>
            </div>
          </div>
        </nav>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {children}
        </main>
      </body>
    </html>
  )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-navy-600 dark:text-navy-300 hover:bg-navy-100 dark:hover:bg-gray-800 px-3 py-2 rounded-md text-sm font-medium"
    >
      {children}
    </Link>
  )
}
