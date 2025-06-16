"use client"

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
  createChannel,
  type ChatMessage,
  type ChatChannel,
} from "@/lib/chat-service"
import { useToast } from "@/hooks/use-toast"
import { Send, Hash, Users, Settings, Plus, ArrowLeft, Crown, Shield } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

export default function AdminChatPage() {
  const { user, profile } = useAuth()
  const { toast } = useToast()
  const [channels, setChannels] = useState<ChatChannel[]>([])
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [activeChannel, setActiveChannel] = useState<string>("general")
  const [newMessage, setNewMessage] = useState("")
  const [newChannelName, setNewChannelName] = useState("")
  const [showCreateChannel, setShowCreateChannel] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setChannels(getChannels())
    setMessages(getMessages(activeChannel))

    const unsubscribeMessages = subscribeToMessages(() => {
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
      senderId: "admin",
      senderName: profile.name || "Admin",
      senderRole: "admin",
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

  const handleCreateChannel = () => {
    if (!newChannelName.trim()) return

    createChannel({
      name: `📋 ${newChannelName}`,
      description: `Admin created channel: ${newChannelName}`,
      type: "general",
      members: ["all"],
    })

    setNewChannelName("")
    setShowCreateChannel(false)
    toast({
      title: "Channel created! 🎉",
      description: `New channel "${newChannelName}" has been created`,
    })
  }

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const activeChannelData = channels.find((c) => c.id === activeChannel)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="container mx-auto p-6 max-w-7xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/admin/dashboard">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Shield className="h-8 w-8 text-primary" />
              Admin Chat Control
            </h1>
            <p className="text-muted-foreground">Monitor and manage team communications</p>
          </div>
          <Badge variant="destructive" className="ml-auto">
            <Crown className="h-4 w-4 mr-1" />
            Admin Access
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
          {/* Sidebar - Channels */}
          <Card className="lg:col-span-1 bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Hash className="h-5 w-5" />
                  Channels
                </CardTitle>
                <Button size="sm" onClick={() => setShowCreateChannel(!showCreateChannel)}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {showCreateChannel && (
                <div className="space-y-2 mt-3">
                  <Input
                    placeholder="Channel name..."
                    value={newChannelName}
                    onChange={(e) => setNewChannelName(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleCreateChannel()}
                  />
                  <div className="flex gap-2">
                    <Button size="sm" onClick={handleCreateChannel}>
                      Create
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => setShowCreateChannel(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[calc(100vh-350px)]">
                <div className="space-y-1 p-4">
                  {channels.map((channel) => (
                    <motion.button
                      key={channel.id}
                      className={`w-full text-left p-3 rounded-lg transition-all ${
                        activeChannel === channel.id ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                      }`}
                      onClick={() => setActiveChannel(channel.id)}
                      whileHover={{ x: 5 }}
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
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    {activeChannelData?.name}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {activeChannelData?.description} • Admin monitoring active
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">
                    <Users className="h-3 w-3 mr-1" />
                    All Members
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
                  {messages.map((message, index) => {
                    const showAvatar = index === 0 || messages[index - 1].senderId !== message.senderId

                    return (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
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
                                {message.senderRole === "admin" && <Crown className="h-3 w-3 ml-1" />}
                              </Badge>
                              <span className="text-xs text-muted-foreground">{formatTime(message.timestamp)}</span>
                            </div>
                          )}

                          <div className="bg-muted p-3 rounded-lg">
                            <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>
            </CardContent>

            {/* Message Input */}
            <div className="border-t p-4">
              <div className="flex items-end gap-2">
                <div className="flex-1">
                  <Textarea
                    placeholder={`Send admin message to ${activeChannelData?.name}...`}
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault()
                        handleSendMessage()
                      }
                    }}
                    className="min-h-[40px] max-h-[120px] resize-none"
                    rows={1}
                  />
                </div>
                <Button onClick={handleSendMessage} disabled={!newMessage.trim()} className="mb-2">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                <Shield className="h-3 w-3" />
                Admin privileges active • All messages are monitored
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
