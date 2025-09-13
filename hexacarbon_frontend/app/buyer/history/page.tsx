import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { PurchaseHistory } from "@/components/buyer/purchase-history"

export default function HistoryPage() {
  return (
    <DashboardLayout userRole="buyer" userName="John Smith" userEmail="john.smith@company.com">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Purchase History</h1>
          <p className="text-muted-foreground">Track all your carbon credit transactions</p>
        </div>

        <PurchaseHistory />
      </div>
    </DashboardLayout>
  )
}
