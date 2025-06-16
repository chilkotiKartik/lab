export interface ProjectSubmission {
  id: string
  studentId: string
  studentName: string
  projectTitle: string
  submissionType: "progress" | "milestone" | "final"
  content: string
  files: string[]
  submittedAt: string
  status: "pending" | "reviewed" | "approved" | "rejected"
  feedback?: string
  grade?: number
}

export interface Assignment {
  id: string
  title: string
  description: string
  dueDate: string
  assignedTo: string[]
  createdBy: string
  createdAt: string
  status: "active" | "completed" | "overdue"
  priority: "low" | "medium" | "high"
  attachments?: string[]
}

// Mock data
const projectSubmissions: ProjectSubmission[] = [
  {
    id: "1",
    studentId: "24f1001450",
    studentName: "Aishwarya Maan Srivastava",
    projectTitle: "Cultural Drift NLP",
    submissionType: "progress",
    content: "Completed data collection phase. Analyzed 10,000 text samples from various cultural contexts.",
    files: ["data_analysis.pdf", "sample_results.xlsx"],
    submittedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    status: "pending",
  },
  {
    id: "2",
    studentId: "24f3001430",
    studentName: "Rudra Narayan Meher",
    projectTitle: "Language Loss Rebuilder",
    submissionType: "milestone",
    content:
      "Developed initial prototype for language reconstruction algorithm. Successfully tested on 3 endangered languages.",
    files: ["prototype_demo.mp4", "algorithm_documentation.pdf"],
    submittedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    status: "reviewed",
    feedback: "Excellent progress! The algorithm shows promising results. Consider expanding the dataset.",
    grade: 92,
  },
]

const assignments: Assignment[] = [
  {
    id: "1",
    title: "Literature Review Submission",
    description: "Submit a comprehensive literature review for your research topic. Minimum 20 references required.",
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    assignedTo: ["all"],
    createdBy: "admin",
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    status: "active",
    priority: "high",
  },
  {
    id: "2",
    title: "Mid-term Progress Report",
    description: "Provide a detailed progress report including methodology, current results, and next steps.",
    dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    assignedTo: ["all"],
    createdBy: "admin",
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    status: "active",
    priority: "medium",
  },
]

export const submitProject = (submission: Omit<ProjectSubmission, "id" | "submittedAt" | "status">) => {
  const newSubmission: ProjectSubmission = {
    ...submission,
    id: Date.now().toString(),
    submittedAt: new Date().toISOString(),
    status: "pending",
  }
  projectSubmissions.unshift(newSubmission)
  return newSubmission
}

export const getProjectSubmissions = () => projectSubmissions

export const getStudentSubmissions = (studentId: string) => projectSubmissions.filter((s) => s.studentId === studentId)

export const reviewSubmission = (
  id: string,
  feedback: string,
  grade?: number,
  status: "approved" | "rejected" = "approved",
) => {
  const submission = projectSubmissions.find((s) => s.id === id)
  if (submission) {
    submission.status = "reviewed"
    submission.feedback = feedback
    submission.grade = grade
  }
  return submission
}

export const createAssignment = (assignment: Omit<Assignment, "id" | "createdAt" | "status">) => {
  const newAssignment: Assignment = {
    ...assignment,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    status: "active",
  }
  assignments.unshift(newAssignment)
  return newAssignment
}

export const getAssignments = () => assignments

export const getStudentAssignments = (studentId: string) =>
  assignments.filter((a) => a.assignedTo.includes("all") || a.assignedTo.includes(studentId))
