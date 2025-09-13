import { Button } from "@/components/ui/button"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-background to-secondary py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-balance leading-tight">
                From Mangroves to Markets: Powering Coastal Communities with{" "}
                <span className="text-primary">Blue Carbon</span>
              </h1>
              <p className="text-xl text-muted-foreground text-pretty">
                A transparent, blockchain-powered platform to restore our oceans and reward local heroes.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link href="#marketplace">Explore Projects</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/signup">Get Started</Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">250+</div>
                <div className="text-sm text-muted-foreground">Active Projects</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">50K+</div>
                <div className="text-sm text-muted-foreground">Carbon Credits</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">100+</div>
                <div className="text-sm text-muted-foreground">Communities</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20">
              <img
                src="/mangrove-forest-with-coastal-community-workers-pla.jpg"
                alt="Coastal community working on mangrove restoration"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating cards */}
            <div className="absolute -top-4 -right-4 bg-card p-4 rounded-lg shadow-lg border">
              <div className="text-sm font-medium text-primary">Verified</div>
              <div className="text-xs text-muted-foreground">Blockchain Secured</div>
            </div>
            <div className="absolute -bottom-4 -left-4 bg-card p-4 rounded-lg shadow-lg border">
              <div className="text-sm font-medium text-accent">$2.5M+</div>
              <div className="text-xs text-muted-foreground">Community Funding</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
