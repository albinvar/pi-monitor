"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Fan } from "lucide-react"

export function CPULoad() {
  const [load, setLoad] = useState(45)
  const [temp, setTemp] = useState(38)
  const [fanSpeed, setFanSpeed] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setLoad(prev => {
        const newLoad = prev + (Math.random() * 10 - 5)
        return Math.min(Math.max(newLoad, 0), 100)
      })
      setTemp(prev => {
        const newTemp = prev + (Math.random() * 2 - 1)
        return Math.min(Math.max(newTemp, 30), 85)
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    // Calculate fan speed based on temperature
    let speed = 0
    if (temp >= 75) speed = 100
    else if (temp >= 67.5) speed = 70
    else if (temp >= 60) speed = 50
    else if (temp >= 50) speed = 30
    setFanSpeed(speed)
  }, [temp])

  const getFanRotationDuration = () => {
    if (fanSpeed === 0) return '0s'
    // Map fan speed percentage to rotation duration (lower duration = faster spin)
    const maxSpeed = 0.3 // fastest rotation (0.3s per rotation)
    const minSpeed = 2 // slowest rotation (2s per rotation)
    const duration = minSpeed - ((fanSpeed / 100) * (minSpeed - maxSpeed))
    return `${duration}s`
  }

  const getTemperatureColor = () => {
    if (temp >= 75) return 'rgb(239 68 68)' // red
    if (temp >= 67.5) return 'rgb(234 179 8)' // yellow
    if (temp >= 60) return 'rgb(234 179 8)' // yellow
    return 'rgb(34 197 94)' // green
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">CPU Load & Temperature</CardTitle>
        <div className="relative">
          <Fan 
            className="h-4 w-4 text-muted-foreground"
            style={{
              animation: fanSpeed > 0 ? `spin ${getFanRotationDuration()} linear infinite` : 'none',
              opacity: fanSpeed > 0 ? 1 : 0.5
            }}
          />
          <span className="absolute -top-1 -right-1 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <p className="text-2xl font-bold">{load.toFixed(1)}%</p>
              <p className="text-sm text-muted-foreground">CPU Load</p>
            </div>
            <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-500"
                style={{ width: `${load}%` }}
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <p className="text-2xl font-bold">{temp.toFixed(1)}°C</p>
              <p className="text-sm text-muted-foreground">
                Fan: {fanSpeed}% ({(fanSpeed * 80).toFixed(0)} RPM)
              </p>
            </div>
            <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
              <div 
                className="h-full transition-all duration-500"
                style={{ 
                  width: `${(temp - 30) / (85 - 30) * 100}%`,
                  backgroundColor: getTemperatureColor()
                }}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}