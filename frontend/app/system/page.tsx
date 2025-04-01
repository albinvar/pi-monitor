"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import dynamic from 'next/dynamic';

const Progress = dynamic(() => import('@/components/ui/progress'), {
  ssr: false, // Disable SSR (Server-Side Rendering) for this component
});

import {
  Activity,
  Clock,
  CpuIcon,
  Fan,
  HardDrive,
  MemoryStick as Memory,
  Settings,
  Thermometer,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function SystemPage() {
  const [uptime, setUptime] = useState(0);
  const [fanSpeed, setFanSpeed] = useState(0);
  const [temperature, setTemperature] = useState(45);

  useEffect(() => {
    setUptime(Math.floor(Math.random() * 1000000));
    const interval = setInterval(() => {
      setUptime((prev) => prev + 1);
      setTemperature((prev) => {
        const newTemp = prev + (Math.random() * 2 - 1);
        const temp = Math.min(Math.max(newTemp, 30), 85);
        // Update fan speed based on temperature
        let speed = 0;
        if (temp >= 75) speed = 100;
        else if (temp >= 67.5) speed = 70;
        else if (temp >= 60) speed = 50;
        else if (temp >= 50) speed = 30;
        setFanSpeed(speed);
        return temp;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatUptime = (seconds: number) => {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${days}d ${hours}h ${minutes}m ${secs}s`;
  };

  const getFanRotationDuration = () => {
    if (fanSpeed === 0) return "0s";
    const maxSpeed = 0.3; // fastest rotation (0.3s per rotation)
    const minSpeed = 2; // slowest rotation (2s per rotation)
    return `${minSpeed - (fanSpeed / 100) * (minSpeed - maxSpeed)}s`;
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">System Information</h1>
          <p className="text-muted-foreground">
            Detailed system statistics and information
          </p>
        </div>
        <Card className="p-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Uptime</p>
                <p className="text-xs text-muted-foreground">
                  {formatUptime(uptime)}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Fan
                  className="h-4 w-4 text-muted-foreground"
                  style={{
                    animation:
                      fanSpeed > 0
                        ? `spin ${getFanRotationDuration()} linear infinite`
                        : "none",
                    opacity: fanSpeed > 0 ? 1 : 0.5,
                  }}
                />
                {fanSpeed > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
                  </span>
                )}
              </div>
              <div>
                <p className="text-sm font-medium">Fan Speed</p>
                <p className="text-xs text-muted-foreground">
                  {fanSpeed}% ({(fanSpeed * 80).toFixed(0)} RPM)
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="cpu">CPU</TabsTrigger>
          <TabsTrigger value="memory">Memory</TabsTrigger>
          <TabsTrigger value="storage">Storage</TabsTrigger>
          <TabsTrigger value="thermal">Thermal</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  System Load
                </CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0.75</div>
                <Progress value={25} className="mt-2" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  CPU Temperature
                </CardTitle>
                <Thermometer className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">45.2°C</div>
                <Progress value={45} className="mt-2" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Memory Usage
                </CardTitle>
                <Memory className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2.1GB / 8GB</div>
                <Progress value={26} className="mt-2" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Storage Usage
                </CardTitle>
                <HardDrive className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">45GB / 128GB</div>
                <Progress value={35} className="mt-2" />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>System Specifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium">Operating System</p>
                    <p className="text-sm text-muted-foreground">
                      Raspberry Pi OS (64-bit)
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Kernel Version</p>
                    <p className="text-sm text-muted-foreground">
                      6.1.0-rpi7-rpi-v8
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Architecture</p>
                    <p className="text-sm text-muted-foreground">aarch64</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Hostname</p>
                    <p className="text-sm text-muted-foreground">raspberrypi</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cpu" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>CPU Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium">Model</p>
                    <p className="text-sm text-muted-foreground">
                      Quad-core ARM Cortex-A76
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Clock Speed</p>
                    <p className="text-sm text-muted-foreground">2.4GHz</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Cores</p>
                    <p className="text-sm text-muted-foreground">4</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Cache</p>
                    <p className="text-sm text-muted-foreground">2MB L2</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium">Core Usage</p>
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>Core {i + 1}</span>
                        <span>{Math.floor(Math.random() * 100)}%</span>
                      </div>
                      <Progress value={Math.floor(Math.random() * 100)} />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="memory" className="space-y-4">
          {/* Memory content similar to CPU but with memory-specific information */}
        </TabsContent>

        <TabsContent value="storage" className="space-y-4">
          {/* Storage content similar to CPU but with storage-specific information */}
        </TabsContent>
      </Tabs>
    </div>
  );
}
