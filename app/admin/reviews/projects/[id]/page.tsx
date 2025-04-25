"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import Image from "next/image"
import AdminLayout from "@/components/admin/admin-layout"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft, AlertTriangle, FileText, Download, CheckCircle, XCircle, Users } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"

// Mock project data
const projectSubmissions = [
  {
    id: "1",
    title: "QuantumNav",
    description: "Developing quantum navigation systems for interplanetary spacecraft with unprecedented accuracy.",
    fullDescription: `
# Project Overview

QuantumNav is a revolutionary navigation system for interplanetary spacecraft that leverages quantum entanglement principles to achieve unprecedented accuracy. Traditional navigation systems rely on radio signals from Earth, resulting in positioning errors that grow with distance. Our quantum-based approach eliminates these limitations.

# Technical Approach

The QuantumNav system consists of three primary components:

1. Quantum Positioning Array (QPA): A network of entangled particles distributed across key reference points
2. Relativistic Correction Module (RCM): Software that accounts for time dilation and other relativistic effects
3. Autonomous Navigation Interface (ANI): AI-powered system that interprets quantum measurements and adjusts spacecraft trajectory

# Current Progress

We have successfully:
- Developed a working prototype of the QPA with 75% accuracy
- Completed initial testing in simulated deep space conditions
- Established partnerships with three major aerospace organizations
- Secured funding for the next phase of development

# Next Steps

Our roadmap includes:
- Miniaturizing the QPA for practical spacecraft integration
- Enhancing the accuracy to 99.9%
- Conducting real-world tests on an upcoming lunar mission
- Developing training protocols for mission control personnel
    `,
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=500&auto=format&fit=crop",
    status: "pending",
    progress: 75,
    team: [
      {
        name: "Dr. Elara Vega",
        avatar: "https://randomuser.me/api/portraits/women/1.jpg",
        role: "Project Lead",
        bio: "Ph.D. in Quantum Physics and Aerospace Engineering with 15+ years of experience in spacecraft navigation systems.",
      },
      {
        name: "Prof. Kai Zhang",
        avatar: "https://randomuser.me/api/portraits/men/2.jpg",
        role: "Quantum Systems Engineer",
        bio: "Former NASA engineer specializing in quantum computing applications for space exploration.",
      },
    ],
    submittedDate: "June 10, 2023",
    timeWaiting: "1 week",
    priority: "high",
    category: "spacecraft",
    likes: 42,
    comments: 12,
    views: 189,
    budget: "$2.5 million",
    timeline: "18 months",
    attachments: [
      { name: "quantum_nav_specs.pdf", size: "3.2 MB", type: "pdf" },
      { name: "prototype_results.xlsx", size: "1.5 MB", type: "excel" },
      { name: "system_diagram.png", size: "2.8 MB", type: "image" },
    ],
    reviewNotes: "",
    reviewChecklist: {
      technicalFeasibility: false,
      budgetReasonability: false,
      timelineRealism: false,
      teamQualification: false,
      alignmentWithGoals: false,
    },
  },
  // Additional mock data entries would go here
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

export default function ProjectReviewDetailPage() {
  const router = useRouter()
  const params = useParams()
  const { toast } = useToast()
  const [submission, setSubmission] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [reviewNotes, setReviewNotes] = useState("")
  const [reviewChecklist, setReviewChecklist] = useState({
    technicalFeasibility: false,
    budgetReasonability: false,
    timelineRealism: false,
    teamQualification: false,
    alignmentWithGoals: false,
  })

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      const foundSubmission = projectSubmissions.find((s) => s.id === params.id)
      if (foundSubmission) {
        setSubmission(foundSubmission)
        setReviewNotes(foundSubmission.reviewNotes)
        setReviewChecklist(foundSubmission.reviewChecklist)
      }
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [params.id])

  const handleApprove = () => {
    if (!allChecklistItemsChecked()) {
      toast({
        title: "Review Incomplete",
        description: "Please complete all review checklist items before approving.",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Project Approved",
      description: "The project has been approved and published.",
    })

    // In a real app, this would update the database
    setSubmission({ ...submission, status: "approved", timeWaiting: "Approved just now" })

    // Navigate back after a short delay
    setTimeout(() => {
      router.push("/admin/reviews/projects")
    }, 1500)
  }

  const handleReject = () => {
    if (!reviewNotes.trim()) {
      toast({
        title: "Review Notes Required",
        description: "Please provide feedback explaining why this project is being rejected.",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Project Rejected",
      description: "The project has been rejected.",
    })

    // In a real app, this would update the database
    setSubmission({ ...submission, status: "rejected", timeWaiting: "Rejected just now" })

    // Navigate back after a short delay
    setTimeout(() => {
      router.push("/admin/reviews/projects")
    }, 1500)
  }

  const handleChecklistChange = (key: string) => {
    setReviewChecklist((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const allChecklistItemsChecked = () => {
    return Object.values(reviewChecklist).every((value) => value === true)
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

  if (!submission) {
    return (
      <AdminLayout>
        <div className="flex flex-col items-center justify-center h-[60vh]">
          <AlertTriangle className="h-12 w-12 text-amber-500 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Project Not Found</h2>
          <p className="text-muted-foreground mb-4">The project submission you're looking for doesn't exist.</p>
          <Button asChild>
            <Link href="/admin/reviews/projects">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Project Reviews
            </Link>
          </Button>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div className="flex items-center mb-4 md:mb-0">
          <Button variant="ghost" size="icon" asChild className="mr-2">
            <Link href="/admin/reviews/projects">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Project Review</h1>
        </div>
        <div className="flex items-center space-x-2">
          <Badge className={priorityColors[submission.priority as keyof typeof priorityColors]}>
            {submission.priority.charAt(0).toUpperCase() + submission.priority.slice(1)} Priority
          </Badge>
          <Badge className={statusColors[submission.status as keyof typeof statusColors]}>
            {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{submission.title}</CardTitle>
              <CardDescription>Submitted on {submission.submittedDate}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative h-48 mb-6 rounded-md overflow-hidden">
                <Image
                  src={submission.image || "/placeholder.svg?height=300&width=600"}
                  alt={submission.title}
                  fill
                  className="object-cover"
                />
              </div>

              <Tabs defaultValue="overview">
                <TabsList className="mb-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="details">Full Details</TabsTrigger>
                  <TabsTrigger value="attachments">Attachments</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="space-y-4">
                  <div className="space-y-4">
                    <p>{submission.description}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div className="space-y-2">
                        <h3 className="font-medium">Progress</h3>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>Completion</span>
                            <span>{submission.progress}%</span>
                          </div>
                          <Progress value={submission.progress} className="h-2" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h3 className="font-medium">Key Details</h3>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="text-muted-foreground">Category:</div>
                          <div className="capitalize">{submission.category}</div>
                          <div className="text-muted-foreground">Budget:</div>
                          <div>{submission.budget}</div>
                          <div className="text-muted-foreground">Timeline:</div>
                          <div>{submission.timeline}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="details" className="space-y-4">
                  <div className="prose dark:prose-invert max-w-none">
                    {submission.fullDescription.split("\n\n").map((paragraph: string, index: number) => {
                      if (paragraph.startsWith("# ")) {
                        return (
                          <h2 key={index} className="text-xl font-bold mt-6 mb-3">
                            {paragraph.replace("# ", "")}
                          </h2>
                        )
                      } else if (paragraph.includes("- ")) {
                        return (
                          <ul key={index} className="list-disc pl-6 my-4">
                            {paragraph.split("\n").map((item, i) => (
                              <li key={i}>{item.replace("- ", "")}</li>
                            ))}
                          </ul>
                        )
                      } else if (paragraph.match(/^\d\./)) {
                        return (
                          <ol key={index} className="list-decimal pl-6 my-4">
                            {paragraph.split("\n").map((item, i) => (
                              <li key={i}>{item.replace(/^\d\./, "").trim()}</li>
                            ))}
                          </ol>
                        )
                      } else {
                        return <p key={index}>{paragraph}</p>
                      }
                    })}
                  </div>
                </TabsContent>
                <TabsContent value="attachments" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {submission.attachments.map((attachment: any, index: number) => (
                      <div
                        key={index}
                        className="flex items-center p-3 border border-border rounded-md hover:bg-muted/50 transition-colors"
                      >
                        <div className="p-2 bg-primary/10 rounded-md mr-3">
                          <FileText className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-sm">{attachment.name}</p>
                          <p className="text-xs text-muted-foreground">{attachment.size}</p>
                        </div>
                        <Button variant="ghost" size="icon">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Review Form */}
          <Card>
            <CardHeader>
              <CardTitle>Review</CardTitle>
              <CardDescription>Complete the review checklist and provide feedback</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Review Checklist</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(reviewChecklist).map(([key, value]) => (
                    <div key={key} className="flex items-center space-x-2">
                      <Checkbox id={key} checked={value} onCheckedChange={() => handleChecklistChange(key)} />
                      <Label htmlFor={key} className="capitalize">
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reviewNotes">Review Notes</Label>
                <Textarea
                  id="reviewNotes"
                  placeholder="Provide detailed feedback on this project submission..."
                  value={reviewNotes}
                  onChange={(e) => setReviewNotes(e.target.value)}
                  className="min-h-[150px]"
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="destructive" onClick={handleReject}>
                <XCircle className="mr-2 h-4 w-4" /> Reject
              </Button>
              <Button onClick={handleApprove}>
                <CheckCircle className="mr-2 h-4 w-4" /> Approve
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Team Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2" /> Team
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {submission.team.map((member: any, index: number) => (
                  <div key={index} className="flex items-start">
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                      <AvatarFallback>{member.name?.charAt(0) || "T"}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">{member.name}</h3>
                      <p className="text-sm text-muted-foreground">{member.role}</p>
                      <p className="text-xs mt-1">{member.bio}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Project Details */}
          <Card>
            <CardHeader>
              <CardTitle>Project Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Category</span>
                  <span className="text-sm font-medium capitalize">{submission.category}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Submitted</span>
                  <span className="text-sm font-medium">{submission.submittedDate}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Time Waiting</span>
                  <span className="text-sm font-medium">{submission.timeWaiting}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Budget</span>
                  <span className="text-sm font-medium">{submission.budget}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Timeline</span>
                  <span className="text-sm font-medium">{submission.timeline}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Views</span>
                  <span className="text-sm font-medium">{submission.views}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Likes</span>
                  <span className="text-sm font-medium">{submission.likes}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Comments</span>
                  <span className="text-sm font-medium">{submission.comments}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}
