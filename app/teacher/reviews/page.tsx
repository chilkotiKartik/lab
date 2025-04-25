"use client"

import { useState } from "react"
import { TeacherLayout } from "@/components/teacher/teacher-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CharacterAvatar } from "@/components/character-avatar"
import { Calendar, Clock, Filter, Search } from "lucide-react"
import Link from "next/link"

// Mock data
const pendingReviews = [
  {
    id: "1",
    title: "Quantum Navigation Research Paper",
    student: {
      id: "s1",
      name: "Alex Johnson",
      avatar: 2,
    },
    submittedDate: "2023-07-10",
    dueDate: "2023-07-15",
    course: "Advanced Physics",
    priority: "high",
  },
  {
    id: "2",
    title: "Biomimetic Drone Design Project",
    student: {
      id: "s2",
      name: "Maya Patel",
      avatar: 3,
    },
    submittedDate: "2023-07-08",
    dueDate: "2023-07-22",
    course: "Aerospace Engineering",
    priority: "medium",
  },
  {
    id: "3",
    title: "Self-Healing Materials Analysis",
    student: {
      id: "s3",
      name: "Carlos Rodriguez",
      avatar: 1,
    },
    submittedDate: "2023-07-12",
    dueDate: "2023-08-05",
    course: "Materials Science",
    priority: "low",
  },
  {
    id: "4",
    title: "Satellite Communication Systems",
    student: {
      id: "s4",
      name: "Emma Wilson",
      avatar: 4,
    },
    submittedDate: "2023-07-11",
    dueDate: "2023-07-18",
    course: "Telecommunications",
    priority: "medium",
  },
  {
    id: "5",
    title: "Orbital Mechanics Simulation",
    student: {
      id: "s5",
      name: "Jamal Ahmed",
      avatar: 5,
    },
    submittedDate: "2023-07-09",
    dueDate: "2023-07-16",
    course: "Advanced Physics",
    priority: "high",
  },
]

const completedReviews = [
  {
    id: "6",
    title: "Introduction to Quantum Computing",
    student: {
      id: "s6",
      name: "Sophia Chen",
      avatar: 1,
    },
    submittedDate: "2023-06-28",
    reviewedDate: "2023-07-05",
    course: "Computer Science",
    grade: "92",
  },
  {
    id: "7",
    title: "Atmospheric Sampling Techniques",
    student: {
      id: "s7",
      name: "Daniel Kim",
      avatar: 3,
    },
    submittedDate: "2023-06-25",
    reviewedDate: "2023-07-02",
    course: "Environmental Science",
    grade: "88",
  },
  {
    id: "8",
    title: "Space Debris Mitigation Strategies",
    student: {
      id: "s8",
      name: "Olivia Martinez",
      avatar: 2,
    },
    submittedDate: "2023-06-30",
    reviewedDate: "2023-07-07",
    course: "Aerospace Engineering",
    grade: "95",
  },
]

export default function TeacherReviewsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("pending")

  // Filter reviews based on search query
  const filteredPendingReviews = pendingReviews.filter(
    (review) =>
      review.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.course.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredCompletedReviews = completedReviews.filter(
    (review) =>
      review.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.course.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <TeacherLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Assignment Reviews</h1>
            <p className="text-muted-foreground">Manage and review student assignments</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search assignments..."
                className="pl-8 w-full md:w-[250px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="pending" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="pending">
              Pending Reviews <Badge className="ml-2 bg-primary">{pendingReviews.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="completed">
              Completed <Badge className="ml-2">{completedReviews.length}</Badge>
            </TabsTrigger>
          </TabsList>

          {/* Pending Reviews Tab */}
          <TabsContent value="pending" className="space-y-4">
            {filteredPendingReviews.length > 0 ? (
              filteredPendingReviews.map((review) => (
                <Card key={review.id} className="bg-card/50 backdrop-blur-sm border-border">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <CharacterAvatar role="student" variant={review.student.avatar} size="md" />
                        <div>
                          <h3 className="font-medium text-lg">{review.title}</h3>
                          <div className="text-sm text-muted-foreground">Student: {review.student.name}</div>
                          <div className="text-sm text-muted-foreground">Course: {review.course}</div>
                          <div className="flex flex-wrap gap-4 mt-2">
                            <div className="flex items-center">
                              <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
                              <span className="text-xs">Submitted: {review.submittedDate}</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
                              <span className="text-xs">Due: {review.dueDate}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
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
                        <Button size="sm" asChild>
                          <Link href={`/teacher/reviews/${review.id}`}>Review</Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="bg-card/50 backdrop-blur-sm border-border">
                <CardContent className="p-6 text-center">
                  <p className="text-muted-foreground">No pending reviews found.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Completed Reviews Tab */}
          <TabsContent value="completed" className="space-y-4">
            {filteredCompletedReviews.length > 0 ? (
              filteredCompletedReviews.map((review) => (
                <Card key={review.id} className="bg-card/50 backdrop-blur-sm border-border">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <CharacterAvatar role="student" variant={review.student.avatar} size="md" />
                        <div>
                          <h3 className="font-medium text-lg">{review.title}</h3>
                          <div className="text-sm text-muted-foreground">Student: {review.student.name}</div>
                          <div className="text-sm text-muted-foreground">Course: {review.course}</div>
                          <div className="flex flex-wrap gap-4 mt-2">
                            <div className="flex items-center">
                              <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
                              <span className="text-xs">Submitted: {review.submittedDate}</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
                              <span className="text-xs">Reviewed: {review.reviewedDate}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Badge variant="outline" className="bg-green-500/10 text-green-500">
                          Grade: {review.grade}/100
                        </Badge>
                        <Button size="sm" variant="outline" asChild>
                          <Link href={`/teacher/reviews/${review.id}`}>View Details</Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="bg-card/50 backdrop-blur-sm border-border">
                <CardContent className="p-6 text-center">
                  <p className="text-muted-foreground">No completed reviews found.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </TeacherLayout>
  )
}
