"use server"

import { createClient } from "@supabase/supabase-js"

export async function seedDatabase() {
  const supabaseUrl = process.env.SUPABASE_URL || ""
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ""

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error("Missing Supabase credentials")
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey)

  // Seed users
  const users = [
    {
      email: "admin@avasya-lab.com",
      name: "Admin User",
      role: "admin",
      avatar_url: "/images/admin-1.png",
      department: "Administration",
    },
    {
      email: "elara@avasya-lab.com",
      name: "Dr. Elara Vega",
      role: "teacher",
      avatar_url: "/images/teacher-1.png",
      specialization: "Quantum Navigation",
      department: "Spacecraft Design",
    },
    {
      email: "kai@avasya-lab.com",
      name: "Prof. Kai Zhang",
      role: "teacher",
      avatar_url: "/images/teacher-2.png",
      specialization: "Biomimetic Engineering",
      department: "Drone Technology",
    },
    {
      email: "alex@avasya-lab.com",
      name: "Alex Johnson",
      role: "student",
      avatar_url: "/images/student-1.png",
      level: 2,
      points: 175,
      department: "Aerospace Engineering",
    },
    {
      email: "maya@avasya-lab.com",
      name: "Maya Patel",
      role: "student",
      avatar_url: "/images/student-2.png",
      level: 3,
      points: 230,
      department: "Quantum Physics",
    },
  ]

  // Insert users
  const { data: usersData, error: usersError } = await supabase.from("users").insert(users).select()

  if (usersError) {
    console.error("Error seeding users:", usersError)
    throw usersError
  }

  // Map user emails to IDs for reference
  const userMap = usersData.reduce(
    (map, user) => {
      map[user.email] = user.id
      return map
    },
    {} as Record<string, string>,
  )

  // Seed research papers
  const research = [
    {
      title: "Quantum Navigation Systems for Interplanetary Travel",
      category: "Spacecraft",
      excerpt:
        "This paper explores the application of quantum computing principles to spacecraft navigation systems, enabling unprecedented accuracy for interplanetary travel.",
      content:
        "# Quantum Navigation Systems for Interplanetary Travel\n\n## Abstract\nThis paper presents a novel approach to spacecraft navigation using quantum entanglement principles...",
      image_url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=500&auto=format&fit=crop",
      author_id: userMap["elara@avasya-lab.com"],
      status: "published",
      published_date: new Date("2023-06-15").toISOString(),
    },
    {
      title: "Biomimetic Drone Designs for Atmospheric Sampling",
      category: "Drones",
      excerpt:
        "This research presents novel drone designs inspired by peregrine falcons, enabling efficient high-altitude atmospheric sampling with minimal energy consumption.",
      content:
        "# Biomimetic Drone Designs for Atmospheric Sampling\n\n## Abstract\nInspired by the aerodynamic efficiency of peregrine falcons...",
      image_url: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?q=80&w=500&auto=format&fit=crop",
      author_id: userMap["kai@avasya-lab.com"],
      status: "published",
      published_date: new Date("2023-05-22").toISOString(),
    },
  ]

  // Insert research
  const { data: researchData, error: researchError } = await supabase.from("research").insert(research).select()

  if (researchError) {
    console.error("Error seeding research:", researchError)
    throw researchError
  }

  // Map research titles to IDs
  const researchMap = researchData.reduce(
    (map, paper) => {
      map[paper.title] = paper.id
      return map
    },
    {} as Record<string, string>,
  )

  // Seed projects
  const projects = [
    {
      title: "QuantumNav",
      description: "Developing quantum navigation systems for interplanetary spacecraft with unprecedented accuracy.",
      image_url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=500&auto=format&fit=crop",
      status: "active",
      progress: 75,
    },
    {
      title: "BioDrone Initiative",
      description: "Creating biomimetic drone designs inspired by birds and insects for atmospheric research.",
      image_url: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?q=80&w=500&auto=format&fit=crop",
      status: "active",
      progress: 60,
    },
  ]

  // Insert projects
  const { data: projectsData, error: projectsError } = await supabase.from("projects").insert(projects).select()

  if (projectsError) {
    console.error("Error seeding projects:", projectsError)
    throw projectsError
  }

  // Map project titles to IDs
  const projectMap = projectsData.reduce(
    (map, project) => {
      map[project.title] = project.id
      return map
    },
    {} as Record<string, string>,
  )

  // Seed project members
  const projectMembers = [
    {
      project_id: projectMap["QuantumNav"],
      user_id: userMap["elara@avasya-lab.com"],
      role: "lead",
    },
    {
      project_id: projectMap["QuantumNav"],
      user_id: userMap["alex@avasya-lab.com"],
      role: "researcher",
    },
    {
      project_id: projectMap["BioDrone Initiative"],
      user_id: userMap["kai@avasya-lab.com"],
      role: "lead",
    },
    {
      project_id: projectMap["BioDrone Initiative"],
      user_id: userMap["maya@avasya-lab.com"],
      role: "researcher",
    },
  ]

  // Insert project members
  const { error: membersError } = await supabase.from("project_members").insert(projectMembers)

  if (membersError) {
    console.error("Error seeding project members:", membersError)
    throw membersError
  }

  // Seed achievements
  const achievements = [
    {
      title: "First Steps",
      description: "Complete your profile and join your first project",
      icon: "rocket",
      points: 10,
    },
    {
      title: "Researcher",
      description: "Publish your first research paper",
      icon: "book",
      points: 25,
    },
    {
      title: "Collaborator",
      description: "Work with 5 different team members",
      icon: "users",
      points: 15,
    },
    {
      title: "3D Explorer",
      description: "View interactive 3D models",
      icon: "cube",
      points: 15,
    },
  ]

  // Insert achievements
  const { error: achievementsError } = await supabase.from("achievements").insert(achievements)

  if (achievementsError) {
    console.error("Error seeding achievements:", achievementsError)
    throw achievementsError
  }

  return {
    success: true,
    message: "Database seeded successfully",
    users: usersData.length,
    research: researchData.length,
    projects: projectsData.length,
  }
}
