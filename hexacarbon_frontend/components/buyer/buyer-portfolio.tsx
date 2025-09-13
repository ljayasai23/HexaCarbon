"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { StatsCard } from "@/components/dashboard/stats-card"
import { Leaf, TrendingUp, Award, ExternalLink, Download } from "lucide-react"

const portfolioStats = [
  {
    title: "Total Credits Owned",
    value: "3,450",
    description: "Carbon credits in portfolio",
    icon: Leaf,
    trend: { value: 12, isPositive: true },
  },
  {
    title: "Portfolio Value",
    value: "$86,250",
    description: "Current market value",
    icon: TrendingUp,
    trend: { value: 8, isPositive: true },
  },
  {
    title: "CO₂ Offset",
    value: "3,450 tons",
    description: "Total carbon offset",
    icon: Award,
    trend: { value: 15, isPositive: true },
  },
]

const ownedCredits = [
  {
    id: 1,
    projectName: "Sundarbans Restoration Phase 1",
    location: "West Bengal, India",
    creditsOwned: 500,
    purchasePrice: 25,
    currentPrice: 28,
    purchaseDate: "2024-01-20",
    transactionHash: "0xabcdef1234567890abcdef1234567890abcdef12",
    certificateId: "HC-SUN-001-500",
  },
  {
    id: 2,
    projectName: "Maldives Blue Carbon Project",
    location: "Addu Atoll, Maldives",
    creditsOwned: 300,
    purchasePrice: 30,
    currentPrice: 32,
    purchaseDate: "2024-01-18",
    transactionHash: "0x1234567890abcdef1234567890abcdef12345678",
    certificateId: "HC-MAL-002-300",
  },
  {
    id: 3,
    projectName: "Philippines Coastal Defense",
    location: "Palawan, Philippines",
    creditsOwned: 750,
    purchasePrice: 22,
    currentPrice: 24,
    purchaseDate: "2024-01-15",
    transactionHash: "0x9876543210fedcba9876543210fedcba98765432",
    certificateId: "HC-PHI-003-750",
  },
]

export function BuyerPortfolio() {
  const [selectedTab, setSelectedTab] = useState("overview")

  const totalInvestment = ownedCredits.reduce((sum, credit) => sum + credit.creditsOwned * credit.purchasePrice, 0)
  const currentValue = ownedCredits.reduce((sum, credit) => sum + credit.creditsOwned * credit.currentPrice, 0)
  const totalGainLoss = currentValue - totalInvestment

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-3">
        {portfolioStats.map((stat, index) => (
          <StatsCard
            key={index}
            title={stat.title}
            value={stat.value}
            description={stat.description}
            icon={stat.icon}
            trend={stat.trend}
          />
        ))}
      </div>

      {/* Portfolio Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Portfolio Performance</CardTitle>
          <CardDescription>Your carbon credit investment overview</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-2xl font-bold">${totalInvestment.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Total Investment</div>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-2xl font-bold">${currentValue.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Current Value</div>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className={`text-2xl font-bold ${totalGainLoss >= 0 ? "text-green-600" : "text-red-600"}`}>
                ${Math.abs(totalGainLoss).toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">{totalGainLoss >= 0 ? "Gain" : "Loss"}</div>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className={`text-2xl font-bold ${totalGainLoss >= 0 ? "text-green-600" : "text-red-600"}`}>
                {((totalGainLoss / totalInvestment) * 100).toFixed(1)}%
              </div>
              <div className="text-sm text-muted-foreground">Return</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Holdings Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>My Holdings</CardTitle>
              <CardDescription>Detailed view of your carbon credit portfolio</CardDescription>
            </div>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export Portfolio
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {ownedCredits.map((credit) => (
              <div key={credit.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <h4 className="font-medium">{credit.projectName}</h4>
                    <p className="text-sm text-muted-foreground">{credit.location}</p>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <span>Purchased: {credit.purchaseDate}</span>
                      <span>Certificate: {credit.certificateId}</span>
                    </div>
                  </div>

                  <div className="text-right space-y-2">
                    <Badge variant="outline">{credit.creditsOwned} credits</Badge>
                    <div className="text-sm">
                      <div className="flex items-center space-x-2">
                        <span className="text-muted-foreground">Bought:</span>
                        <span>${credit.purchasePrice}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-muted-foreground">Current:</span>
                        <span
                          className={credit.currentPrice > credit.purchasePrice ? "text-green-600" : "text-red-600"}
                        >
                          ${credit.currentPrice}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t">
                  <div className="text-sm">
                    <span className="text-muted-foreground">Total Value: </span>
                    <span className="font-medium">${(credit.creditsOwned * credit.currentPrice).toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="w-4 h-4 mr-1" />
                      View Transaction
                    </Button>
                    <Button variant="outline" size="sm">
                      Download Certificate
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
