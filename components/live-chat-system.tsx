"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Send, X, Minimize2, Users } from "lucide-react"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  user: string
  avatar: string
  message: string
  timestamp: Date
  isOwn: boolean
}

interface User {
  id: string
  name: string
  avatar: string
  status: "online" | "away" | "offline"
}

export function LiveChatSystem() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      user: "Dr. Sarah Chen",
      avatar: "/images/teacher-1.png",
      message: "Welcome to Infinity Tech Society! How can I help you today?",
      timestamp: new Date(Date.now() - 300000),
      isOwn: false,
    },
    {
      id: "2",
      user: "Alex Rodriguez",
      avatar: "/images/student-1.png",
      message: "Hi! I'm interested in joining the AI research project.",
      timestamp: new Date(Date.now() - 240000),
      isOwn: false,
    },
  ])
  const [onlineUsers] = useState<User[]>([
    { id: "1", name: "Dr. Sarah Chen", avatar: "/images/teacher-1.png", status: "online" },
    { id: "2", name: "Alex Rodriguez", avatar: "/images/student-1.png", status: "online" },
    { id: "3", name: "Maya Patel", avatar: "/images/student-2.png", status: "away" },
    { id: "4", name: "Prof. Johnson", avatar: "/images/teacher-2.png", status: "online" },
  ])
  const [activeTab, setActiveTab] = useState<"chat" | "users">("chat")
  const messagesEndRef = useRef<HTMLDivElement>(null)

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
        avatar: "/images/student-3.png",
        message: message.trim(),
        timestamp: new Date(),
        isOwn: true,
      }
      setMessages((prev) => [...prev, newMessage])
      setMessage("")

      // Simulate response
      setTimeout(
        () => {
          const responses = [
            "That's a great question! Let me help you with that.",
            "I'd be happy to provide more information about that topic.",
            "Thanks for reaching out! Here's what I can tell you...",
            "Excellent! I'll connect you with the right team member.",
          ]
          const response: Message = {
            id: (Date.now() + 1).toString(),
            user: "Dr. Sarah Chen",
            avatar: "/images/teacher-1.png",
            message: responses[Math.floor(Math.random() * responses.length)],
            timestamp: new Date(),
            isOwn: false,
          }
          setMessages((prev) => [...prev, response])
        },
        1000 + Math.random() * 2000,
      )
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50"
        size="icon"
      >
        <MessageCircle className="h-6 w-6" />
        <Badge className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 flex items-center justify-center bg-red-500">
          {messages.filter((m) => !m.isOwn).length}
        </Badge>
      </Button>
    )
  }

  return (
    <Card
      className={cn(
        "fixed bottom-6 right-6 w-96 h-[500px] shadow-2xl z-50 transition-all duration-300",
        isMinimized && "h-14",
      )}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
        <CardTitle className="text-lg font-semibold">{isMinimized ? "Live Chat" : "Infinity Tech Community"}</CardTitle>
        <div className="flex items-center space-x-2">
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
        <CardContent className="p-0 flex flex-col h-[calc(500px-80px)]">
          {/* Tab Navigation */}
          <div className="flex border-b">
            <Button
              variant={activeTab === "chat" ? "default" : "ghost"}
              className="flex-1 rounded-none"
              onClick={() => setActiveTab("chat")}
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Chat
            </Button>
            <Button
              variant={activeTab === "users" ? "default" : "ghost"}
              className="flex-1 rounded-none"
              onClick={() => setActiveTab("users")}
            >
              <Users className="h-4 w-4 mr-2" />
              Online ({onlineUsers.filter((u) => u.status === "online").length})
            </Button>
          </div>

          {activeTab === "chat" ? (
            <>
              {/* Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={cn("flex items-start space-x-2", msg.isOwn && "flex-row-reverse space-x-reverse")}
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={msg.avatar || "/placeholder.svg"} alt={msg.user} />
                        <AvatarFallback>{msg.user[0]}</AvatarFallback>
                      </Avatar>
                      <div className={cn("flex flex-col", msg.isOwn && "items-end")}>
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-sm font-medium">{msg.user}</span>
                          <span className="text-xs text-muted-foreground">
                            {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </span>
                        </div>
                        <div
                          className={cn(
                            "rounded-lg px-3 py-2 max-w-[250px] text-sm",
                            msg.isOwn ? "bg-blue-600 text-white" : "bg-muted",
                          )}
                        >
                          {msg.message}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              {/* Message Input */}
              <div className="p-4 border-t">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Type your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage} size="icon">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            /* Online Users */
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-3">
                {onlineUsers.map((user) => (
                  <div key={user.id} className="flex items-center space-x-3">
                    <div className="relative">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                        <AvatarFallback>{user.name[0]}</AvatarFallback>
                      </Avatar>
                      <div
                        className={cn(
                          "absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-white",
                          user.status === "online" && "bg-green-500",
                          user.status === "away" && "bg-yellow-500",
                          user.status === "offline" && "bg-gray-400",
                        )}
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-muted-foreground capitalize">{user.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </CardContent>
      )}
    </Card>
  )
}
