import { Card, CardContent } from "@/components/ui/card"
import { Leaf, Database, Shield, CheckCircle, DollarSign, Globe, Users } from "lucide-react"

const steps = [
  {
    icon: Leaf,
    title: "Plant & Upload",
    description: "Local communities plant mangroves and upload proof (geo-tagged photos) via our mobile app.",
  },
  {
    icon: Database,
    title: "Secure Storage",
    description:
      "The proof is stored on IPFS (InterPlanetary File System), a decentralized network, making it permanent and verifiable.",
  },
  {
    icon: Shield,
    title: "Blockchain Record",
    description:
      "A record of the submission, including the IPFS link, is immutably stored on the Polygon blockchain. Cheating is impossible.",
  },
  {
    icon: CheckCircle,
    title: "Admin Verification",
    description:
      "Our partner, NCCR, verifies the submission. Upon approval, the system triggers a smart contract to mint carbon credit tokens.",
  },
  {
    icon: DollarSign,
    title: "Marketplace",
    description: "Companies purchase these unique tokens directly from the communities on our transparent marketplace.",
  },
  {
    icon: Globe,
    title: "Offset & Prove",
    description:
      "The company holds the token as undeniable proof of their carbon offset, which can be shown to government regulators.",
  },
  {
    icon: Users,
    title: "Empower",
    description:
      "Funds from the sale are transferred directly to the village or NGO, empowering their conservation work.",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-secondary/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our transparent, blockchain-powered process ensures every mangrove planted creates verified carbon credits
            that directly benefit coastal communities.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <Card key={index} className="relative group hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4">
                  <step.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>

                {/* Step number */}
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Process Flow Visualization */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-2 bg-card p-4 rounded-lg border">
            <div className="w-3 h-3 bg-primary rounded-full"></div>
            <div className="w-8 h-0.5 bg-border"></div>
            <div className="w-3 h-3 bg-accent rounded-full"></div>
            <div className="w-8 h-0.5 bg-border"></div>
            <div className="w-3 h-3 bg-primary rounded-full"></div>
            <span className="text-sm text-muted-foreground ml-4">Transparent • Verifiable • Rewarding</span>
          </div>
        </div>
      </div>
    </section>
  )
}
