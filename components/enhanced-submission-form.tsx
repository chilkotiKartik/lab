"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Upload, X, FileText, ImageIcon, Sparkles, Award, CheckCircle, Loader2 } from "lucide-react"
import confetti from "canvas-confetti"
import { EnhancedFloatingAstronaut } from "./enhanced-floating-astronaut"

interface EnhancedSubmissionFormProps {
  type: "research" | "project"
  onSubmit?: (data: any) => void
  onCancel?: () => void
}

export function EnhancedSubmissionForm({ type, onSubmit, onCancel }: EnhancedSubmissionFormProps) {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    content: "",
    tags: "",
  })
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [earnedPoints, setEarnedPoints] = useState(0)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setSelectedImage(file)

      const reader = new FileReader()
      reader.onload = (event) => {
        setPreviewImage(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  const removeImage = () => {
    setSelectedImage(null)
    setPreviewImage(null)
  }

  const removeFile = () => {
    setSelectedFile(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title || !formData.category || !formData.description) {
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

    // Calculate points earned
    const points = Math.floor(Math.random() * 6) + 10
    setEarnedPoints(points)

    // Show success animation
    setShowSuccess(true)

    // Trigger confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    })

    // Call onSubmit callback
    if (onSubmit) {
      onSubmit({ ...formData, file: selectedFile, image: selectedImage })
    }

    // Reset form after delay
    setTimeout(() => {
      setIsSubmitting(false)
      setShowSuccess(false)
      setFormData({
        title: "",
        category: "",
        description: "",
        content: "",
        tags: "",
      })
      setSelectedFile(null)
      setSelectedImage(null)
      setPreviewImage(null)
    }, 3000)
  }

  const categories = {
    research: ["Spacecraft", "Drones", "Satellites", "Propulsion", "Materials", "AI & Robotics"],
    project: ["Hardware", "Software", "Research", "Design", "Testing", "Analysis"],
  }

  return (
    <div className="relative">
      {/* Floating astronauts for visual appeal */}
      <EnhancedFloatingAstronaut
        style="3d-purple"
        size="sm"
        position="top-right"
        withGlow
        className="hidden lg:block"
        delay={0.5}
      />
      <EnhancedFloatingAstronaut
        style="relaxing"
        size="xs"
        position="bottom-left"
        className="hidden lg:block"
        delay={1}
      />

      <Card className="bg-card/50 backdrop-blur-sm border-border max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Submit {type === "research" ? "Research Paper" : "Project"}
          </CardTitle>
          <CardDescription>
            Share your {type === "research" ? "research findings" : "project work"} with the Avasya community.
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">
                Title <span className="text-destructive">*</span>
              </Label>
              <Input
                id="title"
                placeholder={`Enter your ${type} title`}
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                required
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label htmlFor="category">
                Category <span className="text-destructive">*</span>
              </Label>
              <Select
                value={formData.category}
                onValueChange={(value) => handleInputChange("category", value)}
                required
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories[type].map((cat) => (
                    <SelectItem key={cat} value={cat.toLowerCase()}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">
                {type === "research" ? "Abstract" : "Description"} <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="description"
                placeholder={`Provide a brief ${type === "research" ? "abstract" : "description"} (100-300 words)`}
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                rows={4}
                required
              />
            </div>

            {/* Content */}
            <div className="space-y-2">
              <Label htmlFor="content">Full Content</Label>
              <Textarea
                id="content"
                placeholder={`Enter the full content of your ${type}`}
                value={formData.content}
                onChange={(e) => handleInputChange("content", e.target.value)}
                rows={8}
              />
            </div>

            {/* Tags */}
            <div className="space-y-2">
              <Label htmlFor="tags">Tags</Label>
              <Input
                id="tags"
                placeholder="Enter tags separated by commas (e.g., quantum, navigation, spacecraft)"
                value={formData.tags}
                onChange={(e) => handleInputChange("tags", e.target.value)}
              />
            </div>

            {/* Featured Image */}
            <div className="space-y-2">
              <Label>Featured Image</Label>
              {previewImage ? (
                <div className="relative mt-2 rounded-lg overflow-hidden border border-border">
                  <img src={previewImage || "/placeholder.svg"} alt="Preview" className="w-full h-48 object-cover" />
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
                  <p className="text-sm text-muted-foreground mb-2">Upload a featured image</p>
                  <Input id="image" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                  <Label htmlFor="image">
                    <Button type="button" variant="outline" className="mt-2">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Image
                    </Button>
                  </Label>
                </div>
              )}
            </div>

            {/* File Upload */}
            <div className="space-y-2">
              <Label>Additional Files</Label>
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
                  <p className="text-sm text-muted-foreground mb-2">Upload supporting documents (PDF, DOC, etc.)</p>
                  <Input
                    id="file"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <Label htmlFor="file">
                    <Button type="button" variant="outline" className="mt-2">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload File
                    </Button>
                  </Label>
                </div>
              )}
            </div>
          </CardContent>

          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Submit {type === "research" ? "Research" : "Project"}
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>

      {/* Success Animation Modal */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-card border border-border rounded-xl p-8 max-w-md w-full text-center relative overflow-hidden"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 15 }}
            >
              <div className="absolute inset-0 cosmic-bg opacity-30"></div>
              <div className="relative z-10">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="mx-auto mb-4 bg-primary/20 p-4 rounded-full w-20 h-20 flex items-center justify-center"
                >
                  <CheckCircle className="h-10 w-10 text-primary" />
                </motion.div>

                <motion.h2
                  className="text-2xl font-bold font-space mb-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {type === "research" ? "Research" : "Project"} Submitted!
                </motion.h2>

                <motion.p
                  className="text-muted-foreground mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  Your {type} has been successfully submitted for review.
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
                    <p className="text-xl font-bold text-primary">+{earnedPoints} Points</p>
                  </div>
                </motion.div>

                <EnhancedFloatingAstronaut
                  style="3d-purple"
                  size="sm"
                  position="center"
                  withGlow
                  className="absolute top-4 right-4"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
