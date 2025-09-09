"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Waves, Shield, Camera, Upload, CheckCircle, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function UploadPage() {
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
                  <h1 className="text-xl font-bold">Upload Data</h1>
                  <p className="text-sm text-muted-foreground">Submit field data & drone surveys</p>
                </div>
              </div>
            </div>
            <Badge variant="secondary" className="bg-emerald-800 text-white border-emerald-700">
              <Shield className="h-3 w-3 mr-1" />
              Secure Upload
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5 text-primary" />
                Field Data Upload
              </CardTitle>
              <CardDescription>Upload restoration data from mobile apps and drone surveys</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="mb-4">
                <img
                  src="/field-data-collection-with-gps-device-and-tablet.jpg"
                  alt="Field data collection"
                  className="w-full h-24 object-cover rounded-lg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="project-select">Select Project</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a project" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bc-001">BC-001: Sundarbans Mangrove</SelectItem>
                    <SelectItem value="bc-002">BC-002: Chilika Seagrass</SelectItem>
                    <SelectItem value="bc-003">BC-003: Pulicat Salt Marsh</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="data-type">Data Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select data type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="plantation">Plantation Data</SelectItem>
                    <SelectItem value="growth">Growth Monitoring</SelectItem>
                    <SelectItem value="drone">Drone Survey</SelectItem>
                    <SelectItem value="water-quality">Water Quality</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="coordinates">GPS Coordinates</Label>
                <Input placeholder="22.3511, 88.2420" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="area">Area Covered (hectares)</Label>
                <Input type="number" placeholder="0.0" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Field Notes</Label>
                <Textarea placeholder="Describe the restoration activity, species planted, conditions observed..." />
              </div>

              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground mb-2">Drop files here or click to upload</p>
                <p className="text-xs text-muted-foreground">Images, videos, CSV data files (Max 50MB)</p>
                <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                  Choose Files
                </Button>
              </div>

              <Button className="w-full">
                <Shield className="h-4 w-4 mr-2" />
                Submit to Blockchain
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-primary" />
                Upload Guidelines
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="mb-4">
                <img
                  src="/before-and-after-restoration-comparison-photos.jpg"
                  alt="Before and after restoration comparison"
                  className="w-full h-20 object-cover rounded-lg"
                />
                <p className="text-xs text-muted-foreground mt-2">Example: Before/After comparison photos</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">GPS Accuracy</p>
                    <p className="text-xs text-muted-foreground">Ensure GPS coordinates are accurate within 5 meters</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">Photo Requirements</p>
                    <p className="text-xs text-muted-foreground">Include before/after photos with timestamps</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">Data Verification</p>
                    <p className="text-xs text-muted-foreground">All data is cryptographically signed and immutable</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">Quality Standards</p>
                    <p className="text-xs text-muted-foreground">Follow NCCR guidelines for carbon measurement</p>
                  </div>
                </div>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-medium text-sm mb-2">Recent Uploads</h4>
                <div className="space-y-2">
                  {[
                    { file: "mangrove_survey_001.jpg", status: "Verified", time: "2h ago" },
                    { file: "growth_data_march.csv", status: "Processing", time: "4h ago" },
                    { file: "drone_footage_area_b.mp4", status: "Verified", time: "1d ago" },
                  ].map((upload, index) => (
                    <div key={index} className="flex items-center justify-between text-xs">
                      <span className="font-mono">{upload.file}</span>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {upload.status}
                        </Badge>
                        <span className="text-muted-foreground">{upload.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
