"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Lightbulb,
  Fan,
  Camera,
  WashingMachine,
  Speaker,
  Power,
  Grid3X3
} from "lucide-react"

interface IoTDevice {
  name: string
  status: 'on' | 'off' | 'error'
  icon: React.ReactNode
  type: string
  value?: number
}

export function IoTDevices() {
  const [devices, setDevices] = useState<IoTDevice[]>([
    {
      name: 'Bedroom Light',
      status: 'on',
      icon: <Lightbulb className="h-5 w-5" />,
      type: 'light',
      value: 80
    },
    {
      name: 'Drawing Room Light',
      status: 'off',
      icon: <Lightbulb className="h-5 w-5" />,
      type: 'light',
      value: 0
    },
    {
      name: 'CCTV - Front Yard',
      status: 'on',
      icon: <Camera className="h-5 w-5" />,
      type: 'camera'
    },
    {
      name: 'Bedroom Fan',
      status: 'on',
      icon: <Fan className="h-5 w-5" />,
      type: 'fan',
      value: 60
    },
    {
      name: 'Washing Machine',
      status: 'off',
      icon: <WashingMachine className="h-5 w-5" />,
      type: 'appliance'
    },
    {
      name: 'Alexa Bedroom',
      status: 'on',
      icon: <Speaker className="h-5 w-5" />,
      type: 'speaker'
    },
    {
      name: 'Switch (8 Relay)',
      status: 'on',
      icon: <Grid3X3 className="h-5 w-5" />,
      type: 'switch'
    }
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      setDevices(prev => prev.map(device => ({
        ...device,
        status: Math.random() > 0.95 ? (device.status === 'on' ? 'error' : 'on') : device.status,
        value: device.value !== undefined ? 
          Math.max(0, Math.min(100, device.value + (Math.random() * 10 - 5))) : 
          undefined
      })))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">IoT Devices</CardTitle>
        <Power className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
          {devices.map((device) => (
            <div key={device.name} className="flex items-center space-x-4 p-3 rounded-lg bg-secondary/50">
              <div className="relative">
                <span className={`absolute -top-1 -right-1 flex h-2 w-2 ${
                  device.status === 'on' ? 'bg-green-500' :
                  device.status === 'error' ? 'bg-red-500' : 'bg-yellow-500'
                } rounded-full`}>
                  {device.status === 'on' && (
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  )}
                  {device.status === 'error' && (
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  )}
                </span>
                <div className={`text-muted-foreground ${
                  device.status === 'error' ? 'animate-bounce' : 
                  device.type === 'fan' && device.status === 'on' ? 'animate-spin' : ''
                }`}>
                  {device.icon}
                </div>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium">{device.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {device.status.toUpperCase()}
                    {device.value !== undefined && ` | ${device.value.toFixed(0)}%`}
                  </p>
                </div>
                {device.value !== undefined && (
                  <div className="mt-1 h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                    <div 
                      className="h-full transition-all duration-500"
                      style={{ 
                        width: `${device.value}%`,
                        backgroundColor: device.status === 'on' ? 'rgb(34 197 94)' :
                                       device.status === 'error' ? 'rgb(239 68 68)' : 'rgb(234 179 8)'
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}