import { signInWithEmailAndPassword, signOut, onAuthStateChanged, type User } from "firebase/auth"
import { doc, getDoc, setDoc, collection, getDocs } from "firebase/firestore"
import { auth, db } from "./firebase"

export interface UserProfile {
  uid: string
  email: string
  name: string
  role: "admin" | "student" | "teacher"
  projectTitle?: string
  teamMembers?: string[]
  rollNumber?: string
  photoURL?: string
  lastLogin?: string
}

// Database of users for the application
export const USERS_DATA = [
  {
    email: "24f1001450@ds.study.iitm.ac.in",
    name: "Aishwarya Maan Srivastava",
    projectTitle: "Cultural Drift NLP",
    teamMembers: ["Namish Kumar Sahu", "Sayan Ray"],
    rollNumber: "24f1001450",
    role: "student",
  },
  {
    email: "24f3001430@ds.study.iitm.ac.in",
    name: "Rudra Narayan Meher",
    projectTitle: "Language Loss Rebuilder",
    teamMembers: ["Team of 5 members"],
    rollNumber: "24f3001430",
    role: "student",
  },
  {
    email: "23f3002697@ds.study.iitm.ac.in",
    name: "Krishna Vallabha Goswami",
    projectTitle: "Contract Summarizer",
    teamMembers: ["Krishna vallabha Goswami", "Sayan Ray"],
    rollNumber: "23f3002697",
    role: "student",
  },
  {
    email: "24f3003062@ds.study.iitm.ac.in",
    name: "Satyam Singh",
    projectTitle: "Prompt Feedback Tuner",
    teamMembers: ["Satyam Singh", "Sai Jasmitha Naidu", "Gourav Mandal"],
    rollNumber: "24f3003062",
    role: "student",
  },
  {
    email: "24f3000782@ds.study.iitm.ac.in",
    name: "Swastik Joshi",
    projectTitle: "Turbulence Generator GAN",
    teamMembers: ["Swastik Joshi", "Rishi Mehrotra", "Siddharth Malkania", "Meet Parmar", "Sayan Ray"],
    rollNumber: "24f3000782",
    role: "student",
  },
  {
    email: "24f2001880@ds.study.iitm.ac.in",
    name: "Ghantasala Dhruvann",
    projectTitle: "Digital Body Twin",
    teamMembers: ["Siddharth Malkania", "Rishi Mehrotra", "Sumit Srimani", "Aadarsh Pathre", "Divyanshi Darshana"],
    rollNumber: "24f2001880",
    role: "student",
  },
  {
    email: "21f1006589@ds.study.iitm.ac.in",
    name: "Niraj Kumar",
    projectTitle: "Physics + DS (Particle Pattern Finder)",
    teamMembers: ["Krishna Vallabha Goswami"],
    rollNumber: "21f1006589",
    role: "student",
  },
  {
    email: "23f2003869@ds.study.iitm.ac.in",
    name: "Meet Parmar",
    projectTitle: "Medical Symptom Chatbot (LLM+HEALTHCARE)",
    teamMembers: ["Snehlata Kumari", "Varun Reddy", "Sai Roshini K"],
    rollNumber: "23f2003869",
    role: "student",
  },
  {
    email: "22f3003124@ds.study.iitm.ac.in",
    name: "Namish Kumar Sahu",
    projectTitle: "Folklore + Semiotics",
    teamMembers: ["Namish Kumar Sahu", "Maithreyi Mahesh", "Devansh Bhatia", "Sonia S"],
    rollNumber: "22f3003124",
    role: "student",
  },
  {
    email: "25f1000368@ds.study.iitm.ac.in",
    name: "Yukti Sharma",
    projectTitle: "Biology, Genetics (Evolution Path Modeler)",
    teamMembers: ["Sai Roshini.K", "Gabriel George", "Vijay Bhasin", "Sayan Ray", "Yukti Sharma"],
    rollNumber: "25f1000368",
    role: "student",
  },
  {
    email: "23f1002495@ds.study.iitm.ac.in",
    name: "Potipireddy Bhanu Venkata Akhilesh",
    projectTitle: "Hate Speech Detector",
    teamMembers: ["Prakhar Argawal", "Taniya", "Hari Om", "Maria Paul", "Raj Ranjan Srivastava"],
    rollNumber: "23f1002495",
    role: "student",
  },
  {
    email: "23f3002666@ds.study.iitm.ac.in",
    name: "Bhumi Dave",
    projectTitle: "Electronics ML",
    teamMembers: [
      "Sumedh Kulkarni",
      "Puneeth D Shetty",
      "Divyanshi Darshana",
      "Nidhi Jain",
      "D Haricharan",
      "Sanjay Bankar",
      "Sayan Ray",
    ],
    rollNumber: "23f3002666",
    role: "student",
  },
  {
    email: "admin@infinity.tech",
    name: "Admin User",
    projectTitle: "System Administration",
    teamMembers: [],
    rollNumber: "ADMIN001",
    role: "admin",
  },
]

// Mock authentication for development/demo purposes
const mockAuthEnabled = true
let mockCurrentUser: UserProfile | null = null

// Helper function to get password from roll number
export const getPasswordFromRollNumber = (rollNumber: string): string => {
  if (rollNumber === "ADMIN001") return "admin123"
  return rollNumber.slice(-4)
}

// Sign in with email and password
export const signIn = async (email: string, password: string) => {
  try {
    // Try Firebase authentication first
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const user = userCredential.user
      const userProfile = await getUserProfile(user.uid, email)

      // Update last login
      await setDoc(
        doc(db, "users", user.uid),
        {
          ...userProfile,
          lastLogin: new Date().toISOString(),
        },
        { merge: true },
      )

      return { user, profile: userProfile }
    } catch (firebaseError) {
      console.warn("Firebase auth failed, falling back to mock auth:", firebaseError)

      // Fall back to mock authentication
      if (mockAuthEnabled) {
        const userData = USERS_DATA.find((u) => u.email === email)

        if (!userData) {
          throw new Error("User not found")
        }

        const expectedPassword = getPasswordFromRollNumber(userData.rollNumber || "")

        if (password !== expectedPassword) {
          throw new Error("Invalid password")
        }

        // Create mock user profile
        const mockUser = {
          uid: `mock-${userData.rollNumber}`,
          email: userData.email,
          name: userData.name,
          role: userData.role,
          projectTitle: userData.projectTitle,
          teamMembers: userData.teamMembers,
          rollNumber: userData.rollNumber,
          lastLogin: new Date().toISOString(),
        }

        mockCurrentUser = mockUser

        return {
          user: { uid: mockUser.uid, email: mockUser.email } as User,
          profile: mockUser,
        }
      } else {
        throw firebaseError
      }
    }
  } catch (error: any) {
    console.error("Authentication error:", error)
    throw new Error(error.message || "Authentication failed")
  }
}

// Sign out
export const signOutUser = async () => {
  try {
    if (mockCurrentUser) {
      mockCurrentUser = null
      return
    }
    await signOut(auth)
  } catch (error: any) {
    console.error("Sign out error:", error)
    throw new Error(error.message || "Sign out failed")
  }
}

// Get user profile
export const getUserProfile = async (uid: string, email: string): Promise<UserProfile> => {
  try {
    // Check if we have a mock user
    if (mockCurrentUser && mockCurrentUser.uid === uid) {
      return mockCurrentUser
    }

    // Try to get from Firestore
    try {
      const userDoc = await getDoc(doc(db, "users", uid))

      if (userDoc.exists()) {
        return userDoc.data() as UserProfile
      }
    } catch (error) {
      console.warn("Firestore fetch failed, creating new profile:", error)
    }

    // Create new user profile from predefined data
    const userData = USERS_DATA.find((u) => u.email === email)
    const isAdmin = email === "admin@infinity.tech"

    const newProfile: UserProfile = {
      uid,
      email,
      name: userData?.name || "Unknown User",
      role: isAdmin ? "admin" : "student",
      projectTitle: userData?.projectTitle,
      teamMembers: userData?.teamMembers,
      rollNumber: userData?.rollNumber,
      lastLogin: new Date().toISOString(),
    }

    // Try to save to Firestore
    try {
      await setDoc(doc(db, "users", uid), newProfile)
    } catch (error) {
      console.warn("Failed to save user profile to Firestore:", error)
    }

    return newProfile
  } catch (error) {
    console.error("Error getting user profile:", error)
    throw error
  }
}

// Get all users (for admin)
export const getAllUsers = async (): Promise<UserProfile[]> => {
  try {
    // Try to get from Firestore
    try {
      const usersSnapshot = await getDocs(collection(db, "users"))
      return usersSnapshot.docs.map((doc) => doc.data() as UserProfile)
    } catch (error) {
      console.warn("Firestore fetch failed, using mock data:", error)
      // Return mock data
      return USERS_DATA.map((user, index) => ({
        uid: `mock-${user.rollNumber || index}`,
        email: user.email,
        name: user.name,
        role: user.role,
        projectTitle: user.projectTitle,
        teamMembers: user.teamMembers,
        rollNumber: user.rollNumber,
        lastLogin: new Date().toISOString(),
      }))
    }
  } catch (error) {
    console.error("Error getting all users:", error)
    throw error
  }
}

// Auth state change listener
export const onAuthStateChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback)
}
