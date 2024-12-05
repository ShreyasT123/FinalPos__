'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Book, Code, Users } from 'lucide-react'
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
    <div className="space-y-12">
      <section className="text-center">
        <h1 className="text-5xl font-extrabold text-navy-800 dark:text-navy-100 mb-6">
          Welcome to SuperPOS
        </h1>
        <p className="text-xl text-navy-600 dark:text-navy-200 mb-8 max-w-2xl mx-auto">
          Embark on a journey through the quantum realm. Explore cutting-edge simulations,
          dive deep into comprehensive documentation, and master quantum computing with our
          expertly crafted courses.
        </p>
        <div className="flex justify-center gap-4">
          <Button size="lg" asChild>
            <Link href="/simulator">Try Simulator</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/course">Start Learning</Link>
          </Button>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FeatureCard
          icon={<Code className="h-8 w-8 text-blue-500" />}
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
      </section>

      <section className="bg-navy-50 dark:bg-navy-900 rounded-lg p-8">
        <h2 className="text-3xl font-bold text-navy-800 dark:text-navy-100 mb-6">Why Choose SuperPos?</h2>
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
      </section>

      <section className="text-center">
        <h2 className="text-3xl font-bold text-navy-800 dark:text-navy-100 mb-6">Stay Updated</h2>
        <p className="text-lg text-navy-600 dark:text-navy-200 mb-4">
          Subscribe to our newsletter for the latest quantum computing news, updates, and exclusive content.
        </p>
        <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md mx-auto">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button type="submit">Subscribe</Button>
        </form>
      </section>

      <section className="bg-navy-50 dark:bg-navy-900 rounded-lg p-8">
        <h2 className="text-3xl font-bold text-navy-800 dark:text-navy-100 mb-6">Latest from Our Blog</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
        <div className="text-center mt-6">
          <Button variant="outline" asChild>
            <Link href="/blog">View All Posts <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

function FeatureCard({ icon, title, description, link }: { icon: React.ReactNode; title: string; description: string; link: string }) {
  return (
    <Card>
      <CardHeader>
        <div className="mb-2">{icon}</div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-navy-600 dark:text-navy-300">{description}</p>
      </CardContent>
      <CardFooter>
        <Button variant="ghost" asChild>
          <Link href={link}>
            Learn more <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

function BlogPostCard({ title, excerpt, date, author, link }: { title: string; excerpt: string; date: string; author: string; link: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{new Date(date).toLocaleDateString()}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-navy-600 dark:text-navy-300">{excerpt}</p>
        <p className="text-sm text-navy-500 dark:text-navy-400 mt-2">By {author}</p>
      </CardContent>
      <CardFooter>
        <Button variant="ghost" asChild>
          <Link href={link}>
            Read more <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}