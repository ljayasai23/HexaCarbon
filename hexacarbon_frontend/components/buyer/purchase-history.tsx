"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, ExternalLink, Download } from "lucide-react"

const purchaseHistory = [
  {
    id: 1,
    date: "2024-01-20",
    projectName: "Sundarbans Restoration Phase 1",
    location: "West Bengal, India",
    credits: 500,
    pricePerCredit: 25,
    totalCost: 12500,
    transactionHash: "0xabcdef1234567890abcdef1234567890abcdef12",
    status: "completed",
    certificateId: "HC-SUN-001-500",
  },
  {
    id: 2,
    date: "2024-01-18",
    projectName: "Maldives Blue Carbon Project",
    location: "Addu Atoll, Maldives",
    credits: 300,
    pricePerCredit: 30,
    totalCost: 9000,
    transactionHash: "0x1234567890abcdef1234567890abcdef12345678",
    status: "completed",
    certificateId: "HC-MAL-002-300",
  },
  {
    id: 3,
    date: "2024-01-15",
    projectName: "Philippines Coastal Defense",
    location: "Palawan, Philippines",
    credits: 750,
    pricePerCredit: 22,
    totalCost: 16500,
    transactionHash: "0x9876543210fedcba9876543210fedcba98765432",
    status: "completed",
    certificateId: "HC-PHI-003-750",
  },
  {
    id: 4,
    date: "2024-01-10",
    projectName: "Kerala Backwater Restoration",
    location: "Kerala, India",
    credits: 200,
    pricePerCredit: 28,
    totalCost: 5600,
    transactionHash: "0xfedcba0987654321fedcba0987654321fedcba09",
    status: "completed",
    certificateId: "HC-KER-004-200",
  },
]

export function PurchaseHistory() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredHistory = purchaseHistory.filter((purchase) => {
    const matchesSearch =
      purchase.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      purchase.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      purchase.certificateId.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || purchase.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const totalCredits = purchaseHistory.reduce((sum, purchase) => sum + purchase.credits, 0)
  const totalSpent = purchaseHistory.reduce((sum, purchase) => sum + purchase.totalCost, 0)
  const averagePrice = totalSpent / totalCredits

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{purchaseHistory.length}</div>
            <div className="text-sm text-muted-foreground">Total Purchases</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{totalCredits.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Credits Purchased</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">${totalSpent.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Total Spent</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">${averagePrice.toFixed(2)}</div>
            <div className="text-sm text-muted-foreground">Avg. Price/Credit</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between space-x-4">
            <div className="flex items-center space-x-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search purchases..."
                  className="pl-10"
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
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
              </select>
            </div>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export History
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Purchase History Table */}
      <Card>
        <CardHeader>
          <CardTitle>Purchase History</CardTitle>
          <CardDescription>Complete record of your carbon credit purchases</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Project</TableHead>
                  <TableHead>Credits</TableHead>
                  <TableHead>Price/Credit</TableHead>
                  <TableHead>Total Cost</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Certificate</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredHistory.map((purchase) => (
                  <TableRow key={purchase.id}>
                    <TableCell>{purchase.date}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{purchase.projectName}</div>
                        <div className="text-sm text-muted-foreground">{purchase.location}</div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{purchase.credits}</TableCell>
                    <TableCell>${purchase.pricePerCredit}</TableCell>
                    <TableCell className="font-medium">${purchase.totalCost.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge variant={purchase.status === "completed" ? "default" : "secondary"}>
                        {purchase.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <code className="text-xs bg-muted px-2 py-1 rounded">{purchase.certificateId}</code>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Button variant="ghost" size="sm" title="View on blockchain">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" title="Download certificate">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredHistory.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No purchases found matching your criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
