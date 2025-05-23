import { createClient } from "@supabase/supabase-js"

// Create a single supabase client for the browser
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

// Create a singleton instance
let supabaseInstance: ReturnType<typeof createClient> | null = null

export const getSupabaseClient = () => {
  if (!supabaseInstance) {
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey)
  }
  return supabaseInstance
}

// User functions
export const getUsers = async () => {
  const supabase = getSupabaseClient()
  const { data, error } = await supabase.from("users").select("*")
  if (error) throw error
  return data
}

export const getUserById = async (id: string) => {
  const supabase = getSupabaseClient()
  const { data, error } = await supabase.from("users").select("*").eq("id", id).single()
  if (error) throw error
  return data
}

export const createUser = async (userData: any) => {
  const supabase = getSupabaseClient()
  const { data, error } = await supabase.from("users").insert(userData).select()
  if (error) throw error
  return data
}

// Research functions
export const getResearch = async () => {
  const supabase = getSupabaseClient()
  const { data, error } = await supabase
    .from("research")
    .select("*, author:author_id(name, avatar_url, role)")
    .order("created_at", { ascending: false })
  if (error) throw error
  return data
}

export const getResearchById = async (id: string) => {
  const supabase = getSupabaseClient()
  const { data, error } = await supabase
    .from("research")
    .select("*, author:author_id(name, avatar_url, role)")
    .eq("id", id)
    .single()
  if (error) throw error
  return data
}

export const createResearch = async (researchData: any) => {
  const supabase = getSupabaseClient()
  const { data, error } = await supabase.from("research").insert(researchData).select()
  if (error) throw error
  return data
}

// Projects functions
export const getProjects = async () => {
  const supabase = getSupabaseClient()
  const { data, error } = await supabase
    .from("projects")
    .select("*, members:project_members(user_id, role)")
    .order("created_at", { ascending: false })
  if (error) throw error
  return data
}

export const getProjectById = async (id: string) => {
  const supabase = getSupabaseClient()
  const { data, error } = await supabase
    .from("projects")
    .select("*, members:project_members(user_id, role)")
    .eq("id", id)
    .single()
  if (error) throw error
  return data
}

export const createProject = async (projectData: any) => {
  const supabase = getSupabaseClient()
  const { data, error } = await supabase.from("projects").insert(projectData).select()
  if (error) throw error
  return data
}

// Comments functions
export const getComments = async (resourceType: string, resourceId: string) => {
  const supabase = getSupabaseClient()
  const { data, error } = await supabase
    .from("comments")
    .select("*, user:user_id(name, avatar_url, role)")
    .eq("resource_type", resourceType)
    .eq("resource_id", resourceId)
    .order("created_at", { ascending: true })
  if (error) throw error
  return data
}

export const createComment = async (commentData: any) => {
  const supabase = getSupabaseClient()
  const { data, error } = await supabase.from("comments").insert(commentData).select()
  if (error) throw error
  return data
}

// Likes functions
export const toggleLike = async (userId: string, resourceType: string, resourceId: string) => {
  const supabase = getSupabaseClient()

  // Check if like exists
  const { data: existingLike, error: checkError } = await supabase
    .from("likes")
    .select("id")
    .eq("user_id", userId)
    .eq("resource_type", resourceType)
    .eq("resource_id", resourceId)
    .single()

  if (checkError && checkError.code !== "PGRST116") throw checkError

  if (existingLike) {
    // Remove like
    const { error: deleteError } = await supabase.from("likes").delete().eq("id", existingLike.id)

    if (deleteError) throw deleteError
    return { liked: false }
  } else {
    // Add like
    const { error: insertError } = await supabase.from("likes").insert({
      user_id: userId,
      resource_type: resourceType,
      resource_id: resourceId,
    })

    if (insertError) throw insertError
    return { liked: true }
  }
}

// Reviews functions
export const getReviews = async (resourceType: string, resourceId: string) => {
  const supabase = getSupabaseClient()
  const { data, error } = await supabase
    .from("reviews")
    .select("*, reviewer:reviewer_id(name, avatar_url, role)")
    .eq("resource_type", resourceType)
    .eq("resource_id", resourceId)
    .order("created_at", { ascending: false })
  if (error) throw error
  return data
}

export const createReview = async (reviewData: any) => {
  const supabase = getSupabaseClient()
  const { data, error } = await supabase.from("reviews").insert(reviewData).select()
  if (error) throw error
  return data
}

export const updateReviewStatus = async (reviewId: string, status: string, feedback?: string) => {
  const supabase = getSupabaseClient()
  const updateData: any = { status }
  if (feedback) updateData.feedback = feedback

  const { data, error } = await supabase.from("reviews").update(updateData).eq("id", reviewId).select()

  if (error) throw error
  return data
}

// Achievements functions
export const getUserAchievements = async (userId: string) => {
  const supabase = getSupabaseClient()
  const { data, error } = await supabase
    .from("user_achievements")
    .select("*, achievement:achievement_id(*)")
    .eq("user_id", userId)
    .order("achieved_at", { ascending: false })

  if (error) throw error
  return data
}

export const addUserAchievement = async (userId: string, achievementId: string) => {
  const supabase = getSupabaseClient()
  const { data, error } = await supabase
    .from("user_achievements")
    .insert({ user_id: userId, achievement_id: achievementId })
    .select()

  if (error) throw error
  return data
}

// Notifications functions
export const getUserNotifications = async (userId: string) => {
  const supabase = getSupabaseClient()
  const { data, error } = await supabase
    .from("notifications")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })

  if (error) throw error
  return data
}

export const createNotification = async (notificationData: any) => {
  const supabase = getSupabaseClient()
  const { data, error } = await supabase.from("notifications").insert(notificationData).select()
  if (error) throw error
  return data
}

export const markNotificationAsRead = async (notificationId: string) => {
  const supabase = getSupabaseClient()
  const { data, error } = await supabase
    .from("notifications")
    .update({ is_read: true })
    .eq("id", notificationId)
    .select()

  if (error) throw error
  return data
}
