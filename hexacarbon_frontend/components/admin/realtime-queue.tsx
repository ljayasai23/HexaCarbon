"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, MapPin } from "lucide-react"

interface QueueItem {
  id: number
  projectName: string
  community: string
  location: string
  submittedAt: string
  estimatedCredits: number
}

const initialQueue: QueueItem[] = [
  {
    id: 1,
    projectName: "Coastal Restoration Phase 2",
    community: "Tamil Nadu Fishermen Collective",
    location: "Tamil Nadu, India",
    submittedAt: "5 minutes ago",
    estimatedCredits: 1200,
  },
  {
    id: 2,
    projectName: "Mangrove Nursery Project",
    community: "Kerala Environmental Group",
    location: "Kerala, India",
    submittedAt: "12 minutes ago",
    estimatedCredits: 800,
  },
]

export function RealtimeQueue() {
  const [queue, setQueue] = useState<QueueItem[]>(initialQueue)
  const [newItemCount, setNewItemCount] = useState(0)

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly add new items to simulate WebSocket events
      if (Math.random() > 0.7) {
        const newItem: QueueItem = {
          id: Date.now(),
          projectName: `New Project ${Math.floor(Math.random() * 1000)}`,
          community: "Community Organization",
          location: "Various Locations",
          submittedAt: "Just now",
          estimatedCredits: Math.floor(Math.random() * 2000) + 500,
        }

        setQueue((prev) => [newItem, ...prev.slice(0, 4)]) // Keep only 5 items
        setNewItemCount((prev) => prev + 1)
      }
    }, 10000) // Check every 10 seconds

    return () => clearInterval(interval)
  }, [])

  const handleReviewClick = (id: number) => {
    // In real app, this would navigate to detailed review page
    console.log(`Reviewing project ${id}`)
  }

  return (
    <div className="space-y-4">
      {newItemCount > 0 && (
        <div className="p-3 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg">
          <p className="text-sm text-green-800 dark:text-green-200">
            {newItemCount} new project{newItemCount > 1 ? "s" : ""} submitted for review
          </p>
        </div>
      )}

      <div className="space-y-3">
        {queue.map((item) => (
          <div key={item.id} className="p-3 border rounded-lg hover:bg-muted/50 transition-colors">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <h4 className="font-medium text-sm">{item.projectName}</h4>
                <p className="text-xs text-muted-foreground">{item.community}</p>
                <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-3 h-3" />
                    <span>{item.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{item.submittedAt}</span>
                  </div>
                </div>
              </div>
              <div className="text-right space-y-2">
                <Badge variant="outline" className="text-xs">
                  {item.estimatedCredits} credits
                </Badge>
                <Button size="sm" className="w-full text-xs" onClick={() => handleReviewClick(item.id)}>
                  Review
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {queue.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <p className="text-sm">No projects in queue</p>
        </div>
      )}
    </div>
  )
}
