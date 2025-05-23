"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/components/auth-provider"
import { useToast } from "@/hooks/use-toast"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { ThumbsUp, Reply, Edit, Trash2, Send } from "lucide-react"

interface Comment {
  id: string
  text: string
  author: {
    name: string
    avatar: string
    role?: string
  }
  timestamp: string
  likes: number
  isLiked: boolean
  replies: Comment[]
}

interface EnhancedCommentSystemProps {
  itemId: string
  itemType: "research" | "project"
  initialComments?: Comment[]
}

export function EnhancedCommentSystem({ itemId, itemType, initialComments = [] }: EnhancedCommentSystemProps) {
  const { user } = useAuth()
  const { toast } = useToast()
  const [comments, setComments] = useState<Comment[]>(initialComments)
  const [commentText, setCommentText] = useState("")
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [replyText, setReplyText] = useState("")
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editText, setEditText] = useState("")

  useEffect(() => {
    // In a real app, this would fetch comments from an API
    if (initialComments.length === 0 && comments.length === 0) {
      const mockComments: Comment[] = [
        {
          id: "1",
          text: "This research has incredible implications for deep space navigation. I'm particularly interested in how the quantum entanglement principles could be applied to smaller spacecraft.",
          author: {
            name: "Dr. Elara Vega",
            avatar: "https://randomuser.me/api/portraits/women/1.jpg",
            role: "Lead Researcher",
          },
          timestamp: "2 days ago",
          likes: 8,
          isLiked: false,
          replies: [
            {
              id: "1-1",
              text: "Great point! We're actually working on miniaturizing the quantum positioning array for smaller craft now.",
              author: {
                name: "Prof. Kai Zhang",
                avatar: "https://randomuser.me/api/portraits/men/2.jpg",
                role: "Quantum Systems Engineer",
              },
              timestamp: "1 day ago",
              likes: 3,
              isLiked: false,
              replies: [],
            },
          ],
        },
        {
          id: "2",
          text: "Have you considered the power requirements for maintaining quantum coherence over such long distances? This seems like it would be a significant challenge.",
          author: {
            name: "Dr. Aiden Mercer",
            avatar: "https://randomuser.me/api/portraits/men/3.jpg",
          },
          timestamp: "3 days ago",
          likes: 5,
          isLiked: false,
          replies: [],
        },
      ]
      setComments(mockComments)
    }
  }, [initialComments, comments.length])

  const handleSubmitComment = () => {
    if (!commentText.trim()) {
      toast({
        title: "Comment Required",
        description: "Please enter a comment.",
        variant: "destructive",
      })
      return
    }

    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to post a comment.",
        variant: "destructive",
      })
      return
    }

    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      text: commentText,
      author: {
        name: user.name || "Anonymous User",
        avatar: user.avatar || "https://randomuser.me/api/portraits/lego/1.jpg",
      },
      timestamp: "Just now",
      likes: 0,
      isLiked: false,
      replies: [],
    }

    setComments([newComment, ...comments])
    setCommentText("")

    toast({
      title: "Comment Posted",
      description: "Your comment has been posted successfully.",
    })
  }

  const handleSubmitReply = (commentId: string) => {
    if (!replyText.trim()) {
      toast({
        title: "Reply Required",
        description: "Please enter a reply.",
        variant: "destructive",
      })
      return
    }

    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to post a reply.",
        variant: "destructive",
      })
      return
    }

    const newReply: Comment = {
      id: `reply-${Date.now()}`,
      text: replyText,
      author: {
        name: user.name || "Anonymous User",
        avatar: user.avatar || "https://randomuser.me/api/portraits/lego/1.jpg",
      },
      timestamp: "Just now",
      likes: 0,
      isLiked: false,
      replies: [],
    }

    const updatedComments = comments.map((comment) => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [newReply, ...comment.replies],
        }
      }
      return comment
    })

    setComments(updatedComments)
    setReplyingTo(null)
    setReplyText("")

    toast({
      title: "Reply Posted",
      description: "Your reply has been posted successfully.",
    })
  }

  const handleEditComment = (commentId: string, isReply = false, parentId?: string) => {
    if (!editText.trim()) {
      toast({
        title: "Edit Required",
        description: "Please enter your edited comment.",
        variant: "destructive",
      })
      return
    }

    let updatedComments

    if (isReply && parentId) {
      updatedComments = comments.map((comment) => {
        if (comment.id === parentId) {
          return {
            ...comment,
            replies: comment.replies.map((reply) => {
              if (reply.id === commentId) {
                return {
                  ...reply,
                  text: editText,
                  timestamp: "Just now (edited)",
                }
              }
              return reply
            }),
          }
        }
        return comment
      })
    } else {
      updatedComments = comments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            text: editText,
            timestamp: "Just now (edited)",
          }
        }
        return comment
      })
    }

    setComments(updatedComments)
    setEditingId(null)
    setEditText("")

    toast({
      title: "Comment Updated",
      description: "Your comment has been updated successfully.",
    })
  }

  const handleDeleteComment = (commentId: string, isReply = false, parentId?: string) => {
    let updatedComments

    if (isReply && parentId) {
      updatedComments = comments.map((comment) => {
        if (comment.id === parentId) {
          return {
            ...comment,
            replies: comment.replies.filter((reply) => reply.id !== commentId),
          }
        }
        return comment
      })
    } else {
      updatedComments = comments.filter((comment) => comment.id !== commentId)
    }

    setComments(updatedComments)

    toast({
      title: "Comment Deleted",
      description: "Your comment has been deleted successfully.",
    })
  }

  const handleLikeComment = (commentId: string, isReply = false, parentId?: string) => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to like a comment.",
        variant: "destructive",
      })
      return
    }

    let updatedComments

    if (isReply && parentId) {
      updatedComments = comments.map((comment) => {
        if (comment.id === parentId) {
          return {
            ...comment,
            replies: comment.replies.map((reply) => {
              if (reply.id === commentId) {
                return {
                  ...reply,
                  likes: reply.isLiked ? reply.likes - 1 : reply.likes + 1,
                  isLiked: !reply.isLiked,
                }
              }
              return reply
            }),
          }
        }
        return comment
      })
    } else {
      updatedComments = comments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
            isLiked: !comment.isLiked,
          }
        }
        return comment
      })
    }

    setComments(updatedComments)
  }

  const renderComment = (comment: Comment, isReply = false, parentId?: string) => {
    const isEditing = editingId === comment.id
    const isCurrentUser = user && user.name === comment.author.name

    return (
      <Card key={comment.id} className={`mb-4 ${isReply ? "ml-12" : ""}`}>
        <CardHeader className="flex flex-row items-start space-y-0 pb-2">
          <Avatar className="h-8 w-8 mr-2">
            <AvatarImage src={comment.author.avatar || "/placeholder.svg"} alt={comment.author.name} />
            <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <div className="font-semibold">{comment.author.name}</div>
            {comment.author.role && <div className="text-xs text-muted-foreground">{comment.author.role}</div>}
          </div>
          <div className="ml-auto text-xs text-muted-foreground">{comment.timestamp}</div>
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <Textarea
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              placeholder="Edit your comment..."
              className="mb-2"
            />
          ) : (
            <p className="text-sm">{comment.text}</p>
          )}
        </CardContent>
        <CardFooter className="flex justify-between pt-0">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className={`flex items-center space-x-1 ${comment.isLiked ? "text-blue-500" : ""}`}
              onClick={() => handleLikeComment(comment.id, isReply, parentId)}
            >
              <ThumbsUp className="h-4 w-4" />
              <span>{comment.likes}</span>
            </Button>
            {!isReply && (
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center space-x-1"
                onClick={() => {
                  setReplyingTo(replyingTo === comment.id ? null : comment.id)
                  setReplyText("")
                }}
              >
                <Reply className="h-4 w-4" />
                <span>Reply</span>
              </Button>
            )}
          </div>
          {isCurrentUser && (
            <div className="flex items-center space-x-2">
              {isEditing ? (
                <Button variant="outline" size="sm" onClick={() => handleEditComment(comment.id, isReply, parentId)}>
                  Save
                </Button>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setEditingId(comment.id)
                    setEditText(comment.text)
                  }}
                >
                  <Edit className="h-4 w-4" />
                </Button>
              )}
              <Button variant="ghost" size="sm" onClick={() => handleDeleteComment(comment.id, isReply, parentId)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          )}
        </CardFooter>
        {replyingTo === comment.id && (
          <div className="px-4 pb-4">
            <Textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Write a reply..."
              className="mb-2"
            />
            <div className="flex justify-end space-x-2">
              <Button variant="outline" size="sm" onClick={() => setReplyingTo(null)}>
                Cancel
              </Button>
              <Button size="sm" onClick={() => handleSubmitReply(comment.id)}>
                Reply
              </Button>
            </div>
          </div>
        )}
        {comment.replies.length > 0 && (
          <div className="px-4 pb-4">{comment.replies.map((reply) => renderComment(reply, true, comment.id))}</div>
        )}
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Comments</h3>
        <div className="flex space-x-2">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={user?.avatar || "https://randomuser.me/api/portraits/lego/1.jpg"}
              alt={user?.name || "Anonymous"}
            />
            <AvatarFallback>{user?.name?.charAt(0) || "A"}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <Textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder={user ? "Write a comment..." : "Please login to comment..."}
              disabled={!user}
              className="mb-2"
            />
            <div className="flex justify-end">
              <Button
                onClick={handleSubmitComment}
                disabled={!user || !commentText.trim()}
                className="flex items-center space-x-1"
              >
                <Send className="h-4 w-4 mr-1" />
                Post Comment
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {comments.length > 0 ? (
          comments.map((comment) => renderComment(comment))
        ) : (
          <p className="text-center text-muted-foreground">No comments yet. Be the first to comment!</p>
        )}
      </div>
    </div>
  )
}
