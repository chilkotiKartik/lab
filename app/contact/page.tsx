"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Mail, Phone, MapPin, Send } from "lucide-react"

export default function ContactPage() {
  const router = useRouter()
  const { toast } = useToast()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const formRef = useRef<HTMLDivElement>(null)
  const isFormInView = useInView(formRef, { once: true, margin: "-100px" })

  const contactInfoRef = useRef<HTMLDivElement>(null)
  const isContactInfoInView = useInView(contactInfoRef, { once: true, margin: "-100px" })

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name || !email || !subject || !message) {
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

    toast({
      title: "Message Sent",
      description: "Thank you for your message. We'll get back to you soon.",
    })

    // Reset form
    setName("")
    setEmail("")
    setSubject("")
    setMessage("")

    setIsSubmitting(false)
  }

  return (
    <div className="relative">
      {/* Hero Section */}
      <div className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0 space-dots"></div>
        <div className="absolute inset-0 z-0 cosmic-bg"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold font-space mb-6 glow-text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Contact <span className="cosmic-gradient">Us</span>
            </motion.h1>

            <motion.p
              className="text-xl text-muted-foreground mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              Have questions or want to collaborate? Get in touch with our team.
            </motion.p>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              ref={formRef}
              initial={{ opacity: 0, x: -50 }}
              animate={isFormInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8 }}
            >
              <Card className="bg-card/50 backdrop-blur-sm border-border">
                <CardHeader>
                  <CardTitle>Send Us a Message</CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll get back to you as soon as possible.
                  </CardDescription>
                </CardHeader>

                <form onSubmit={handleSubmit}>
                  <CardContent className="space-y-6">
                    {/* Name */}
                    <div className="space-y-2">
                      <Label htmlFor="name">
                        Name <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="name"
                        placeholder="Your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="bg-background/50"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <Label htmlFor="email">
                        Email <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="bg-background/50"
                      />
                    </div>

                    {/* Subject */}
                    <div className="space-y-2">
                      <Label htmlFor="subject">
                        Subject <span className="text-destructive">*</span>
                      </Label>
                      <Select value={subject} onValueChange={setSubject} required>
                        <SelectTrigger id="subject" className="bg-background/50">
                          <SelectValue placeholder="Select a subject" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">General Inquiry</SelectItem>
                          <SelectItem value="collaboration">Research Collaboration</SelectItem>
                          <SelectItem value="careers">Careers & Opportunities</SelectItem>
                          <SelectItem value="media">Media & Press</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                      <Label htmlFor="message">
                        Message <span className="text-destructive">*</span>
                      </Label>
                      <Textarea
                        id="message"
                        placeholder="Your message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={5}
                        required
                        className="bg-background/50"
                      />
                    </div>
                  </CardContent>

                  <CardFooter>
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <span className="flex items-center">
                          <svg
                            className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center">
                          Send Message <Send className="ml-2 h-4 w-4" />
                        </span>
                      )}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              ref={contactInfoRef}
              initial={{ opacity: 0, x: 50 }}
              animate={isContactInfoInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col justify-between"
            >
              <div>
                <h2 className="text-2xl md:text-3xl font-bold font-space mb-6">
                  Get in <span className="cosmic-gradient">Touch</span>
                </h2>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-muted p-3 rounded-lg mr-4">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Visit Us</h3>
                      <address className="not-italic text-muted-foreground">
                        Avasya Research Lab
                        <br />
                        123 Cosmic Avenue
                        <br />
                        Stellar City, SC 12345
                        <br />
                        United States
                      </address>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-muted p-3 rounded-lg mr-4">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Email Us</h3>
                      <p className="text-muted-foreground">
                        <a href="mailto:info@avasya-lab.com" className="hover:text-primary transition-colors">
                          info@avasya-lab.com
                        </a>
                      </p>
                      <p className="text-muted-foreground">
                        <a href="mailto:research@avasya-lab.com" className="hover:text-primary transition-colors">
                          research@avasya-lab.com
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-muted p-3 rounded-lg mr-4">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Call Us</h3>
                      <p className="text-muted-foreground">
                        <a href="tel:+1234567890" className="hover:text-primary transition-colors">
                          +1 (234) 567-890
                        </a>
                      </p>
                      <p className="text-muted-foreground">
                        <a href="tel:+1234567891" className="hover:text-primary transition-colors">
                          +1 (234) 567-891
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12 bg-muted/30 rounded-xl p-6 border border-border">
                <h3 className="text-xl font-bold font-space mb-4">Office Hours</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex justify-between">
                    <span>Monday - Friday:</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Saturday:</span>
                    <span>10:00 AM - 2:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Sunday:</span>
                    <span>Closed</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="py-20 bg-muted/30 relative">
        <div className="absolute inset-0 space-dots opacity-30"></div>
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold font-space mb-4">
              Our <span className="cosmic-gradient">Location</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Visit our state-of-the-art research facility.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-xl overflow-hidden border border-border h-[400px] relative"
          >
            {/* Placeholder for map - in a real app, you would use Google Maps or similar */}
            <div className="absolute inset-0 bg-card/50 flex items-center justify-center">
              <p className="text-muted-foreground">Interactive Map Would Be Displayed Here</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold font-space mb-4">
              Frequently Asked <span className="cosmic-gradient">Questions</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Find answers to common questions about Avasya Research Lab.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              {[
                {
                  question: "How can I collaborate with Avasya Research Lab?",
                  answer:
                    "We welcome collaboration opportunities with academic institutions, industry partners, and individual researchers. Please contact us through our collaboration form or email us at partnerships@avasya-lab.com with details about your proposed collaboration.",
                },
                {
                  question: "Are there internship or job opportunities available?",
                  answer:
                    "Yes, we regularly offer internships and job positions for talented individuals passionate about aerospace technology. Visit our careers page or contact our HR department at careers@avasya-lab.com for current openings.",
                },
                {
                  question: "Can I visit your research facility?",
                  answer:
                    "We offer guided tours of our facility for educational purposes and potential collaborators. Tours must be scheduled in advance by contacting our administrative office at least two weeks before your desired visit date.",
                },
                {
                  question: "How can I access your research publications?",
                  answer:
                    "Most of our research is published in open-access journals and is available through our Research Hub. For specific papers or data sets, please contact our research department with your request.",
                },
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  className="bg-card/50 backdrop-blur-sm rounded-xl border border-border p-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <h3 className="text-xl font-bold font-space mb-2">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
