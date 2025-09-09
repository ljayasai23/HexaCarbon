"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Waves, Shield, Coins, FileText, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function CreditsPage() {
  const [carbonCredits] = useState(2847)

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
                  <h1 className="text-xl font-bold">Carbon Credits</h1>
                  <p className="text-sm text-muted-foreground">Tokenized blue carbon portfolio</p>
                </div>
              </div>
            </div>
            <Badge variant="secondary" className="bg-emerald-800 text-white border-emerald-700">
              <Shield className="h-3 w-3 mr-1" />
              Blockchain Tokens
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Coins className="h-5 w-5 text-primary" />
                Carbon Credit Portfolio
              </CardTitle>
              <CardDescription>Your tokenized blue carbon credits on the blockchain</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="mb-4">
                <img
                  src="/blockchain-carbon-credits-digital-tokens-visualiza.jpg"
                  alt="Blockchain carbon credits"
                  className="w-full h-24 object-cover rounded-lg"
                />
              </div>

              <div className="text-center p-6 bg-primary/5 rounded-lg">
                <div className="text-3xl font-bold text-primary mb-2">{carbonCredits.toLocaleString()} BCT</div>
                <p className="text-sm text-muted-foreground">Total Blue Carbon Tokens</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-xl font-bold">1,245</div>
                  <p className="text-xs text-muted-foreground">Available</p>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-xl font-bold">1,602</div>
                  <p className="text-xs text-muted-foreground">Traded</p>
                </div>
              </div>

              <div className="space-y-2">
                <Button className="w-full">
                  <Coins className="h-4 w-4 mr-2" />
                  Trade Credits
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  <FileText className="h-4 w-4 mr-2" />
                  Generate Certificate
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Credit Generation History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { date: "2024-03-15", project: "Sundarbans Mangrove", credits: 150, tx: "0x1a2b3c..." },
                  { date: "2024-03-10", project: "Chilika Seagrass", credits: 120, tx: "0x4d5e6f..." },
                  { date: "2024-03-05", project: "Pulicat Salt Marsh", credits: 95, tx: "0x7g8h9i..." },
                  { date: "2024-02-28", project: "Sundarbans Mangrove", credits: 180, tx: "0xjklmno..." },
                ].map((record, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">{record.project}</p>
                      <p className="text-xs text-muted-foreground">
                        {record.date} • Tx: {record.tx}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-primary">+{record.credits} BCT</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Credit Statistics */}
        <div className="grid gap-6 md:grid-cols-4 mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Market Value</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">₹45.2</div>
              <p className="text-sm text-muted-foreground">Per BCT token</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Portfolio Value</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">₹1.28L</div>
              <p className="text-sm text-muted-foreground">Total value</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Monthly Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">+12%</div>
              <p className="text-sm text-muted-foreground">Credit generation</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Trading Volume</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">1,602</div>
              <p className="text-sm text-muted-foreground">BCT traded</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
