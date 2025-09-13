"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"

const projectLocations = [
  { id: 1, name: "Sundarbans", country: "India", lat: 22.1568, lng: 88.9498, projects: 15, status: "active" },
  { id: 2, name: "Maldives", country: "Maldives", lat: 3.2028, lng: 73.2207, projects: 8, status: "active" },
  { id: 3, name: "Palawan", country: "Philippines", lat: 9.8349, lng: 118.7384, projects: 12, status: "active" },
  { id: 4, name: "Kerala Backwaters", country: "India", lat: 9.4981, lng: 76.3388, projects: 6, status: "pending" },
  { id: 5, name: "Goa Coast", country: "India", lat: 15.2993, lng: 74.124, projects: 4, status: "active" },
]

export function AdminMap() {
  const [selectedLocation, setSelectedLocation] = useState<(typeof projectLocations)[0] | null>(null)

  return (
    <div className="space-y-4">
      {/* Map Placeholder */}
      <div className="relative h-64 bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-950 dark:to-green-950 rounded-lg overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=256&width=400&text=Interactive+Map')] bg-cover bg-center opacity-20"></div>

        {/* Project Markers */}
        {projectLocations.map((location) => (
          <div
            key={location.id}
            className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${(location.lng + 180) * (100 / 360)}%`,
              top: `${(90 - location.lat) * (100 / 180)}%`,
            }}
            onClick={() => setSelectedLocation(location)}
          >
            <div
              className={`w-4 h-4 rounded-full border-2 border-white shadow-lg ${
                location.status === "active" ? "bg-green-500" : "bg-yellow-500"
              } hover:scale-125 transition-transform`}
            ></div>
            <div className="absolute top-5 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 px-2 py-1 rounded shadow-lg text-xs whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity">
              {location.name}
            </div>
          </div>
        ))}
      </div>

      {/* Location Details */}
      {selectedLocation && (
        <div className="p-4 bg-muted rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold">
              {selectedLocation.name}, {selectedLocation.country}
            </h4>
            <Badge variant={selectedLocation.status === "active" ? "default" : "secondary"}>
              {selectedLocation.status}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">{selectedLocation.projects} active projects in this region</p>
        </div>
      )}

      {/* Legend */}
      <div className="flex items-center justify-center space-x-6 text-xs">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span>Active Projects</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <span>Pending Review</span>
        </div>
      </div>
    </div>
  )
}
