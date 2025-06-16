import { realtimeService } from "./realtime-service"

export interface Announcement {
  id: string
  title: string
  content: string
  type: "info" | "warning" | "success" | "urgent"
  author: string
  createdAt: string
  targetAudience: "all" | "students" | "teachers" | "admins"
  isRead?: boolean
  priority: "low" | "medium" | "high"
}

const ANNOUNCEMENTS_CHANNEL = "announcements"

// Initialize with some mock data
let announcements: Announcement[] = [
  {
    id: "1",
    title: "Project Deadline Extended",
    content:
      "Due to popular request, the project submission deadline has been extended by one week. New deadline: March 15, 2024.",
    type: "info",
    author: "Admin",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    targetAudience: "all",
    priority: "medium",
  },
  {
    id: "2",
    title: "New Research Guidelines Available",
    content:
      "Updated research guidelines and templates are now available in the resources section. Please review before your next submission.",
    type: "success",
    author: "Admin",
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    targetAudience: "students",
    priority: "high",
  },
]

// Load announcements from storage on initialization
const storedAnnouncements = realtimeService.getStoredData(ANNOUNCEMENTS_CHANNEL)
if (storedAnnouncements) {
  announcements = storedAnnouncements
} else {
  // Save initial data
  realtimeService.publish(ANNOUNCEMENTS_CHANNEL, announcements)
}

export const createAnnouncement = (announcement: Omit<Announcement, "id" | "createdAt">) => {
  const newAnnouncement: Announcement = {
    ...announcement,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  }

  announcements.unshift(newAnnouncement)
  realtimeService.publish(ANNOUNCEMENTS_CHANNEL, announcements)

  return newAnnouncement
}

export const getAnnouncements = (userRole?: string) => {
  return announcements.filter(
    (announcement) =>
      announcement.targetAudience === "all" ||
      announcement.targetAudience === userRole ||
      (userRole === "student" && announcement.targetAudience === "students"),
  )
}

export const subscribeToAnnouncements = (callback: (announcements: Announcement[]) => void) => {
  return realtimeService.subscribe(ANNOUNCEMENTS_CHANNEL, (data: Announcement[]) => {
    announcements = data
    callback(data)
  })
}

export const markAnnouncementAsRead = (id: string) => {
  const announcement = announcements.find((a) => a.id === id)
  if (announcement) {
    announcement.isRead = true
    realtimeService.publish(ANNOUNCEMENTS_CHANNEL, announcements)
  }
}

export const deleteAnnouncement = (id: string) => {
  announcements = announcements.filter((a) => a.id !== id)
  realtimeService.publish(ANNOUNCEMENTS_CHANNEL, announcements)
}
