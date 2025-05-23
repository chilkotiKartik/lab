"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { useAuth } from "@/components/auth-provider"
import { useToast } from "@/hooks/use-toast"
import { createClient } from "@supabase/supabase-js"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
} from "lucide-react"
import { CharacterAvatar } from "@/components/character-avatar"

// Create a single supabase client for the browser
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
const supabase = createClient(supabaseUrl, supabaseAnonKey)

interface Message {
  id: string
  sender_id: string
  receiver_id: string
  content: string
  is_read: boolean
  created_at: string
  sender?: {
    name: string
    avatar_url?: string
    role?: string
  }
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
}

export function ChatSystem() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("chats")
  const [activeContact, setActiveContact] = useState<Contact | null>(null)
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [contacts, setContacts] = useState<Contact[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Mock contacts data
  const mockContacts: Contact[] = [
    {
      id: "1",
      name: "Dr. Elara Vega",
      role: "teacher",
      last_message: "Have you reviewed the quantum navigation proposal?",
      last_message_time: "10:30 AM",
      unread_count: 2,
      online: true,
    },
    {
      id: "2",
      name: "Prof. Kai Zhang",
      role: "teacher",
      last_message: "The drone test results look promising!",
      last_message_time: "Yesterday",
      unread_count: 0,
      online: false,
    },
    {
      id: "3",
      name: "Alex Johnson",
      role: "student",
      last_message: "When is the next team meeting?",
      last_message_time: "Yesterday",
      unread_count: 0,
      online: true,
      typing: true,
    },
    {
      id: "4",
      name: "Maya Patel",
      role: "student",
      last_message: "I've uploaded my research findings to the shared folder.",
      last_message_time: "Monday",
      unread_count: 0,
      online: false,
    },
    {
      id: "5",
      name: "Admin Team",
      role: "admin",
      last_message: "Your account has been upgraded to researcher level.",
      last_message_time: "Aug 15",
      unread_count: 0,
      online: true,
    },
  ]

  // Mock messages data
  const generateMockMessages = (contactId: string): Message[] => {
    const contact = mockContacts.find((c) => c.id === contactId)
    if (!contact) return []

    const baseMessages = [
      {
        id: "m1",
        sender_id: contactId,
        receiver_id: user?.id || "current-user",
        content: `Hello! I'm ${contact.name}. How can I help you today?`,
        is_read: true,
        created_at: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
      },
      {
        id: "m2",
        sender_id: user?.id || "current-user",
        receiver_id: contactId,
        content: "Hi! I wanted to discuss the latest research project.",
        is_read: true,
        created_at: new Date(Date.now() - 3500000).toISOString(),
      },
      {
        id: "m3",
        sender_id: contactId,
        receiver_id: user?.id || "current-user",
        content: "Sure, I'd be happy to discuss that. What specific aspects are you interested in?",
        is_read: true,
        created_at: new Date(Date.now() - 3400000).toISOString(),
      },
    ]

    // Add contact-specific messages
    if (contactId === "1") {
      baseMessages.push(
        {
          id: "m4",
          sender_id: user?.id || "current-user",
          receiver_id: contactId,
          content: "I'm particularly interested in the quantum navigation algorithms we discussed last week.",
          is_read: true,
          created_at: new Date(Date.now() - 3300000).toISOString(),
        },
        {
          id: "m5",
          sender_id: contactId,
          receiver_id: user?.id || "current-user",
          content: "Have you reviewed the quantum navigation proposal I sent?",
          is_read: false,
          created_at: new Date(Date.now() - 1800000).toISOString(), // 30 minutes ago
        },
        {
          id: "m6",
          sender_id: contactId,
          receiver_id: user?.id || "current-user",
          content: "I think we should schedule a meeting to discuss the implementation details.",
          is_read: false,
          created_at: new Date(Date.now() - 1200000).toISOString(), // 20 minutes ago
        },
      )
    } else if (contactId === "3") {
      baseMessages.push(
        {
          id: "m4",
          sender_id: user?.id || "current-user",
          receiver_id: contactId,
          content: "I've been working on the atmospheric sampling module. Do you have time to review my code?",
          is_read: true,
          created_at: new Date(Date.now() - 3300000).toISOString(),
        },
        {
          id: "m5",
          sender_id: contactId,
          receiver_id: user?.id || "current-user",
          content: "Sure, I can take a look. When is the next team meeting by the way?",
          is_read: true,
          created_at: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        },
      )
    }

    return baseMessages
  }

  // Load contacts
  useEffect(() => {
    if (isOpen) {
      // In a real app, fetch contacts from Supabase
      // For now, use mock data
      setContacts(mockContacts)
    }
  }, [isOpen])

  // Load messages when active contact changes
  useEffect(() => {
    if (activeContact) {
      setIsLoading(true)

      // In a real app, fetch messages from Supabase
      // For now, use mock data
      setTimeout(() => {
        const mockMessages = generateMockMessages(activeContact.id)
        setMessages(mockMessages)
        setIsLoading(false)

        // Mark messages as read
        const updatedContacts = contacts.map((contact) => {
          if (contact.id === activeContact.id) {
            return { ...contact, unread_count: 0 }
          }
          return contact
        })
        setContacts(updatedContacts)
      }, 500)
    }
  }, [activeContact])

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = () => {
    if (!message.trim() || !activeContact) return

    const newMessage: Message = {
      id: `new-${Date.now()}`,
      sender_id: user?.id || "current-user",
      receiver_id: activeContact.id,
      content: message,
      is_read: false,
      created_at: new Date().toISOString(),
    }

    setMessages([...messages, newMessage])
    setMessage("")

    // Simulate reply after a delay
    if (Math.random() > 0.5) {
      setTimeout(() => {
        // Show typing indicator
        setContacts(
          contacts.map((contact) => (contact.id === activeContact.id ? { ...contact, typing: true } : contact)),
        )

        // Then show the message
        setTimeout(() => {
          const replyMessage: Message = {
            id: `reply-${Date.now()}`,
            sender_id: activeContact.id,
            receiver_id: user?.id || "current-user",
            content: getRandomReply(activeContact.name),
            is_read: true,
            created_at: new Date().toISOString(),
          }

          setMessages((prev) => [...prev, replyMessage])
          setContacts(
            contacts.map((contact) => (contact.id === activeContact.id ? { ...contact, typing: false } : contact)),
          )
        }, 2000)
      }, 1000)
    }
  }

  const getRandomReply = (name: string): string => {
    const replies = [
      "That's interesting! Can you tell me more?",
      "I agree with your perspective on this.",
      "Let me think about that and get back to you.",
      "Great point! I hadn't considered that angle.",
      "I'll need to review the data before I can respond fully.",
      "Can we discuss this further in our next meeting?",
      "Thanks for sharing that information!",
      "I've been researching this topic as well.",
      "Have you seen the latest findings on this?",
      "Let's schedule a call to discuss this in detail.",
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

  // Group messages by date
  const groupedMessages = messages.reduce(
    (groups, message) => {
      const date = formatDate(message.created_at)
      if (!groups[date]) {
        groups[date] = []
      }
      groups[date].push(message)
      return groups
    },
    {} as Record<string, Message[]>,
  )

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

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button className="fixed bottom-4 right-4 rounded-full p-3 shadow-lg z-50" onClick={() => setIsOpen(true)}>
            <MessageSquare className="h-6 w-6" />
            {contacts.reduce((sum, contact) => sum + contact.unread_count, 0) > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {contacts.reduce((sum, contact) => sum + contact.unread_count, 0)}
              </span>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent className="sm:max-w-md p-0 h-full flex flex-col">
          <Tabs defaultValue="chats" value={activeTab} onValueChange={setActiveTab} className="flex flex-col h-full">
            {!activeContact ? (
              <>
                <div className="border-b px-4 py-2">
                  <SheetHeader className="text-left">
                    <SheetTitle>Messages</SheetTitle>
                    <SheetDescription>Connect with researchers and students</SheetDescription>
                  </SheetHeader>
                </div>
                <TabsList className="grid grid-cols-2 mx-4 my-2">
                  <TabsTrigger value="chats">Chats</TabsTrigger>
                  <TabsTrigger value="contacts">Contacts</TabsTrigger>
                </TabsList>
                <div className="px-4 py-2">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search messages..." className="pl-8" />
                  </div>
                </div>
                <TabsContent value="chats" className="flex-1 overflow-auto">
                  <div className="space-y-1 px-1">
                    {contacts.map((contact) => (
                      <motion.div
                        key={contact.id}
                        className={`flex items-center space-x-3 p-2 rounded-lg cursor-pointer ${
                          contact.unread_count > 0 ? "bg-primary/10" : "hover:bg-muted"
                        }`}
                        onClick={() => setActiveContact(contact)}
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="relative">
                          <CharacterAvatar role={contact.role as any} size="md" variant={Number.parseInt(contact.id)} />
                          {contact.online && (
                            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-background rounded-full"></span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-baseline">
                            <h4 className="font-medium truncate">{contact.name}</h4>
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
                <TabsContent value="contacts" className="flex-1 overflow-auto">
                  <div className="space-y-1 px-1">
                    {contacts.map((contact) => (
                      <motion.div
                        key={contact.id}
                        className="flex items-center space-x-3 p-2 rounded-lg cursor-pointer hover:bg-muted"
                        onClick={() => setActiveContact(contact)}
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="relative">
                          <CharacterAvatar role={contact.role as any} size="md" variant={Number.parseInt(contact.id)} />
                          {contact.online && (
                            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-background rounded-full"></span>
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{contact.name}</h4>
                          <p className="text-xs text-muted-foreground">
                            {contact.role.charAt(0).toUpperCase() + contact.role.slice(1)}
                          </p>
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
                    <Button variant="ghost" size="icon" className="mr-2" onClick={() => setActiveContact(null)}>
                      <ChevronLeft className="h-5 w-5" />
                    </Button>
                    <div className="flex items-center flex-1">
                      <div className="relative mr-2">
                        <CharacterAvatar
                          role={activeContact.role as any}
                          size="sm"
                          variant={Number.parseInt(activeContact.id)}
                        />
                        {activeContact.online && (
                          <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 border-2 border-background rounded-full"></span>
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium">{activeContact.name}</h4>
                        <p className="text-xs text-muted-foreground">{activeContact.online ? "Online" : "Offline"}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Video className="h-4 w-4" />
                      </Button>
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
                    Object.entries(groupedMessages).map(([date, dateMessages]) => (
                      <div key={date} className="space-y-4">
                        <div className="relative flex items-center justify-center">
                          <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t"></div>
                          </div>
                          <div className="relative bg-background px-2 text-xs text-muted-foreground">{date}</div>
                        </div>
                        {dateMessages.map((msg) => {
                          const isCurrentUser = msg.sender_id === user?.id || msg.sender_id === "current-user"
                          const contact = contacts.find((c) => c.id === msg.sender_id)

                          return (
                            <div key={msg.id} className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}>
                              <div
                                className={`flex ${isCurrentUser ? "flex-row-reverse" : "flex-row"} items-end space-x-2 max-w-[80%]`}
                              >
                                {!isCurrentUser && (
                                  <CharacterAvatar
                                    role={activeContact.role as any}
                                    size="sm"
                                    variant={Number.parseInt(activeContact.id)}
                                    className="mx-2"
                                  />
                                )}
                                <div
                                  className={`rounded-lg px-3 py-2 ${
                                    isCurrentUser ? "bg-primary text-primary-foreground" : "bg-muted"
                                  }`}
                                >
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
                                </div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    ))
                  )}
                  {activeContact.typing && (
                    <div className="flex justify-start">
                      <div className="flex flex-row items-end space-x-2">
                        <CharacterAvatar
                          role={activeContact.role as any}
                          size="sm"
                          variant={Number.parseInt(activeContact.id)}
                          className="mx-2"
                        />
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
                      className="flex-1 min-h-[40px] max-h-[120px]"
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
