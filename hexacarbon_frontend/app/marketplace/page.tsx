import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { MarketplaceGrid } from "@/components/marketplace/marketplace-grid"
import { MarketplaceFilters } from "@/components/marketplace/marketplace-filters"

export default function MarketplacePage() {
  return (
    <DashboardLayout userRole="buyer" userName="John Smith" userEmail="john.smith@company.com">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Carbon Credit Marketplace</h1>
          <p className="text-muted-foreground">Purchase verified carbon credits directly from coastal communities</p>
        </div>

        <MarketplaceFilters />
        <MarketplaceGrid />
      </div>
    </DashboardLayout>
  )
}
