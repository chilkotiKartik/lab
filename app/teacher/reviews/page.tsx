"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { TeacherLayout } from "@/components/teacher/teacher-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CharacterAvatar } from "@/components/character-avatar"
import { useAuth } from "@/components/auth-provider"
import { useToast } from "@/hooks/use-toast"
import { SpaceBackground } from "@/components/space-background"
import { SpaceParticles } from "@/components/space-particles"
import { Search, Filter, Clock, Calendar, FileText, CheckCircle, XCircle } from "lucide-react"
import Link from "next/link"

// Mock data
const pendingReviews = [
  {
    id: "1",
    title: "Quantum Navigation Research Paper",
    student: "Alex Johnson",
    studentAvatar: 1,
    submittedDate: "2023-07-10",
    dueDate: "2023-07-15",
    course: "Advanced Physics",
    priority: "high",
    type: "research",
  },
  {
    id: "2",
    title: "Biomimetic Drone Design Project",
    student: "Maya Patel",
    studentAvatar: 2,
    submittedDate: "2023-07-08",
    dueDate: "2023-07-22",
    course: "Aerospace Engineering",
    priority: "medium",
    type: "project",
  },
  {
    id: "3",
    title: "Self-Healing Materials Analysis",
    student: "Carlos Rodriguez",
    studentAvatar: 3,
    submittedDate: "2023-07-12",
    dueDate: "2023-08-05",
    course: "Materials Science",
    priority: "low",
    type: "research",
  },
  {
    id: "4",
    title: "Satellite Communication Protocol",
    student: "Emma Wilson",
    studentAvatar: 4,
    submittedDate: "2023-07-11",
    dueDate: "2023-07-25",
    course: "Space Communications",
    priority: "medium",
    type: "project",
  },
  {
    id: "5",
    title: "Orbital Mechanics Simulation",
    student: "Jamal Ahmed",
    studentAvatar: 5,
    submittedDate: "2023-07-09",
    dueDate: "2023-07-18",
    course: "Advanced Physics",
    priority: "high",
    type: "project",
  },
]

const completedReviews = [
  {
    id: "6",
    title: "Lunar Habitat Design",
    student: "Sofia Chen",
    studentAvatar: 2,
    submittedDate: "2023-06-28",
    reviewedDate: "2023-07-05",
    course: "Space Architecture",
    grade: "A",
    type: "project",
  },
  {
    id: "7",
    title: "Propulsion Systems Comparison",
    student: "Marcus Johnson",
    studentAvatar: 1,
    submittedDate: "2023-06-25",
    reviewedDate: "2023-07-02",
    course: "Aerospace Engineering",
    grade: "B+",
    type: "research",
  },
  {
    id: "8",
    title: "Exoplanet Atmosphere Analysis",
    student: "Leila Patel",
    studentAvatar: 3,
    submittedDate: "2023-06-20",
    reviewedDate: "2023-06-30",
    course: "Planetary Science",
    grade: "A-",
    type: "research",
  },
]

export default function TeacherReviewsPage() {
  const router = useRouter()
  const { user, isLoading } = useAuth()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("pending")
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredPending, setFilteredPending] = useState(pendingReviews)
  const [filteredCompleted, setFilteredCompleted] = useState(completedReviews)
  const [selectedType, setSelectedType] = useState("all")
  const [selectedPriority, setSelectedPriority] = useState("all")
  const [showFilters, setShowFilters] = useState(false)

  // Redirect if not logged in or not a teacher
  useEffect(() => {
    if (!isLoading && (!user || user.role !== "teacher")) {
      router.push("/login?redirect=/teacher/reviews")
    }
  }, [user, isLoading, router])

  // Filter reviews based on search query and filters
  useEffect(() => {
    const filterReviews = () => {
      // Filter pending reviews
      const pendingFiltered = pendingReviews.filter((review) => {
        const matchesSearch =
          review.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          review.student.toLowerCase().includes(searchQuery.toLowerCase()) ||
          review.course.toLowerCase().includes(searchQuery.toLowerCase())

        const matchesType = selectedType === "all" || review.type === selectedType
        const matchesPriority = selectedPriority === "all" || review.priority === selectedPriority

        return matchesSearch && matchesType && matchesPriority
      })

      // Filter completed reviews
      const completedFiltered = completedReviews.filter((review) => {
        const matchesSearch =
          review.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          review.student.toLowerCase().includes(searchQuery.toLowerCase()) ||
          review.course.toLowerCase().includes(searchQuery.toLowerCase())

        const matchesType = selectedType === "all" || review.type === selectedType

        return matchesSearch && matchesType
      })

      setFilteredPending(pendingFiltered)
      setFilteredCompleted(completedFiltered)
    }

    filterReviews()
  }, [searchQuery, selectedType, selectedPriority])

  const handleQuickApprove = (id: string) => {
    toast({
      title: "Assignment Approved",
      description: "The assignment has been approved successfully.",
    })

    // In a real app, this would update the database
    setFilteredPending((prev) => prev.filter((review) => review.id !== id))
  }

  const handleQuickReject = (id: string) => {
    toast({
      title: "Assignment Rejected",
      description: "The assignment has been rejected.",
      variant: "destructive",
    })

    // In a real app, this would update the database
    setFilteredPending((prev) => prev.filter((review) => review.id !== id))
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <TeacherLayout>
      <div className="relative space-y-6">
        <div className="absolute inset-0 -z-10 opacity-10">
          <SpaceBackground starCount={100} />
          <SpaceParticles particleCount={20} />
        </div>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Assignment Reviews</h1>
            <p className="text-muted-foreground">Manage and review student submissions</p>
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search assignments..."
                className="pl-8 w-full md:w-[250px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowFilters(!showFilters)}
              className={showFilters ? "bg-muted" : ""}
            >
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Filters */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-4"
          >
            <div className="flex flex-wrap gap-4">
              <div className="space-y-2">
                <p className="text-sm font-medium">Type</p>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant={selectedType === "all" ? "default" : "outline"}
                    onClick={() => setSelectedType("all")}
                  >
                    All
                  </Button>
                  <Button
                    size="sm"
                    variant={selectedType === "research" ? "default" : "outline"}
                    onClick={() => setSelectedType("research")}
                  >
                    Research
                  </Button>
                  <Button
                    size="sm"
                    variant={selectedType === "project" ? "default" : "outline"}
                    onClick={() => setSelectedType("project")}
                  >
                    Project
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Priority</p>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant={selectedPriority === "all" ? "default" : "outline"}
                    onClick={() => setSelectedPriority("all")}
                  >
                    All
                  </Button>
                  <Button
                    size="sm"
                    variant={selectedPriority === "high" ? "default" : "outline"}
                    className={selectedPriority === "high" ? "bg-red-500 hover:bg-red-600" : ""}
                    onClick={() => setSelectedPriority("high")}
                  >
                    High
                  </Button>
                  <Button
                    size="sm"
                    variant={selectedPriority === "medium" ? "default" : "outline"}
                    className={selectedPriority === "medium" ? "bg-amber-500 hover:bg-amber-600" : ""}
                    onClick={() => setSelectedPriority("medium")}
                  >
                    Medium
                  </Button>
                  <Button
                    size="sm"
                    variant={selectedPriority === "low" ? "default" : "outline"}
                    className={selectedPriority === "low" ? "bg-green-500 hover:bg-green-600" : ""}
                    onClick={() => setSelectedPriority("low")}
                  >
                    Low
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Tabs */}
        <Tabs defaultValue="pending" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="pending">
              Pending <Badge className="ml-2 bg-primary">{filteredPending.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="completed">
              Completed <Badge className="ml-2">{filteredCompleted.length}</Badge>
            </TabsTrigger>
          </TabsList>

          {/* Pending Reviews Tab */}
          <TabsContent value="pending" className="space-y-4">
            {filteredPending.length > 0 ? (
              filteredPending.map((review, index) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Card className="bg-card/50 backdrop-blur-sm border-border overflow-hidden">
                    <CardContent className="p-0">
                      <div className="flex flex-col md:flex-row">
                        {/* Priority indicator */}
                        <div
                          className={`w-full md:w-1 h-1 md:h-auto ${
                            review.priority === "high"
                              ? "bg-red-500"
                              : review.priority === "medium"
                                ? "bg-amber-500"
                                : "bg-green-500"
                          }`}
                        ></div>

                        <div className="p-6 flex-1">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div className="flex items-start gap-4">
                              <CharacterAvatar role="student" variant={review.studentAvatar} size="md" />
                              <div>
                                <div className="flex items-center gap-2">
                                  <h3 className="font-medium text-lg">{review.title}</h3>
                                  <Badge variant="outline" className="capitalize">
                                    {review.type}
                                  </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  {review.student} • {review.course}
                                </p>
                                <div className="flex flex-wrap gap-4 mt-2">
                                  <div className="flex items-center">
                                    <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
                                    <span className="text-xs text-muted-foreground">
                                      Submitted: {review.submittedDate}
                                    </span>
                                  </div>
                                  <div className="flex items-center">
                                    <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
                                    <span className="text-xs text-muted-foreground">Due: {review.dueDate}</span>
                                  </div>
                                  <Badge
                                    variant={
                                      review.priority === "high"
                                        ? "destructive"
                                        : review.priority === "medium"
                                          ? "secondary"
                                          : "outline"
                                    }
                                  >
                                    {review.priority === "high"
                                      ? "High Priority"
                                      : review.priority === "medium"
                                        ? "Medium"
                                        : "Low"}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                className="bg-green-500/10 text-green-500 hover:bg-green-500/20 border-green-500/20"
                                onClick={() => handleQuickApprove(review.id)}
                              >
                                <CheckCircle className="h-4 w-4 mr-1" /> Approve
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="bg-red-500/10 text-red-500 hover:bg-red-500/20 border-red-500/20"
                                onClick={() => handleQuickReject(review.id)}
                              >
                                <XCircle className="h-4 w-4 mr-1" /> Reject
                              </Button>
                              <Button size="sm" variant="default" asChild>
                                <Link href={`/teacher/reviews/${review.id}`}>Full Review</Link>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            ) : (
              <Card className="bg-card/50 backdrop-blur-sm border-border">
                <CardContent className="p-6 text-center">
                  <div className="flex flex-col items-center justify-center py-8">
                    <div className="rounded-full bg-muted p-3 mb-4">
                      <CheckCircle className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">All caught up!</h3>
                    <p className="text-muted-foreground">No pending assignments match your current filters.</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Completed Reviews Tab */}
          <TabsContent value="completed" className="space-y-4">
            {filteredCompleted.length > 0 ? (
              filteredCompleted.map((review, index) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Card className="bg-card/50 backdrop-blur-sm border-border">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <CharacterAvatar role="student" variant={review.studentAvatar} size="md" />
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium text-lg">{review.title}</h3>
                              <Badge variant="outline" className="capitalize">
                                {review.type}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {review.student} • {review.course}
                            </p>
                            <div className="flex flex-wrap gap-4 mt-2">
                              <div className="flex items-center">
                                <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
                                <span className="text-xs text-muted-foreground">Submitted: {review.submittedDate}</span>
                              </div>
                              <div className="flex items-center">
                                <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
                                <span className="text-xs text-muted-foreground">Reviewed: {review.reviewedDate}</span>
                              </div>
                              <Badge className="bg-green-500/20 text-green-500">Grade: {review.grade}</Badge>
                            </div>
                          </div>
                        </div>
                        <div>
                          <Button size="sm" variant="outline" asChild>
                            <Link href={`/teacher/reviews/${review.id}`}>View Details</Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            ) : (
              <Card className="bg-card/50 backdrop-blur-sm border-border">
                <CardContent className="p-6 text-center">
                  <div className="flex flex-col items-center justify-center py-8">
                    <div className="rounded-full bg-muted p-3 mb-4">
                      <FileText className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">No completed reviews</h3>
                    <p className="text-muted-foreground">No completed assignments match your current filters.</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </TeacherLayout>
  )
}
