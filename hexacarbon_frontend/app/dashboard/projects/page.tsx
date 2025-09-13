import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { ProjectsTable } from "@/components/dashboard/projects-table"

export default function ProjectsPage() {
  return (
    <DashboardLayout userRole="uploader">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">My Projects</h1>
          <p className="text-muted-foreground">View and manage all your mangrove restoration projects</p>
        </div>

        <ProjectsTable />
      </div>
    </DashboardLayout>
  )
}
