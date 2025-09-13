"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Upload, MapPin, Calendar, Loader2, CheckCircle, ExternalLink } from "lucide-react"

export function ProjectUploadForm() {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadResult, setUploadResult] = useState<{
    transactionHash: string
    ipfsHash: string
  } | null>(null)

  const [formData, setFormData] = useState({
    projectName: "",
    location: "",
    coordinates: "",
    description: "",
    plantingDate: "",
    estimatedCredits: "",
    communityName: "",
    contactPerson: "",
    contactEmail: "",
    files: [] as File[],
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({ ...formData, files: Array.from(e.target.files) })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsUploading(true)
    setUploadProgress(0)

    try {
      // Simulate file upload to IPFS
      for (let i = 0; i <= 100; i += 10) {
        setUploadProgress(i)
        await new Promise((resolve) => setTimeout(resolve, 200))
      }

      // Simulate blockchain transaction
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Mock response with transaction and IPFS hashes
      setUploadResult({
        transactionHash: "0x1234567890abcdef1234567890abcdef12345678",
        ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
      })
    } catch (error) {
      console.error("Upload failed:", error)
    } finally {
      setIsUploading(false)
    }
  }

  if (uploadResult) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-6 h-6 text-green-600" />
            <CardTitle className="text-green-600">Project Uploaded Successfully!</CardTitle>
          </div>
          <CardDescription>
            Your project has been submitted to the blockchain and is now pending verification.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <div className="p-4 bg-muted rounded-lg">
              <Label className="text-sm font-medium">Transaction Hash</Label>
              <div className="flex items-center justify-between mt-1">
                <code className="text-sm bg-background px-2 py-1 rounded">{uploadResult.transactionHash}</code>
                <Button variant="ghost" size="sm">
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <Label className="text-sm font-medium">IPFS Hash</Label>
              <div className="flex items-center justify-between mt-1">
                <code className="text-sm bg-background px-2 py-1 rounded">{uploadResult.ipfsHash}</code>
                <Button variant="ghost" size="sm">
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          <Alert>
            <AlertDescription>
              Save these hashes as your receipt. Your project will appear in the verification queue and you'll be
              notified once it's reviewed by NCCR.
            </AlertDescription>
          </Alert>

          <div className="flex space-x-4">
            <Button
              onClick={() => {
                setUploadResult(null)
                setFormData({
                  projectName: "",
                  location: "",
                  coordinates: "",
                  description: "",
                  plantingDate: "",
                  estimatedCredits: "",
                  communityName: "",
                  contactPerson: "",
                  contactEmail: "",
                  files: [],
                })
              }}
            >
              Upload Another Project
            </Button>
            <Button variant="outline">View My Projects</Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Project Information */}
        <Card>
          <CardHeader>
            <CardTitle>Project Information</CardTitle>
            <CardDescription>Basic details about your mangrove restoration project</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="projectName">Project Name *</Label>
              <Input
                id="projectName"
                placeholder="e.g., Sundarbans Restoration Phase 1"
                value={formData.projectName}
                onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="location"
                  placeholder="e.g., West Bengal, India"
                  className="pl-10"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="coordinates">GPS Coordinates *</Label>
              <Input
                id="coordinates"
                placeholder="e.g., 22.1568° N, 88.9498° E"
                value={formData.coordinates}
                onChange={(e) => setFormData({ ...formData, coordinates: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="plantingDate">Planting Date *</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="plantingDate"
                  type="date"
                  className="pl-10"
                  value={formData.plantingDate}
                  onChange={(e) => setFormData({ ...formData, plantingDate: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="estimatedCredits">Estimated Carbon Credits</Label>
              <Input
                id="estimatedCredits"
                type="number"
                placeholder="e.g., 1500"
                value={formData.estimatedCredits}
                onChange={(e) => setFormData({ ...formData, estimatedCredits: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Project Description *</Label>
              <Textarea
                id="description"
                placeholder="Describe your mangrove restoration project, including area covered, species planted, and community involvement..."
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
            </div>
          </CardContent>
        </Card>

        {/* Community & Contact Information */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Community Information</CardTitle>
              <CardDescription>Details about the community involved in this project</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="communityName">Community/Organization Name *</Label>
                <Input
                  id="communityName"
                  placeholder="e.g., Gosaba Village Collective"
                  value={formData.communityName}
                  onChange={(e) => setFormData({ ...formData, communityName: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactPerson">Contact Person *</Label>
                <Input
                  id="contactPerson"
                  placeholder="e.g., Rajesh Kumar"
                  value={formData.contactPerson}
                  onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactEmail">Contact Email *</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  placeholder="e.g., rajesh@community.org"
                  value={formData.contactEmail}
                  onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* File Upload */}
          <Card>
            <CardHeader>
              <CardTitle>Project Evidence</CardTitle>
              <CardDescription>Upload geo-tagged photos and documentation as proof of work</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="files">Upload Files *</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                  <div className="mt-4">
                    <Input
                      id="files"
                      type="file"
                      multiple
                      accept="image/*,.pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="hidden"
                      required
                    />
                    <Label
                      htmlFor="files"
                      className="cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                    >
                      Choose Files
                    </Label>
                    <p className="text-xs text-muted-foreground mt-2">
                      Upload geo-tagged photos, documents, or reports (Max 10MB each)
                    </p>
                  </div>
                </div>
                {formData.files.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm font-medium">Selected files:</p>
                    <ul className="text-sm text-muted-foreground">
                      {formData.files.map((file, index) => (
                        <li key={index}>{file.name}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {isUploading && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Uploading to IPFS...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} />
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-6 flex justify-end space-x-4">
        <Button type="button" variant="outline">
          Save as Draft
        </Button>
        <Button type="submit" disabled={isUploading}>
          {isUploading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Submit Project
        </Button>
      </div>
    </form>
  )
}
