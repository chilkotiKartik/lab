import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { EnhancedCommentSystem } from "@/components/enhanced-comment-system"
import { PageTransition } from "@/components/page-transition"

export const metadata: Metadata = {
  title: "Research | Avasya Research Lab",
  description: "Explore our groundbreaking research in quantum computing, AI, and space technology.",
}

export default function ResearchPage() {
  return (
    <PageTransition>
      <div className="container mx-auto py-10">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Research</h1>
            <p className="text-muted-foreground mt-2">
              Explore our groundbreaking research in quantum computing, AI, and space technology.
            </p>
          </div>
          <Link href="/research/create">
            <Button>Submit Research</Button>
          </Link>
        </div>

        <Tabs defaultValue="featured" className="mb-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="featured">Featured</TabsTrigger>
            <TabsTrigger value="recent">Recent</TabsTrigger>
            <TabsTrigger value="popular">Popular</TabsTrigger>
            <TabsTrigger value="collaborations">Collaborations</TabsTrigger>
          </TabsList>
          <TabsContent value="featured" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl">Quantum Entanglement for Interstellar Navigation</CardTitle>
                    <CardDescription className="mt-2">
                      By Dr. Elena Patel, Dr. Marcus Chen • Published April 15, 2023
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
                  This groundbreaking research explores the application of quantum entanglement principles to develop a
                  revolutionary navigation system for deep space missions. By leveraging quantum entangled particles, we
                  demonstrate a method to maintain precise positioning data across vast interstellar distances without
                  reliance on traditional reference points.
                </p>
                <p>
                  Our findings suggest that quantum-entangled navigation could reduce positioning errors by up to 99.7%
                  compared to conventional methods, while simultaneously decreasing computational overhead by an order
                  of magnitude. This breakthrough has significant implications for the future of human space exploration
                  and unmanned probes to distant star systems.
                </p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="flex items-center gap-4">
                  <Button variant="outline">Read Full Paper</Button>
                  <Link href="/research/visualize">
                    <Button variant="outline">View Visualization</Button>
                  </Link>
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
              <EnhancedCommentSystem itemId="quantum-entanglement-research" itemType="research" />
            </div>

            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl">
                      Neural Interface Advancements for Direct Brain-Computer Communication
                    </CardTitle>
                    <CardDescription className="mt-2">
                      By Dr. Sophia Williams, Dr. James Lee • Published March 3, 2023
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
                  Our research team has developed a revolutionary non-invasive neural interface that allows for direct
                  communication between the human brain and computer systems. Unlike previous technologies that required
                  surgical implantation, our approach uses advanced quantum sensors to detect and interpret neural
                  signals through the skull.
                </p>
                <p>
                  Initial clinical trials have demonstrated a 78% accuracy rate in translating thought patterns into
                  digital commands, with minimal training required for users. This technology has profound implications
                  for assistive devices, immersive virtual reality, and human-AI collaboration.
                </p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Read Full Paper</Button>
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
          <TabsContent value="recent" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl">
                      Sustainable Fusion Reactor Design Using Advanced Superconducting Materials
                    </CardTitle>
                    <CardDescription className="mt-2">
                      By Dr. Hiroshi Tanaka, Dr. Amara Singh • Published May 2, 2023
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Badge>Energy</Badge>
                    <Badge>Materials Science</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p>
                  Our team has successfully designed and simulated a novel fusion reactor configuration that utilizes
                  recently discovered high-temperature superconducting materials. This breakthrough design promises to
                  reduce the energy required to initiate and maintain fusion reactions by 62%, potentially bringing
                  commercial fusion power within reach within the next decade.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline">Read Full Paper</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="popular" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl">
                      Quantum Computing Breakthrough: Stable 1000-Qubit Processor
                    </CardTitle>
                    <CardDescription className="mt-2">
                      By Dr. Alex Rivera, Dr. Sarah Johnson • Published January 10, 2023
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Badge>Quantum Computing</Badge>
                    <Badge>Computer Science</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p>
                  Our research team has achieved a major milestone in quantum computing by developing a stable
                  1000-qubit processor with coherence times exceeding 5 minutes. This breakthrough overcomes one of the
                  fundamental challenges in quantum computing and opens the door to practical applications in
                  cryptography, drug discovery, and complex system modeling.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline">Read Full Paper</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="collaborations" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl">
                      International Collaboration on Climate-Resilient Crop Development
                    </CardTitle>
                    <CardDescription className="mt-2">
                      By International Climate Agriculture Consortium • Published April 28, 2023
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
                  This collaborative research between 12 institutions across 8 countries has successfully developed
                  three new crop varieties that demonstrate exceptional resilience to extreme weather conditions while
                  maintaining high nutritional value. These developments could significantly improve food security in
                  regions most affected by climate change.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline">Read Full Paper</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageTransition>
  )
}
