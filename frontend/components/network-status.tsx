"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Network,
  Globe,
  Shield,
  Server,
  Laptop,
  Smartphone,
  PcCase,
} from "lucide-react";

interface TailscaleInfo {
  ipv4: string;
  ipv6: string;
  dns: string[];
  hostname: string;
}

interface CloudflaredTunnel {
  domain: string;
  status: "up" | "down";
}

interface AdGuardStats {
  queries: number;
  blocked: number;
  blockedMalware: number;
  blockedAdult: number;
}

export function NetworkStatus() {
  const [tailscale, setTailscale] = useState<TailscaleInfo>({
    ipv4: "100.100.10.10",
    ipv6: "fd7a:115c:a1e0:ab12:4843:cd96:6243:5e9c",
    dns: ["100.100.100.100", "1.1.1.1"],
    hostname: "raspberrypi.tail12bb0f.ts.net",
  });

  const [tunnels, setTunnels] = useState<CloudflaredTunnel[]>([
    { domain: "dns.albinvar.in", status: "up" },
    { domain: "cctv.albinvar.in", status: "up" },
    { domain: "vnc.albinvar.in", status: "up" },
    { domain: "pi.albinvar.in", status: "up" },
    { domain: "docker.albinvar.in", status: "up" },
    { domain: "iot.albinvar.in", status: "down" },
  ]);

  const [adguard, setAdguard] = useState<AdGuardStats>({
    queries: 151,
    blocked: 8,
    blockedMalware: 0,
    blockedAdult: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setAdguard((prev) => ({
        ...prev,
        queries: prev.queries + Math.floor(Math.random() * 3),
        blocked: prev.blocked + (Math.random() > 0.7 ? 1 : 0),
        blockedMalware: prev.blockedMalware + (Math.random() > 0.95 ? 1 : 0),
        blockedAdult: prev.blockedAdult + (Math.random() > 0.95 ? 1 : 0),
      }));

      setTunnels((prev) =>
        prev.map((tunnel) => ({
          ...tunnel,
          status:
            Math.random() > 0.98
              ? tunnel.status === "up"
                ? "down"
                : "up"
              : tunnel.status,
        }))
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Tailscale Status
          </CardTitle>
          <Network className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Devices List (Vertical with Big Icons) */}
          <div className="flex justify-around items-center space-x-4 py-4">
            {/* Android */}
            <div className="flex flex-col items-center space-y-1">
              <Smartphone className="h-8 w-8 text-muted-foreground" />
              <span className="text-sm font-medium">Android 1</span>
              <span className="text-xs font-semibold text-green-600">
                Active
              </span>
            </div>

            {/* Windows */}
            <div className="flex flex-col items-center space-y-1">
              <Laptop className="h-8 w-8 text-muted-foreground" />
              <span className="text-sm font-medium">Windows</span>
              <span className="text-xs font-semibold text-red-600">
                Inactive
              </span>
            </div>

            {/* VPS */}
            <div className="flex flex-col items-center space-y-1">
              <Server className="h-8 w-8 text-muted-foreground" />
              <span className="text-sm font-medium">VPS 1 - Ubuntu</span>
              <span className="text-xs font-semibold text-green-600">
                Active
              </span>
            </div>
            {/* WSL */}
            <div className="flex flex-col items-center space-y-1">
              <PcCase className="h-8 w-8 text-muted-foreground" />
              <span className="text-sm font-medium">VPS 2 - WSL</span>
              <span className="text-xs font-semibold text-green-600">
                Active
              </span>
            </div>
          </div>

          {/* //// */}
          <CardTitle className="text-sm font-medium">Device Info</CardTitle>
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
              <span className="text-sm font-medium">
                {tailscale.dns.join(", ")}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Hostname</span>
              <span className="text-sm font-medium">{tailscale.hostname}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-5">
          <CardTitle className="text-sm font-medium">
            Cloudflared Status
          </CardTitle>
          <Globe className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {tunnels.map((tunnel) => (
              <div
                key={tunnel.domain}
                className="flex items-center justify-between"
              >
                <span className="text-sm font-medium">{tunnel.domain}</span>
                <div className="flex items-center space-x-2">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      tunnel.status === "up" ? "bg-green-500" : "bg-red-500"
                    }`}
                  />
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
          <CardTitle className="text-sm font-medium">
            AdGuard Protection
          </CardTitle>
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
                  style={{ width: "100%" }}
                />
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-2xl font-bold">{adguard.blocked}</p>
              <p className="text-sm text-muted-foreground">
                Blocked by Filters
              </p>
              <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-yellow-500 transition-all duration-500"
                  style={{
                    width: `${(adguard.blocked / adguard.queries) * 100}%`,
                  }}
                />
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-2xl font-bold">{adguard.blockedMalware}</p>
              <p className="text-sm text-muted-foreground">Blocked Malware</p>
              <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-red-500 transition-all duration-500"
                  style={{
                    width: `${
                      (adguard.blockedMalware / adguard.queries) * 100
                    }%`,
                  }}
                />
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-2xl font-bold">{adguard.blockedAdult}</p>
              <p className="text-sm text-muted-foreground">
                Blocked Adult Sites
              </p>
              <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-purple-500 transition-all duration-500"
                  style={{
                    width: `${(adguard.blockedAdult / adguard.queries) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
