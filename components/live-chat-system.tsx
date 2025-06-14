"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageCircle, X, Send, Minimize2, Users } from "lucide-react"

interface Message {
  id: string
  user: string
  avatar: string
  message: string
  timestamp: Date
  isOwn: boolean
}

interface OnlineUser {
  id: string
  name: string
  avatar: string
  status: "online" | "away" | "busy"
}

export function LiveChatSystem() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Mock data
  useEffect(() => {
    setOnlineUsers([
      {
        id: "1",
        name: "Alex Chen",
        avatar: "/images/student-1.png",
        status: "online",
      },
      {
        id: "2",
        name: "Maya Patel",
        avatar: "/images/student-2.png",
        status: "online",
      },
      {
        id: "3",
        name: "Dr. Sarah Kim",
        avatar: "/images/teacher-1.png",
        status: "away",
      },
      {
        id: "4",
        name: "John Smith",
        avatar: "/images/student-3.png",
        status: "busy",
      },
    ])

    setMessages([
      {
        id: "1",
        user: "Alex Chen",
        avatar: "/images/student-1.png",
        message: "Hey everyone! Just finished my AI project presentation. How did everyone else do?",
        timestamp: new Date(Date.now() - 300000),
        isOwn: false,
      },
      {
        id: "2",
        user: "Maya Patel",
        avatar: "/images/student-2.png",
        message: "Great job Alex! I saw your demo, it was impressive 🚀",
        timestamp: new Date(Date.now() - 240000),
        isOwn: false,
      },
      {
        id: "3",
        user: "You",
        avatar: "/images/student-4.png",
        message: "Thanks for the feedback! Looking forward to collaborating on the next project.",
        timestamp: new Date(Date.now() - 180000),
        isOwn: true,
      },
    ])
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        user: "You",
        avatar: "/images/student-4.png",
        message: message.trim(),
        timestamp: new Date(),
        isOwn: true,
      }
      setMessages([...messages, newMessage])
      setMessage("")

      // Simulate typing indicator and response
      setIsTyping(true)
      setTimeout(() => {
        setIsTyping(false)
        const responses = [
          "That's a great point!",
          "I agree with that approach.",
          "Thanks for sharing!",
          "Interesting perspective!",
          "Let's discuss this further.",
        ]
        const randomResponse = responses[Math.floor(Math.random() * responses.length)]
        const responseMessage: Message = {
          id: (Date.now() + 1).toString(),
          user: "Alex Chen",
          avatar: "/images/student-1.png",
          message: randomResponse,
          timestamp: new Date(),
          isOwn: false,
        }
        setMessages((prev) => [...prev, responseMessage])
      }, 2000)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500"
      case "away":
        return "bg-yellow-500"
      case "busy":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <>
      {/* Chat Toggle Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Button
              onClick={() => setIsOpen(true)}
              size="lg"
              className="rounded-full h-14 w-14 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <MessageCircle className="h-6 w-6" />
              <Badge className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 flex items-center justify-center bg-red-500">
                {onlineUsers.filter((u) => u.status === "online").length}
              </Badge>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-2rem)] h-[500px] max-h-[calc(100vh-2rem)]"
          >
            <Card className="h-full flex flex-col shadow-2xl border-2">
              {/* Header */}
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
                <div className="flex items-center space-x-2">
                  <MessageCircle className="h-5 w-5" />
                  <CardTitle className="text-lg">Live Chat</CardTitle>
                  <Badge variant="secondary" className="bg-white/20 text-white">
                    {onlineUsers.filter((u) => u.status === "online").length} online
                  </Badge>
                </div>
                <div className="flex items-center space-x-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsMinimized(!isMinimized)}
                    className="h-8 w-8 text-white hover:bg-white/20"
                  >
                    <Minimize2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                    className="h-8 w-8 text-white hover:bg-white/20"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>

              {!isMinimized && (
                <CardContent className="flex-1 flex flex-col p-0">
                  {/* Online Users */}
                  <div className="p-3 border-b bg-muted/30">
                    <div className="flex items-center space-x-2 mb-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Online Now</span>
                    </div>
                    <div className="flex space-x-2 overflow-x-auto">
                      {onlineUsers.map((user) => (
                        <div key={user.id} className="flex flex-col items-center space-y-1 min-w-0">
                          <div className="relative">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div
                              className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white ${getStatusColor(user.status)}`}
                            />
                          </div>
                          <span className="text-xs text-muted-foreground truncate max-w-[60px]">
                            {user.name.split(" ")[0]}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Messages */}
                  <ScrollArea className="flex-1 p-3">
                    <div className="space-y-4">
                      {messages.map((msg) => (
                        <div key={msg.id} className={`flex ${msg.isOwn ? "justify-end" : "justify-start"}`}>
                          <div
                            className={`flex space-x-2 max-w-[80%] ${msg.isOwn ? "flex-row-reverse space-x-reverse" : ""}`}
                          >
                            <Avatar className="h-8 w-8 flex-shrink-0">
                              <AvatarImage src={msg.avatar || "/placeholder.svg"} alt={msg.user} />
                              <AvatarFallback>{msg.user.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className={`space-y-1 ${msg.isOwn ? "items-end" : "items-start"} flex flex-col`}>
                              <div className="flex items-center space-x-2">
                                <span className="text-xs font-medium text-muted-foreground">{msg.user}</span>
                                <span className="text-xs text-muted-foreground">{formatTime(msg.timestamp)}</span>
                              </div>
                              <div
                                className={`rounded-lg px-3 py-2 text-sm ${
                                  msg.isOwn ? "bg-primary text-primary-foreground" : "bg-muted"
                                }`}
                              >
                                {msg.message}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}

                      {/* Typing Indicator */}
                      {isTyping && (
                        <div className="flex justify-start">
                          <div className="flex space-x-2 max-w-[80%]">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src="/images/student-1.png" alt="Alex" />
                              <AvatarFallback>A</AvatarFallback>
                            </Avatar>
                            <div className="bg-muted rounded-lg px-3 py-2">
                              <div className="flex space-x-1">
                                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                                <div
                                  className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                                  style={{ animationDelay: "0.1s" }}
                                />
                                <div
                                  className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                                  style={{ animationDelay: "0.2s" }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      <div ref={messagesEndRef} />
                    </div>
                  </ScrollArea>

                  {/* Message Input */}
                  <div className="p-3 border-t">
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Type your message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="flex-1"
                      />
                      <Button onClick={handleSendMessage} size="icon" disabled={!message.trim()}>
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
