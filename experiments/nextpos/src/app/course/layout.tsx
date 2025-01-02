import { ThemeProvider } from "../theme-provider"
import { Navigation } from "@/components/ui/navigation"

export default function CoursesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 dark:from-black dark:to-gray-900 text-gray-900 dark:text-gray-100">
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
      </ThemeProvider>
    </div>
  )
}

