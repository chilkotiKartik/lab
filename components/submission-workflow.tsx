"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useAuth } from "@/components/auth-provider"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { UserAvatar } from "@/components/user-avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { CheckCircle, XCircle, Clock, Send, FileText, Upload, Eye, MessageSquare } from "lucide-react"

interface Submission {
  id: string
  title: string
  description: string
  content: string
  category: string
  type: "research" | "project"
  status: "draft" | "submitted" | "under_review" | "approved" | "rejected"
  priority: "low" | "medium" | "high"
  author_id: string
  author_name: string
  submitted_at?: string
  reviewed_at?: string
  reviewer_feedback?: string
  attachments?: string[]
  tags?: string[]
}

interface SubmissionWorkflowProps {
  userRole: "student" | "admin" | "teacher"
}

export function SubmissionWorkflow({ userRole }: SubmissionWorkflowProps) {
  const { user } = useAuth()
  const { toast } = useToast()
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null)
  const [reviewFeedback, setReviewFeedback] = useState("")
  const [showReviewDialog, setShowReviewDialog] = useState(false)
  const [reviewAction, setReviewAction] = useState<"approve" | "reject" | null>(null)

  // Load submissions based on user role
  useEffect(() => {
    loadSubmissions()
  }, [user, userRole])

  const loadSubmissions = async () => {
    if (!user) return

    setIsLoading(true)
    try {
      // Mock submissions data - in real app, this would come from Supabase
      const mockSubmissions: Submission[] = [
        {
          id: "sub-1",
          title: "Quantum Entanglement Communication System",
          description:
            "Revolutionary communication system using quantum entanglement for instantaneous data transfer across vast distances.",
          content:
            "This research explores the practical applications of quantum entanglement in space communications...",
          category: "Space",
          type: "research",
          status: userRole === "student" ? "submitted" : "under_review",
          priority: "high",
          author_id: "lakshay-verma",
          author_name: "Lakshay Verma",
          submitted_at: new Date(Date.now() - 3600000).toISOString(),
          tags: ["quantum", "communication", "space"],
        },
        {
          id: "sub-2",
          title: "Bio-Inspired Drone Navigation",
          description:
            "Drone navigation system inspired by bird migration patterns and insect flight dynamics for autonomous exploration.",
          content: "This project develops a navigation system that mimics biological flight patterns...",
          category: "Drone",
          type: "project",
          status: userRole === "student" ? "approved" : "approved",
          priority: "medium",
          author_id: "harshal-kokate",
          author_name: "Harshal Kokate",
          submitted_at: new Date(Date.now() - 7200000).toISOString(),
          reviewed_at: new Date(Date.now() - 1800000).toISOString(),
          reviewer_feedback: "Excellent work! The bio-inspired approach is innovative and well-executed.",
          tags: ["drone", "navigation", "bio-inspired"],
        },
        {
          id: "sub-3",
          title: "Atmospheric Pressure Analysis on Mars",
          description:
            "Comprehensive study of Martian atmospheric conditions for future colonization planning and habitat design.",
          content: "This research analyzes atmospheric pressure variations on Mars...",
          category: "Space",
          type: "research",
          status: userRole === "student" ? "rejected" : "rejected",
          priority: "low",
          author_id: "swarnabha-banerjee",
          author_name: "Swarnabha Banerjee",
          submitted_at: new Date(Date.now() - 10800000).toISOString(),
          reviewed_at: new Date(Date.now() - 3600000).toISOString(),
          reviewer_feedback:
            "Good research foundation, but needs more detailed analysis of seasonal variations. Please revise and resubmit.",
          tags: ["mars", "atmosphere", "colonization"],
        },
      ]

      // Filter submissions based on user role
      if (userRole === "student") {
        setSubmissions(mockSubmissions.filter((sub) => sub.author_id === user.id || sub.author_name === user.name))
      } else {
        setSubmissions(mockSubmissions)
      }
    } catch (error) {
      console.error("Error loading submissions:", error)
      toast({
        title: "Error",
        description: "Failed to load submissions",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleReviewSubmission = async (submissionId: string, action: "approve" | "reject") => {
    if (!reviewFeedback.trim()) {
      toast({
        title: "Feedback Required",
        description: "Please provide feedback before reviewing the submission",
        variant: "destructive",
      })
      return
    }

    try {
      // Update submission status
      setSubmissions((prev) =>
        prev.map((sub) =>
          sub.id === submissionId
            ? {
                ...sub,
                status: action === "approve" ? "approved" : "rejected",
                reviewed_at: new Date().toISOString(),
                reviewer_feedback: reviewFeedback,
              }
            : sub,
        ),
      )

      toast({
        title: action === "approve" ? "Submission Approved! ✅" : "Submission Rejected",
        description: `The submission has been ${action}d and feedback sent to the author.`,
      })

      setShowReviewDialog(false)
      setReviewFeedback("")
      setSelectedSubmission(null)
      setReviewAction(null)
    } catch (error) {
      console.error("Error reviewing submission:", error)
      toast({
        title: "Error",
        description: "Failed to review submission",
        variant: "destructive",
      })
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "rejected":
        return <XCircle className="h-4 w-4 text-red-500" />
      case "under_review":
        return <Clock className="h-4 w-4 text-orange-500" />
      case "submitted":
        return <Send className="h-4 w-4 text-blue-500" />
      default:
        return <FileText className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      case "rejected":
        return "bg-red-500/10 text-red-500 border-red-500/20"
      case "under_review":
        return "bg-orange-500/10 text-orange-500 border-orange-500/20"
      case "submitted":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500/10 text-red-500"
      case "medium":
        return "bg-orange-500/10 text-orange-500"
      case "low":
        return "bg-green-500/10 text-green-500"
      default:
        return "bg-gray-500/10 text-gray-500"
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading submissions...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{userRole === "student" ? "My Submissions" : "Review Submissions"}</h2>
          <p className="text-muted-foreground">
            {userRole === "student"
              ? "Track your research and project submissions"
              : "Review and approve team submissions"}
          </p>
        </div>
        {userRole === "student" && (
          <Button>
            <Upload className="h-4 w-4 mr-2" />
            New Submission
          </Button>
        )}
      </div>

      {/* Submissions Grid */}
      <div className="grid gap-6">
        {submissions.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No submissions found</h3>
              <p className="text-muted-foreground">
                {userRole === "student"
                  ? "You haven't submitted any research or projects yet."
                  : "No submissions are pending review at this time."}
              </p>
            </CardContent>
          </Card>
        ) : (
          submissions.map((submission, index) => (
            <motion.div
              key={submission.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <UserAvatar name={submission.author_name} role="student" size="md" />
                      <div>
                        <h3 className="text-lg font-semibold">{submission.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          by {submission.author_name} • {formatDate(submission.submitted_at || "")}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={getPriorityColor(submission.priority)}>
                        {submission.priority}
                      </Badge>
                      <Badge variant="outline">{submission.category}</Badge>
                      <Badge variant="outline">{submission.type}</Badge>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-4 line-clamp-2">{submission.description}</p>

                  {/* Tags */}
                  {submission.tags && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {submission.tags.map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}

                  {/* Status and Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(submission.status)}
                      <Badge className={getStatusColor(submission.status)}>
                        {submission.status.replace("_", " ").toUpperCase()}
                      </Badge>
                      {submission.reviewed_at && (
                        <span className="text-xs text-muted-foreground">
                          Reviewed {formatDate(submission.reviewed_at)}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>

                      {userRole !== "student" && submission.status === "under_review" && (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedSubmission(submission)
                              setReviewAction("reject")
                              setShowReviewDialog(true)
                            }}
                            className="text-red-600 border-red-200 hover:bg-red-50"
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            Reject
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => {
                              setSelectedSubmission(submission)
                              setReviewAction("approve")
                              setShowReviewDialog(true)
                            }}
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Feedback */}
                  {submission.reviewer_feedback && (
                    <div className="mt-4 p-3 bg-muted/50 rounded-lg border">
                      <div className="flex items-center gap-2 mb-2">
                        <MessageSquare className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">Reviewer Feedback</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{submission.reviewer_feedback}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))
        )}
      </div>

      {/* Review Dialog */}
      <Dialog open={showReviewDialog} onOpenChange={setShowReviewDialog}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {reviewAction === "approve" ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <XCircle className="h-5 w-5 text-red-500" />
              )}
              {reviewAction === "approve" ? "Approve Submission" : "Reject Submission"}
            </DialogTitle>
            <DialogDescription>
              {selectedSubmission && (
                <>
                  Reviewing "{selectedSubmission.title}" by {selectedSubmission.author_name}
                </>
              )}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="feedback">Feedback for Author</Label>
              <Textarea
                id="feedback"
                placeholder={
                  reviewAction === "approve"
                    ? "Provide positive feedback and suggestions for future work..."
                    : "Explain what needs to be improved and provide constructive feedback..."
                }
                value={reviewFeedback}
                onChange={(e) => setReviewFeedback(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowReviewDialog(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => selectedSubmission && handleReviewSubmission(selectedSubmission.id, reviewAction!)}
              className={reviewAction === "approve" ? "" : "bg-red-600 hover:bg-red-700"}
            >
              {reviewAction === "approve" ? "Approve Submission" : "Reject Submission"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
