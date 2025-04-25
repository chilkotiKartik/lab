"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import AdminLayout from "@/components/admin/admin-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Clock, ArrowUpDown } from "lucide-react"
import { Progress } from "@/components/ui/progress"

// Mock project data
const projectSubmissions = [
  {
    id: "1",
    title: "QuantumNav",
    description: "Developing quantum navigation systems for interplanetary spacecraft with unprecedented accuracy.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=500&auto=format&fit=crop",
    status: "pending",
    progress: 75,
    team: [
      { name: "Dr. Elara Vega", avatar: "https://randomuser.me/api/portraits/women/1.jpg" },
      { name: "Prof. Kai Zhang", avatar: "https://randomuser.me/api/portraits/men/2.jpg" },
    ],
    submittedDate: "June 10, 2023",
    timeWaiting: "1 week",
    priority: "high",
    category: "spacecraft",
    likes: 42,
    comments: 12,
    views: 189,
  },
  {
    id: "2",
    title: "BioDrone Initiative",
    description: "Creating biomimetic drone designs inspired by birds and insects for atmospheric research.",
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?q=80&w=500&auto=format&fit=crop",
    status: "pending",
    progress: 60,
    team: [
      { name: "Dr. Aiden Mercer", avatar: "https://randomuser.me/api/portraits/men/3.jpg" },
      { name: "Dr. Lyra Chen", avatar: "https://randomuser.me/api/portraits/women/4.jpg" },
    ],
    submittedDate: "June 15, 2023",
    timeWaiting: "5 days",
    priority: "medium",
    category: "drones",
    likes: 38,
    comments: 9,
    views: 156,
  },
  {
    id: "3",
    title: "Orbital Shield",
    description: "Developing advanced shielding technology to protect satellites from space debris and radiation.",
    image: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?q=80&w=500&auto=format&fit=crop",
    status: "approved",
    progress: 25,
    team: [
      { name: "Dr. Elara Vega", avatar: "https://randomuser.me/api/portraits/women/1.jpg" },
      { name: "Dr. Aiden Mercer", avatar: "https://randomuser.me/api/portraits/men/3.jpg" },
    ],
    submittedDate: "May 28, 2023",
    timeWaiting: "Approved on June 5, 2023",
    priority: "low",
    category: "satellites",
    likes: 27,
    comments: 5,
    views: 98,
  },
  {
    id: "4",
    title: "Lunar Habitat Modules",
    description: "Designing sustainable habitat modules for long-term lunar exploration missions.",
    image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=500&auto=format&fit=crop",
    status: "rejected",
    progress: 40,
    team: [
      { name: "Prof. Kai Zhang", avatar: "https://randomuser.me/api/portraits/men/2.jpg" },
      { name: "Dr. Lyra Chen", avatar: "https://randomuser.me/api/portraits/women/4.jpg" },
    ],
    submittedDate: "June 1, 2023",
    timeWaiting: "Rejected on June 8, 2023",
    priority: "medium",
    category: "habitats",
    likes: 15,
    comments: 7,
    views: 76,
  },
]

// Status badge colors
const statusColors = {
  pending: "bg-amber-500/20 text-amber-500",
  approved: "bg-green-500/20 text-green-500",
  rejected: "bg-red-500/20 text-red-500",
}

// Priority badge colors
const priorityColors = {
  high: "bg-red-500/20 text-red-500",
  medium: "bg-amber-500/20 text-amber-500",
  low: "bg-blue-500/20 text-blue-500",
}

export default function ProjectReviewsPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [sortBy, setSortBy] = useState("date")
  const [sortOrder, setSortOrder] = useState("desc")
  const [filteredProjects, setFilteredProjects] = useState(projectSubmissions)

  useEffect(() => {
    let result = [...projectSubmissions]

    // Apply search filter
    if (searchTerm) {
      result = result.filter(
        (project) =>
          project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Apply status filter
    if (statusFilter !== "all") {
      result = result.filter((project) => project.status === statusFilter)
    }

    // Apply priority filter
    if (priorityFilter !== "all") {
      result = result.filter((project) => project.priority === priorityFilter)
    }

    // Apply sorting
    result.sort((a, b) => {
      if (sortBy === "date") {
        const dateA = new Date(a.submittedDate).getTime()
        const dateB = new Date(b.submittedDate).getTime()
        return sortOrder === "asc" ? dateA - dateB : dateB - dateA
      } else if (sortBy === "priority") {
        const priorityOrder = { high: 3, medium: 2, low: 1 }
        const priorityA = priorityOrder[a.priority as keyof typeof priorityOrder]
        const priorityB = priorityOrder[b.priority as keyof typeof priorityOrder]
        return sortOrder === "asc" ? priorityA - priorityB : priorityB - priorityA
      } else if (sortBy === "title") {
        return sortOrder === "asc" ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
      }
      return 0
    })

    setFilteredProjects(result)
  }, [searchTerm, statusFilter, priorityFilter, sortBy, sortOrder])

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc")
  }

  return (
    <AdminLayout>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Project Reviews</h1>
          <p className="text-muted-foreground">Review and approve project submissions</p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center space-x-2">
          <Button onClick={() => router.push("/admin/reviews/projects/create")}>Add New Project</Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <div className="flex items-center">
            <Filter className="mr-2 h-4 w-4 text-muted-foreground" />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priority</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon" onClick={toggleSortOrder}>
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Projects Table */}
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">Project</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead>Team</TableHead>
              <TableHead>
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4" />
                  Waiting Time
                </div>
              </TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell>
                    <div className="flex flex-col">
                      <div className="font-medium">{project.title}</div>
                      <div className="text-sm text-muted-foreground line-clamp-1">{project.description}</div>
                      <div className="flex items-center mt-1">
                        <Badge className={priorityColors[project.priority as keyof typeof priorityColors]}>
                          {project.priority}
                        </Badge>
                        <span className="text-xs text-muted-foreground ml-2">{project.category}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={statusColors[project.status as keyof typeof statusColors]}>
                      {project.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <Progress value={project.progress} className="h-2" />
                      <span className="text-xs text-muted-foreground">{project.progress}% complete</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex -space-x-2">
                      {project.team.map((member, index) => (
                        <Avatar key={index} className="border-2 border-background w-8 h-8">
                          <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                          <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">
                      {project.status === "pending" ? project.timeWaiting : project.timeWaiting.split(" on ")[0]}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.push(`/admin/reviews/projects/${project.id}`)}
                    >
                      Review
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  <div className="flex flex-col items-center justify-center">
                    <div className="text-muted-foreground mb-2">No projects found</div>
                    <div className="text-sm text-muted-foreground">Try adjusting your search or filter criteria</div>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </AdminLayout>
  )
}
