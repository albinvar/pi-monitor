"use client";

import { useEffect, useState } from "react";
import {
  Lightbulb,
  Fan,
  Camera,
  WashingMachine,
  Speaker,
  Power,
  Grid3X3,
  BarChart3,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface IoTDevice {
  name: string;
  status: "on" | "off" | "error";
  icon: React.ReactNode;
  type: string;
  value?: number;
}

export function IoTDevices() {
  const [devices, setDevices] = useState<IoTDevice[]>([
    {
      name: "Bedroom Light",
      status: "on",
      icon: <Lightbulb className="h-5 w-5" />,
      type: "light",
      value: 80,
    },
    {
      name: "Drawing Room Light",
      status: "off",
      icon: <Lightbulb className="h-5 w-5" />,
      type: "light",
      value: 0,
    },
    {
      name: "CCTV - Front Yard",
      status: "on",
      icon: <Camera className="h-5 w-5" />,
      type: "camera",
    },
    {
      name: "Bedroom Fan",
      status: "on",
      icon: <Fan className="h-5 w-5" />,
      type: "fan",
      value: 60,
    },
    {
      name: "Washing Machine",
      status: "off",
      icon: <WashingMachine className="h-5 w-5" />,
      type: "appliance",
    },
    {
      name: "Alexa Bedroom",
      status: "on",
      icon: <Speaker className="h-5 w-5" />,
      type: "speaker",
    },
    {
      name: "Switch (8 Relay)",
      status: "on",
      icon: <Grid3X3 className="h-5 w-5" />,
      type: "switch",
    },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDevices((prev) =>
        prev.map((device) => ({
          ...device,
          status:
            Math.random() > 0.95
              ? device.status === "on"
                ? "error"
                : "on"
              : device.status,
          value:
            device.value !== undefined
              ? Math.max(
                  0,
                  Math.min(100, device.value + (Math.random() * 10 - 5))
                )
              : undefined,
        }))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // IoT Stats
  const total = devices.length;
  const online = devices.filter((d) => d.status === "on").length;
  const offline = devices.filter((d) => d.status === "off").length;
  const error = devices.filter((d) => d.status === "error").length;

  const averageUsage =
    devices
      .filter((d) => typeof d.value === "number")
      .reduce((acc, d) => acc + (d.value ?? 0), 0) /
    (devices.filter((d) => typeof d.value === "number").length || 1);

  const mostActive = devices
    .filter((d) => typeof d.value === "number")
    .sort((a, b) => (b.value ?? 0) - (a.value ?? 0))[0];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">IoT Devices</CardTitle>
        <Power className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-3">
          {/* Device Grid */}
          <div className="md:col-span-2 grid gap-4 grid-cols-1 sm:grid-cols-2">
            {devices.map((device) => (
              <div
                key={device.name}
                className="flex items-center space-x-4 p-3 rounded-lg bg-secondary/50"
              >
                <div className="relative">
                  <span
                    className={`absolute -top-1 -right-1 flex h-2 w-2 ${
                      device.status === "on"
                        ? "bg-green-500"
                        : device.status === "error"
                        ? "bg-red-500"
                        : "bg-yellow-500"
                    } rounded-full`}
                  >
                    {device.status === "on" && (
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    )}
                    {device.status === "error" && (
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    )}
                  </span>
                  <div className="text-muted-foreground">{device.icon}</div>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-medium">{device.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {device.status.toUpperCase()}
                      {device.value !== undefined &&
                        ` | ${device.value.toFixed(0)}%`}
                    </p>
                  </div>
                  {device.value !== undefined && (
                    <div className="mt-1 h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full transition-all duration-500"
                        style={{
                          width: `${device.value}%`,
                          backgroundColor:
                            device.status === "on"
                              ? "rgb(34 197 94)"
                              : device.status === "error"
                              ? "rgb(239 68 68)"
                              : "rgb(234 179 8)",
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Stats Card */}
          <div className="flex flex-col items-center justify-center p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
            <BarChart3 className="h-5 w-5 text-muted-foreground mb-2" />
            <CardTitle className="text-sm font-medium mb-4">
              Device Stats
            </CardTitle>
            <div className="text-center text-sm space-y-1">
              <p>
                Total Devices: <span className="font-semibold">{total}</span>
              </p>
              <p>
                Online:{" "}
                <span className="text-green-600 font-semibold">{online}</span>
              </p>
              <p>
                Offline:{" "}
                <span className="text-yellow-600 font-semibold">{offline}</span>
              </p>
              <p>
                Errors:{" "}
                <span className="text-red-600 font-semibold">{error}</span>
              </p>
              <p>
                Avg Usage:{" "}
                <span className="font-medium">{averageUsage.toFixed(1)}%</span>
              </p>
              {mostActive && (
                <p className="text-xs text-muted-foreground mt-2">
                  Most Active:{" "}
                  <span className="font-medium">{mostActive.name}</span>
                </p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
