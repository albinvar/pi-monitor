"use client";

import { useEffect, useState } from "react";
import {
  Camera,
  RefreshCcw,
  Maximize2,
  Download,
  CircleDot,
  Bell,
  Activity,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function LiveCCTV() {
  const [status] = useState<"online" | "offline">("online");
  const [motionDetected, setMotionDetected] = useState(false);
  const [alerts, setAlerts] = useState<string[]>([
    "Motion detected at 10:12:31 PM",
    "Object left in frame at 9:55:04 PM",
    "Camera disconnected at 9:30:02 PM",
    "Camera reconnected at 9:31:22 PM",
    "Motion detected at 9:02:47 PM",
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.95) {
        const now = new Date().toLocaleTimeString();
        const newAlert = `Motion detected at ${now}`;
        setAlerts((prev) => [newAlert, ...prev.slice(0, 4)]);
        setMotionDetected(true);
        setTimeout(() => setMotionDetected(false), 2000);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="col-span-1">
      <CardHeader className="flex justify-between items-center pb-2">
        <div className="flex items-center space-x-2">
          <Camera className="h-4 w-4 text-muted-foreground" />
          <CardTitle className="text-sm font-medium">
            Live CCTV — Backyard
          </CardTitle>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <CircleDot className="h-3 w-3 text-green-500 animate-pulse" />
          <span className="font-semibold text-green-600">LIVE</span>
        </div>
      </CardHeader>

      <CardContent className="grid md:grid-cols-2 gap-6">
        {/* Column 1: Live Feed */}
        <div className="relative aspect-video rounded-lg overflow-hidden shadow-inner border bg-black">
          <img
            src="/placeholder-cctv.jpg"
            alt="Live Feed"
            className={`object-cover w-full h-full transition-all duration-500 ${
              status === "offline" ? "grayscale opacity-40" : ""
            }`}
          />
          <div className="absolute top-0 left-0 p-2">
            <span className="px-2 py-0.5 bg-red-600 text-white text-xs rounded shadow">
              LIVE
            </span>
          </div>
          <div className="absolute bottom-0 left-0 w-full px-3 py-1 flex justify-between items-center text-white bg-gradient-to-t from-black/70 via-black/30 to-transparent text-xs">
            <span>1080p | 30 FPS</span>
            <div className="flex gap-2">
              <button title="Snapshot">
                <Download className="h-4 w-4 hover:text-white/80" />
              </button>
              <button title="Refresh">
                <RefreshCcw className="h-4 w-4 hover:text-white/80" />
              </button>
              <button title="Fullscreen">
                <Maximize2 className="h-4 w-4 hover:text-white/80" />
              </button>
            </div>
          </div>
        </div>

        {/* Column 2: Info Panel */}
        <div className="space-y-6">
          {/* Activity Section */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Activity className="h-4 w-4 text-muted-foreground" />
              <h3 className="text-sm font-medium">Activity</h3>
            </div>
            <div className="text-sm space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Status</span>
                <span
                  className={`font-medium ${
                    motionDetected ? "text-red-500" : "text-green-600"
                  }`}
                >
                  {motionDetected ? "Motion Detected" : "No Motion"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Camera Uptime</span>
                <span className="font-medium">12h 38m</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">IR Mode</span>
                <span className="font-medium">Auto</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Bitrate</span>
                <span className="font-medium">3.2 Mbps</span>
              </div>
            </div>
          </div>

          {/* Alerts Section */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Bell className="h-4 w-4 text-muted-foreground" />
              <h3 className="text-sm font-medium">Alerts</h3>
            </div>
            <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1 max-h-48 overflow-auto pr-2">
              {alerts.length === 0 ? (
                <li className="italic text-muted">No recent alerts</li>
              ) : (
                alerts.map((a, idx) => <li key={idx}>{a}</li>)
              )}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
