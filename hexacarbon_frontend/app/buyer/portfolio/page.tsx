import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { BuyerPortfolio } from "@/components/buyer/buyer-portfolio"

export default function PortfolioPage() {
  return (
    <DashboardLayout userRole="buyer" userName="John Smith" userEmail="john.smith@company.com">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">My Portfolio</h1>
          <p className="text-muted-foreground">View and manage your carbon credit holdings</p>
        </div>

        <BuyerPortfolio />
      </div>
    </DashboardLayout>
  )
}
