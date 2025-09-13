"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Users, Calendar, ExternalLink, Wallet, CheckCircle, Loader2 } from "lucide-react"

interface ProjectDetailsProps {
  projectId: string
}

// Mock project data - in real app this would be fetched from blockchain
const projectData = {
  id: 1,
  name: "Sundarbans Restoration Phase 1",
  location: "West Bengal, India",
  coordinates: "22.1568° N, 88.9498° E",
  community: "Gosaba Village Collective",
  contactPerson: "Rajesh Kumar",
  creditsAvailable: 1250,
  totalCredits: 1500,
  pricePerCredit: 25,
  image: "/sundarbans-mangrove-forest-restoration-project.jpg",
  verificationDate: "2024-01-20",
  plantingDate: "2024-01-15",
  transactionHash: "0x1234567890abcdef1234567890abcdef12345678",
  ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
  description:
    "Large-scale mangrove restoration covering 50 hectares of degraded coastal area. This community-led initiative involves over 200 local families and focuses on both environmental restoration and sustainable livelihood creation.",
  impact: {
    co2Sequestered: "1,500 tons",
    areaRestored: "50 hectares",
    familiesBenefited: 200,
    speciesPlanted: ["Rhizophora mucronata", "Avicennia marina", "Sonneratia apetala"],
    biodiversityImpact: "Habitat for 50+ bird species, fish nursery areas",
  },
  timeline: [
    { date: "2024-01-15", event: "Mangrove planting completed", status: "completed" },
    { date: "2024-01-18", event: "Documentation uploaded to IPFS", status: "completed" },
    { date: "2024-01-20", event: "Project verified by NCCR", status: "completed" },
    { date: "2024-01-20", event: "Carbon credits minted", status: "completed" },
  ],
}

export function ProjectDetails({ projectId }: ProjectDetailsProps) {
  const [purchaseAmount, setPurchaseAmount] = useState("")
  const [isConnectingWallet, setIsConnectingWallet] = useState(false)
  const [isPurchasing, setIsPurchasing] = useState(false)
  const [purchaseResult, setPurchaseResult] = useState<{
    transactionHash: string
    creditsReceived: number
  } | null>(null)

  const handleWalletConnect = async () => {
    setIsConnectingWallet(true)
    // Simulate wallet connection
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsConnectingWallet(false)
  }

  const handlePurchase = async () => {
    if (!purchaseAmount || Number.parseInt(purchaseAmount) <= 0) return

    setIsPurchasing(true)
    try {
      // Simulate blockchain transaction
      await new Promise((resolve) => setTimeout(resolve, 3000))

      setPurchaseResult({
        transactionHash: "0xabcdef1234567890abcdef1234567890abcdef12",
        creditsReceived: Number.parseInt(purchaseAmount),
      })
    } catch (error) {
      console.error("Purchase failed:", error)
    } finally {
      setIsPurchasing(false)
    }
  }

  const totalCost = purchaseAmount ? Number.parseInt(purchaseAmount) * projectData.pricePerCredit : 0

  if (purchaseResult) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-6 h-6 text-green-600" />
              <CardTitle className="text-green-600">Purchase Successful!</CardTitle>
            </div>
            <CardDescription>
              Your carbon credits have been successfully purchased and transferred to your wallet.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="p-4 bg-muted rounded-lg">
                <Label className="text-sm font-medium">Credits Purchased</Label>
                <p className="text-2xl font-bold text-primary">{purchaseResult.creditsReceived}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <Label className="text-sm font-medium">Total Cost</Label>
                <p className="text-2xl font-bold">${purchaseResult.creditsReceived * projectData.pricePerCredit}</p>
              </div>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <Label className="text-sm font-medium">Transaction Hash</Label>
              <div className="flex items-center justify-between mt-1">
                <code className="text-sm bg-background px-2 py-1 rounded">{purchaseResult.transactionHash}</code>
                <Button variant="ghost" size="sm">
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <Alert>
              <AlertDescription>
                This transaction hash is your immutable proof of carbon offset. You can use this to demonstrate your
                environmental commitment to regulators and stakeholders.
              </AlertDescription>
            </Alert>

            <div className="flex space-x-4">
              <Button onClick={() => setPurchaseResult(null)}>Purchase More Credits</Button>
              <Button variant="outline">View My Portfolio</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold">{projectData.name}</h1>
          <div className="flex items-center space-x-4 mt-2 text-muted-foreground">
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4" />
              <span>{projectData.location}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>{projectData.community}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>Verified: {projectData.verificationDate}</span>
            </div>
          </div>
        </div>
        <Badge className="bg-green-600 text-white">Verified</Badge>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Project Image */}
          <Card>
            <CardContent className="p-0">
              <img
                src={projectData.image || "/placeholder.svg"}
                alt={projectData.name}
                className="w-full h-64 object-cover rounded-t-lg"
              />
            </CardContent>
          </Card>

          {/* Tabs */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="impact">Impact</TabsTrigger>
              <TabsTrigger value="verification">Verification</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Project Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{projectData.description}</p>

                  <div className="grid gap-4 md:grid-cols-2 mt-6">
                    <div>
                      <h4 className="font-medium mb-2">Location Details</h4>
                      <p className="text-sm text-muted-foreground">Coordinates: {projectData.coordinates}</p>
                      <p className="text-sm text-muted-foreground">Contact: {projectData.contactPerson}</p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Project Timeline</h4>
                      <p className="text-sm text-muted-foreground">Planting: {projectData.plantingDate}</p>
                      <p className="text-sm text-muted-foreground">Verification: {projectData.verificationDate}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="impact" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Environmental Impact</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <div className="text-2xl font-bold text-primary">{projectData.impact.co2Sequestered}</div>
                      <div className="text-sm text-muted-foreground">CO₂ Sequestered</div>
                    </div>
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <div className="text-2xl font-bold text-primary">{projectData.impact.areaRestored}</div>
                      <div className="text-sm text-muted-foreground">Area Restored</div>
                    </div>
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <div className="text-2xl font-bold text-primary">{projectData.impact.familiesBenefited}</div>
                      <div className="text-sm text-muted-foreground">Families Benefited</div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Species Planted</h4>
                    <div className="flex flex-wrap gap-2">
                      {projectData.impact.speciesPlanted.map((species, index) => (
                        <Badge key={index} variant="outline">
                          {species}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Biodiversity Impact</h4>
                    <p className="text-sm text-muted-foreground">{projectData.impact.biodiversityImpact}</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="verification" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Blockchain Verification</CardTitle>
                  <CardDescription>Immutable proof of project authenticity</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <Label className="text-sm font-medium">Transaction Hash</Label>
                    <div className="flex items-center justify-between mt-1">
                      <code className="text-sm bg-background px-2 py-1 rounded">{projectData.transactionHash}</code>
                      <Button variant="ghost" size="sm">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <Label className="text-sm font-medium">IPFS Documentation</Label>
                    <div className="flex items-center justify-between mt-1">
                      <code className="text-sm bg-background px-2 py-1 rounded">{projectData.ipfsHash}</code>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => window.open(`https://ipfs.io/ipfs/${projectData.ipfsHash}`, "_blank")}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <Alert>
                    <AlertDescription>
                      This project has been verified by NCCR and recorded on the Polygon blockchain. All documentation
                      is permanently stored on IPFS.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="timeline" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Project Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {projectData.timeline.map((event, index) => (
                      <div key={index} className="flex items-center space-x-4">
                        <div className="w-3 h-3 bg-primary rounded-full flex-shrink-0"></div>
                        <div className="flex-1">
                          <p className="font-medium">{event.event}</p>
                          <p className="text-sm text-muted-foreground">{event.date}</p>
                        </div>
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Purchase Panel */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Purchase Carbon Credits</CardTitle>
              <CardDescription>Buy verified carbon credits directly from this project</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <div className="flex justify-between text-sm">
                  <span>Available Credits:</span>
                  <span className="font-medium">{projectData.creditsAvailable}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Price per Credit:</span>
                  <span className="font-medium">${projectData.pricePerCredit}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount">Number of Credits</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Enter amount"
                  value={purchaseAmount}
                  onChange={(e) => setPurchaseAmount(e.target.value)}
                  max={projectData.creditsAvailable}
                />
              </div>

              {totalCost > 0 && (
                <div className="p-3 bg-muted rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Total Cost:</span>
                    <span className="text-xl font-bold text-primary">${totalCost}</span>
                  </div>
                </div>
              )}

              <Button className="w-full" onClick={handleWalletConnect} disabled={isConnectingWallet}>
                {isConnectingWallet && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                <Wallet className="mr-2 h-4 w-4" />
                Connect Wallet
              </Button>

              <Button
                className="w-full"
                onClick={handlePurchase}
                disabled={!purchaseAmount || Number.parseInt(purchaseAmount) <= 0 || isPurchasing}
              >
                {isPurchasing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Purchase Credits
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                Secure payment via blockchain. Transaction fees may apply.
              </p>
            </CardContent>
          </Card>

          {/* Project Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Project Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Credits Sold:</span>
                <span className="font-medium">{projectData.totalCredits - projectData.creditsAvailable}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Total Revenue:</span>
                <span className="font-medium">
                  ${(projectData.totalCredits - projectData.creditsAvailable) * projectData.pricePerCredit}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Community Impact:</span>
                <span className="font-medium">{projectData.impact.familiesBenefited} families</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
