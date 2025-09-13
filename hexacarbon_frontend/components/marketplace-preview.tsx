import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Users, Leaf } from "lucide-react"

const projects = [
  {
    id: 1,
    title: "Sundarbans Restoration Initiative",
    location: "West Bengal, India",
    community: "Gosaba Village Collective",
    credits: 1250,
    price: 25,
    image: "/sundarbans-mangrove-forest-restoration-project.jpg",
    status: "Verified",
  },
  {
    id: 2,
    title: "Maldives Blue Carbon Project",
    location: "Addu Atoll, Maldives",
    community: "Addu Nature Park",
    credits: 850,
    price: 30,
    image: "/maldives-mangrove-restoration-coastal-protection.jpg",
    status: "Verified",
  },
  {
    id: 3,
    title: "Philippines Coastal Defense",
    location: "Palawan, Philippines",
    community: "Palawan NGO Network",
    credits: 2100,
    price: 22,
    image: "/philippines-palawan-mangrove-planting-coastal-comm.jpg",
    status: "Pending",
  },
]

export function MarketplacePreview() {
  return (
    <section id="marketplace" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Active Projects</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover verified mangrove restoration projects and purchase carbon credits directly from coastal
            communities.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video relative">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <Badge
                  className={`absolute top-4 right-4 ${
                    project.status === "Verified"
                      ? "bg-primary text-primary-foreground"
                      : "bg-accent text-accent-foreground"
                  }`}
                >
                  {project.status}
                </Badge>
              </div>

              <CardHeader>
                <CardTitle className="text-lg">{project.title}</CardTitle>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 mr-1" />
                  {project.location}
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex items-center text-sm">
                  <Users className="w-4 h-4 mr-2 text-primary" />
                  {project.community}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm">
                    <Leaf className="w-4 h-4 mr-2 text-accent" />
                    {project.credits} Credits Available
                  </div>
                  <div className="text-lg font-bold text-primary">${project.price}/credit</div>
                </div>

                <Button className="w-full" disabled={project.status === "Pending"}>
                  {project.status === "Verified" ? "Purchase Credits" : "Awaiting Verification"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" variant="outline">
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  )
}
