import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { EnhancedCommentSystem } from "@/components/enhanced-comment-system"
import { PageTransition } from "@/components/page-transition"

export const metadata: Metadata = {
  title: "Projects | Avasya Research Lab",
  description: "Explore our innovative projects in quantum computing, AI, and space technology.",
}

export default function ProjectsPage() {
  return (
    <PageTransition>
      <div className="container mx-auto py-10">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Projects</h1>
            <p className="text-muted-foreground mt-2">
              Explore our innovative projects in quantum computing, AI, and space technology.
            </p>
          </div>
          <div className="flex gap-2">
            <Link href="/projects/models">
              <Button variant="outline">View Models</Button>
            </Link>
            <Button>Submit Project</Button>
          </div>
        </div>

        <Tabs defaultValue="active" className="mb-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="collaborations">Collaborations</TabsTrigger>
            <TabsTrigger value="open-source">Open Source</TabsTrigger>
          </TabsList>
          <TabsContent value="active" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl">Project Astra: Quantum Navigation System</CardTitle>
                    <CardDescription className="mt-2">
                      Led by Dr. Elena Patel • Started January 2023 • Estimated completion: December 2024
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Badge>Quantum Physics</Badge>
                    <Badge>Space Exploration</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Project Astra aims to develop a practical quantum navigation system based on our groundbreaking
                  research in quantum entanglement. This system will enable spacecraft to maintain precise positioning
                  data across vast interstellar distances without reliance on traditional reference points.
                </p>
                <p>
                  Our team is currently working on miniaturizing the quantum positioning array and improving its
                  resilience to cosmic radiation. Initial prototypes have demonstrated promising results in laboratory
                  conditions, and we're preparing for a low-Earth orbit test in collaboration with the International
                  Space Agency.
                </p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="flex items-center gap-4">
                  <Button variant="outline">Project Details</Button>
                  <Button variant="outline">Team Members</Button>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                    </svg>
                    <span className="sr-only">Like</span>
                  </Button>
                  <Button variant="ghost" size="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                    </svg>
                    <span className="sr-only">Edit</span>
                  </Button>
                </div>
              </CardFooter>
            </Card>

            <div className="mt-8 border rounded-lg p-6">
              <EnhancedCommentSystem itemId="project-astra" itemType="project" />
            </div>

            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl">NeuroLink: Advanced Brain-Computer Interface</CardTitle>
                    <CardDescription className="mt-2">
                      Led by Dr. Sophia Williams • Started March 2023 • Estimated completion: June 2025
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Badge>Neuroscience</Badge>
                    <Badge>AI</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  The NeuroLink project is developing a revolutionary non-invasive neural interface that allows for
                  direct communication between the human brain and computer systems. Unlike previous technologies that
                  required surgical implantation, our approach uses advanced quantum sensors to detect and interpret
                  neural signals through the skull.
                </p>
                <p>
                  We are currently conducting clinical trials with a focus on applications for assistive technologies,
                  immersive virtual reality experiences, and enhanced human-AI collaboration. Early results show
                  promising accuracy rates in translating thought patterns into digital commands.
                </p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="flex items-center gap-4">
                  <Button variant="outline">Project Details</Button>
                  <Button variant="outline">Team Members</Button>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                    </svg>
                    <span className="sr-only">Like</span>
                  </Button>
                  <Button variant="ghost" size="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                    </svg>
                    <span className="sr-only">Edit</span>
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="completed" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl">Fusion Reactor Prototype: HELIOS</CardTitle>
                    <CardDescription className="mt-2">Led by Dr. Hiroshi Tanaka • Completed April 2023</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Badge>Energy</Badge>
                    <Badge>Materials Science</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p>
                  The HELIOS project successfully designed, built, and tested a small-scale fusion reactor prototype
                  utilizing our novel high-temperature superconducting materials. The prototype demonstrated stable
                  plasma containment for over 8 minutes and achieved a record-breaking energy efficiency ratio for a
                  device of its size.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline">View Results</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="collaborations" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl">Global Climate-Resilient Agriculture Initiative</CardTitle>
                    <CardDescription className="mt-2">
                      International Collaboration • Started February 2023 • Ongoing
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Badge>Agriculture</Badge>
                    <Badge>Climate Science</Badge>
                    <Badge>Genetics</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p>
                  This collaborative project brings together researchers from 12 institutions across 8 countries to
                  develop climate-resilient crop varieties. Our lab is contributing expertise in genetic modification
                  techniques and quantum computing simulations to accelerate the development process.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline">Project Details</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="open-source" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl">QuantumSim: Open Source Quantum Circuit Simulator</CardTitle>
                    <CardDescription className="mt-2">
                      Led by Dr. Alex Rivera • Released January 2023 • Actively maintained
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Badge>Quantum Computing</Badge>
                    <Badge>Open Source</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p>
                  QuantumSim is an open-source quantum circuit simulator designed to be accessible to researchers,
                  students, and hobbyists. It features an intuitive graphical interface, support for up to 40 qubits on
                  consumer hardware, and integration with popular quantum programming frameworks.
                </p>
              </CardContent>
              <CardFooter>
                <div className="flex gap-4">
                  <Button variant="outline">GitHub Repository</Button>
                  <Button variant="outline">Documentation</Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageTransition>
  )
}
