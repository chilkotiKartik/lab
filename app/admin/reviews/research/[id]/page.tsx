"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import Image from "next/image"
import AdminLayout from "@/components/admin/admin-layout"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft, AlertTriangle, FileText, Download, CheckCircle, XCircle } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

// Mock research data
const researchSubmissions = [
  {
    id: "1",
    title: "Quantum Navigation Systems for Interplanetary Travel",
    abstract:
      "This paper presents a groundbreaking approach to spacecraft navigation using quantum entanglement for precise positioning across vast distances. By leveraging quantum computing principles, we demonstrate a navigation system that achieves unprecedented accuracy for interplanetary travel, reducing positioning errors by up to 99.7% compared to conventional methods.",
    content: `
# Introduction

Interplanetary navigation presents unique challenges due to vast distances, relativistic effects, and signal delays. Conventional navigation systems rely on radio signals from Earth, resulting in positioning errors that grow with distance. This paper introduces a quantum navigation system that overcomes these limitations.

# Methodology

We developed a quantum entanglement-based navigation system using the following components:

1. Quantum positioning array
2. Entangled reference beacons
3. Relativistic correction algorithms

Our system maintains a network of entangled particles distributed across key reference points in the solar system. By measuring quantum states, spacecraft can determine their position with unprecedented accuracy.

# Results

Testing in simulated deep space conditions demonstrated:

- 99.7% reduction in positioning errors
- Functional range of up to 15 AU
- Resilience to solar interference
- Real-time positioning updates (no signal delay)

# Discussion

The implications for deep space exploration are significant. Missions to the outer planets could navigate with precision previously impossible, enabling automated landing on distant moons and precise orbital insertions without Earth-based guidance.

# Conclusion

Quantum navigation represents a paradigm shift in spacecraft positioning technology. Further research will focus on extending the functional range and miniaturizing the quantum positioning array for broader application.
    `,
    status: "pending",
    category: "spacecraft",
    submittedDate: "June 15, 2023",
    author: "Dr. Elara Vega",
    authorAvatar: "https://randomuser.me/api/portraits/women/1.jpg",
    authorBio:
      "Ph.D. in Quantum Physics and Aerospace Engineering with 15+ years of experience in spacecraft navigation systems.",
    authorEmail: "elara.vega@avasya-lab.com",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=500&auto=format&fit=crop",
    priority: "high",
    timeWaiting: "2 days",
    views: 42,
    likes: 18,
    comments: 7,
    attachments: [
      { name: "quantum_nav_data.pdf", size: "2.4 MB", type: "pdf" },
      { name: "simulation_results.xlsx", size: "1.8 MB", type: "excel" },
      { name: "quantum_positioning_diagram.png", size: "3.2 MB", type: "image" },
    ],
    reviewNotes: "",
    reviewChecklist: {
      scientificMerit: false,
      methodology: false,
      clarity: false,
      relevance: false,
      originality: false,
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

export default function ResearchReviewDetailPage() {
  const router = useRouter()
  const params = useParams()
  const { toast } = useToast()
  const [submission, setSubmission] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [reviewNotes, setReviewNotes] = useState("")
  const [reviewChecklist, setReviewChecklist] = useState({
    scientificMerit: false,
    methodology: false,
    clarity: false,
    relevance: false,
    originality: false,
  })

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      const foundSubmission = researchSubmissions.find((s) => s.id === params.id)
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
      title: "Research Approved",
      description: "The research paper has been approved and published.",
    })

    // In a real app, this would update the database
    setSubmission({ ...submission, status: "approved", timeWaiting: "Approved just now" })

    // Navigate back after a short delay
    setTimeout(() => {
      router.push("/admin/reviews/research")
    }, 1500)
  }

  const handleReject = () => {
    if (!reviewNotes.trim()) {
      toast({
        title: "Review Notes Required",
        description: "Please provide feedback explaining why this submission is being rejected.",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Research Rejected",
      description: "The research paper has been rejected.",
    })

    // In a real app, this would update the database
    setSubmission({ ...submission, status: "rejected", timeWaiting: "Rejected just now" })

    // Navigate back after a short delay
    setTimeout(() => {
      router.push("/admin/reviews/research")
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
          <h2 className="text-2xl font-bold mb-2">Submission Not Found</h2>
          <p className="text-muted-foreground mb-4">The research submission you're looking for doesn't exist.</p>
          <Button asChild>
            <Link href="/admin/reviews/research">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Research Reviews
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
            <Link href="/admin/reviews/research">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Research Review</h1>
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

              <Tabs defaultValue="abstract">
                <TabsList className="mb-4">
                  <TabsTrigger value="abstract">Abstract</TabsTrigger>
                  <TabsTrigger value="fullpaper">Full Paper</TabsTrigger>
                  <TabsTrigger value="attachments">Attachments</TabsTrigger>
                </TabsList>
                <TabsContent value="abstract" className="space-y-4">
                  <p>{submission.abstract}</p>
                </TabsContent>
                <TabsContent value="fullpaper" className="space-y-4">
                  <div className="prose dark:prose-invert max-w-none">
                    {submission.content.split("\n\n").map((paragraph: string, index: number) => {
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
                  placeholder="Provide detailed feedback on this research submission..."
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
          {/* Author Info */}
          <Card>
            <CardHeader>
              <CardTitle>Author</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center mb-4">
                <Avatar className="h-12 w-12 mr-4">
                  <AvatarImage src={submission.authorAvatar || "/placeholder.svg"} alt={submission.author} />
                  <AvatarFallback>{submission.author?.charAt(0) || "A"}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{submission.author}</h3>
                  <p className="text-sm text-muted-foreground">{submission.authorEmail}</p>
                </div>
              </div>
              <p className="text-sm">{submission.authorBio}</p>
            </CardContent>
          </Card>

          {/* Submission Details */}
          <Card>
            <CardHeader>
              <CardTitle>Submission Details</CardTitle>
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
