"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Box, Cloud, Home, PlaySquare, Power } from "lucide-react"

interface Service {
  name: string
  status: 'running' | 'stopped' | 'error'
  icon: React.ReactNode
  memory: number
  cpu: number
}

export function ServicesStatus() {
  const [services, setServices] = useState<Service[]>([
    {
      name: 'Docker',
      status: 'running',
      icon: <Box className="h-4 w-4" />,
      memory: 256,
      cpu: 2.5
    },
    {
      name: 'Plex',
      status: 'running',
      icon: <PlaySquare className="h-4 w-4" />,
      memory: 512,
      cpu: 5.8
    },
    {
      name: 'Nextcloud',
      status: 'running',
      icon: <Cloud className="h-4 w-4" />,
      memory: 384,
      cpu: 3.2
    },
    {
      name: 'Home Assistant',
      status: 'running',
      icon: <Home className="h-4 w-4" />,
      memory: 428,
      cpu: 4.1
    }
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      setServices(prev => prev.map(service => ({
        ...service,
        memory: Math.max(128, Math.min(1024, service.memory + (Math.random() * 50 - 25))),
        cpu: Math.max(0.1, Math.min(15, service.cpu + (Math.random() * 2 - 1))),
        status: Math.random() > 0.95 ? (service.status === 'running' ? 'error' : 'running') : service.status
      })))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Services Status</CardTitle>
        <Power className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {services.map((service) => (
            <div key={service.name} className="flex items-center space-x-4">
              <div className="relative">
                <span className={`absolute -top-1 -right-1 flex h-2 w-2 ${
                  service.status === 'running' ? 'bg-green-500' :
                  service.status === 'error' ? 'bg-red-500' : 'bg-yellow-500'
                } rounded-full`}>
                  {service.status === 'running' && (
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  )}
                  {service.status === 'error' && (
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  )}
                </span>
                <div className={`text-muted-foreground ${
                  service.status === 'error' ? 'animate-bounce' : ''
                }`}>
                  {service.icon}
                </div>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium">{service.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {service.memory.toFixed(0)}MB | {service.cpu.toFixed(1)}% CPU
                  </p>
                </div>
                <div className="mt-1 h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                  <div 
                    className="h-full transition-all duration-500"
                    style={{ 
                      width: `${(service.cpu / 15) * 100}%`,
                      backgroundColor: service.status === 'running' ? 'rgb(34 197 94)' :
                                     service.status === 'error' ? 'rgb(239 68 68)' : 'rgb(234 179 8)'
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}