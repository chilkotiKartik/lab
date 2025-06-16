"use client"

import { useState } from "react"
import { useAuth } from "@/components/auth-provider"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { submitProject } from "@/lib/project-service"
import { useToast } from "@/hooks/use-toast"
import { Upload, Send, ArrowLeft, CheckCircle } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

export default function StudentSubmitPage() {
  const { profile } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    submissionType: "",
    content: "",
    files: [],
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.submissionType || !formData.content) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      await submitProject({
        studentId: profile?.rollNumber || "",
        studentName: profile?.name || "",
        projectTitle: profile?.projectTitle || "",
        submissionType: formData.submissionType,
        content: formData.content,
        files: formData.files,
      })

      toast({
        title: "Success!",
        description: "Your work has been submitted successfully",
      })

      router.push("/student/dashboard")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit work. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const steps = [
    { number: 1, title: "Submission Type", description: "Choose what you're submitting" },
    { number: 2, title: "Content", description: "Describe your work" },
    { number: 3, title: "Review", description: "Review and submit" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="container mx-auto p-6 max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/student/dashboard">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Submit Your Work</h1>
            <p className="text-muted-foreground">Share your progress with your supervisor</p>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep >= step.number ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {currentStep > step.number ? <CheckCircle className="h-5 w-5" /> : step.number}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-20 h-1 mx-4 ${currentStep > step.number ? "bg-primary" : "bg-muted"}`} />
                )}
              </div>
            ))}
          </div>
          <div className="text-center">
            <h3 className="font-medium">{steps[currentStep - 1].title}</h3>
            <p className="text-sm text-muted-foreground">{steps[currentStep - 1].description}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle>Project: {profile?.projectTitle}</CardTitle>
              <CardDescription>Submit your latest work and progress updates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {currentStep === 1 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                  <div>
                    <Label>Submission Type</Label>
                    <Select
                      value={formData.submissionType}
                      onValueChange={(value) => setFormData({ ...formData, submissionType: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select submission type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="progress">Progress Update</SelectItem>
                        <SelectItem value="milestone">Milestone Completion</SelectItem>
                        <SelectItem value="final">Final Submission</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      {
                        type: "progress",
                        title: "Progress Update",
                        description: "Regular progress reports and updates",
                        icon: "📊",
                      },
                      {
                        type: "milestone",
                        title: "Milestone",
                        description: "Major project milestones and deliverables",
                        icon: "🎯",
                      },
                      {
                        type: "final",
                        title: "Final Submission",
                        description: "Complete project submission",
                        icon: "🏆",
                      },
                    ].map((option) => (
                      <div
                        key={option.type}
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          formData.submissionType === option.type
                            ? "border-primary bg-primary/10"
                            : "border-muted hover:border-primary/50"
                        }`}
                        onClick={() => setFormData({ ...formData, submissionType: option.type })}
                      >
                        <div className="text-2xl mb-2">{option.icon}</div>
                        <h3 className="font-medium">{option.title}</h3>
                        <p className="text-sm text-muted-foreground">{option.description}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                  <div>
                    <Label>Submission Content</Label>
                    <Textarea
                      placeholder="Describe your work, progress, findings, or any relevant information..."
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      rows={8}
                      className="resize-none"
                    />
                  </div>
                  <div>
                    <Label>Attach Files (Optional)</Label>
                    <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center">
                      <Upload className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-muted-foreground mb-2">Drag and drop files here, or click to browse</p>
                      <Button type="button" variant="outline">
                        Choose Files
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                  <div className="bg-muted/30 rounded-lg p-6">
                    <h3 className="font-medium mb-4">Review Your Submission</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Project:</span>
                        <span className="text-sm font-medium">{profile?.projectTitle}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Type:</span>
                        <Badge variant="outline">{formData.submissionType}</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Content Length:</span>
                        <span className="text-sm font-medium">{formData.content.length} characters</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Content Preview:</h4>
                    <div className="bg-muted/20 rounded-lg p-4 max-h-40 overflow-y-auto">
                      <p className="text-sm">{formData.content}</p>
                    </div>
                  </div>
                </motion.div>
              )}

              <div className="flex justify-between pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                  disabled={currentStep === 1}
                >
                  Previous
                </Button>
                {currentStep < 3 ? (
                  <Button
                    type="button"
                    onClick={() => setCurrentStep(currentStep + 1)}
                    disabled={
                      (currentStep === 1 && !formData.submissionType) || (currentStep === 2 && !formData.content)
                    }
                  >
                    Next
                  </Button>
                ) : (
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Submit Work
                      </>
                    )}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  )
}
