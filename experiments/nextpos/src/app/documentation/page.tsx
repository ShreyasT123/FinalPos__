'use client'

import Link from 'next/link'
import { ArrowRight, Book, Code } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"

function Docs() {
  return (
    <div className="min-h-screen space-y-16 px-4 sm:px-6 lg:px-8 py-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-lg p-8">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/80" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 text-center mb-6">
            Quantum Computing Project Documentation
          </h1>
          <div className="text-lg text-gray-400 space-y-4">
            <p>
              Welcome to the Quantum Computing educational platform documentation. This project aims to make quantum computing accessible and interactive for learners of all levels. Dive into quantum circuits, experiment with simulations, and explore real-world applications of quantum computing.
            </p>
            <p>
              Whether you&apos;re a beginner looking to understand quantum basics or an advanced learner interested in hands-on simulations, our platform provides tools, tutorials, and resources for every step of your quantum journey.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 text-center mb-8">
          Getting Started with Quantum Circuits
        </h2>
        <p className="text-lg text-gray-400 text-center mb-12">
          Learn how to create, simulate, and visualize quantum circuits with our easy-to-follow guides.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <Card className="bg-black/50 border-cyan-500/20 hover:border-cyan-500/50 transition-colors duration-300">
            <CardHeader>
              <div className="mb-2 rounded-full bg-cyan-500/10 p-2 w-12 h-12 flex items-center justify-center">
                <Book className="h-8 w-8 text-cyan-400" />
              </div>
              <CardTitle className="text-xl font-semibold text-gray-100">
                Introduction to Quantum Circuits
              </CardTitle>
              <CardDescription className="text-gray-400">
                Understand the basics of quantum circuits, including quantum gates, qubits, and the principles behind quantum computation.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                This guide will walk you through the fundamental concepts of quantum circuits, ideal for beginners looking to get started with quantum computing.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="text-cyan-400 hover:text-cyan-300" asChild>
                <Link href="/documentation/quantum-circuits">
                  View Guide <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="bg-black/50 border-cyan-500/20 hover:border-cyan-500/50 transition-colors duration-300">
            <CardHeader>
              <div className="mb-2 rounded-full bg-cyan-500/10 p-2 w-12 h-12 flex items-center justify-center">
                <Code className="h-8 w-8 text-purple-400" />
              </div>
              <CardTitle className="text-xl font-semibold text-gray-100">
                Quantum Simulation and Analysis
              </CardTitle>
              <CardDescription className="text-gray-400">
                Learn how to simulate quantum circuits and analyze their results.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Dive into advanced simulation techniques and tools to visualize quantum states and understand the outcomes of your quantum experiments.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="text-cyan-400 hover:text-cyan-300" asChild>
                <Link href="/documentation/quantum-simulation">
                  Explore Simulation <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* Advanced Topics */}
      <section className="max-w-4xl mx-auto bg-gradient-to-b from-transparent to-cyan-900/20 rounded-lg p-8">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 text-center mb-8">
          Advanced Quantum Topics
        </h2>
        <div className="space-y-6 text-gray-300">
          <div className="bg-black/30 rounded-lg p-6 border border-cyan-500/20">
            <h3 className="text-xl font-semibold text-gray-100 mb-2">Quantum Machine Learning</h3>
            <p className="mb-4">Explore how quantum computing is revolutionizing machine learning and AI, including quantum algorithms and practical use cases.</p>
            <Button variant="outline" className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/10" asChild>
              <Link href="/documentation/quantum-ml">View Guide <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>

          <div className="bg-black/30 rounded-lg p-6 border border-cyan-500/20">
            <h3 className="text-xl font-semibold text-gray-100 mb-2">Quantum Cryptography</h3>
            <p className="mb-4">Learn about the principles and applications of quantum cryptography in securing communications and data.</p>
            <Button variant="outline" className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/10" asChild>
              <Link href="/documentation/quantum-cryptography">Learn More <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      <footer className="text-center text-gray-400 max-w-4xl mx-auto">
        <p>Need additional help? Our support team is available 24/7 to assist you.</p>
        <Button className="mt-4 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white" asChild>
          <Link href="/support">Contact Support</Link>
        </Button>
      </footer>
    </div>
  )
}

export default Docs
