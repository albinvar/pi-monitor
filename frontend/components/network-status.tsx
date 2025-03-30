"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Network, Globe, Shield } from "lucide-react"

interface TailscaleInfo {
  ipv4: string
  ipv6: string
  dns: string[]
  hostname: string
}

interface CloudflaredTunnel {
  domain: string
  status: 'up' | 'down'
}

interface AdGuardStats {
  queries: number
  blocked: number
  blockedMalware: number
  blockedAdult: number
}

export function NetworkStatus() {
  const [tailscale, setTailscale] = useState<TailscaleInfo>({
    ipv4: "100.64.0.10",
    ipv6: "fd7a:115c:a1e0:ab12:4843:cd96:6243:5e9c",
    dns: ["100.100.100.100", "1.1.1.1"],
    hostname: "raspberrypi.tail1234.ts.net"
  })

  const [tunnels, setTunnels] = useState<CloudflaredTunnel[]>([
    { domain: "abc.albinvar.in", status: "up" },
    { domain: "bcd.albinvar.in", status: "up" }
  ])

  const [adguard, setAdguard] = useState<AdGuardStats>({
    queries: 151,
    blocked: 8,
    blockedMalware: 0,
    blockedAdult: 0
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setAdguard(prev => ({
        ...prev,
        queries: prev.queries + Math.floor(Math.random() * 3),
        blocked: prev.blocked + (Math.random() > 0.7 ? 1 : 0),
        blockedMalware: prev.blockedMalware + (Math.random() > 0.95 ? 1 : 0),
        blockedAdult: prev.blockedAdult + (Math.random() > 0.95 ? 1 : 0)
      }))

      setTunnels(prev => prev.map(tunnel => ({
        ...tunnel,
        status: Math.random() > 0.98 ? (tunnel.status === 'up' ? 'down' : 'up') : tunnel.status
      })))
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Tailscale Status</CardTitle>
          <Network className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">IPv4</span>
              <span className="text-sm font-medium">{tailscale.ipv4}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">IPv6</span>
              <span className="text-sm font-medium">{tailscale.ipv6}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">DNS</span>
              <span className="text-sm font-medium">{tailscale.dns.join(", ")}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Hostname</span>
              <span className="text-sm font-medium">{tailscale.hostname}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Cloudflared Status</CardTitle>
          <Globe className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {tunnels.map((tunnel) => (
              <div key={tunnel.domain} className="flex items-center justify-between">
                <span className="text-sm font-medium">{tunnel.domain}</span>
                <div className="flex items-center space-x-2">
                  <span className={`h-2 w-2 rounded-full ${
                    tunnel.status === 'up' ? 'bg-green-500' : 'bg-red-500'
                  }`} />
                  <span className="text-sm text-muted-foreground">
                    {tunnel.status.toUpperCase()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">AdGuard Protection</CardTitle>
          <Shield className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <p className="text-2xl font-bold">{adguard.queries}</p>
              <p className="text-sm text-muted-foreground">DNS Queries</p>
              <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-500"
                  style={{ width: '100%' }}
                />
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-2xl font-bold">{adguard.blocked}</p>
              <p className="text-sm text-muted-foreground">Blocked by Filters</p>
              <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                <div 
                  className="h-full bg-yellow-500 transition-all duration-500"
                  style={{ width: `${(adguard.blocked / adguard.queries) * 100}%` }}
                />
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-2xl font-bold">{adguard.blockedMalware}</p>
              <p className="text-sm text-muted-foreground">Blocked Malware</p>
              <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                <div 
                  className="h-full bg-red-500 transition-all duration-500"
                  style={{ width: `${(adguard.blockedMalware / adguard.queries) * 100}%` }}
                />
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-2xl font-bold">{adguard.blockedAdult}</p>
              <p className="text-sm text-muted-foreground">Blocked Adult Sites</p>
              <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                <div 
                  className="h-full bg-purple-500 transition-all duration-500"
                  style={{ width: `${(adguard.blockedAdult / adguard.queries) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}