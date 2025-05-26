"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { useAuth } from "@/components/auth-provider"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  MessageSquare,
  Send,
  Paperclip,
  Smile,
  ImageIcon,
  Phone,
  Video,
  MoreHorizontal,
  Search,
  ChevronLeft,
  Check,
  Clock,
  Pin,
} from "lucide-react"
import { CharacterAvatar } from "@/components/character-avatar"

interface Message {
  id: string
  sender_id: string
  receiver_id?: string
  channel_id?: string
  content: string
  message_type: "text" | "image" | "file" | "system"
  is_read: boolean
  created_at: string
  sender?: {
    name: string
    avatar_url?: string
    role?: string
  }
  reactions?: { emoji: string; users: string[] }[]
}

interface Contact {
  id: string
  name: string
  avatar_url?: string
  role: string
  last_message?: string
  last_message_time?: string
  unread_count: number
  online: boolean
  typing?: boolean
  is_pinned?: boolean
}

interface Channel {
  id: string
  name: string
  description?: string
  type: "public" | "private" | "project"
  member_count: number
  unread_count: number
  last_activity?: string
  is_pinned?: boolean
}

export function EnhancedChatSystem() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("chats")
  const [activeContact, setActiveContact] = useState<Contact | null>(null)
  const [activeChannel, setActiveChannel] = useState<Channel | null>(null)
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [contacts, setContacts] = useState<Contact[]>([])
  const [channels, setChannels] = useState<Channel[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Enhanced mock contacts with real team data
  const mockContacts: Contact[] = [
    {
      id: "sayan-ray",
      name: "Sayan Ray",
      role: "admin",
      last_message: "Great progress on the quantum navigation project!",
      last_message_time: "2 min ago",
      unread_count: 0,
      online: true,
      is_pinned: true,
    },
    {
      id: "lakshay-verma",
      name: "Lakshay Verma",
      role: "student",
      last_message: "I've uploaded the latest research findings to the shared folder.",
      last_message_time: "15 min ago",
      unread_count: 2,
      online: true,
      typing: true,
    },
    {
      id: "harshal-kokate",
      name: "Harshal Kokate",
      role: "student",
      last_message: "The drone test results look promising! 🚁",
      last_message_time: "1 hour ago",
      unread_count: 0,
      online: false,
    },
    {
      id: "puneeth-shetty",
      name: "Puneeth D Shetty",
      role: "student",
      last_message: "Electronic system simulation is complete.",
      last_message_time: "2 hours ago",
      unread_count: 1,
      online: true,
    },
    {
      id: "anjalee-chaudhary",
      name: "Anjalee Chaudhary",
      role: "student",
      last_message: "Working on the astrobiology research paper.",
      last_message_time: "Yesterday",
      unread_count: 0,
      online: false,
    },
  ]

  // Mock channels for team collaboration
  const mockChannels: Channel[] = [
    {
      id: "general",
      name: "🌟 General",
      description: "General team discussions",
      type: "public",
      member_count: 32,
      unread_count: 5,
      last_activity: "5 min ago",
      is_pinned: true,
    },
    {
      id: "space-projects",
      name: "🚀 Space Projects",
      description: "Space research and projects",
      type: "project",
      member_count: 15,
      unread_count: 3,
      last_activity: "10 min ago",
    },
    {
      id: "drone-development",
      name: "🛸 Drone Development",
      description: "Drone projects and testing",
      type: "project",
      member_count: 12,
      unread_count: 0,
      last_activity: "1 hour ago",
    },
    {
      id: "aero-research",
      name: "✈️ Aero Research",
      description: "Aeronautics research discussions",
      type: "project",
      member_count: 8,
      unread_count: 1,
      last_activity: "2 hours ago",
    },
    {
      id: "announcements",
      name: "📢 Announcements",
      description: "Important team announcements",
      type: "public",
      member_count: 32,
      unread_count: 0,
      last_activity: "1 day ago",
    },
  ]

  // Load contacts and channels
  useEffect(() => {
    if (isOpen) {
      setContacts(mockContacts)
      setChannels(mockChannels)
    }
  }, [isOpen])

  // Enhanced message generation
  const generateMessages = (contactId?: string, channelId?: string): Message[] => {
    const baseMessages: Message[] = []

    if (contactId) {
      const contact = mockContacts.find((c) => c.id === contactId)
      if (contact) {
        baseMessages.push(
          {
            id: "m1",
            sender_id: contactId,
            receiver_id: user?.id || "current-user",
            content: `Hello! I'm ${contact.name}. How can I help you today?`,
            message_type: "text",
            is_read: true,
            created_at: new Date(Date.now() - 3600000).toISOString(),
          },
          {
            id: "m2",
            sender_id: user?.id || "current-user",
            receiver_id: contactId,
            content: "Hi! I wanted to discuss the latest research project.",
            message_type: "text",
            is_read: true,
            created_at: new Date(Date.now() - 3500000).toISOString(),
          },
          {
            id: "m3",
            sender_id: contactId,
            receiver_id: user?.id || "current-user",
            content: contact.last_message || "Sure, I'd be happy to discuss that!",
            message_type: "text",
            is_read: false,
            created_at: new Date(Date.now() - 1800000).toISOString(),
          },
        )
      }
    } else if (channelId) {
      const channel = mockChannels.find((c) => c.id === channelId)
      if (channel) {
        baseMessages.push(
          {
            id: "c1",
            sender_id: "sayan-ray",
            channel_id: channelId,
            content: `Welcome to ${channel.name}! Let's collaborate and build amazing things together.`,
            message_type: "text",
            is_read: true,
            created_at: new Date(Date.now() - 7200000).toISOString(),
            sender: { name: "Sayan Ray", role: "admin" },
          },
          {
            id: "c2",
            sender_id: "lakshay-verma",
            channel_id: channelId,
            content: "Excited to work on the quantum navigation project! 🚀",
            message_type: "text",
            is_read: true,
            created_at: new Date(Date.now() - 3600000).toISOString(),
            sender: { name: "Lakshay Verma", role: "student" },
            reactions: [{ emoji: "🚀", users: ["sayan-ray", "harshal-kokate"] }],
          },
          {
            id: "c3",
            sender_id: "harshal-kokate",
            channel_id: channelId,
            content: "The drone testing went really well today. Check out the results!",
            message_type: "text",
            is_read: true,
            created_at: new Date(Date.now() - 1800000).toISOString(),
            sender: { name: "Harshal Kokate", role: "student" },
          },
        )
      }
    }

    return baseMessages
  }

  // Load messages when active contact or channel changes
  useEffect(() => {
    if (activeContact || activeChannel) {
      setIsLoading(true)
      setTimeout(() => {
        const newMessages = generateMessages(activeContact?.id, activeChannel?.id)
        setMessages(newMessages)
        setIsLoading(false)

        // Mark messages as read
        if (activeContact) {
          const updatedContacts = contacts.map((contact) => {
            if (contact.id === activeContact.id) {
              return { ...contact, unread_count: 0 }
            }
            return contact
          })
          setContacts(updatedContacts)
        }
      }, 500)
    }
  }, [activeContact, activeChannel])

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = () => {
    if (!message.trim()) return

    const newMessage: Message = {
      id: `new-${Date.now()}`,
      sender_id: user?.id || "current-user",
      receiver_id: activeContact?.id,
      channel_id: activeChannel?.id,
      content: message,
      message_type: "text",
      is_read: false,
      created_at: new Date().toISOString(),
      sender: { name: user?.name || "You", role: user?.role || "student" },
    }

    setMessages([...messages, newMessage])
    setMessage("")

    // Simulate typing indicator and reply
    if (activeContact && Math.random() > 0.3) {
      setTimeout(() => {
        setContacts(
          contacts.map((contact) => (contact.id === activeContact.id ? { ...contact, typing: true } : contact)),
        )

        setTimeout(() => {
          const replyMessage: Message = {
            id: `reply-${Date.now()}`,
            sender_id: activeContact.id,
            receiver_id: user?.id || "current-user",
            content: getRandomReply(),
            message_type: "text",
            is_read: true,
            created_at: new Date().toISOString(),
            sender: { name: activeContact.name, role: activeContact.role },
          }

          setMessages((prev) => [...prev, replyMessage])
          setContacts(
            contacts.map((contact) => (contact.id === activeContact.id ? { ...contact, typing: false } : contact)),
          )
        }, 2000)
      }, 1000)
    }

    toast({
      title: "Message Sent! 📨",
      description: `Sent to ${activeContact?.name || activeChannel?.name}`,
    })
  }

  const getRandomReply = (): string => {
    const replies = [
      "That's a great point! Let me think about that.",
      "I agree! This could really improve our project.",
      "Interesting approach. Have you considered the technical challenges?",
      "Thanks for sharing! I'll review this and get back to you.",
      "This aligns perfectly with our research goals.",
      "Let's schedule a meeting to discuss this further.",
      "Excellent work! Keep it up! 🎉",
      "I have some ideas that might help with this.",
    ]
    return replies[Math.floor(Math.random() * replies.length)]
  }

  const formatTime = (dateString: string): string => {
    const date = new Date(dateString)
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
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

  const filteredContacts = contacts.filter((contact) => contact.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const filteredChannels = channels.filter((channel) => channel.name.toLowerCase().includes(searchQuery.toLowerCase()))

  if (!user) {
    return (
      <Button
        onClick={() =>
          toast({
            title: "Login Required",
            description: "Please login to access the chat system.",
          })
        }
        className="fixed bottom-4 right-4 rounded-full p-3 shadow-lg z-50"
      >
        <MessageSquare className="h-6 w-6" />
      </Button>
    )
  }

  const totalUnread =
    contacts.reduce((sum, contact) => sum + contact.unread_count, 0) +
    channels.reduce((sum, channel) => sum + channel.unread_count, 0)

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button className="fixed bottom-4 right-4 rounded-full p-3 shadow-lg z-50" onClick={() => setIsOpen(true)}>
            <MessageSquare className="h-6 w-6" />
            {totalUnread > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                {totalUnread > 99 ? "99+" : totalUnread}
              </span>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent className="sm:max-w-md p-0 h-full flex flex-col">
          <Tabs defaultValue="chats" value={activeTab} onValueChange={setActiveTab} className="flex flex-col h-full">
            {!activeContact && !activeChannel ? (
              <>
                <div className="border-b px-4 py-2">
                  <SheetHeader className="text-left">
                    <SheetTitle className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5" />
                      AVASYA Chat
                    </SheetTitle>
                    <SheetDescription>Connect with your research team</SheetDescription>
                  </SheetHeader>
                </div>
                <TabsList className="grid grid-cols-3 mx-4 my-2">
                  <TabsTrigger value="chats">
                    Chats
                    {contacts.reduce((sum, c) => sum + c.unread_count, 0) > 0 && (
                      <Badge className="ml-1 h-4 w-4 p-0 text-xs">
                        {contacts.reduce((sum, c) => sum + c.unread_count, 0)}
                      </Badge>
                    )}
                  </TabsTrigger>
                  <TabsTrigger value="channels">
                    Channels
                    {channels.reduce((sum, c) => sum + c.unread_count, 0) > 0 && (
                      <Badge className="ml-1 h-4 w-4 p-0 text-xs">
                        {channels.reduce((sum, c) => sum + c.unread_count, 0)}
                      </Badge>
                    )}
                  </TabsTrigger>
                  <TabsTrigger value="team">Team</TabsTrigger>
                </TabsList>
                <div className="px-4 py-2">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search messages..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                <TabsContent value="chats" className="flex-1 overflow-auto">
                  <div className="space-y-1 px-1">
                    {filteredContacts.map((contact) => (
                      <motion.div
                        key={contact.id}
                        className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all ${
                          contact.unread_count > 0 ? "bg-primary/10" : "hover:bg-muted"
                        }`}
                        onClick={() => setActiveContact(contact)}
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="relative">
                          <CharacterAvatar role={contact.role as any} size="md" />
                          {contact.online && (
                            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-background rounded-full"></span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-baseline">
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium truncate">{contact.name}</h4>
                              {contact.is_pinned && <Pin className="h-3 w-3 text-primary" />}
                            </div>
                            <span className="text-xs text-muted-foreground">{contact.last_message_time}</span>
                          </div>
                          <div className="flex items-center">
                            {contact.typing ? (
                              <span className="text-sm text-primary">Typing...</span>
                            ) : (
                              <p className="text-sm text-muted-foreground truncate">{contact.last_message}</p>
                            )}
                          </div>
                        </div>
                        {contact.unread_count > 0 && (
                          <div className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs">
                            {contact.unread_count}
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="channels" className="flex-1 overflow-auto">
                  <div className="space-y-1 px-1">
                    {filteredChannels.map((channel) => (
                      <motion.div
                        key={channel.id}
                        className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all ${
                          channel.unread_count > 0 ? "bg-primary/10" : "hover:bg-muted"
                        }`}
                        onClick={() => setActiveChannel(channel)}
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                          <span className="text-lg">{channel.name.split(" ")[0]}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-baseline">
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium truncate">{channel.name}</h4>
                              {channel.is_pinned && <Pin className="h-3 w-3 text-primary" />}
                            </div>
                            <span className="text-xs text-muted-foreground">{channel.last_activity}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <p className="text-xs text-muted-foreground">{channel.member_count} members</p>
                            {channel.unread_count > 0 && (
                              <div className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs">
                                {channel.unread_count}
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="team" className="flex-1 overflow-auto">
                  <div className="space-y-1 px-1">
                    {filteredContacts.map((contact) => (
                      <motion.div
                        key={contact.id}
                        className="flex items-center space-x-3 p-3 rounded-lg cursor-pointer hover:bg-muted"
                        onClick={() => setActiveContact(contact)}
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="relative">
                          <CharacterAvatar role={contact.role as any} size="md" />
                          {contact.online && (
                            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-background rounded-full"></span>
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{contact.name}</h4>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              {contact.role.charAt(0).toUpperCase() + contact.role.slice(1)}
                            </Badge>
                            {contact.online ? (
                              <span className="text-xs text-green-500">Online</span>
                            ) : (
                              <span className="text-xs text-muted-foreground">Offline</span>
                            )}
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>
              </>
            ) : (
              <div className="flex flex-col h-full">
                <div className="border-b px-4 py-2">
                  <div className="flex items-center">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="mr-2"
                      onClick={() => {
                        setActiveContact(null)
                        setActiveChannel(null)
                      }}
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </Button>
                    <div className="flex items-center flex-1">
                      {activeContact ? (
                        <>
                          <div className="relative mr-2">
                            <CharacterAvatar role={activeContact.role as any} size="sm" />
                            {activeContact.online && (
                              <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 border-2 border-background rounded-full"></span>
                            )}
                          </div>
                          <div>
                            <h4 className="font-medium">{activeContact.name}</h4>
                            <p className="text-xs text-muted-foreground">
                              {activeContact.online ? "Online" : "Offline"}
                            </p>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center mr-2">
                            <span className="text-sm">{activeChannel?.name.split(" ")[0]}</span>
                          </div>
                          <div>
                            <h4 className="font-medium">{activeChannel?.name}</h4>
                            <p className="text-xs text-muted-foreground">{activeChannel?.member_count} members</p>
                          </div>
                        </>
                      )}
                    </div>
                    <div className="flex items-center space-x-1">
                      {activeContact && (
                        <>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Phone className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Video className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="flex-1 overflow-auto p-4 space-y-4">
                  {isLoading ? (
                    <div className="flex justify-center items-center h-full">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    </div>
                  ) : (
                    messages.map((msg) => {
                      const isCurrentUser = msg.sender_id === user?.id || msg.sender_id === "current-user"

                      return (
                        <div key={msg.id} className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}>
                          <div
                            className={`flex ${isCurrentUser ? "flex-row-reverse" : "flex-row"} items-end space-x-2 max-w-[80%]`}
                          >
                            {!isCurrentUser && (
                              <CharacterAvatar
                                role={(msg.sender?.role as any) || "student"}
                                size="sm"
                                className="mx-2"
                              />
                            )}
                            <div
                              className={`rounded-lg px-3 py-2 ${
                                isCurrentUser ? "bg-primary text-primary-foreground" : "bg-muted"
                              }`}
                            >
                              {!isCurrentUser && activeChannel && (
                                <p className="text-xs font-medium mb-1">{msg.sender?.name}</p>
                              )}
                              <p className="text-sm">{msg.content}</p>
                              <div
                                className={`text-xs mt-1 flex items-center ${
                                  isCurrentUser ? "text-primary-foreground/70 justify-end" : "text-muted-foreground"
                                }`}
                              >
                                {formatTime(msg.created_at)}
                                {isCurrentUser && (
                                  <span className="ml-1">
                                    {msg.is_read ? <Check className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
                                  </span>
                                )}
                              </div>
                              {msg.reactions && msg.reactions.length > 0 && (
                                <div className="flex gap-1 mt-2">
                                  {msg.reactions.map((reaction, index) => (
                                    <div
                                      key={index}
                                      className="flex items-center gap-1 bg-background/50 rounded-full px-2 py-1"
                                    >
                                      <span className="text-xs">{reaction.emoji}</span>
                                      <span className="text-xs">{reaction.users.length}</span>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )
                    })
                  )}
                  {(activeContact?.typing || isTyping) && (
                    <div className="flex justify-start">
                      <div className="flex flex-row items-end space-x-2">
                        <CharacterAvatar role="student" size="sm" className="mx-2" />
                        <div className="rounded-lg px-3 py-2 bg-muted">
                          <div className="flex space-x-1">
                            <span className="animate-bounce h-2 w-2 bg-muted-foreground rounded-full"></span>
                            <span className="animate-bounce delay-75 h-2 w-2 bg-muted-foreground rounded-full"></span>
                            <span className="animate-bounce delay-150 h-2 w-2 bg-muted-foreground rounded-full"></span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
                <div className="border-t p-4">
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <ImageIcon className="h-4 w-4" />
                    </Button>
                    <Textarea
                      placeholder="Type a message..."
                      className="flex-1 min-h-[40px] max-h-[120px] resize-none"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault()
                          handleSendMessage()
                        }
                      }}
                    />
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Smile className="h-4 w-4" />
                    </Button>
                    <Button size="icon" className="h-8 w-8" onClick={handleSendMessage} disabled={!message.trim()}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </Tabs>
        </SheetContent>
      </Sheet>
    </>
  )
}
