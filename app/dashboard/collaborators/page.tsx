"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import DashboardLayout from "@/components/dashboard/dashboard-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Search, UserPlus, MoreHorizontal, Mail, FileText, Users, Star } from "lucide-react"

// Mock collaborators data
const collaborators = [
  {
    id: 1,
    name: "Dr. Elara Vega",
    role: "Spacecraft Design Specialist",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    status: "active",
    projects: 3,
    lastActive: "2 hours ago",
    expertise: ["Quantum Navigation", "Propulsion Systems"],
  },
  {
    id: 2,
    name: "Prof. Kai Zhang",
    role: "Drone Technology Expert",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    status: "active",
    projects: 2,
    lastActive: "1 day ago",
    expertise: ["Biomimetic Design", "Atmospheric Sampling"],
  },
  {
    id: 3,
    name: "Dr. Aiden Mercer",
    role: "Materials Researcher",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    status: "active",
    projects: 1,
    lastActive: "3 days ago",
    expertise: ["Self-Healing Materials", "Orbital Debris Protection"],
  },
  {
    id: 4,
    name: "Dr. Lyra Chen",
    role: "Quantum Computing Specialist",
    avatar: "https://randomuser.me/api/portraits/women/4.jpg",
    status: "inactive",
    projects: 1,
    lastActive: "2 weeks ago",
    expertise: ["Quantum Computing", "Navigation Systems"],
  },
  {
    id: 5,
    name: "Dr. Maya Rodriguez",
    role: "AI & Robotics Lead",
    avatar: "https://randomuser.me/api/portraits/women/5.jpg",
    status: "pending",
    projects: 0,
    lastActive: "Invitation sent 3 days ago",
    expertise: ["Neural Networks", "Autonomous Systems"],
  },
]

// Mock collaboration requests
const collaborationRequests = [
  {
    id: 1,
    name: "Dr. Soren Patel",
    role: "Propulsion Systems Engineer",
    avatar: "https://randomuser.me/api/portraits/men/6.jpg",
    message: "I'd like to collaborate on your quantum navigation research.",
    date: "2 days ago",
    expertise: ["Ion Propulsion", "Spacecraft Design"],
  },
  {
    id: 2,
    name: "Prof. Theo Nakamura",
    role: "Astrophysics Researcher",
    avatar: "https://randomuser.me/api/portraits/men/7.jpg",
    message: "Your work on self-healing materials is fascinating. I believe we could combine our expertise.",
    date: "5 days ago",
    expertise: ["Exoplanet Studies", "Space Environment"],
  },
]

export default function CollaboratorsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  // Filter collaborators based on search query
  const filteredCollaborators = collaborators.filter(
    (collaborator) =>
      collaborator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      collaborator.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      collaborator.expertise.some((exp) => exp.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Collaborators</h1>
            <p className="text-muted-foreground">Manage your research collaborators and collaboration requests.</p>
          </div>
          <Button>
            <UserPlus className="mr-2 h-4 w-4" /> Invite Collaborator
          </Button>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="collaborators" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="collaborators">Collaborators</TabsTrigger>
            <TabsTrigger value="requests">
              Requests{" "}
              {collaborationRequests.length > 0 && (
                <Badge className="ml-2 bg-primary text-primary-foreground">{collaborationRequests.length}</Badge>
              )}
            </TabsTrigger>
          </TabsList>

          {/* Collaborators Tab */}
          <TabsContent value="collaborators" className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search collaborators..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Collaborators List */}
            {filteredCollaborators.length > 0 ? (
              <div className="grid gap-4">
                {filteredCollaborators.map((collaborator) => (
                  <motion.div key={collaborator.id} whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                    <Card className="bg-card/50 backdrop-blur-sm border-border">
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                          <Avatar className="h-12 w-12 border-2 border-primary/20">
                            <AvatarImage src={collaborator.avatar || "/placeholder.svg"} alt={collaborator.name} />
                            <AvatarFallback>{collaborator.name.charAt(0)}</AvatarFallback>
                          </Avatar>

                          <div className="flex-1">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                              <div>
                                <h3 className="font-bold">{collaborator.name}</h3>
                                <p className="text-sm text-muted-foreground">{collaborator.role}</p>
                              </div>
                              <Badge
                                variant="outline"
                                className={`w-fit ${
                                  collaborator.status === "active"
                                    ? "bg-green-500/20 text-green-500"
                                    : collaborator.status === "pending"
                                      ? "bg-yellow-500/20 text-yellow-500"
                                      : "bg-muted text-muted-foreground"
                                }`}
                              >
                                {collaborator.status === "active"
                                  ? "Active"
                                  : collaborator.status === "pending"
                                    ? "Pending"
                                    : "Inactive"}
                              </Badge>
                            </div>

                            <div className="flex flex-wrap gap-2 mt-2">
                              {collaborator.expertise.map((exp, index) => (
                                <Badge key={index} variant="secondary" className="bg-secondary/50">
                                  {exp}
                                </Badge>
                              ))}
                            </div>

                            <div className="flex flex-col md:flex-row md:items-center justify-between mt-4">
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center">
                                  <FileText className="h-4 w-4 mr-1" />
                                  <span>{collaborator.projects} projects</span>
                                </div>
                                <div>Last active: {collaborator.lastActive}</div>
                              </div>

                              <div className="flex items-center gap-2 mt-2 md:mt-0">
                                <Button variant="outline" size="sm">
                                  <Mail className="h-4 w-4 mr-1" /> Message
                                </Button>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>View Profile</DropdownMenuItem>
                                    <DropdownMenuItem>Invite to Project</DropdownMenuItem>
                                    <DropdownMenuItem>Share Research</DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="text-destructive focus:text-destructive">
                                      Remove Collaborator
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12">
                <Users className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No collaborators found</h3>
                <p className="text-muted-foreground">
                  {searchQuery ? "Try adjusting your search query" : "Start by inviting researchers to collaborate"}
                </p>
                <Button className="mt-4">
                  <UserPlus className="mr-2 h-4 w-4" /> Invite Collaborator
                </Button>
              </div>
            )}
          </TabsContent>

          {/* Requests Tab */}
          <TabsContent value="requests" className="space-y-4">
            {collaborationRequests.length > 0 ? (
              <div className="grid gap-4">
                {collaborationRequests.map((request) => (
                  <motion.div key={request.id} whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                    <Card className="bg-card/50 backdrop-blur-sm border-border">
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row items-start gap-4">
                          <Avatar className="h-12 w-12 border-2 border-primary/20">
                            <AvatarImage src={request.avatar || "/placeholder.svg"} alt={request.name} />
                            <AvatarFallback>{request.name.charAt(0)}</AvatarFallback>
                          </Avatar>

                          <div className="flex-1">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                              <div>
                                <h3 className="font-bold">{request.name}</h3>
                                <p className="text-sm text-muted-foreground">{request.role}</p>
                              </div>
                              <span className="text-xs text-muted-foreground">Requested {request.date}</span>
                            </div>

                            <div className="flex flex-wrap gap-2 mt-2">
                              {request.expertise.map((exp, index) => (
                                <Badge key={index} variant="secondary" className="bg-secondary/50">
                                  {exp}
                                </Badge>
                              ))}
                            </div>

                            <p className="mt-3 text-sm">{request.message}</p>

                            <div className="flex items-center gap-2 mt-4">
                              <Button size="sm">Accept</Button>
                              <Button variant="outline" size="sm">
                                Decline
                              </Button>
                              <Button variant="ghost" size="sm">
                                View Profile
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12">
                <Star className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No pending requests</h3>
                <p className="text-muted-foreground">You don't have any collaboration requests at the moment.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Suggested Collaborators */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Suggested Collaborators</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                id: 1,
                name: "Dr. Amara Okafor",
                role: "Environmental Systems Engineer",
                avatar: "https://randomuser.me/api/portraits/women/8.jpg",
                expertise: ["Life Support Systems", "Sustainable Environments"],
                match: "95% match with your research",
              },
              {
                id: 2,
                name: "Prof. Hiroshi Tanaka",
                role: "Quantum Physics Researcher",
                avatar: "https://randomuser.me/api/portraits/men/9.jpg",
                expertise: ["Quantum Entanglement", "Theoretical Physics"],
                match: "87% match with your research",
              },
              {
                id: 3,
                name: "Dr. Elena Volkov",
                role: "Aerospace Materials Scientist",
                avatar: "https://randomuser.me/api/portraits/women/10.jpg",
                expertise: ["Composite Materials", "Thermal Protection Systems"],
                match: "82% match with your research",
              },
            ].map((suggestion) => (
              <motion.div key={suggestion.id} whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
                <Card className="bg-card/50 backdrop-blur-sm border-border h-full">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center">
                      <Avatar className="h-16 w-16 border-2 border-primary/20 mb-4">
                        <AvatarImage src={suggestion.avatar || "/placeholder.svg"} alt={suggestion.name} />
                        <AvatarFallback>{suggestion.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <h3 className="font-bold">{suggestion.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{suggestion.role}</p>
                      <Badge className="bg-primary/20 text-primary mb-3">{suggestion.match}</Badge>
                      <div className="flex flex-wrap justify-center gap-2 mb-4">
                        {suggestion.expertise.map((exp, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {exp}
                          </Badge>
                        ))}
                      </div>
                      <Button size="sm" className="w-full">
                        <UserPlus className="mr-2 h-3 w-3" /> Invite
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
