import type React from "react"
import { InstructorLayout } from "@/components/instructor/instructor-layout"

export default function Layout({ children }: { children: React.ReactNode }) {
  return <InstructorLayout>{children}</InstructorLayout>
}
