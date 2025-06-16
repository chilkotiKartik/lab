import { realtimeService } from "./realtime-service"

export interface ChatMessage {
  id: string
  senderId: string
  senderName: string
  senderRole: string
  content: string
  timestamp: string
  type: "text" | "file" | "image"
  channelId: string
  reactions?: { emoji: string; users: string[] }[]
  replyTo?: string
}

export interface ChatChannel {
  id: string
  name: string
  description: string
  type: "general" | "project" | "private"
  members: string[]
  createdAt: string
  lastActivity: string
}

const MESSAGES_CHANNEL = "chat_messages"
const CHANNELS_CHANNEL = "chat_channels"

// Initialize channels
let channels: ChatChannel[] = [
  {
    id: "general",
    name: "🌟 General Discussion",
    description: "General team discussions and announcements",
    type: "general",
    members: ["all"],
    createdAt: new Date().toISOString(),
    lastActivity: new Date().toISOString(),
  },
  {
    id: "project-updates",
    name: "🚀 Project Updates",
    description: "Share project progress and updates",
    type: "project",
    members: ["all"],
    createdAt: new Date().toISOString(),
    lastActivity: new Date().toISOString(),
  },
  {
    id: "help-support",
    name: "🆘 Help & Support",
    description: "Get help and support from team members",
    type: "general",
    members: ["all"],
    createdAt: new Date().toISOString(),
    lastActivity: new Date().toISOString(),
  },
]

let messages: ChatMessage[] = [
  {
    id: "1",
    senderId: "admin",
    senderName: "Admin",
    senderRole: "admin",
    content: "Welcome to the AVASYA Research Lab chat! Feel free to discuss your projects and collaborate here.",
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    type: "text",
    channelId: "general",
  },
  {
    id: "2",
    senderId: "24f1001450",
    senderName: "Aishwarya Maan Srivastava",
    senderRole: "student",
    content: "Excited to be part of this amazing research community! 🎉",
    timestamp: new Date(Date.now() - 1800000).toISOString(),
    type: "text",
    channelId: "general",
    reactions: [{ emoji: "🎉", users: ["admin", "24f3001430"] }],
  },
]

// Load from storage
const storedChannels = realtimeService.getStoredData(CHANNELS_CHANNEL)
const storedMessages = realtimeService.getStoredData(MESSAGES_CHANNEL)

if (storedChannels) channels = storedChannels
else realtimeService.publish(CHANNELS_CHANNEL, channels)

if (storedMessages) messages = storedMessages
else realtimeService.publish(MESSAGES_CHANNEL, messages)

export const sendMessage = (message: Omit<ChatMessage, "id" | "timestamp">) => {
  const newMessage: ChatMessage = {
    ...message,
    id: Date.now().toString(),
    timestamp: new Date().toISOString(),
  }

  messages.push(newMessage)

  // Update channel last activity
  const channel = channels.find((c) => c.id === message.channelId)
  if (channel) {
    channel.lastActivity = new Date().toISOString()
    realtimeService.publish(CHANNELS_CHANNEL, channels)
  }

  realtimeService.publish(MESSAGES_CHANNEL, messages)
  return newMessage
}

export const getMessages = (channelId: string) => {
  return messages
    .filter((m) => m.channelId === channelId)
    .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
}

export const getChannels = () => channels

export const subscribeToMessages = (callback: (messages: ChatMessage[]) => void) => {
  return realtimeService.subscribe(MESSAGES_CHANNEL, (data: ChatMessage[]) => {
    messages = data
    callback(data)
  })
}

export const subscribeToChannels = (callback: (channels: ChatChannel[]) => void) => {
  return realtimeService.subscribe(CHANNELS_CHANNEL, (data: ChatChannel[]) => {
    channels = data
    callback(data)
  })
}

export const addReaction = (messageId: string, emoji: string, userId: string) => {
  const message = messages.find((m) => m.id === messageId)
  if (message) {
    if (!message.reactions) message.reactions = []

    const existingReaction = message.reactions.find((r) => r.emoji === emoji)
    if (existingReaction) {
      if (!existingReaction.users.includes(userId)) {
        existingReaction.users.push(userId)
      }
    } else {
      message.reactions.push({ emoji, users: [userId] })
    }

    realtimeService.publish(MESSAGES_CHANNEL, messages)
  }
}

export const createChannel = (channel: Omit<ChatChannel, "id" | "createdAt" | "lastActivity">) => {
  const newChannel: ChatChannel = {
    ...channel,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    lastActivity: new Date().toISOString(),
  }

  channels.push(newChannel)
  realtimeService.publish(CHANNELS_CHANNEL, channels)
  return newChannel
}
