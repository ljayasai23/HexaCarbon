"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Users, Leaf, ExternalLink, TrendingUp } from "lucide-react"
import Link from "next/link"

const verifiedProjects = [
  {
    id: 1,
    name: "Sundarbans Restoration Phase 1",
    location: "West Bengal, India",
    community: "Gosaba Village Collective",
    creditsAvailable: 1250,
    totalCredits: 1500,
    pricePerCredit: 25,
    image: "/sundarbans-mangrove-forest-restoration-project.jpg",
    verificationDate: "2024-01-20",
    transactionHash: "0x1234567890abcdef",
    ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
    description: "Large-scale mangrove restoration covering 50 hectares of degraded coastal area.",
    impact: {
      co2Sequestered: "1,500 tons",
      areaRestored: "50 hectares",
      familiesBenefited: 200,
    },
  },
  {
    id: 2,
    name: "Maldives Blue Carbon Project",
    location: "Addu Atoll, Maldives",
    community: "Addu Nature Park",
    creditsAvailable: 850,
    totalCredits: 1000,
    pricePerCredit: 30,
    image: "/maldives-mangrove-restoration-coastal-protection.jpg",
    verificationDate: "2024-01-18",
    transactionHash: "0xabcdef1234567890",
    ipfsHash: "QmXyZ123456789abcdefghijklmnopqrstuvwxyz",
    description: "Coastal protection through mangrove restoration in vulnerable atoll communities.",
    impact: {
      co2Sequestered: "1,000 tons",
      areaRestored: "30 hectares",
      familiesBenefited: 150,
    },
  },
  {
    id: 3,
    name: "Philippines Coastal Defense",
    location: "Palawan, Philippines",
    community: "Palawan NGO Network",
    creditsAvailable: 2100,
    totalCredits: 2500,
    pricePerCredit: 22,
    image: "/philippines-palawan-mangrove-planting-coastal-comm.jpg",
    verificationDate: "2024-01-15",
    transactionHash: "0x9876543210fedcba",
    ipfsHash: "QmPqR234567890abcdefghijklmnopqrstuvwxyz",
    description: "Community-led mangrove planting initiative for coastal defense and livelihood support.",
    impact: {
      co2Sequestered: "2,500 tons",
      areaRestored: "75 hectares",
      familiesBenefited: 300,
    },
  },
]

export function MarketplaceGrid() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null)

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Leaf className="w-5 h-5 text-primary" />
              <div>
                <p className="text-2xl font-bold">4,200</p>
                <p className="text-xs text-muted-foreground">Credits Available</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-2xl font-bold">$25.67</p>
                <p className="text-xs text-muted-foreground">Avg. Price</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">650</p>
                <p className="text-xs text-muted-foreground">Families Supported</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">155</p>
                <p className="text-xs text-muted-foreground">Hectares Restored</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Projects Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {verifiedProjects.map((project) => (
          <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-video relative">
              <img
                src={project.image || "/placeholder.svg"}
                alt={project.name}
                className="w-full h-full object-cover"
              />
              <Badge className="absolute top-4 right-4 bg-green-600 text-white">Verified</Badge>
              <div className="absolute bottom-4 left-4 bg-black/70 text-white px-2 py-1 rounded text-xs">
                {project.creditsAvailable} / {project.totalCredits} available
              </div>
            </div>

            <CardHeader>
              <CardTitle className="text-lg">{project.name}</CardTitle>
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 mr-1" />
                {project.location}
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex items-center text-sm">
                <Users className="w-4 h-4 mr-2 text-primary" />
                {project.community}
              </div>

              <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>

              {/* Impact Metrics */}
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="text-center p-2 bg-muted rounded">
                  <div className="font-medium">{project.impact.co2Sequestered}</div>
                  <div className="text-muted-foreground">CO₂ Captured</div>
                </div>
                <div className="text-center p-2 bg-muted rounded">
                  <div className="font-medium">{project.impact.areaRestored}</div>
                  <div className="text-muted-foreground">Area Restored</div>
                </div>
                <div className="text-center p-2 bg-muted rounded">
                  <div className="font-medium">{project.impact.familiesBenefited}</div>
                  <div className="text-muted-foreground">Families</div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-lg font-bold text-primary">${project.pricePerCredit}/credit</div>
                <div className="text-sm text-muted-foreground">Verified: {project.verificationDate}</div>
              </div>

              <div className="flex space-x-2">
                <Button asChild className="flex-1">
                  <Link href={`/marketplace/${project.id}`}>View Details</Link>
                </Button>
                <Button variant="outline" size="sm">
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center">
        <Button variant="outline" size="lg">
          Load More Projects
        </Button>
      </div>
    </div>
  )
}
