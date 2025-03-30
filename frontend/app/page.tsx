import { CPULoad } from "@/components/cpu-load";
import { MemoryUsage } from "@/components/memory-usage";
import { ServicesStatus } from "@/components/services-status";
import { IoTDevices } from "@/components/iot-devices";
import { NetworkStatus } from "@/components/network-status";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cpu, HardDrive, Network, Thermometer } from "lucide-react";
import { LiveCCTV } from "@/components/live-cctv";

export default function Home() {
  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex flex-col space-y-4">
        <h1 className="text-4xl font-bold">Raspberry Pi 5 Monitor</h1>
        <p className="text-muted-foreground">
          Real-time monitoring dashboard for your Raspberry Pi 5
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">CPU Model</CardTitle>
            <Cpu className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.4GHz</div>
            <p className="text-xs text-muted-foreground">
              Quad-core ARM Cortex-A76
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Storage</CardTitle>
            <HardDrive className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">128GB</div>
            <p className="text-xs text-muted-foreground">microSD Card</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Network</CardTitle>
            <Network className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">20 MB/s</div>
            <p className="text-xs text-muted-foreground">Ethernet + WiFi</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Power</CardTitle>
            <Thermometer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5V/2A</div>
            <p className="text-xs text-muted-foreground">
              USB-C Power Delivery
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <CPULoad />
        <MemoryUsage />
      </div>

      <div className="grid gap-4">
        <IoTDevices />
      </div>

      <NetworkStatus />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <LiveCCTV />
        <ServicesStatus />
      </div>

      <div className="grid gap-4"></div>
    </div>
  );
}
