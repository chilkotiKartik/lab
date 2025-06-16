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

// Mock announcements data
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
  {
    id: "3",
    title: "System Maintenance Scheduled",
    content:
      "The system will undergo maintenance on Sunday, March 10th from 2:00 AM to 6:00 AM. Please save your work before this time.",
    type: "warning",
    author: "Admin",
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    targetAudience: "all",
    priority: "high",
  },
]

export const createAnnouncement = (announcement: Omit<Announcement, "id" | "createdAt">) => {
  const newAnnouncement: Announcement = {
    ...announcement,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  }
  announcements.unshift(newAnnouncement)
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

export const markAnnouncementAsRead = (id: string) => {
  const announcement = announcements.find((a) => a.id === id)
  if (announcement) {
    announcement.isRead = true
  }
}

export const deleteAnnouncement = (id: string) => {
  announcements = announcements.filter((a) => a.id !== id)
}
