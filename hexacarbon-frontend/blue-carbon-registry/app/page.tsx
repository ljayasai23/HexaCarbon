"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Shield,
  Users,
  TrendingUp,
  Upload,
  Coins,
  Database,
  Waves,
  TreePine,
  FileText,
  CheckCircle,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-96 bg-gradient-to-r from-emerald-900/90 to-teal-900/90 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/aerial-view-of-mangrove-forest-coastal-restoration.jpg')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/80 to-teal-900/80" />
        <div className="relative container mx-auto px-4 py-16 text-white">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-balance">Blue Carbon Registry</h1>
            <p className="text-xl md:text-2xl mb-6 text-emerald-100 text-pretty">
              Blockchain-powered MRV system for coastal ecosystem restoration and carbon credit verification
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/dashboard">
                <Button size="lg" className="bg-white text-emerald-900 hover:bg-emerald-50">
                  <Shield className="h-5 w-5 mr-2" />
                  Access Dashboard
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-transparent">
                <FileText className="h-5 w-5 mr-2" />
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <div className="bg-primary p-2 rounded-lg">
                <Waves className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-balance">Blue Carbon Registry</h1>
                <p className="text-sm text-muted-foreground">Blockchain MRV System</p>
              </div>
            </Link>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-emerald-800 text-white border-emerald-700">
                <Shield className="h-3 w-3 mr-1" />
                Blockchain Verified
              </Badge>
              <Button variant="outline" size="sm">
                <Users className="h-4 w-4 mr-2" />
                Connect Wallet
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Cards */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Explore the Platform</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Access different modules of the Blue Carbon Registry system for monitoring, verification, and carbon credit
            management
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Dashboard Card */}
          <Link href="/dashboard">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <TrendingUp className="h-8 w-8 text-primary" />
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <CardTitle>Dashboard</CardTitle>
                <CardDescription>View real-time metrics, project status, and blockchain transactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Active Projects</span>
                    <span className="font-medium">24</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Carbon Credits</span>
                    <span className="font-medium text-primary">2,847 BCT</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Registry Card */}
          <Link href="/registry">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Database className="h-8 w-8 text-primary" />
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <CardTitle>Project Registry</CardTitle>
                <CardDescription>Browse immutable records of all coastal restoration projects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Verified Projects</span>
                    <span className="font-medium">18</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Total Area</span>
                    <span className="font-medium">1,250 hectares</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Upload Data Card */}
          <Link href="/upload">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Upload className="h-8 w-8 text-primary" />
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <CardTitle>Upload Data</CardTitle>
                <CardDescription>Submit field data from mobile apps and drone surveys</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Recent Uploads</span>
                    <span className="font-medium">156</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Pending Review</span>
                    <span className="font-medium text-yellow-600">8</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Carbon Credits Card */}
          <Link href="/credits">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Coins className="h-8 w-8 text-primary" />
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <CardTitle>Carbon Credits</CardTitle>
                <CardDescription>Manage tokenized carbon credits and trading portfolio</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Available Credits</span>
                    <span className="font-medium text-primary">1,245 BCT</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Credits Traded</span>
                    <span className="font-medium">1,602 BCT</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Admin Panel Card */}
          <Link href="/admin">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Shield className="h-8 w-8 text-primary" />
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <CardTitle>Admin Panel</CardTitle>
                <CardDescription>NCCR administration tools for verification and approval</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Pending Approvals</span>
                    <span className="font-medium text-yellow-600">3</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>System Uptime</span>
                    <span className="font-medium text-green-600">99.8%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Stakeholders Card */}
          <Link href="/stakeholders">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Users className="h-8 w-8 text-primary" />
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <CardTitle>Stakeholders</CardTitle>
                <CardDescription>NGOs, communities, and coastal panchayats network</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Verified NGOs</span>
                    <span className="font-medium">45</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Communities</span>
                    <span className="font-medium">111</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>

      {/* Quick Stats Section */}
      <div className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-primary/10 p-4 rounded-full">
                  <TreePine className="h-8 w-8 text-primary" />
                </div>
              </div>
              <div className="text-3xl font-bold text-primary mb-2">1,250</div>
              <p className="text-muted-foreground">Hectares Restored</p>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-primary/10 p-4 rounded-full">
                  <Coins className="h-8 w-8 text-primary" />
                </div>
              </div>
              <div className="text-3xl font-bold text-primary mb-2">2,847</div>
              <p className="text-muted-foreground">Carbon Credits Generated</p>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-primary/10 p-4 rounded-full">
                  <Users className="h-8 w-8 text-primary" />
                </div>
              </div>
              <div className="text-3xl font-bold text-primary mb-2">156</div>
              <p className="text-muted-foreground">Verified Stakeholders</p>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-primary/10 p-4 rounded-full">
                  <CheckCircle className="h-8 w-8 text-primary" />
                </div>
              </div>
              <div className="text-3xl font-bold text-primary mb-2">99.8%</div>
              <p className="text-muted-foreground">Verification Accuracy</p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Projects */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Featured Restoration Projects</h2>
        <div className="grid gap-6 md:grid-cols-3">
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
                <Badge variant="default">Active</Badge>
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
      </div>
    </div>
  )
}
