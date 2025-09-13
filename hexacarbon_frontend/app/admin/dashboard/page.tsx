import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { StatsCard } from "@/components/dashboard/stats-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AdminMap } from "@/components/admin/admin-map"
import { RealtimeQueue } from "@/components/admin/realtime-queue"
import { CheckCircle, Clock, AlertTriangle, Users, Leaf } from "lucide-react"

const systemStats = [
  {
    title: "Total Projects",
    value: 247,
    description: "All submitted projects",
    icon: Leaf,
    trend: { value: 12, isPositive: true },
  },
  {
    title: "Pending Verification",
    value: 18,
    description: "Awaiting admin review",
    icon: Clock,
    trend: { value: -5, isPositive: false },
  },
  {
    title: "Verified Projects",
    value: 189,
    description: "Successfully verified",
    icon: CheckCircle,
    trend: { value: 8, isPositive: true },
  },
  {
    title: "Active Communities",
    value: 156,
    description: "Registered organizations",
    icon: Users,
    trend: { value: 15, isPositive: true },
  },
]

const recentVerifications = [
  {
    id: 1,
    projectName: "Sundarbans Phase 3",
    community: "West Bengal Collective",
    submittedDate: "2024-01-28",
    status: "verified",
    credits: 1450,
    verifier: "Dr. Sarah Chen",
  },
  {
    id: 2,
    projectName: "Maldives Coastal Defense",
    community: "Addu Nature Park",
    submittedDate: "2024-01-27",
    status: "verified",
    credits: 980,
    verifier: "Dr. Michael Rodriguez",
  },
  {
    id: 3,
    projectName: "Philippines Restoration",
    community: "Palawan NGO Network",
    submittedDate: "2024-01-26",
    status: "rejected",
    credits: 0,
    verifier: "Dr. Sarah Chen",
    reason: "Insufficient documentation",
  },
]

export default function AdminDashboard() {
  return (
    <DashboardLayout userRole="admin" userName="Dr. Sarah Chen" userEmail="sarah.chen@nccr.org">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Monitor system-wide activity and manage project verifications</p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {systemStats.map((stat, index) => (
            <StatsCard
              key={index}
              title={stat.title}
              value={stat.value}
              description={stat.description}
              icon={stat.icon}
              trend={stat.trend}
            />
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Interactive Map */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Project Locations</CardTitle>
              <CardDescription>Global distribution of mangrove restoration projects</CardDescription>
            </CardHeader>
            <CardContent>
              <AdminMap />
            </CardContent>
          </Card>

          {/* Real-time Verification Queue */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Live Verification Queue</CardTitle>
                  <CardDescription>New submissions requiring review</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-muted-foreground">Live</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <RealtimeQueue />
            </CardContent>
          </Card>
        </div>

        {/* Recent Verifications */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Verifications</CardTitle>
                <CardDescription>Latest project reviews and decisions</CardDescription>
              </div>
              <Button variant="outline">View All</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentVerifications.map((verification) => (
                <div key={verification.id} className="flex items-center justify-between p-4 rounded-lg border">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      {verification.status === "verified" ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : verification.status === "rejected" ? (
                        <AlertTriangle className="w-5 h-5 text-red-600" />
                      ) : (
                        <Clock className="w-5 h-5 text-yellow-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{verification.projectName}</p>
                      <p className="text-sm text-muted-foreground">{verification.community}</p>
                      {verification.reason && <p className="text-xs text-red-600 mt-1">{verification.reason}</p>}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-4">
                      {verification.credits > 0 && (
                        <span className="text-sm font-medium text-green-600">+{verification.credits} credits</span>
                      )}
                      <Badge variant={verification.status === "verified" ? "default" : "destructive"}>
                        {verification.status}
                      </Badge>
                      <div className="text-xs text-muted-foreground">
                        <div>by {verification.verifier}</div>
                        <div>{verification.submittedDate}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Health */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Blockchain Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm">Connected to Polygon</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">Last block: 2 seconds ago</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">IPFS Network</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm">Operational</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">47 files uploaded today</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">API Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm">All systems operational</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">99.9% uptime</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
