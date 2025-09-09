"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Waves, Shield, FileText, MapPin, Calendar, Users } from "lucide-react"
import Link from "next/link"

export default function RegistryPage() {
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
                  <h1 className="text-xl font-bold">Project Registry</h1>
                  <p className="text-sm text-muted-foreground">Immutable blockchain records</p>
                </div>
              </div>
            </div>
            <Badge variant="secondary" className="bg-emerald-800 text-white border-emerald-700">
              <Shield className="h-3 w-3 mr-1" />
              Blockchain Verified
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Blue Carbon Project Registry</CardTitle>
            <CardDescription>
              Immutable record of all coastal restoration projects and their verification status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                {
                  id: "BC-001",
                  name: "Sundarbans Mangrove Restoration",
                  location: "West Bengal",
                  area: "120 hectares",
                  credits: 450,
                  status: "Active",
                  ngo: "Green Earth Foundation",
                  startDate: "2024-01-15",
                  image: "/sundarbans-mangrove-forest-restoration-with-worker.jpg",
                },
                {
                  id: "BC-002",
                  name: "Chilika Seagrass Conservation",
                  location: "Odisha",
                  area: "85 hectares",
                  credits: 320,
                  status: "Verified",
                  ngo: "Coastal Care NGO",
                  startDate: "2024-02-01",
                  image: "/chilika-lake-seagrass-conservation-underwater-seag.jpg",
                },
                {
                  id: "BC-003",
                  name: "Pulicat Salt Marsh Restoration",
                  location: "Tamil Nadu",
                  area: "95 hectares",
                  credits: 380,
                  status: "Pending",
                  ngo: "Marine Life Trust",
                  startDate: "2024-02-20",
                  image: "/pulicat-lake-salt-marsh-restoration-coastal-wetlan.jpg",
                },
              ].map((project) => (
                <Card key={project.id} className="border-l-4 border-l-primary overflow-hidden">
                  <CardContent className="pt-6">
                    <div className="flex gap-6">
                      <div className="flex-shrink-0">
                        <img
                          src={project.image || "/placeholder.svg"}
                          alt={project.name}
                          className="w-32 h-24 object-cover rounded-lg"
                        />
                      </div>
                      <div className="flex-1 space-y-4">
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                          <div>
                            <Label className="text-xs text-muted-foreground">Project ID</Label>
                            <p className="font-mono text-sm font-medium">{project.id}</p>
                          </div>
                          <div>
                            <Label className="text-xs text-muted-foreground">Project Name</Label>
                            <p className="text-sm font-medium">{project.name}</p>
                          </div>
                          <div>
                            <Label className="text-xs text-muted-foreground">Location</Label>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3 text-muted-foreground" />
                              <p className="text-sm">{project.location}</p>
                            </div>
                          </div>
                          <div>
                            <Label className="text-xs text-muted-foreground">Area</Label>
                            <p className="text-sm">{project.area}</p>
                          </div>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                          <div>
                            <Label className="text-xs text-muted-foreground">Credits Generated</Label>
                            <p className="text-sm font-medium text-primary">{project.credits} BCT</p>
                          </div>
                          <div>
                            <Label className="text-xs text-muted-foreground">NGO Partner</Label>
                            <div className="flex items-center gap-1">
                              <Users className="h-3 w-3 text-muted-foreground" />
                              <p className="text-sm">{project.ngo}</p>
                            </div>
                          </div>
                          <div>
                            <Label className="text-xs text-muted-foreground">Start Date</Label>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3 text-muted-foreground" />
                              <p className="text-sm">{project.startDate}</p>
                            </div>
                          </div>
                          <div>
                            <Label className="text-xs text-muted-foreground">Status</Label>
                            <div className="flex items-center gap-2">
                              <Badge
                                variant={
                                  project.status === "Active"
                                    ? "default"
                                    : project.status === "Verified"
                                      ? "secondary"
                                      : "outline"
                                }
                                className={
                                  project.status === "Pending" ? "bg-yellow-100 text-yellow-800 border-yellow-300" : ""
                                }
                              >
                                {project.status}
                              </Badge>
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-end pt-2">
                          <Button variant="outline" size="sm">
                            <FileText className="h-4 w-4 mr-2" />
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Registry Statistics */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Total Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">24</div>
              <p className="text-sm text-muted-foreground">Registered on blockchain</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Total Area</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">1,250</div>
              <p className="text-sm text-muted-foreground">Hectares under restoration</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Verification Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">87%</div>
              <p className="text-sm text-muted-foreground">Projects successfully verified</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
