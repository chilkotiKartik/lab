"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import AdminLayout from "@/components/admin/admin-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Search, Filter, MoreHorizontal, UserPlus } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Mock user data
const usersData = [
  {
    id: "1",
    name: "Dr. Elara Vega",
    email: "elara.vega@avasya-lab.com",
    role: "researcher",
    status: "active",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    joinDate: "Jan 15, 2023",
    lastActive: "2 hours ago",
    researchCount: 8,
    projectCount: 3,
  },
  {
    id: "2",
    name: "Prof. Kai Zhang",
    email: "kai.zhang@avasya-lab.com",
    role: "researcher",
    status: "active",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    joinDate: "Feb 3, 2023",
    lastActive: "1 day ago",
    researchCount: 5,
    projectCount: 2,
  },
  {
    id: "3",
    name: "Dr. Aiden Mercer",
    email: "aiden.mercer@avasya-lab.com",
    role: "researcher",
    status: "active",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    joinDate: "Mar 12, 2023",
    lastActive: "3 days ago",
    researchCount: 6,
    projectCount: 1,
  },
  {
    id: "4",
    name: "Dr. Lyra Chen",
    email: "lyra.chen@avasya-lab.com",
    role: "researcher",
    status: "inactive",
    avatar: "https://randomuser.me/api/portraits/women/4.jpg",
    joinDate: "Apr 5, 2023",
    lastActive: "2 weeks ago",
    researchCount: 3,
    projectCount: 0,
  },
  {
    id: "5",
    name: "Alex Morgan",
    email: "alex.morgan@avasya-lab.com",
    role: "admin",
    status: "active",
    avatar: "https://randomuser.me/api/portraits/men/5.jpg",
    joinDate: "Jan 5, 2023",
    lastActive: "Just now",
    researchCount: 0,
    projectCount: 0,
  },
  {
    id: "6",
    name: "Sophia Chen",
    email: "sophia.chen@avasya-lab.com",
    role: "user",
    status: "pending",
    avatar: "https://randomuser.me/api/portraits/women/6.jpg",
    joinDate: "Jun 20, 2023",
    lastActive: "Never",
    researchCount: 0,
    projectCount: 0,
  },
]

// Status badge colors
const statusColors = {
  active: "bg-green-500/20 text-green-500",
  inactive: "bg-gray-500/20 text-gray-500",
  pending: "bg-amber-500/20 text-amber-500",
}

// Role badge colors
const roleColors = {
  admin: "bg-purple-500/20 text-purple-500",
  researcher: "bg-blue-500/20 text-blue-500",
  user: "bg-gray-500/20 text-gray-500",
}

export default function UsersPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [filteredUsers, setFilteredUsers] = useState(usersData)

  useEffect(() => {
    let result = [...usersData]

    // Apply search filter
    if (searchTerm) {
      result = result.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Apply role filter
    if (roleFilter !== "all") {
      result = result.filter((user) => user.role === roleFilter)
    }

    // Apply status filter
    if (statusFilter !== "all") {
      result = result.filter((user) => user.status === statusFilter)
    }

    setFilteredUsers(result)
  }, [searchTerm, roleFilter, statusFilter])

  const handleStatusChange = (userId: string, newStatus: string) => {
    // In a real app, this would update the database
    toast({
      title: "User Status Updated",
      description: `User status has been changed to ${newStatus}.`,
    })
  }

  const handleRoleChange = (userId: string, newRole: string) => {
    // In a real app, this would update the database
    toast({
      title: "User Role Updated",
      description: `User role has been changed to ${newRole}.`,
    })
  }

  const handleDeleteUser = (userId: string) => {
    // In a real app, this would update the database
    toast({
      title: "User Deleted",
      description: "The user has been deleted successfully.",
    })
  }

  return (
    <AdminLayout>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Users</h1>
          <p className="text-muted-foreground">Manage user accounts and permissions</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button onClick={() => router.push("/admin/users/create")}>
            <UserPlus className="mr-2 h-4 w-4" /> Add User
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <div className="flex items-center">
            <Filter className="mr-2 h-4 w-4 text-muted-foreground" />
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="researcher">Researcher</SelectItem>
                <SelectItem value="user">User</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Users Table */}
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Join Date</TableHead>
              <TableHead>Last Active</TableHead>
              <TableHead>Content</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center">
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground">{user.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={roleColors[user.role as keyof typeof roleColors]}>{user.role}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={statusColors[user.status as keyof typeof statusColors]}>{user.status}</Badge>
                  </TableCell>
                  <TableCell>{user.joinDate}</TableCell>
                  <TableCell>{user.lastActive}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{user.researchCount} Research</div>
                      <div>{user.projectCount} Projects</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => router.push(`/admin/users/${user.id}`)}>
                          View Profile
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleRoleChange(user.id, "admin")}>
                          Make Admin
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleRoleChange(user.id, "researcher")}>
                          Make Researcher
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleStatusChange(user.id, "active")}>
                          Set Active
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleStatusChange(user.id, "inactive")}>
                          Set Inactive
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteUser(user.id)}>
                          Delete User
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">
                  <div className="flex flex-col items-center justify-center">
                    <div className="text-muted-foreground mb-2">No users found</div>
                    <div className="text-sm text-muted-foreground">Try adjusting your search or filter criteria</div>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </AdminLayout>
  )
}
