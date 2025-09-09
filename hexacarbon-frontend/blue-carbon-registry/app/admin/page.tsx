"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Waves, Shield, Users, CheckCircle, FileText, Database, AlertTriangle } from "lucide-react"
import Link from "next/link"

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <div className="flex items-center space-x-3">
                <div className="bg-primary p-2 rounded-lg">
                  <Waves className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-xl font-bold">Admin Panel</h1>
                  <p className="text-sm text-muted-foreground">NCCR administration tools</p>
                </div>
              </div>
            </div>
            <Badge variant="secondary" className="bg-red-800 text-white border-red-700">
              <Shield className="h-3 w-3 mr-1" />
              Admin Access
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                NCCR Admin Panel
              </CardTitle>
              <CardDescription>National Centre for Coastal Research administration tools</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="mb-4">
                <img
                  src="/admin-dashboard-with-charts-and-monitoring-screens.jpg"
                  alt="Admin dashboard"
                  className="w-full h-20 object-cover rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="h-20 flex-col bg-transparent">
                  <Users className="h-6 w-6 mb-2" />
                  <span className="text-xs">Verify NGOs</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col bg-transparent">
                  <CheckCircle className="h-6 w-6 mb-2" />
                  <span className="text-xs">Approve Projects</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col bg-transparent">
                  <FileText className="h-6 w-6 mb-2" />
                  <span className="text-xs">Generate Reports</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col bg-transparent">
                  <Database className="h-6 w-6 mb-2" />
                  <span className="text-xs">Audit Blockchain</span>
                </Button>
              </div>

              <div className="space-y-2">
                <Label>Pending Verifications</Label>
                <div className="space-y-2">
                  {[
                    { name: "Marine Conservation Trust", type: "NGO Registration", priority: "high" },
                    { name: "Coastal Community Collective", type: "Project Approval", priority: "medium" },
                    { name: "Green Shores Foundation", type: "Data Verification", priority: "low" },
                  ].map((item, index) => (
                    <div key={index} className="bg-muted/50 p-3 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">{item.name}</span>
                        <Badge
                          variant={
                            item.priority === "high"
                              ? "destructive"
                              : item.priority === "medium"
                                ? "default"
                                : "secondary"
                          }
                        >
                          {item.priority}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">{item.type}</p>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          Approve
                        </Button>
                        <Button size="sm" variant="destructive">
                          Reject
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>System Analytics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">24</div>
                  <p className="text-xs text-muted-foreground">Active Projects</p>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">156</div>
                  <p className="text-xs text-muted-foreground">Verified Users</p>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">1,247</div>
                  <p className="text-xs text-muted-foreground">Data Uploads</p>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">99.8%</div>
                  <p className="text-xs text-muted-foreground">Uptime</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Recent Admin Actions</Label>
                <div className="space-y-2">
                  {[
                    {
                      action: "Approved NGO registration",
                      user: "Green Earth Foundation",
                      time: "2h ago",
                      type: "success",
                    },
                    { action: "Verified project data", user: "BC-003 Pulicat", time: "4h ago", type: "success" },
                    { action: "Flagged suspicious upload", user: "Unknown User", time: "6h ago", type: "warning" },
                    { action: "Generated compliance report", user: "System", time: "1d ago", type: "info" },
                  ].map((log, index) => (
                    <div key={index} className="text-xs p-3 bg-muted/50 rounded flex items-start gap-2">
                      {log.type === "warning" && <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5" />}
                      {log.type === "success" && <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />}
                      {log.type === "info" && <FileText className="h-4 w-4 text-blue-500 mt-0.5" />}
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <span className="font-medium">{log.action}</span>
                          <span className="text-muted-foreground">{log.time}</span>
                        </div>
                        <div className="text-muted-foreground">{log.user}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  <span className="font-medium text-yellow-800">System Alerts</span>
                </div>
                <p className="text-sm text-yellow-700">3 pending verifications require immediate attention</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
