import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { ProjectDetails } from "@/components/marketplace/project-details"

interface ProjectPageProps {
  params: {
    projectId: string
  }
}

export default function ProjectPage({ params }: ProjectPageProps) {
  return (
    <DashboardLayout userRole="buyer" userName="John Smith" userEmail="john.smith@company.com">
      <ProjectDetails projectId={params.projectId} />
    </DashboardLayout>
  )
}
