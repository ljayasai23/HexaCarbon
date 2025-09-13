import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { VerificationQueue } from "@/components/admin/verification-queue"

export default function VerificationPage() {
  return (
    <DashboardLayout userRole="admin" userName="Dr. Sarah Chen" userEmail="sarah.chen@nccr.org">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Verification Queue</h1>
          <p className="text-muted-foreground">Review and verify submitted mangrove restoration projects</p>
        </div>

        <VerificationQueue />
      </div>
    </DashboardLayout>
  )
}
