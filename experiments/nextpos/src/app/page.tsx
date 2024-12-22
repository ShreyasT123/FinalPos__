'use client'

import { useState } from 'react'
import Link from 'next/link'
import {  Book, Users } from 'lucide-react'
import { ArrowRight, Atom } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function WelcomePage() {
  const [email, setEmail] = useState('')

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement newsletter subscription logic
    console.log('Subscribed:', email)
    setEmail('')
  }

  return (
    <div className="space-y-24">
      <section className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-6 animate-pulse">
            Welcome to SuperPOS
          </h1>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Transform your business with our modern point-of-sale solution. 
            Streamline operations, boost sales, and deliver exceptional customer 
            experiences with our comprehensive POS platform.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white" asChild>
              <Link href="/simulator">Try Simulator</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/10" asChild>
              <Link href="/courses">View Courses</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <FeatureCard
          icon={<Atom className="h-8 w-8 text-blue-500" />}
          title="Quantum Simulator"
          description="Experience quantum circuits and algorithms in action with our interactive, state-of-the-art simulator."
          link="/simulator"
          />
        <FeatureCard
          icon={<Book className="h-8 w-8 text-green-500" />}
          title="In-depth Documentation"
          description="Access comprehensive guides, tutorials, and references to deepen your understanding of quantum concepts."
          link="/documentation"
          />
        <FeatureCard
          icon={<Users className="h-8 w-8 text-purple-500" />}
          title="Online Courses"
          description="Enroll in our structured, expert-led courses to master quantum computing at your own pace."
          link="/course"
          />
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-6 text-center">
            Why Choose SuperPOS?
          </h2>
          <Tabs defaultValue="learn" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="learn">Learn</TabsTrigger>
            <TabsTrigger value="practice">Practice</TabsTrigger>
            <TabsTrigger value="community">Community</TabsTrigger>
          </TabsList>
          <TabsContent value="learn">
            <Card>
              <CardHeader>
                <CardTitle>Comprehensive Learning Path</CardTitle>
                <CardDescription>From beginner to expert, we`&apos;`ve got you covered.</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Our carefully curated courses and resources cater to all skill levels, ensuring a smooth learning journey in quantum computing.</p>
              </CardContent>
              <CardFooter>
                <Button asChild>
                  <Link href="/course">Explore Courses <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="practice">
            <Card>
              <CardHeader>
                <CardTitle>Hands-on Experience</CardTitle>
                <CardDescription>Apply your knowledge in real-world scenarios.</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Our advanced quantum simulator allows you to design, test, and analyze quantum circuits, bridging the gap between theory and practice.</p>
              </CardContent>
              <CardFooter>
                <Button asChild>
                  <Link href="/simulator">Launch Simulator <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="community">
            <Card>
              <CardHeader>
                <CardTitle>Vibrant Community</CardTitle>
                <CardDescription>Connect, collaborate, and grow together.</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Join our thriving community of quantum enthusiasts, researchers, and industry professionals to share ideas, solve problems, and push the boundaries of quantum computing.</p>
              </CardContent>
              <CardFooter>
                <Button asChild>
                  <Link href="/community">Join Community <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 py-16 bg-gradient-to-b from-transparent to-cyan-900/20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-6">
            Stay Updated
          </h2>
          <p className="text-lg text-gray-400 mb-8">
            Subscribe to our newsletter for the latest features, updates.
          </p>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-black/50 border-cyan-500/50 text-gray-100 placeholder-gray-500"
            />
            <Button type="submit" className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white">
              Subscribe
            </Button>
          </form>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-8 text-center">
            Latest Updates
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <BlogPostCard
            title="Understanding Quantum Entanglement"
            excerpt="Dive into the fascinating world of quantum entanglement and its implications for quantum computing."
            date="2023-05-15"
            author="Dr. Quantum"
            link="/blog/understanding-quantum-entanglement"
          />
          <BlogPostCard
            title="Quantum Algorithms: A Practical Guide"
            excerpt="Explore the most important quantum algorithms and learn how to implement them in real-world scenarios."
            date="2023-05-10"
            author="Alice Qubit"
            link="/blog/quantum-algorithms-guide"
          />
          </div>
          <div className="text-center mt-8">
            <Button variant="outline" className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/10" asChild>
              <Link href="/blog">View All Posts <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

function FeatureCard({ icon, title, description, link }: { icon: React.ReactNode; title: string; description: string; link: string }) {
  return (
    <Card className="bg-black/50 border-cyan-500/20 hover:border-cyan-500/50 transition-colors duration-300">
      <CardHeader>
        <div className="mb-2 rounded-full bg-cyan-500/10 p-2 w-12 h-12 flex items-center justify-center">{icon}</div>
        <CardTitle className="text-xl font-semibold text-gray-100">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-400">{description}</p>
      </CardContent>
      <CardFooter>
        <Link href={link}>
          <Button variant="ghost" className="text-cyan-400 hover:text-cyan-300">
            Learn more <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}


function BlogPostCard({ title, excerpt, date, author, link }: { title: string; excerpt: string; date: string; author: string; link: string }) {
  return (
    <Card className="bg-black/50 border-cyan-500/20 hover:border-cyan-500/50 transition-colors duration-300">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-100">{title}</CardTitle>
        <CardDescription className="text-gray-400">{new Date(date).toLocaleDateString()}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-gray-300">{excerpt}</p>
        <p className="text-sm text-gray-500 mt-2">By {author}</p>
      </CardContent>
      <CardFooter>
        <Button variant="ghost" className="text-cyan-400 hover:text-cyan-300" asChild>
          <Link href={link}>
            Read more <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

// export default WelcomePage