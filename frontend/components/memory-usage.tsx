"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MemoryStick as Memory } from "lucide-react"

export function MemoryUsage() {
  const [used, setUsed] = useState(2.1)
  const total = 8 // 8GB RAM

  useEffect(() => {
    const interval = setInterval(() => {
      setUsed(prev => {
        const newUsed = prev + (Math.random() * 0.4 - 0.2)
        return Math.min(Math.max(newUsed, 0.5), total)
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const getMemoryColor = () => {
    const percentage = (used / total) * 100
    if (percentage >= 90) return 'rgb(239 68 68)' // red
    if (percentage >= 70) return 'rgb(234 179 8)' // yellow
    return 'rgb(34 197 94)' // green
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Memory Usage</CardTitle>
        <div className="relative">
          <Memory className="h-4 w-4 text-muted-foreground" />
          <span 
            className="absolute -top-1 -right-1 flex h-2 w-2"
            style={{ display: (used / total) > 0.7 ? 'flex' : 'none' }}
          >
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <p className="text-2xl font-bold">{used.toFixed(1)}GB / {total}GB</p>
              <p className="text-sm text-muted-foreground">
                {((used / total) * 100).toFixed(1)}% Used
              </p>
            </div>
            <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
              <div 
                className="h-full transition-all duration-500"
                style={{ 
                  width: `${(used / total) * 100}%`,
                  backgroundColor: getMemoryColor()
                }}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Available</p>
              <p className="font-medium animate-pulse">{(total - used).toFixed(1)}GB</p>
            </div>
            <div>
              <p className="text-muted-foreground">Used</p>
              <p className="font-medium animate-pulse">{used.toFixed(1)}GB</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}