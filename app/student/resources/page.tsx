"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Download,
  FileText,
  Video,
  ImageIcon,
  BookOpen,
  Search,
  ArrowLeft,
  ExternalLink,
  Star,
  Calendar,
  User,
  Eye,
} from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

export default function StudentResourcesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const resources = [
    {
      id: "1",
      title: "Research Methodology Guide",
      description: "Comprehensive guide to research methodologies and best practices",
      type: "document",
      category: "guides",
      size: "2.5 MB",
      downloads: 156,
      uploadedBy: "Dr. Sarah Chen",
      uploadedAt: "2024-01-15",
      tags: ["research", "methodology", "guide"],
      featured: true,
    },
    {
      id: "2",
      title: "Project Proposal Template",
      description: "Standard template for project proposals and submissions",
      type: "document",
      category: "templates",
      size: "1.2 MB",
      downloads: 89,
      uploadedBy: "Admin",
      uploadedAt: "2024-01-10",
      tags: ["template", "proposal", "project"],
    },
    {
      id: "3",
      title: "Data Analysis Tutorial",
      description: "Step-by-step video tutorial on data analysis techniques",
      type: "video",
      category: "tutorials",
      size: "45.6 MB",
      downloads: 234,
      uploadedBy: "Prof. Michael Johnson",
      uploadedAt: "2024-01-08",
      tags: ["data", "analysis", "tutorial"],
      featured: true,
    },
    {
      id: "4",
      title: "Citation Style Guide",
      description: "APA, MLA, and IEEE citation formats with examples",
      type: "document",
      category: "guides",
      size: "3.1 MB",
      downloads: 178,
      uploadedBy: "Dr. Emily Davis",
      uploadedAt: "2024-01-05",
      tags: ["citation", "formatting", "academic"],
    },
    {
      id: "5",
      title: "Lab Safety Protocols",
      description: "Essential safety guidelines for laboratory work",
      type: "document",
      category: "safety",
      size: "1.8 MB",
      downloads: 67,
      uploadedBy: "Safety Committee",
      uploadedAt: "2024-01-03",
      tags: ["safety", "lab", "protocols"],
    },
    {
      id: "6",
      title: "Presentation Template",
      description: "Professional presentation template for project presentations",
      type: "document",
      category: "templates",
      size: "5.2 MB",
      downloads: 145,
      uploadedBy: "Design Team",
      uploadedAt: "2024-01-01",
      tags: ["presentation", "template", "design"],
    },
  ]

  const categories = [
    { id: "all", name: "All Resources", count: resources.length },
    { id: "guides", name: "Guides", count: resources.filter((r) => r.category === "guides").length },
    { id: "templates", name: "Templates", count: resources.filter((r) => r.category === "templates").length },
    { id: "tutorials", name: "Tutorials", count: resources.filter((r) => r.category === "tutorials").length },
    { id: "safety", name: "Safety", count: resources.filter((r) => r.category === "safety").length },
  ]

  const getFileIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="h-5 w-5 text-red-500" />
      case "image":
        return <ImageIcon className="h-5 w-5 text-green-500" />
      default:
        return <FileText className="h-5 w-5 text-blue-500" />
    }
  }

  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === "all" || resource.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const featuredResources = resources.filter((r) => r.featured)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="container mx-auto p-6 max-w-6xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/student/dashboard">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <BookOpen className="h-8 w-8" />
              Resources & Downloads
            </h1>
            <p className="text-muted-foreground">Access study materials, templates, and guides</p>
          </div>
        </div>

        {/* Featured Resources */}
        {featuredResources.length > 0 && (
          <Card className="mb-6 bg-gradient-to-r from-primary/10 to-purple-500/10 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500" />
                Featured Resources
              </CardTitle>
              <CardDescription>Most popular and recommended resources</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {featuredResources.map((resource) => (
                  <motion.div
                    key={resource.id}
                    className="p-4 bg-background/50 rounded-lg border hover:shadow-md transition-all"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-start gap-3">
                      {getFileIcon(resource.type)}
                      <div className="flex-1">
                        <h3 className="font-medium">{resource.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{resource.description}</p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Download className="h-3 w-3" />
                            {resource.downloads}
                          </span>
                          <span>{resource.size}</span>
                        </div>
                      </div>
                      <Button size="sm">
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Search and Filters */}
        <Card className="mb-6 bg-card/50 backdrop-blur-sm border-border/50">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search resources..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-auto">
                <TabsList className="grid grid-cols-5">
                  {categories.map((category) => (
                    <TabsTrigger key={category.id} value={category.id} className="text-xs">
                      {category.name}
                      <Badge variant="secondary" className="ml-1 text-xs">
                        {category.count}
                      </Badge>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>
          </CardContent>
        </Card>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource, index) => (
            <motion.div
              key={resource.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-lg transition-all duration-300 h-full">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      {getFileIcon(resource.type)}
                      <div>
                        <CardTitle className="text-lg">{resource.title}</CardTitle>
                        {resource.featured && (
                          <Badge variant="outline" className="mt-1 text-xs">
                            <Star className="h-3 w-3 mr-1" />
                            Featured
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <CardDescription className="text-sm leading-relaxed">{resource.description}</CardDescription>

                  <div className="flex flex-wrap gap-1">
                    {resource.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {resource.uploadedBy}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(resource.uploadedAt).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <Download className="h-3 w-3" />
                        {resource.downloads} downloads
                      </span>
                      <span>{resource.size}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button className="flex-1">
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                    <Button variant="outline" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredResources.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
            <BookOpen className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No resources found</h3>
            <p className="text-muted-foreground">Try adjusting your search terms or category filters</p>
          </motion.div>
        )}

        {/* Quick Stats */}
        <Card className="mt-8 bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="text-lg">Resource Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{resources.length}</div>
                <div className="text-sm text-muted-foreground">Total Resources</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {resources.reduce((sum, r) => sum + r.downloads, 0)}
                </div>
                <div className="text-sm text-muted-foreground">Total Downloads</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{featuredResources.length}</div>
                <div className="text-sm text-muted-foreground">Featured</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{categories.length - 1}</div>
                <div className="text-sm text-muted-foreground">Categories</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
