"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, MoreHorizontal, Eye, ExternalLink, Download } from "lucide-react"

const projects = [
  {
    id: 1,
    name: "Sundarbans Restoration Phase 1",
    location: "West Bengal, India",
    status: "verified",
    credits: 1250,
    submittedDate: "2024-01-15",
    verifiedDate: "2024-01-20",
    transactionHash: "0x1234...5678",
    ipfsHash: "QmYwAP...PbdG",
  },
  {
    id: 2,
    name: "Coastal Defense Initiative",
    location: "Kerala, India",
    status: "verified",
    credits: 850,
    submittedDate: "2024-01-10",
    verifiedDate: "2024-01-18",
    transactionHash: "0xabcd...efgh",
    ipfsHash: "QmXyZ1...AbCd",
  },
  {
    id: 3,
    name: "Community Mangrove Project",
    location: "Tamil Nadu, India",
    status: "pending",
    credits: 0,
    submittedDate: "2024-01-25",
    verifiedDate: null,
    transactionHash: "0x9876...5432",
    ipfsHash: "QmPqR2...EfGh",
  },
  {
    id: 4,
    name: "Backwater Restoration",
    location: "Goa, India",
    status: "in-progress",
    credits: 0,
    submittedDate: "2024-01-28",
    verifiedDate: null,
    transactionHash: null,
    ipfsHash: null,
  },
]

export function ProjectsTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || project.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "verified":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">Verified</Badge>
      case "pending":
        return <Badge variant="secondary">Pending Verification</Badge>
      case "in-progress":
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">In Progress</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Projects</CardTitle>
        <CardDescription>Manage and track all your mangrove restoration projects</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Filters */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search projects..."
                className="pl-10 w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="px-3 py-2 border border-border rounded-md text-sm"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="verified">Verified</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
            </select>
          </div>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
        </div>

        {/* Table */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project Name</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Credits</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead>Verified</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProjects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell className="font-medium">{project.name}</TableCell>
                  <TableCell>{project.location}</TableCell>
                  <TableCell>{getStatusBadge(project.status)}</TableCell>
                  <TableCell>
                    {project.credits > 0 ? (
                      <span className="font-medium text-green-600">{project.credits}</span>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell>{project.submittedDate}</TableCell>
                  <TableCell>{project.verifiedDate || <span className="text-muted-foreground">-</span>}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        {project.transactionHash && (
                          <DropdownMenuItem>
                            <ExternalLink className="mr-2 h-4 w-4" />
                            View on Blockchain
                          </DropdownMenuItem>
                        )}
                        {project.ipfsHash && (
                          <DropdownMenuItem>
                            <ExternalLink className="mr-2 h-4 w-4" />
                            View on IPFS
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No projects found matching your criteria.</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
