"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Waves, Shield, Users, MapPin, Phone, Mail, Building } from "lucide-react"
import Link from "next/link"

export default function StakeholdersPage() {
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
                  <h1 className="text-xl font-bold">Stakeholders</h1>
                  <p className="text-sm text-muted-foreground">NGOs, communities & panchayats network</p>
                </div>
              </div>
            </div>
            <Badge variant="secondary" className="bg-emerald-800 text-white border-emerald-700">
              <Shield className="h-3 w-3 mr-1" />
              Verified Network
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* NGOs Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5 text-primary" />
              Verified NGOs
            </CardTitle>
            <CardDescription>Non-governmental organizations working on coastal restoration projects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  name: "Green Earth Foundation",
                  location: "West Bengal",
                  projects: 3,
                  contact: "contact@greenearth.org",
                  phone: "+91 98765 43210",
                  status: "Active",
                },
                {
                  name: "Coastal Care NGO",
                  location: "Odisha",
                  projects: 2,
                  contact: "info@coastalcare.org",
                  phone: "+91 87654 32109",
                  status: "Active",
                },
                {
                  name: "Marine Life Trust",
                  location: "Tamil Nadu",
                  projects: 4,
                  contact: "hello@marinelife.org",
                  phone: "+91 76543 21098",
                  status: "Pending",
                },
              ].map((ngo, index) => (
                <Card key={index} className="border-l-4 border-l-primary">
                  <CardContent className="pt-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">{ngo.name}</h3>
                        <Badge variant={ngo.status === "Active" ? "default" : "outline"}>{ngo.status}</Badge>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>{ngo.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>{ngo.projects} Active Projects</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <span className="text-xs">{ngo.contact}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span className="text-xs">{ngo.phone}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Communities Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Local Communities
            </CardTitle>
            <CardDescription>Coastal communities participating in restoration activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  name: "Sundarbans Fishermen Collective",
                  location: "West Bengal",
                  members: 45,
                  area: "120 hectares",
                  leader: "Ramesh Kumar",
                },
                {
                  name: "Chilika Lake Community",
                  location: "Odisha",
                  members: 32,
                  area: "85 hectares",
                  leader: "Priya Patel",
                },
                {
                  name: "Pulicat Restoration Group",
                  location: "Tamil Nadu",
                  members: 28,
                  area: "95 hectares",
                  leader: "Arjun Reddy",
                },
              ].map((community, index) => (
                <Card key={index}>
                  <CardContent className="pt-4">
                    <div className="space-y-3">
                      <h3 className="font-semibold">{community.name}</h3>

                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>{community.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>{community.members} Members</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Building className="h-4 w-4 text-muted-foreground" />
                          <span>{community.area} under restoration</span>
                        </div>
                        <div className="text-xs text-muted-foreground">Led by: {community.leader}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Statistics */}
        <div className="grid gap-6 md:grid-cols-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Total NGOs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">45</div>
              <p className="text-sm text-muted-foreground">Verified organizations</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Communities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">111</div>
              <p className="text-sm text-muted-foreground">Active communities</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Panchayats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">28</div>
              <p className="text-sm text-muted-foreground">Coastal panchayats</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Total Members</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">2,340</div>
              <p className="text-sm text-muted-foreground">Active participants</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
