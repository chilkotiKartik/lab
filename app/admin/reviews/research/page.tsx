"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import AdminLayout from "@/components/admin/admin-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  FileText,
  Search,
  Filter,
  MoreVertical,
  CheckCircle,
  XCircle,
  Eye,
  Calendar,
  Clock,
  AlertCircle,
  User,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useToast } from "@/hooks/use-toast"

// Mock research data
const researchSubmissions = [
  {
    id: 1,
    title: "Quantum Navigation Systems for Interplanetary Travel",
    excerpt:
      "A groundbreaking approach to spacecraft navigation using quantum entanglement for precise positioning across vast distances.",
    status: "pending",
    category: "spacecraft",
    submittedDate: "June 15, 2023",
    author: "Dr. Elara Vega",
    authorAvatar: "https://randomuser.me/api/portraits/women/1.jpg",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=500&auto=format&fit=crop",
    priority: "high",
    timeWaiting: "2 days",
  },
  {
    id: 2,
    title: "Biomimetic Drone Designs for Atmospheric Sampling",
    excerpt:
      "Exploring how drone designs inspired by birds and insects can improve atmospheric data collection in extreme environments.",
    status: "pending",
    category: "drones",
    submittedDate: "June 12, 2023",
    author: "Prof. Kai Zhang",
    authorAvatar: "https://randomuser.me/api/portraits/men/2.jpg",
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?q=80&w=500&auto=format&fit=crop",
    priority: "medium",
    timeWaiting: "5 days",
  },
  {
    id: 3,
    title: "Self-Healing Materials for Orbital Debris Protection",
    excerpt:
      "Development of advanced materials that can automatically repair damage from micrometeoroid impacts on satellites and spacecraft.",
    status: "pending",
    category: "materials",
    submittedDate: "June 10, 2023",
    author: "Dr. Aiden Mercer",
    authorAvatar: "https://randomuser.me/api/portraits/men/3.jpg",
    image: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?q=80&w=500&auto=format&fit=crop",
    priority: "low",
    timeWaiting: "7 days",
  },
  {
    id: 4,
    title: "Neural Networks for Spacecraft Anomaly Detection",
    excerpt:
      "Implementation of deep learning algorithms to identify and respond to spacecraft system anomalies without human intervention.",
    status: "approved",
    category: "ai",
    submittedDate: "June 5, 2023",
    author: "Dr. Lyra Chen",
    authorAvatar: "https://randomuser.me/api/portraits/women/4.jpg",
    image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=500&auto=format&fit=crop",
    priority: "medium",
    timeWaiting: "Approved 2 days ago",
  },
  {
    id: 5,
    title: "Advanced Propulsion Systems for CubeSats",
    excerpt: "Developing miniaturized propulsion systems for small satellite platforms to extend mission capabilities.",
    status: "rejected",
    category: "propulsion",
    submittedDate: "June 1, 2023",
    author: "Dr. Marcus Lee",
    authorAvatar: "https://randomuser.me/api/portraits/men/5.jpg",
    image: "https://images.unsplash.com/photo-1454789548928-9efd52dc4031?q=80&w=500&auto=format&fit=crop",
    priority: "low",
    timeWaiting: "Rejected 3 days ago",
  },
]

// Status badge colors
const statusColors = {
  pending: "bg-amber-500/20 text-amber-500 hover:bg-amber-500/30",
  approved: "bg-green-500/20 text-green-500 hover:bg-green-500/30",
  rejected: "bg-red-500/20 text-red-500 hover:bg-red-500/30",
}

// Priority badge colors
const priorityColors = {
  high: "bg-red-500/20 text-red-500",
  medium: "bg-amber-500/20 text-amber-500",
  low: "bg-blue-500/20 text-blue-500",
}

export default function ResearchReviewPage() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("pending")
  const [submissions, setSubmissions] = useState(researchSubmissions)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Filter submissions based on search query and active tab
  const filteredSubmissions = submissions.filter(
    (submission) =>
      (activeTab === "all" ||
        (activeTab === "pending" && submission.status === "pending") ||
        (activeTab === "approved" && submission.status === "approved") ||
        (activeTab === "rejected" && submission.status === "rejected")) &&
      (searchQuery === "" ||
        submission.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        submission.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        submission.author.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const handleApprove = (id: number) => {
    setSubmissions(
      submissions.map((submission) =>
        submission.id === id ? { ...submission, status: "approved", timeWaiting: "Approved just now" } : submission,
      ),
    )
    toast({
      title: "Research Approved",
      description: "The research paper has been approved and published.",
    })
  }

  const handleReject = (id: number) => {
    setSubmissions(
      submissions.map((submission) =>
        submission.id === id ? { ...submission, status: "rejected", timeWaiting: "Rejected just now" } : submission,
      ),
    )
    toast({
      title: "Research Rejected",
      description: "The research paper has been rejected.",
    })
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Research Review</h1>
            <p className="text-muted-foreground">Review and manage research paper submissions.</p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Search submissions..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" className="sm:w-auto">
            <Filter className="mr-2 h-4 w-4" /> Filter
          </Button>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="pending" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All Submissions</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="approved">Approved</TabsTrigger>
            <TabsTrigger value="rejected">Rejected</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-4">
            {filteredSubmissions.length > 0 ? (
              <div className="grid gap-6">
                {filteredSubmissions.map((submission, index) => (
                  <motion.div
                    key={submission.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <ResearchSubmissionCard submission={submission} onApprove={handleApprove} onReject={handleReject} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12">
                <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No submissions found</h3>
                <p className="text-muted-foreground">
                  {searchQuery ? "Try adjusting your search query" : `No ${activeTab} submissions at the moment`}
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}

// Research Submission Card Component
function ResearchSubmissionCard({ submission, onApprove, onReject }) {
  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border overflow-hidden">
      <div className="flex flex-col md:flex-row">
        <div className="relative w-full md:w-48 h-48 md:h-auto">
          <Image src={submission.image || "/placeholder.svg"} alt={submission.title} fill className="object-cover" />
        </div>
        <div className="flex-1 p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
            <Badge className={`w-fit ${statusColors[submission.status] || "bg-muted text-muted-foreground"}`}>
              {submission.status === "pending"
                ? "Pending Review"
                : submission.status === "approved"
                  ? "Approved"
                  : "Rejected"}
            </Badge>
            <Badge className={`w-fit ${priorityColors[submission.priority] || "bg-muted text-muted-foreground"}`}>
              {submission.priority.charAt(0).toUpperCase() + submission.priority.slice(1)} Priority
            </Badge>
          </div>

          <h3 className="text-xl font-bold mb-2">{submission.title}</h3>
          <p className="text-muted-foreground text-sm mb-4">{submission.excerpt}</p>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full overflow-hidden mr-2">
                <Image
                  src={submission.authorAvatar || "/placeholder.svg"}
                  alt={submission.author}
                  width={32}
                  height={32}
                />
              </div>
              <div>
                <div className="text-sm font-medium">{submission.author}</div>
                <div className="text-xs text-muted-foreground">{submission.category}</div>
              </div>
            </div>

            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <div className="flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                <span>{submission.submittedDate}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                <span>{submission.timeWaiting}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 mt-4 pt-4 border-t border-border">
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" asChild>
                <Link href={`/admin/reviews/research/${submission.id}`}>
                  <Eye className="h-3 w-3 mr-1" /> View Details
                </Link>
              </Button>
            </div>

            <div className="flex items-center space-x-2">
              {submission.status === "pending" && (
                <>
                  <Button variant="outline" size="sm" className="text-red-500" onClick={() => onReject(submission.id)}>
                    <XCircle className="h-3 w-3 mr-1" /> Reject
                  </Button>
                  <Button variant="default" size="sm" onClick={() => onApprove(submission.id)}>
                    <CheckCircle className="h-3 w-3 mr-1" /> Approve
                  </Button>
                </>
              )}
              {submission.status === "approved" && (
                <Button variant="outline" size="sm" className="text-red-500" onClick={() => onReject(submission.id)}>
                  <XCircle className="h-3 w-3 mr-1" /> Revoke Approval
                </Button>
              )}
              {submission.status === "rejected" && (
                <Button variant="outline" size="sm" onClick={() => onApprove(submission.id)}>
                  <CheckCircle className="h-3 w-3 mr-1" /> Approve Instead
                </Button>
              )}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="h-4 w-4 mr-2" /> Contact Author
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <AlertCircle className="h-4 w-4 mr-2" /> Flag for Review
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
