"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard/dashboard-layout"
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
  Edit,
  Trash2,
  Download,
  Share2,
  Eye,
  ThumbsUp,
  MessageSquare,
  Plus,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Mock research data
const myResearch = [
  {
    id: 1,
    title: "Quantum Navigation Systems for Interplanetary Travel",
    excerpt:
      "A groundbreaking approach to spacecraft navigation using quantum entanglement for precise positioning across vast distances.",
    status: "published",
    category: "spacecraft",
    date: "June 15, 2023",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=500&auto=format&fit=crop",
    stats: {
      views: 245,
      likes: 42,
      comments: 18,
      citations: 5,
    },
  },
  {
    id: 2,
    title: "Biomimetic Drone Designs for Atmospheric Sampling",
    excerpt:
      "Exploring how drone designs inspired by birds and insects can improve atmospheric data collection in extreme environments.",
    status: "published",
    category: "drones",
    date: "May 22, 2023",
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?q=80&w=500&auto=format&fit=crop",
    stats: {
      views: 189,
      likes: 36,
      comments: 12,
      citations: 3,
    },
  },
  {
    id: 3,
    title: "Self-Healing Materials for Orbital Debris Protection",
    excerpt:
      "Development of advanced materials that can automatically repair damage from micrometeoroid impacts on satellites and spacecraft.",
    status: "published",
    category: "materials",
    date: "April 8, 2023",
    image: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?q=80&w=500&auto=format&fit=crop",
    stats: {
      views: 312,
      likes: 57,
      comments: 24,
      citations: 8,
    },
  },
  {
    id: 4,
    title: "Advanced Propulsion Systems for CubeSats",
    excerpt: "Developing miniaturized propulsion systems for small satellite platforms to extend mission capabilities.",
    status: "draft",
    category: "propulsion",
    date: "In progress",
    image: "https://images.unsplash.com/photo-1454789548928-9efd52dc4031?q=80&w=500&auto=format&fit=crop",
    stats: {
      views: 0,
      likes: 0,
      comments: 0,
      citations: 0,
    },
  },
  {
    id: 5,
    title: "Neural Networks for Spacecraft Anomaly Detection",
    excerpt:
      "Implementation of deep learning algorithms to identify and respond to spacecraft system anomalies without human intervention.",
    status: "review",
    category: "ai",
    date: "Under review",
    image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=500&auto=format&fit=crop",
    stats: {
      views: 0,
      likes: 0,
      comments: 0,
      citations: 0,
    },
  },
]

// Status badge colors
const statusColors = {
  published: "bg-green-500/20 text-green-500 hover:bg-green-500/30",
  draft: "bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/30",
  review: "bg-blue-500/20 text-blue-500 hover:bg-blue-500/30",
}

export default function ResearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  // Filter research based on search query and active tab
  const filteredResearch = myResearch.filter(
    (research) =>
      (activeTab === "all" ||
        (activeTab === "published" && research.status === "published") ||
        (activeTab === "drafts" && research.status === "draft") ||
        (activeTab === "review" && research.status === "review")) &&
      (searchQuery === "" ||
        research.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        research.excerpt.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">My Research</h1>
            <p className="text-muted-foreground">Manage your research publications, drafts, and submissions.</p>
          </div>
          <Button asChild>
            <Link href="/research/create">
              <Plus className="mr-2 h-4 w-4" /> New Research
            </Link>
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Search research..."
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
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All Research</TabsTrigger>
            <TabsTrigger value="published">Published</TabsTrigger>
            <TabsTrigger value="drafts">Drafts</TabsTrigger>
            <TabsTrigger value="review">Under Review</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {filteredResearch.length > 0 ? (
              <div className="grid gap-6">
                {filteredResearch.map((research) => (
                  <ResearchCard key={research.id} research={research} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12">
                <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No research found</h3>
                <p className="text-muted-foreground">
                  {searchQuery ? "Try adjusting your search query" : "Start by creating your first research paper"}
                </p>
                <Button className="mt-4" asChild>
                  <Link href="/research/create">Create Research</Link>
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="published" className="space-y-4">
            {filteredResearch.length > 0 ? (
              <div className="grid gap-6">
                {filteredResearch.map((research) => (
                  <ResearchCard key={research.id} research={research} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12">
                <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No published research</h3>
                <p className="text-muted-foreground">You haven't published any research papers yet.</p>
                <Button className="mt-4" asChild>
                  <Link href="/research/create">Create Research</Link>
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="drafts" className="space-y-4">
            {filteredResearch.length > 0 ? (
              <div className="grid gap-6">
                {filteredResearch.map((research) => (
                  <ResearchCard key={research.id} research={research} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12">
                <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No draft research</h3>
                <p className="text-muted-foreground">You don't have any research drafts at the moment.</p>
                <Button className="mt-4" asChild>
                  <Link href="/research/create">Create Draft</Link>
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="review" className="space-y-4">
            {filteredResearch.length > 0 ? (
              <div className="grid gap-6">
                {filteredResearch.map((research) => (
                  <ResearchCard key={research.id} research={research} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12">
                <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No research under review</h3>
                <p className="text-muted-foreground">You don't have any research papers under review.</p>
                <Button className="mt-4" asChild>
                  <Link href="/research/create">Submit for Review</Link>
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

// Research Card Component
function ResearchCard({ research }) {
  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border overflow-hidden">
      <div className="flex flex-col md:flex-row">
        <div className="relative w-full md:w-48 h-48 md:h-auto">
          <Image src={research.image || "/placeholder.svg"} alt={research.title} fill className="object-cover" />
        </div>
        <div className="flex-1 p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
            <Badge className={`w-fit ${statusColors[research.status] || "bg-muted text-muted-foreground"}`}>
              {research.status === "published" ? "Published" : research.status === "draft" ? "Draft" : "Under Review"}
            </Badge>
            <span className="text-xs text-muted-foreground">{research.date}</span>
          </div>

          <h3 className="text-xl font-bold mb-2">{research.title}</h3>
          <p className="text-muted-foreground text-sm mb-4">{research.excerpt}</p>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              {research.status === "published" && (
                <>
                  <div className="flex items-center text-muted-foreground text-xs">
                    <Eye className="h-3 w-3 mr-1" />
                    <span>{research.stats.views}</span>
                  </div>
                  <div className="flex items-center text-muted-foreground text-xs">
                    <ThumbsUp className="h-3 w-3 mr-1" />
                    <span>{research.stats.likes}</span>
                  </div>
                  <div className="flex items-center text-muted-foreground text-xs">
                    <MessageSquare className="h-3 w-3 mr-1" />
                    <span>{research.stats.comments}</span>
                  </div>
                </>
              )}
            </div>

            <div className="flex items-center space-x-2">
              {research.status === "draft" && (
                <Button variant="outline" size="sm">
                  <Edit className="h-3 w-3 mr-1" /> Edit
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
                    <Eye className="h-4 w-4 mr-2" /> View
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Edit className="h-4 w-4 mr-2" /> Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Download className="h-4 w-4 mr-2" /> Download
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Share2 className="h-4 w-4 mr-2" /> Share
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive focus:text-destructive">
                    <Trash2 className="h-4 w-4 mr-2" /> Delete
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
