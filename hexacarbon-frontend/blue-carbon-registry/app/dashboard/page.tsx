"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Leaf, Shield, Users, MapPin, Coins, TreePine, CheckCircle, Clock, ArrowLeft, Waves } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const [carbonCredits] = useState(2847)
  const [restorationProgress] = useState(68)

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
                  <h1 className="text-xl font-bold">Dashboard</h1>
                  <p className="text-sm text-muted-foreground">Real-time monitoring & analytics</p>
                </div>
              </div>
            </div>
            <Badge variant="secondary" className="bg-emerald-800 text-white border-emerald-700">
              <Shield className="h-3 w-3 mr-1" />
              Live Data
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Key Metrics */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Carbon Credits</CardTitle>
              <Coins className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{carbonCredits.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
              <TreePine className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">Across 8 coastal areas</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Restoration Progress</CardTitle>
              <Leaf className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{restorationProgress}%</div>
              <Progress value={restorationProgress} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Verified Stakeholders</CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">156</div>
              <p className="text-xs text-muted-foreground">NGOs, Communities, Panchayats</p>
            </CardContent>
          </Card>
        </div>

        {/* Project Showcase */}
        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card className="overflow-hidden">
            <div className="relative h-48">
              <img
                src="/sundarbans-mangrove-forest-restoration-with-worker.jpg"
                alt="Sundarbans Mangrove Restoration"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black/90 p-4">
                <h3 className="font-semibold text-white">Sundarbans Project</h3>
                <p className="text-sm text-gray-200">West Bengal • 120 hectares</p>
              </div>
            </div>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="bg-emerald-100 text-emerald-800">
                  Active
                </Badge>
                <span className="text-sm font-medium text-primary">450 BCT</span>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden">
            <div className="relative h-48">
              <img
                src="/chilika-lake-seagrass-conservation-underwater-seag.jpg"
                alt="Chilika Seagrass Conservation"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black/90 p-4">
                <h3 className="font-semibold text-white">Chilika Conservation</h3>
                <p className="text-sm text-gray-200">Odisha • 85 hectares</p>
              </div>
            </div>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <Badge variant="default">Verified</Badge>
                <span className="text-sm font-medium text-primary">320 BCT</span>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden">
            <div className="relative h-48">
              <img
                src="/pulicat-lake-salt-marsh-restoration-coastal-wetlan.jpg"
                alt="Pulicat Salt Marsh Restoration"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black/90 p-4">
                <h3 className="font-semibold text-white">Pulicat Restoration</h3>
                <p className="text-sm text-gray-200">Tamil Nadu • 95 hectares</p>
              </div>
            </div>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">
                  Pending
                </Badge>
                <span className="text-sm font-medium text-primary">380 BCT</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Recent Restoration Activities
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  location: "Sundarbans, West Bengal",
                  area: "45 hectares",
                  status: "verified",
                  time: "2 hours ago",
                },
                { location: "Chilika Lake, Odisha", area: "32 hectares", status: "pending", time: "5 hours ago" },
                {
                  location: "Pulicat Lake, Tamil Nadu",
                  area: "28 hectares",
                  status: "verified",
                  time: "1 day ago",
                },
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{activity.location}</p>
                    <p className="text-xs text-muted-foreground">
                      {activity.area} • {activity.time}
                    </p>
                  </div>
                  <Badge
                    variant={activity.status === "verified" ? "default" : "outline"}
                    className={activity.status === "pending" ? "bg-yellow-100 text-yellow-800 border-yellow-300" : ""}
                  >
                    {activity.status === "verified" ? (
                      <CheckCircle className="h-3 w-3 mr-1" />
                    ) : (
                      <Clock className="h-3 w-3 mr-1" />
                    )}
                    {activity.status}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Blockchain Transactions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { hash: "0x1a2b3c...", type: "Credit Mint", amount: "150 BCT", time: "1 hour ago" },
                { hash: "0x4d5e6f...", type: "Data Upload", amount: "—", time: "3 hours ago" },
                { hash: "0x7g8h9i...", type: "Verification", amount: "75 BCT", time: "6 hours ago" },
              ].map((tx, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm font-mono">{tx.hash}</p>
                    <p className="text-xs text-muted-foreground">
                      {tx.type} • {tx.time}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-primary">{tx.amount}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
