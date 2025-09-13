"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Search, MapPin, Calendar, ExternalLink, CheckCircle, X, Loader2 } from "lucide-react"

const pendingProjects = [
  {
    id: 1,
    projectName: "Sundarbans Restoration Phase 3",
    community: "West Bengal Collective",
    contactPerson: "Rajesh Kumar",
    contactEmail: "rajesh@wbcollective.org",
    location: "West Bengal, India",
    coordinates: "22.1568° N, 88.9498° E",
    submittedDate: "2024-01-28",
    plantingDate: "2024-01-15",
    estimatedCredits: 1450,
    description:
      "Large-scale mangrove restoration covering 50 hectares of degraded coastal area. Community-led initiative involving 200+ local families.",
    transactionHash: "0x1234567890abcdef1234567890abcdef12345678",
    ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
    files: [
      { name: "geo_tagged_photos.zip", size: "15.2 MB" },
      { name: "community_agreement.pdf", size: "2.1 MB" },
      { name: "planting_report.docx", size: "1.8 MB" },
    ],
  },
  {
    id: 2,
    projectName: "Coastal Defense Initiative",
    community: "Kerala Environmental Group",
    contactPerson: "Priya Nair",
    contactEmail: "priya@keg.org",
    location: "Kerala, India",
    coordinates: "9.4981° N, 76.3388° E",
    submittedDate: "2024-01-27",
    plantingDate: "2024-01-10",
    estimatedCredits: 980,
    description: "Mangrove plantation along 5km of coastline to protect against erosion and storm surge.",
    transactionHash: "0xabcdef1234567890abcdef1234567890abcdef12",
    ipfsHash: "QmXyZ123456789abcdefghijklmnopqrstuvwxyz",
    files: [
      { name: "before_after_photos.zip", size: "22.5 MB" },
      { name: "environmental_impact.pdf", size: "3.2 MB" },
    ],
  },
]

export function VerificationQueue() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedProject, setSelectedProject] = useState<(typeof pendingProjects)[0] | null>(null)
  const [isVerifying, setIsVerifying] = useState(false)
  const [verificationResult, setVerificationResult] = useState<"approved" | "rejected" | null>(null)
  const [rejectionReason, setRejectionReason] = useState("")

  const filteredProjects = pendingProjects.filter(
    (project) =>
      project.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.community.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.location.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleVerification = async (approved: boolean) => {
    setIsVerifying(true)

    try {
      // Simulate API call to backend /api/project/verify
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setVerificationResult(approved ? "approved" : "rejected")

      // In real app, this would trigger smart contract verifyAndMintCredits function
      console.log(`Project ${selectedProject?.id} ${approved ? "approved" : "rejected"}`)
    } catch (error) {
      console.error("Verification failed:", error)
    } finally {
      setIsVerifying(false)
    }
  }

  const resetVerification = () => {
    setVerificationResult(null)
    setRejectionReason("")
    setSelectedProject(null)
  }

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Badge variant="outline">{filteredProjects.length} pending review</Badge>
      </div>

      {/* Projects Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {filteredProjects.map((project) => (
          <Card key={project.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{project.projectName}</CardTitle>
                  <CardDescription>{project.community}</CardDescription>
                </div>
                <Badge variant="secondary">Pending</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span>{project.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span>Submitted: {project.submittedDate}</span>
                </div>
                <div className="text-muted-foreground">
                  Estimated Credits: <span className="font-medium text-foreground">{project.estimatedCredits}</span>
                </div>
              </div>

              <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>

              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full" onClick={() => setSelectedProject(project)}>
                    Review Project
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>{project.projectName}</DialogTitle>
                    <DialogDescription>
                      Submitted by {project.community} on {project.submittedDate}
                    </DialogDescription>
                  </DialogHeader>

                  {verificationResult ? (
                    <div className="space-y-4">
                      <Alert
                        className={
                          verificationResult === "approved"
                            ? "border-green-200 bg-green-50 dark:bg-green-950"
                            : "border-red-200 bg-red-50 dark:bg-red-950"
                        }
                      >
                        <div className="flex items-center space-x-2">
                          {verificationResult === "approved" ? (
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          ) : (
                            <X className="w-5 h-5 text-red-600" />
                          )}
                          <AlertDescription
                            className={
                              verificationResult === "approved"
                                ? "text-green-800 dark:text-green-200"
                                : "text-red-800 dark:text-red-200"
                            }
                          >
                            Project has been {verificationResult}!
                            {verificationResult === "approved" && " Carbon credit tokens will be minted automatically."}
                          </AlertDescription>
                        </div>
                      </Alert>
                      <Button onClick={resetVerification}>Review Another Project</Button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {/* Project Details */}
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-3">
                          <div>
                            <h4 className="font-medium">Contact Information</h4>
                            <p className="text-sm text-muted-foreground">{project.contactPerson}</p>
                            <p className="text-sm text-muted-foreground">{project.contactEmail}</p>
                          </div>
                          <div>
                            <h4 className="font-medium">Location</h4>
                            <p className="text-sm text-muted-foreground">{project.location}</p>
                            <p className="text-sm text-muted-foreground">{project.coordinates}</p>
                          </div>
                          <div>
                            <h4 className="font-medium">Planting Date</h4>
                            <p className="text-sm text-muted-foreground">{project.plantingDate}</p>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div>
                            <h4 className="font-medium">Estimated Credits</h4>
                            <p className="text-sm text-muted-foreground">{project.estimatedCredits} carbon credits</p>
                          </div>
                          <div>
                            <h4 className="font-medium">Blockchain Record</h4>
                            <div className="flex items-center space-x-2">
                              <code className="text-xs bg-muted px-2 py-1 rounded">
                                {project.transactionHash.slice(0, 20)}...
                              </code>
                              <Button variant="ghost" size="sm">
                                <ExternalLink className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium">IPFS Storage</h4>
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => window.open(`https://ipfs.io/ipfs/${project.ipfsHash}`, "_blank")}
                              >
                                <ExternalLink className="w-4 h-4 mr-2" />
                                View Proof
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <div>
                        <h4 className="font-medium mb-2">Project Description</h4>
                        <p className="text-sm text-muted-foreground">{project.description}</p>
                      </div>

                      {/* Files */}
                      <div>
                        <h4 className="font-medium mb-2">Uploaded Files</h4>
                        <div className="space-y-2">
                          {project.files.map((file, index) => (
                            <div key={index} className="flex items-center justify-between p-2 border rounded">
                              <span className="text-sm">{file.name}</span>
                              <div className="flex items-center space-x-2">
                                <span className="text-xs text-muted-foreground">{file.size}</span>
                                <Button variant="ghost" size="sm">
                                  <ExternalLink className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Verification Actions */}
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium mb-2">Rejection Reason (if applicable)</h4>
                          <Textarea
                            placeholder="Provide reason for rejection..."
                            value={rejectionReason}
                            onChange={(e) => setRejectionReason(e.target.value)}
                          />
                        </div>

                        <div className="flex space-x-4">
                          <Button onClick={() => handleVerification(true)} disabled={isVerifying} className="flex-1">
                            {isVerifying && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Approve & Mint Credits
                          </Button>
                          <Button
                            variant="destructive"
                            onClick={() => handleVerification(false)}
                            disabled={isVerifying || !rejectionReason.trim()}
                            className="flex-1"
                          >
                            {isVerifying && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Reject Project
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-muted-foreground">No projects found matching your search criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
