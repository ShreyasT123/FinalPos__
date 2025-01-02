/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, BookOpen, Clock, Award, Atom, Zap, Brain, Sparkles } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { MermaidDiagram } from "@/components/ui/MermaidComponent"

const courses = [
  {
    id: 1,
    title: "Quantum Computing Fundamentals",
    description: "Learn the basics of quantum computing, including qubits, superposition, and entanglement.",
    level: "Beginner",
    duration: "4 weeks",
    instructor: "Dr. Quantum",
    icon: <Atom className="h-6 w-6 text-cyan-400" />,
  },
  {
    id: 2,
    title: "Quantum Algorithms",
    description: "Explore key quantum algorithms like Shor's and Grover's, and their applications.",
    level: "Intermediate",
    duration: "6 weeks",
    instructor: "Prof. Qubit",
    icon: <Zap className="h-6 w-6 text-purple-400" />,
  },
  {
    id: 3,
    title: "Quantum Error Correction",
    description: "Dive deep into quantum error correction techniques and fault-tolerant quantum computing.",
    level: "Advanced",
    duration: "8 weeks",
    instructor: "Dr. Entanglement",
    icon: <Brain className="h-6 w-6 text-green-400" />,
  },
]

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

//   const mermaidChart = `
//     graph TD
//       A[Start: No Quantum Knowledge] -->|Enroll| B(Quantum Computing Fundamentals)
//       B --> C{Choose Path}
//       C -->|Theoretical| D[Quantum Algorithms]
//       C -->|Practical| E[Quantum Programming]
//       D --> F[Advanced Quantum Theory]
//       E --> G[Quantum Error Correction]
//       F --> H[Quantum Research Topics]
//       G --> H
//       H --> I[Quantum Expert]
      
//       style A fill:#3B82F6,stroke:#60A5FA,stroke-width:2px
//       style B fill:#10B981,stroke:#34D399,stroke-width:2px
//       style C fill:#F59E0B,stroke:#FBBF24,stroke-width:2px
//       style D fill:#8B5CF6,stroke:#A78BFA,stroke-width:2px
//       style E fill:#EC4899,stroke:#F472B6,stroke-width:2px
//       style F fill:#6366F1,stroke:#818CF8,stroke-width:2px
//       style G fill:#14B8A6,stroke:#2DD4BF,stroke-width:2px
//       style H fill:#7C3AED,stroke:#A78BFA,stroke-width:2px
//       style I fill:#EF4444,stroke:#F87171,stroke-width:2px
//   `

  return (
    <div className="space-y-12 relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-cyan-500 rounded-full opacity-30"
              style={{
                width: Math.random() * 100 + 50,
                height: Math.random() * 100 + 50,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [1, 2, 2, 1, 1],
                rotate: [0, 0, 270, 270, 0],
                opacity: [0.3, 0.5, 0.5, 0.3, 0.3],
              }}
              transition={{
                duration: Math.random() * 10 + 20,
                ease: "linear",
                repeat: Infinity,
              }}
            />
          ))}
        </div>
      </div>

      <motion.section 
        className="text-center relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-5xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-6">
          Quantum Computing Courses
        </h1>
        <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
          Embark on your quantum journey with our expert-led courses. From beginners to advanced learners, we&apos;ve got you covered.
        </p>
        <motion.div
          className="flex justify-center mb-8"
          initial={{ scale: 0 }}
          animate={{ scale: isLoaded ? 1 : 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 260, damping: 20 }}
        >
          <Sparkles className="h-16 w-16 text-yellow-400 animate-pulse" />
        </motion.div>
      </motion.section>

      <section className="max-w-4xl mx-auto relative z-10 mb-16">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-6 text-center">
          Quantum Computing Learning Path
        </h2>
        {/* <div className="bg-black/50 border border-cyan-500/20 rounded-lg p-6"> */}
          {/* <MermaidDiagram chart={mermaidChart} /> */}
        {/* </div> */}
        <div className="mt-8 text-center">
          <p className="text-gray-300 mb-4">
            Follow this learning path to become a Quantum Computing Expert. Start with the fundamentals and choose your specialization as you progress.
          </p>
          <Button className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white">
            Start Your Quantum Journey
          </Button>
        </div>
      </section>

      <section className="max-w-4xl mx-auto relative z-10">
        <Input
          type="text"
          placeholder="Search courses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-black/50 border-cyan-500/50 text-gray-100 placeholder-gray-500 mb-8"
        />

        <Tabs defaultValue="all" className="w-full mb-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All Levels</TabsTrigger>
            <TabsTrigger value="beginner">Beginner</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <motion.div 
              className="grid gap-6 mt-6"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
              initial="hidden"
              animate="show"
            >
              {filteredCourses.map(course => (
                <CourseCard key={course.id} course={course} />
              ))}
            </motion.div>
          </TabsContent>
          <TabsContent value="beginner">
            <motion.div 
              className="grid gap-6 mt-6"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
              initial="hidden"
              animate="show"
            >
              {filteredCourses.filter(course => course.level === "Beginner").map(course => (
                <CourseCard key={course.id} course={course} />
              ))}
            </motion.div>
          </TabsContent>
          <TabsContent value="advanced">
            <motion.div 
              className="grid gap-6 mt-6"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
              initial="hidden"
              animate="show"
            >
              {filteredCourses.filter(course => course.level === "Advanced").map(course => (
                <CourseCard key={course.id} course={course} />
              ))}
            </motion.div>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  )
}

function CourseCard({ course }: { course: any }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
      }}
    >
      <Card className="bg-black/50 border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300 transform hover:scale-105">
        <CardHeader className="relative">
          <div className="absolute top-4 right-4 bg-cyan-500/10 rounded-full p-2">
            {course.icon}
          </div>
          <CardTitle className="text-xl font-semibold text-gray-100">{course.title}</CardTitle>
          <CardDescription className="text-gray-400">{course.level} • {course.duration}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-300 mb-4">{course.description}</p>
          <div className="flex items-center text-gray-400 mb-2">
            <BookOpen className="mr-2 h-4 w-4" />
            <span>{course.level}</span>
          </div>
          <div className="flex items-center text-gray-400 mb-2">
            <Clock className="mr-2 h-4 w-4" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center text-gray-400">
            <Award className="mr-2 h-4 w-4" />
            <span>{course.instructor}</span>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white group">
            Enroll Now 
            <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

