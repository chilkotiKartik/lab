"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { MessageSquare } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface CommentDialogProps {
  itemId: string
  itemType: "research" | "project"
  onCommentAdded: (id: string, type: "research" | "project") => void
}

export function CommentDialog({ itemId, itemType, onCommentAdded }: CommentDialogProps) {
  const [open, setOpen] = useState(false)
  const [commentText, setCommentText] = useState("")
  const { toast } = useToast()

  const handleSubmit = () => {
    if (!commentText.trim()) {
      toast({
        title: "Comment Required",
        description: "Please enter a comment.",
        variant: "destructive",
      })
      return
    }

    onCommentAdded(itemId, itemType)
    setCommentText("")
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <MessageSquare className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add a Comment</DialogTitle>
          <DialogDescription>
            Share your thoughts on this {itemType === "research" ? "research paper" : "project"}.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <Textarea
            placeholder="Write your comment here..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="min-h-[100px]"
          />
        </div>
        <DialogFooter className="sm:justify-between">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Post Comment</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
