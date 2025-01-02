'use client'

import { useState, FormEvent, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MessageCircle, X } from 'lucide-react'

interface Message {
  content: string
  isUser: boolean
}

export function ChatWindow() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const toggleChat = () => setIsOpen(!isOpen)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage: Message = { content: input, isUser: true }
    setMessages(prev => [...prev, userMessage])
    setInput('')

    try {
      // Replace this URL with your actual Python backend URL
      const response = await fetch('http://localhost:8000/superpos/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      })

      if (!response.ok) throw new Error('Failed to get response')

      const data = await response.json()

      // Handle potential issues with data format
      if (data?.response) {
        const botMessage: Message = { content: data.response, isUser: false }
        setMessages(prev => [...prev, botMessage])
      } else {
        throw new Error('Invalid response data')
      }
    } catch (error) {
      console.error('Error:', error)
      const errorMessage: Message = { content: 'Sorry, I encountered an error. Please try again.', isUser: false }
      setMessages(prev => [...prev, errorMessage])
    }
  }

  // Scroll to the bottom when a new message is added
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  if (!isOpen) {
    return (
      <Button 
        onClick={toggleChat} 
        className="fixed bottom-4 right-4 rounded-full p-3 bg-gradient-to-r from-cyan-400 to-purple-600 hover:from-cyan-500 hover:to-purple-700 shadow-lg hover:shadow-cyan-500/20"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    )
  }

  return (
    <Card className="fixed bottom-4 right-4 w-80 shadow-lg border-0 bg-[#001a2c]/80 backdrop-blur-md text-white">
      <CardHeader className="flex flex-row items-center justify-between border-b border-white/10">
        <h2 className="text-lg font-semibold bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
          SuperposAI
        </h2>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleChat}
          className="text-white hover:bg-white/10"
        >
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="h-64 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`rounded-lg p-3 max-w-[80%] ${
              message.isUser
                ? 'ml-auto bg-gradient-to-r from-cyan-400 to-purple-600'
                : 'bg-white/10 backdrop-blur-sm'
            }`}
          >
            <p className="text-sm">{message.content}</p>
          </div>
        ))}
      </CardContent>
      <CardFooter className="border-t border-white/10 p-4">
        <form onSubmit={handleSubmit} className="flex w-full space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-cyan-400"
          />
          <Button 
            type="submit"
            className="bg-gradient-to-r from-cyan-400 to-purple-600 hover:from-cyan-500 hover:to-purple-700 text-white"
          >
            Send
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
