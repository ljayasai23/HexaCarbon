import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { StatsCard } from "@/components/dashboard/stats-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FolderOpen, Upload, CheckCircle, Clock, DollarSign, Leaf, TrendingUp } from "lucide-react"

const recentActivities = [
  {
    id: 1,
    action: "Project submitted",
    project: "Sundarbans Phase 2",
    timestamp: "2 hours ago",
    status: "pending",
  },
  {
    id: 2,
    action: "Credits earned",
    project: "Coastal Defense Initiative",
    timestamp: "1 day ago",
    status: "verified",
    credits: 150,
  },
  {
    id: 3,
    action: "Verification completed",
    project: "Mangrove Restoration",
    timestamp: "3 days ago",
    status: "verified",
  },
  {
    id: 4,
    action: "Project uploaded",
    project: "Community Planting",
    timestamp: "1 week ago",
    status: "pending",
  },
]

export default function DashboardOverview() {
  return (
    <DashboardLayout userRole="uploader">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Dashboard Overview</h1>
          <p className="text-muted-foreground">Track your mangrove restoration projects and carbon credit earnings</p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Total Projects"
            value={12}
            description="Active restoration projects"
            icon={FolderOpen}
            trend={{ value: 20, isPositive: true }}
          />
          <StatsCard title="Pending Verifications" value={3} description="Awaiting NCCR approval" icon={Clock} />
          <StatsCard
            title="Verified Credits"
            value="2,450"
            description="Total carbon credits earned"
            icon={CheckCircle}
            trend={{ value: 15, isPositive: true }}
          />
          <StatsCard
            title="Total Earnings"
            value="$61,250"
            description="From carbon credit sales"
            icon={DollarSign}
            trend={{ value: 8, isPositive: true }}
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest project submissions and updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                      <div>
                        <p className="text-sm font-medium">{activity.action}</p>
                        <p className="text-xs text-muted-foreground">{activity.project}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {activity.credits && (
                        <span className="text-xs font-medium text-accent">+{activity.credits} credits</span>
                      )}
                      <Badge variant={activity.status === "verified" ? "default" : "secondary"}>
                        {activity.status}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{activity.timestamp}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks and project management</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full justify-start" size="lg">
                <Upload className="mr-2 h-5 w-5" />
                Upload New Project
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent" size="lg">
                <FolderOpen className="mr-2 h-5 w-5" />
                View All Projects
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent" size="lg">
                <TrendingUp className="mr-2 h-5 w-5" />
                View Earnings Report
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent" size="lg">
                <Leaf className="mr-2 h-5 w-5" />
                Project Guidelines
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Project Status Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Project Status Overview</CardTitle>
            <CardDescription>Current status of all your restoration projects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="text-center p-4 rounded-lg bg-accent/10">
                <div className="text-2xl font-bold text-accent">8</div>
                <div className="text-sm text-muted-foreground">Verified Projects</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-yellow-100 dark:bg-yellow-900/20">
                <div className="text-2xl font-bold text-yellow-600">3</div>
                <div className="text-sm text-muted-foreground">Pending Verification</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-blue-100 dark:bg-blue-900/20">
                <div className="text-2xl font-bold text-blue-600">1</div>
                <div className="text-sm text-muted-foreground">In Progress</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
