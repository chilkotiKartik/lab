"use client"

import { useState } from "react"
import { StudentLayout } from "@/components/student/student-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { CharacterAvatar } from "@/components/character-avatar"
import { Calendar, Clock, Filter, Search, FileText } from "lucide-react"
import Link from "next/link"

// Mock data
const pendingAssignments = [
  {
    id: "1",
    title: "Quantum Navigation Research Paper",
    course: "Advanced Physics",
    instructor: "Dr. Rajesh Kumar",
    instructorAvatar: 2,
    dueDate: "2023-07-15",
    status: "in-progress",
    progress: 25,
    priority: "high",
  },
  {
    id: "2",
    title: "Biomimetic Drone Design Project",
    course: "Aerospace Engineering",
    instructor: "Prof. Sarah Chen",
    instructorAvatar: 3,
    dueDate: "2023-07-22",
    status: "in-progress",
    progress: 60,
    priority: "medium",
  },
  {
    id: "3",
    title: "Self-Healing Materials Analysis",
    course: "Materials Science",
    instructor: "Dr. James Wilson",
    instructorAvatar: 1,
    dueDate: "2023-08-05",
    status: "not-started",
    progress: 0,
    priority: "low",
  },
]

const completedAssignments = [
  {
    id: "4",
    title: "Introduction to Quantum Computing",
    course: "Computer Science",
    instructor: "Dr. Elara Vega",
    instructorAvatar: 4,
    submittedDate: "2023-06-28",
    grade: "92",
    feedback: "Excellent work on quantum algorithms section.",
  },
  {
    id: "5",
    title: "Atmospheric Sampling Techniques",
    course: "Environmental Science",
    instructor: "Prof. Kai Zhang",
    instructorAvatar: 5,
    submittedDate: "2023-06-25",
    grade: "88",
    feedback: "Good analysis, but could improve on methodology section.",
  },
]

export default function StudentAssignmentsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("pending")

  // Filter assignments based on search query
  const filteredPendingAssignments = pendingAssignments.filter(
    (assignment) =>
      assignment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      assignment.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
      assignment.instructor.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredCompletedAssignments = completedAssignments.filter(
    (assignment) =>
      assignment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      assignment.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
      assignment.instructor.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <StudentLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Assignments</h1>
            <p className="text-muted-foreground">View and manage your course assignments</p>
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
              Pending <Badge className="ml-2 bg-primary">{pendingAssignments.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="completed">
              Completed <Badge className="ml-2">{completedAssignments.length}</Badge>
            </TabsTrigger>
          </TabsList>

          {/* Pending Assignments Tab */}
          <TabsContent value="pending" className="space-y-4">
            {filteredPendingAssignments.length > 0 ? (
              filteredPendingAssignments.map((assignment) => (
                <Card key={assignment.id} className="bg-card/50 backdrop-blur-sm border-border">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-primary/10 rounded-lg">
                          <FileText className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium text-lg">{assignment.title}</h3>
                          <div className="text-sm text-muted-foreground">Course: {assignment.course}</div>
                          <div className="flex items-center gap-2 mt-1">
                            <CharacterAvatar role="teacher" variant={assignment.instructorAvatar} size="xs" />
                            <span className="text-sm text-muted-foreground">Instructor: {assignment.instructor}</span>
                          </div>
                          <div className="flex flex-wrap gap-4 mt-2">
                            <div className="flex items-center">
                              <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
                              <span className="text-xs">Due: {assignment.dueDate}</span>
                            </div>
                            <Badge
                              variant={
                                assignment.status === "in-progress"
                                  ? "secondary"
                                  : assignment.status === "not-started"
                                    ? "outline"
                                    : "default"
                              }
                            >
                              {assignment.status === "in-progress"
                                ? "In Progress"
                                : assignment.status === "not-started"
                                  ? "Not Started"
                                  : "Submitted"}
                            </Badge>
                            <Badge
                              variant={
                                assignment.priority === "high"
                                  ? "destructive"
                                  : assignment.priority === "medium"
                                    ? "secondary"
                                    : "outline"
                              }
                            >
                              {assignment.priority === "high"
                                ? "High Priority"
                                : assignment.priority === "medium"
                                  ? "Medium"
                                  : "Low"}
                            </Badge>
                          </div>
                          <div className="mt-2">
                            <div className="flex justify-between text-xs mb-1">
                              <span>Progress</span>
                              <span>{assignment.progress}%</span>
                            </div>
                            <Progress value={assignment.progress} className="h-1" />
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Button size="sm" asChild>
                          <Link href={`/student/assignments/${assignment.id}`}>
                            {assignment.status === "not-started" ? "Start" : "Continue"}
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="bg-card/50 backdrop-blur-sm border-border">
                <CardContent className="p-6 text-center">
                  <p className="text-muted-foreground">No pending assignments found.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Completed Assignments Tab */}
          <TabsContent value="completed" className="space-y-4">
            {filteredCompletedAssignments.length > 0 ? (
              filteredCompletedAssignments.map((assignment) => (
                <Card key={assignment.id} className="bg-card/50 backdrop-blur-sm border-border">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-green-500/10 rounded-lg">
                          <FileText className="h-6 w-6 text-green-500" />
                        </div>
                        <div>
                          <h3 className="font-medium text-lg">{assignment.title}</h3>
                          <div className="text-sm text-muted-foreground">Course: {assignment.course}</div>
                          <div className="flex items-center gap-2 mt-1">
                            <CharacterAvatar role="teacher" variant={assignment.instructorAvatar} size="xs" />
                            <span className="text-sm text-muted-foreground">Instructor: {assignment.instructor}</span>
                          </div>
                          <div className="flex flex-wrap gap-4 mt-2">
                            <div className="flex items-center">
                              <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
                              <span className="text-xs">Submitted: {assignment.submittedDate}</span>
                            </div>
                            <Badge variant="outline" className="bg-green-500/10 text-green-500">
                              Grade: {assignment.grade}/100
                            </Badge>
                          </div>
                          <div className="mt-2 text-sm">
                            <span className="font-medium">Feedback:</span> {assignment.feedback}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Button size="sm" variant="outline" asChild>
                          <Link href={`/student/assignments/${assignment.id}`}>View Details</Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="bg-card/50 backdrop-blur-sm border-border">
                <CardContent className="p-6 text-center">
                  <p className="text-muted-foreground">No completed assignments found.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </StudentLayout>
  )
}
