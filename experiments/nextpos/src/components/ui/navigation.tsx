'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { useTheme } from 'next-themes'

function ClientOnly({ children }: { children: React.ReactNode }) {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => setHasMounted(true), []);
  if (!hasMounted) return null;
  return <>{children}</>;
}

function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} 
      className="text-gray-300 hover:text-white"
    >
      {theme === 'dark' ? '🌞' : '🌙'}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev)
  }

  return (
    <ClientOnly>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md border-b border-cyan-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                SuperPOS
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <NavLink href="/simulator">Simulator</NavLink>
                <NavLink href="/documentation">Documentation</NavLink>
                <NavLink href="/course">Online Course</NavLink>
              </div>
            </div>
            <div className="flex items-center">
              <ThemeToggle />
              <Button variant="ghost" size="icon" onClick={toggleMenu} className="md:hidden text-gray-300 hover:text-white">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </div>
          </div>
        </div>
      </nav>
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/95 backdrop-blur-sm md:hidden">
          <div className="pt-20 px-4">
            <NavLink href="/simulator" onClick={toggleMenu}>Simulator</NavLink>
            <NavLink href="/documentation" onClick={toggleMenu}>Documentation</NavLink>
            <NavLink href="/course" onClick={toggleMenu}>Online Course</NavLink>
          </div>
        </div>
      )}
    </ClientOnly>
  )
}

function NavLink({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: () => void }) {
  return (
    <Link
      href={href}
      className="block py-2 px-3 text-gray-300 hover:text-cyan-400 rounded-md text-sm font-medium transition-colors duration-200"
      onClick={onClick}
    >
      {children}
    </Link>
  )
}

