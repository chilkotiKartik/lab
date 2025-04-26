"use client"

import Link from "next/link"
import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { StudentLayout } from "@/components/student/student-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { SpaceBackground } from "@/components/space-background"
import { SpaceParticles } from "@/components/space-particles"
import { motion } from "framer-motion"
import { ArrowLeft, Plus, X, Upload, Save } from "lucide-react"
import { CharacterAvatar } from "@/components/character-avatar"

export default function SubmitProjectPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeTab, setActiveTab] = useState("details")
  const [projectData, setProjectData] = useState({
    title: "",
    description: "",
    category: "",
    objectives: "",
    methodology: "",
    timeline: "",
    resources: "",
    team: [{ role: "student", variant: 1 }],
    files: [] as File[],
  })

  const handleInputChange = (field: string, value: string) => {
    setProjectData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleAddTeamMember = () => {
    setProjectData((prev) => ({
      ...prev,
      team: [...prev.team, { role: "student", variant: Math.floor(Math.random() * 5) + 1 }],
    }))
  }

  const handleRemoveTeamMember = (index: number) => {
    setProjectData((prev) => ({
      ...prev,
      team: prev.team.filter((_, i) => i !== index),
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setProjectData((prev) => ({
        ...prev,
        files: [...prev.files, ...Array.from(e.target.files || [])],
      }))
    }
  }

  const handleRemoveFile = (index: number) => {
    setProjectData((prev) => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index),
    }))
  }

  const handleSaveDraft = () => {
    toast({
      title: "Draft Saved",
      description: "Your project has been saved as a draft.",
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!projectData.title || !projectData.description || !projectData.category) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Project Submitted",
        description: "Your project has been submitted for review.",
      })
      setIsSubmitting(false)
      router.push("/student/projects")
    }, 2000)
  }

  return (
    <StudentLayout>
      <div className="relative">
        <div className="absolute inset-0 -z-10 opacity-10">
          <SpaceBackground starCount={100} />
          <SpaceParticles particleCount={20} />
        </div>

        <div className="mb-6 flex items-center">
          <Button variant="ghost" size="icon" asChild className="mr-2">
            <Link href="/student/projects">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Submit New Project</h1>
            <p className="text-muted-foreground">Share your research project with the Avasya community</p>
          </div>
        </div>

        <Card className="bg-card/50 backdrop-blur-sm border-border">
          <CardHeader>
            <CardTitle>Project Submission</CardTitle>
            <CardDescription>
              Fill in the details of your project. All submissions will be reviewed by our administrators.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <Tabs defaultValue="details" value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-3 mb-6">
                  <TabsTrigger value="details">Project Details</TabsTrigger>
                  <TabsTrigger value="team">Team Members</TabsTrigger>
                  <TabsTrigger value="files">Files & Resources</TabsTrigger>
                </TabsList>

                {/* Project Details Tab */}
                <TabsContent value="details" className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">
                        Project Title <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="title"
                        placeholder="Enter a descriptive title for your project"
                        value={projectData.title}
                        onChange={(e) => handleInputChange("title", e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category">
                        Category <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        value={projectData.category}
                        onValueChange={(value) => handleInputChange("category", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="spacecraft">Spacecraft Design</SelectItem>
                          <SelectItem value="drones">Drone Technology</SelectItem>
                          <SelectItem value="satellites">Satellite Systems</SelectItem>
                          <SelectItem value="materials">Advanced Materials</SelectItem>
                          <SelectItem value="quantum">Quantum Computing</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">
                        Project Description <span className="text-red-500">*</span>
                      </Label>
                      <Textarea
                        id="description"
                        placeholder="Provide a brief overview of your project"
                        value={projectData.description}
                        onChange={(e) => handleInputChange("description", e.target.value)}
                        className="min-h-[100px]"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="objectives">Objectives</Label>
                      <Textarea
                        id="objectives"
                        placeholder="What are the main goals of your project?"
                        value={projectData.objectives}
                        onChange={(e) => handleInputChange("objectives", e.target.value)}
                        className="min-h-[100px]"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="methodology">Methodology</Label>
                      <Textarea
                        id="methodology"
                        placeholder="Describe your approach and methods"
                        value={projectData.methodology}
                        onChange={(e) => handleInputChange("methodology", e.target.value)}
                        className="min-h-[100px]"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="timeline">Timeline</Label>
                        <Textarea
                          id="timeline"
                          placeholder="Expected timeline for your project"
                          value={projectData.timeline}
                          onChange={(e) => handleInputChange("timeline", e.target.value)}
                          className="min-h-[100px]"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="resources">Resources Needed</Label>
                        <Textarea
                          id="resources"
                          placeholder="What resources will you need?"
                          value={projectData.resources}
                          onChange={(e) => handleInputChange("resources", e.target.value)}
                          className="min-h-[100px]"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between pt-4">
                    <Button type="button" variant="outline" onClick={() => router.push("/student/projects")}>
                      Cancel
                    </Button>
                    <Button type="button" onClick={() => setActiveTab("team")}>
                      Next: Team Members
                    </Button>
                  </div>
                </TabsContent>

                {/* Team Members Tab */}
                <TabsContent value="team" className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium">Team Members</h3>
                      <Button type="button" variant="outline" size="sm" onClick={handleAddTeamMember}>
                        <Plus className="h-4 w-4 mr-2" /> Add Member
                      </Button>
                    </div>

                    <div className="space-y-4">
                      {projectData.team.map((member, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center justify-between p-4 border rounded-lg bg-background/50"
                        >
                          <div className="flex items-center space-x-4">
                            <CharacterAvatar role={member.role} variant={member.variant} size="md" />
                            <div>
                              <Select
                                value={member.role}
                                onValueChange={(value) => {
                                  const newTeam = [...projectData.team]
                                  newTeam[index].role = value
                                  setProjectData({ ...projectData, team: newTeam })
                                }}
                              >
                                <SelectTrigger className="w-[180px]">
                                  <SelectValue placeholder="Select role" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="student">Student</SelectItem>
                                  <SelectItem value="teacher">Teacher</SelectItem>
                                  <SelectItem value="admin">Administrator</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          {index > 0 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => handleRemoveTeamMember(index)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between pt-4">
                    <Button type="button" variant="outline" onClick={() => setActiveTab("details")}>
                      Back
                    </Button>
                    <Button type="button" onClick={() => setActiveTab("files")}>
                      Next: Files & Resources
                    </Button>
                  </div>
                </TabsContent>

                {/* Files Tab */}
                <TabsContent value="files" className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium">Project Files</h3>
                      <label htmlFor="file-upload" className="cursor-pointer">
                        <div className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium">
                          <Upload className="h-4 w-4" />
                          <span>Upload Files</span>
                        </div>
                        <input id="file-upload" type="file" multiple className="hidden" onChange={handleFileChange} />
                      </label>
                    </div>

                    <div className="space-y-2">
                      {projectData.files.length > 0 ? (
                        <div className="space-y-2">
                          {projectData.files.map((file, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="flex items-center justify-between p-3 border rounded-lg bg-background/50"
                            >
                              <div className="flex items-center space-x-2 truncate">
                                <div className="w-8 h-8 flex items-center justify-center bg-primary/10 rounded-md">
                                  <Upload className="h-4 w-4 text-primary" />
                                </div>
                                <span className="truncate">{file.name}</span>
                                <span className="text-xs text-muted-foreground">
                                  {(file.size / 1024).toFixed(1)} KB
                                </span>
                              </div>
                              <Button type="button" variant="ghost" size="icon" onClick={() => handleRemoveFile(index)}>
                                <X className="h-4 w-4" />
                              </Button>
                            </motion.div>
                          ))}
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center p-8 border border-dashed rounded-lg">
                          <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                          <p className="text-muted-foreground text-center">
                            Drag and drop files here or click the upload button above
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-between pt-4">
                    <div className="flex space-x-2">
                      <Button type="button" variant="outline" onClick={() => setActiveTab("team")}>
                        Back
                      </Button>
                      <Button type="button" variant="secondary" onClick={handleSaveDraft}>
                        <Save className="h-4 w-4 mr-2" /> Save Draft
                      </Button>
                    </div>
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? "Submitting..." : "Submit Project"}
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </form>
          </CardContent>
        </Card>
      </div>
    </StudentLayout>
  )
}
