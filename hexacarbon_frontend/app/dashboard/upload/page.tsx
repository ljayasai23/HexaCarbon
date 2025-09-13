import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { ProjectUploadForm } from "@/components/dashboard/project-upload-form"

export default function UploadPage() {
  return (
    <DashboardLayout userRole="uploader">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Upload New Project</h1>
          <p className="text-muted-foreground">
            Submit your mangrove restoration project for verification and carbon credit generation
          </p>
        </div>

        <ProjectUploadForm />
      </div>
    </DashboardLayout>
  )
}
