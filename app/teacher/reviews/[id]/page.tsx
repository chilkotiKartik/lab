"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { TeacherLayout } from "@/components/teacher/teacher-layout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { CharacterAvatar } from "@/components/character-avatar"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft, Calendar, Clock, Download, FileText, Send, Star } from "lucide-react"
import Link from "next/link"

// Mock data for a single assignment
const assignmentData = {
  id: "1",
  title: "Quantum Navigation Research Paper",
  description: "Research and write a comprehensive paper on quantum navigation systems for interplanetary spacecraft.",
  student: {
    id: "s1",
    name: "Alex Johnson",
    avatar: 2,
    level: 3,
  },
  submittedDate: "2023-07-10",
  dueDate: "2023-07-15",
  course: "Advanced Physics",
  priority: "high",
  status: "submitted",
  attachments: [
    { name: "quantum_navigation_paper.pdf", size: "2.4 MB", type: "pdf" },
    { name: "research_data.xlsx", size: "1.1 MB", type: "excel" },
  ],
  content: `
    # Quantum Navigation Systems for Interplanetary Travel
    
    ## Abstract
    This paper explores the application of quantum computing principles to spacecraft navigation systems, enabling unprecedented accuracy for interplanetary travel.
    
    ## Introduction
    Traditional navigation systems for spacecraft rely on radio signals from Earth, which can be delayed by minutes or even hours depending on the distance. Quantum navigation offers a promising alternative that could revolutionize how spacecraft determine their position in space.
    
    ## Methodology
    Our research utilized quantum entanglement principles to develop a navigation system that does not rely on external signals. By leveraging quantum sensors and atomic clocks, we created a self-contained navigation system.
    
    ## Results
    Initial simulations show a 40% improvement in navigation accuracy compared to traditional methods, with potential for further optimization.
    
    ## Conclusion
    Quantum navigation represents a significant advancement in spacecraft technology that could enable more precise and autonomous interplanetary missions.
  `,
}

export default function AssignmentReviewPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [feedback, setFeedback] = useState("")
  const [grade, setGrade] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmitReview = () => {
    if (!feedback.trim()) {
      toast({
        title: "Feedback Required",
        description: "Please provide feedback before submitting your review.",
        variant: "destructive",
      })
      return
    }

    if (!grade.trim()) {
      toast({
        title: "Grade Required",
        description: "Please provide a grade before submitting your review.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Review Submitted",
        description: "Your review has been submitted successfully.",
      })
      setIsSubmitting(false)
      router.push("/teacher/reviews")
    }, 1500)
  }

  return (
    <TeacherLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/teacher/reviews">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <h1 className="text-2xl font-bold">Assignment Review</h1>
          </div>
          <div className="flex items-center gap-2">
            <Badge
              variant={
                assignmentData.priority === "high"
                  ? "destructive"
                  : assignmentData.priority === "medium"
                    ? "secondary"
                    : "outline"
              }
            >
              {assignmentData.priority === "high"
                ? "High Priority"
                : assignmentData.priority === "medium"
                  ? "Medium"
                  : "Low"}
            </Badge>
            <Badge variant="outline">{assignmentData.course}</Badge>
          </div>
        </div>

        {/* Assignment Info */}
        <Card className="bg-card/50 backdrop-blur-sm border-border">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle className="text-xl">{assignmentData.title}</CardTitle>
                <CardDescription>{assignmentData.description}</CardDescription>
              </div>
              <div className="flex items-center gap-3">
                <CharacterAvatar role="student" variant={assignmentData.student.avatar} size="md" />
                <div>
                  <div className="font-medium">{assignmentData.student.name}</div>
                  <div className="text-sm text-muted-foreground">Level {assignmentData.student.level} Student</div>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4 mb-4">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm">Submitted: {assignmentData.submittedDate}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm">Due: {assignmentData.dueDate}</span>
              </div>
              <div className="flex items-center">
                <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm">Status: {assignmentData.status}</span>
              </div>
            </div>

            <Tabs defaultValue="content" className="w-full">
              <TabsList className="grid grid-cols-2 mb-4">
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="attachments">Attachments</TabsTrigger>
              </TabsList>
              <TabsContent value="content" className="space-y-4">
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: assignmentData.content.replace(/\n/g, "<br />") }} />
                </div>
              </TabsContent>
              <TabsContent value="attachments" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {assignmentData.attachments.map((attachment, index) => (
                    <Card key={index} className="bg-background/50">
                      <CardContent className="p-4 flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="p-2 bg-primary/10 rounded-md mr-3">
                            <FileText className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium">{attachment.name}</div>
                            <div className="text-xs text-muted-foreground">{attachment.size}</div>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon">
                          <Download className="h-4 w-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Review Form */}
        <Card className="bg-card/50 backdrop-blur-sm border-border">
          <CardHeader>
            <CardTitle>Your Review</CardTitle>
            <CardDescription>Provide feedback and grade for this assignment</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="feedback">Feedback</Label>
              <Textarea
                id="feedback"
                placeholder="Enter your feedback for the student..."
                className="min-h-32"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="grade">Grade</Label>
                <div className="flex items-center">
                  <Input
                    id="grade"
                    placeholder="Enter grade (e.g., 95)"
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                  />
                  <span className="ml-2 text-muted-foreground">/100</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Rating</Label>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Button
                      key={star}
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground hover:text-yellow-500"
                    >
                      <Star className="h-5 w-5" fill={star <= 4 ? "currentColor" : "none"} />
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" asChild>
              <Link href="/teacher/reviews">Cancel</Link>
            </Button>
            <Button onClick={handleSubmitReview} disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Review"}
              {!isSubmitting && <Send className="ml-2 h-4 w-4" />}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </TeacherLayout>
  )
}
