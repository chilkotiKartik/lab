"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useAuth } from "@/components/auth-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  sendMessage,
  getMessages,
  getChannels,
  subscribeToMessages,
  subscribeToChannels,
  addReaction,
  type ChatMessage,
  type ChatChannel,
} from "@/lib/chat-service"
import { useToast } from "@/hooks/use-toast"
import { Send, Smile, Paperclip, Hash, Users, Settings, Search, ArrowLeft } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

export default function StudentChatPage() {
  const { user, profile } = useAuth()
  const { toast } = useToast()
  const [channels, setChannels] = useState<ChatChannel[]>([])
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [activeChannel, setActiveChannel] = useState<string>("general")
  const [newMessage, setNewMessage] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    // Load initial data
    setChannels(getChannels())
    setMessages(getMessages(activeChannel))

    // Subscribe to real-time updates
    const unsubscribeMessages = subscribeToMessages((allMessages) => {
      setMessages(getMessages(activeChannel))
    })

    const unsubscribeChannels = subscribeToChannels((updatedChannels) => {
      setChannels(updatedChannels)
    })

    return () => {
      unsubscribeMessages()
      unsubscribeChannels()
    }
  }, [activeChannel])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = () => {
    if (!newMessage.trim() || !profile) return

    sendMessage({
      senderId: profile.rollNumber || user?.uid || "",
      senderName: profile.name || "Unknown User",
      senderRole: profile.role || "student",
      content: newMessage,
      type: "text",
      channelId: activeChannel,
    })

    setNewMessage("")
    toast({
      title: "Message sent! 📨",
      description: "Your message has been delivered to the team",
    })
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleReaction = (messageId: string, emoji: string) => {
    if (!profile) return
    addReaction(messageId, emoji, profile.rollNumber || user?.uid || "")
  }

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (date.toDateString() === today.toDateString()) {
      return "Today"
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday"
    } else {
      return date.toLocaleDateString()
    }
  }

  const groupedMessages = messages.reduce(
    (groups, message) => {
      const date = formatDate(message.timestamp)
      if (!groups[date]) {
        groups[date] = []
      }
      groups[date].push(message)
      return groups
    },
    {} as Record<string, ChatMessage[]>,
  )

  const activeChannelData = channels.find((c) => c.id === activeChannel)
  const filteredChannels = channels.filter((channel) => channel.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="container mx-auto p-6 max-w-7xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/student/dashboard">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Team Chat 💬</h1>
            <p className="text-muted-foreground">Collaborate with your research team</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
          {/* Sidebar - Channels */}
          <Card className="lg:col-span-1 bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Hash className="h-5 w-5" />
                Channels
              </CardTitle>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search channels..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 h-9"
                />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[calc(100vh-350px)]">
                <div className="space-y-1 p-4">
                  {filteredChannels.map((channel) => (
                    <motion.button
                      key={channel.id}
                      className={`w-full text-left p-3 rounded-lg transition-all ${
                        activeChannel === channel.id ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                      }`}
                      onClick={() => setActiveChannel(channel.id)}
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm">{channel.name}</span>
                        <Badge variant="secondary" className="text-xs">
                          {getMessages(channel.id).length}
                        </Badge>
                      </div>
                      <p className="text-xs opacity-70 mt-1">{channel.description}</p>
                    </motion.button>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Main Chat Area */}
          <Card className="lg:col-span-3 bg-card/50 backdrop-blur-sm border-border/50 flex flex-col">
            {/* Chat Header */}
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">{activeChannelData?.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{activeChannelData?.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">
                    <Users className="h-3 w-3 mr-1" />
                    {activeChannelData?.members.length === 1 && activeChannelData.members[0] === "all"
                      ? "All Members"
                      : `${activeChannelData?.members.length} members`}
                  </Badge>
                  <Button variant="ghost" size="icon">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            {/* Messages Area */}
            <CardContent className="flex-1 p-0">
              <ScrollArea className="h-[calc(100vh-400px)] p-4">
                <div className="space-y-4">
                  {Object.entries(groupedMessages).map(([date, dateMessages]) => (
                    <div key={date}>
                      {/* Date Separator */}
                      <div className="relative flex items-center justify-center my-4">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-muted" />
                        </div>
                        <div className="relative bg-background px-3 text-xs text-muted-foreground">{date}</div>
                      </div>

                      {/* Messages */}
                      <AnimatePresence>
                        {dateMessages.map((message, index) => {
                          const isCurrentUser = message.senderId === (profile?.rollNumber || user?.uid)
                          const showAvatar = index === 0 || dateMessages[index - 1].senderId !== message.senderId

                          return (
                            <motion.div
                              key={message.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -20 }}
                              className={`flex gap-3 ${showAvatar ? "mt-4" : "mt-1"}`}
                            >
                              {showAvatar ? (
                                <Avatar className="h-8 w-8">
                                  <AvatarFallback className="text-xs">{message.senderName.charAt(0)}</AvatarFallback>
                                </Avatar>
                              ) : (
                                <div className="w-8" />
                              )}

                              <div className="flex-1 min-w-0">
                                {showAvatar && (
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="font-medium text-sm">{message.senderName}</span>
                                    <Badge
                                      variant={message.senderRole === "admin" ? "destructive" : "secondary"}
                                      className="text-xs"
                                    >
                                      {message.senderRole}
                                    </Badge>
                                    <span className="text-xs text-muted-foreground">
                                      {formatTime(message.timestamp)}
                                    </span>
                                  </div>
                                )}

                                <div className={`${!showAvatar ? "ml-0" : ""}`}>
                                  <div
                                    className={`inline-block max-w-full p-3 rounded-lg ${
                                      isCurrentUser ? "bg-primary text-primary-foreground ml-auto" : "bg-muted"
                                    }`}
                                  >
                                    <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
                                  </div>

                                  {/* Reactions */}
                                  {message.reactions && message.reactions.length > 0 && (
                                    <div className="flex gap-1 mt-2">
                                      {message.reactions.map((reaction, idx) => (
                                        <button
                                          key={idx}
                                          className="flex items-center gap-1 bg-muted hover:bg-muted/80 rounded-full px-2 py-1 text-xs transition-colors"
                                          onClick={() => handleReaction(message.id, reaction.emoji)}
                                        >
                                          <span>{reaction.emoji}</span>
                                          <span>{reaction.users.length}</span>
                                        </button>
                                      ))}
                                    </div>
                                  )}

                                  {/* Quick Reactions */}
                                  {!isCurrentUser && (
                                    <div className="flex gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                      {["👍", "❤️", "😄"].map((emoji) => (
                                        <button
                                          key={emoji}
                                          className="hover:bg-muted rounded-full p-1 text-sm transition-colors"
                                          onClick={() => handleReaction(message.id, emoji)}
                                        >
                                          {emoji}
                                        </button>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </motion.div>
                          )
                        })}
                      </AnimatePresence>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>
            </CardContent>

            {/* Message Input */}
            <div className="border-t p-4">
              <div className="flex items-end gap-2">
                <Button variant="ghost" size="icon" className="mb-2">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <div className="flex-1">
                  <Textarea
                    ref={inputRef}
                    placeholder={`Message ${activeChannelData?.name}...`}
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={handleKeyPress}
                    className="min-h-[40px] max-h-[120px] resize-none"
                    rows={1}
                  />
                </div>
                <Button variant="ghost" size="icon" className="mb-2">
                  <Smile className="h-4 w-4" />
                </Button>
                <Button onClick={handleSendMessage} disabled={!newMessage.trim()} className="mb-2">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">Press Enter to send, Shift + Enter for new line</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
