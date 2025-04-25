"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/components/auth-provider"
import { Upload, X, FileText, ImageIcon, Sparkles, Award } from "lucide-react"
import confetti from "canvas-confetti"

export default function CreateResearchPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { user, updateUserPoints } = useAuth()

  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("")
  const [excerpt, setExcerpt] = useState("")
  const [content, setContent] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false)
  const [earnedPoints, setEarnedPoints] = useState(0)

  const formRef = useRef<HTMLDivElement>(null)
  const isFormInView = useInView(formRef, { once: true, margin: "-100px" })

  // Handle image selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setSelectedImage(file)

      // Create preview URL
      const reader = new FileReader()
      reader.onload = (event) => {
        setPreviewImage(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  // Remove selected image
  const removeImage = () => {
    setSelectedImage(null)
    setPreviewImage(null)
  }

  // Remove selected file
  const removeFile = () => {
    setSelectedFile(null)
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to publish research.",
        variant: "destructive",
      })
      return
    }

    if (!title || !category || !excerpt || !content) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Calculate points earned (between 10-15 points)
    const points = Math.floor(Math.random() * 6) + 10
    setEarnedPoints(points)

    // Update user points in auth context
    if (user) {
      updateUserPoints(user.points + points)
    }

    // Show success animation
    setShowSuccessAnimation(true)

    // Trigger confetti effect
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    })

    // Add to localStorage for front page display
    const newResearch = {
      id: Date.now(),
      title,
      excerpt,
      category,
      author: user.name,
      date: new Date().toLocaleDateString(),
      image: previewImage || "/placeholder.svg?height=300&width=500",
      stats: {
        views: 0,
        likes: 0,
        comments: 0,
      },
    }

    // Get existing research or initialize empty array
    const existingResearch = JSON.parse(localStorage.getItem("avasya_research") || "[]")
    existingResearch.unshift(newResearch) // Add new research at the beginning
    localStorage.setItem("avasya_research", JSON.stringify(existingResearch.slice(0, 20))) // Keep only 20 most recent

    // Wait for animation to complete before redirecting
    setTimeout(() => {
      setIsSubmitting(false)
      router.push("/research")
    }, 3000)
  }

  return (
    <div className="relative">
      {/* Hero Section */}
      <div className="relative py-20 md:py-24 overflow-hidden">
        <div className="absolute inset-0 z-0 space-dots"></div>
        <div className="absolute inset-0 z-0 cosmic-bg"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              className="text-3xl md:text-4xl lg:text-5xl font-bold font-space mb-6 glow-text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Publish Your <span className="cosmic-gradient">Research</span>
            </motion.h1>

            <motion.p
              className="text-xl text-muted-foreground mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              Share your findings with the aerospace research community.
            </motion.p>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="py-12 md:py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div
            ref={formRef}
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isFormInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="bg-card/50 backdrop-blur-sm border-border">
              <CardHeader>
                <CardTitle>Research Publication Form</CardTitle>
                <CardDescription>
                  Fill in the details of your research to publish it on the Avasya Research Hub.
                </CardDescription>
              </CardHeader>

              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-6">
                  {/* Title */}
                  <div className="space-y-2">
                    <Label htmlFor="title">
                      Research Title <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="title"
                      placeholder="Enter the title of your research"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                  </div>

                  {/* Category */}
                  <div className="space-y-2">
                    <Label htmlFor="category">
                      Category <span className="text-destructive">*</span>
                    </Label>
                    <Select value={category} onValueChange={setCategory} required>
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="spacecraft">Spacecraft</SelectItem>
                        <SelectItem value="drones">Drones</SelectItem>
                        <SelectItem value="satellites">Satellites</SelectItem>
                        <SelectItem value="propulsion">Propulsion Systems</SelectItem>
                        <SelectItem value="materials">Advanced Materials</SelectItem>
                        <SelectItem value="ai">AI & Robotics</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Excerpt */}
                  <div className="space-y-2">
                    <Label htmlFor="excerpt">
                      Abstract/Excerpt <span className="text-destructive">*</span>
                    </Label>
                    <Textarea
                      id="excerpt"
                      placeholder="Provide a brief summary of your research (100-200 words)"
                      value={excerpt}
                      onChange={(e) => setExcerpt(e.target.value)}
                      rows={3}
                      required
                    />
                  </div>

                  {/* Content */}
                  <div className="space-y-2">
                    <Label htmlFor="content">
                      Full Content <span className="text-destructive">*</span>
                    </Label>
                    <Textarea
                      id="content"
                      placeholder="Enter the full content of your research"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      rows={10}
                      required
                    />
                  </div>

                  {/* Featured Image */}
                  <div className="space-y-2">
                    <Label>Featured Image</Label>

                    {previewImage ? (
                      <div className="relative mt-2 rounded-lg overflow-hidden border border-border">
                        <img
                          src={previewImage || "/placeholder.svg"}
                          alt="Preview"
                          className="w-full h-48 object-cover"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute top-2 right-2 h-8 w-8 rounded-full"
                          onClick={removeImage}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                        <ImageIcon className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                        <p className="text-sm text-muted-foreground mb-2">Drag and drop an image, or click to browse</p>
                        <Input
                          id="image"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageChange}
                        />
                        <Label htmlFor="image">
                          <Button type="button" variant="outline" className="mt-2">
                            <Upload className="h-4 w-4 mr-2" />
                            Upload Image
                          </Button>
                        </Label>
                      </div>
                    )}
                  </div>

                  {/* PDF Upload */}
                  <div className="space-y-2">
                    <Label>PDF Document (Optional)</Label>

                    {selectedFile ? (
                      <div className="flex items-center justify-between p-3 border border-border rounded-lg mt-2">
                        <div className="flex items-center">
                          <FileText className="h-5 w-5 text-primary mr-2" />
                          <span className="text-sm truncate max-w-[200px]">{selectedFile.name}</span>
                        </div>
                        <Button type="button" variant="ghost" size="icon" className="h-8 w-8" onClick={removeFile}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                        <FileText className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                        <p className="text-sm text-muted-foreground mb-2">
                          Upload a PDF version of your research (optional)
                        </p>
                        <Input id="pdf" type="file" accept=".pdf" className="hidden" onChange={handleFileChange} />
                        <Label htmlFor="pdf">
                          <Button type="button" variant="outline" className="mt-2">
                            <Upload className="h-4 w-4 mr-2" />
                            Upload PDF
                          </Button>
                        </Label>
                      </div>
                    )}
                  </div>
                </CardContent>

                <CardFooter className="flex justify-between">
                  <Button type="button" variant="outline" onClick={() => router.push("/research")}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Publishing..." : "Publish Research"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Success Animation Modal */}
      <AnimatePresence>
        {showSuccessAnimation && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-card border border-border rounded-xl p-8 max-w-md w-full text-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 15 }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="mx-auto mb-4 bg-primary/20 p-4 rounded-full w-20 h-20 flex items-center justify-center"
              >
                <Sparkles className="h-10 w-10 text-primary" />
              </motion.div>

              <motion.h2
                className="text-2xl font-bold font-space mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Research Published!
              </motion.h2>

              <motion.p
                className="text-muted-foreground mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Your research has been successfully published to the Avasya Research Hub.
              </motion.p>

              <motion.div
                className="mb-6 p-4 bg-muted/50 rounded-lg flex items-center justify-center gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Award className="h-6 w-6 text-primary" />
                <div className="text-left">
                  <p className="text-sm text-muted-foreground">You earned</p>
                  <p className="text-xl font-bold text-primary">+{earnedPoints} Research Points</p>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
                <p className="text-sm text-muted-foreground mb-4">Redirecting to Research Hub...</p>
                <div className="w-full bg-muted h-1 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-primary"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 3 }}
                  />
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
