import { redirect } from "next/navigation"

export default function InstructorPage() {
  // Redirect to the dashboard page
  redirect("/instructor/dashboard")
}
