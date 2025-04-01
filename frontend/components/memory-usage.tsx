'use client';

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MemoryStick as Memory } from "lucide-react";
import { useSystemStats } from "../context/SystemStatsContext"; // Assuming you are using context to fetch system stats

export function MemoryUsage() {
  const systemStats = useSystemStats(); // Get system stats from context or API
  const [used, setUsed] = useState<number>(0); // Initialize used memory as 0
  const [total, setTotal] = useState<number>(0); // Initialize total memory as 0

  // Fetch memory stats when systemStats is available
  useEffect(() => {
    if (systemStats && systemStats.total_memory && systemStats.used_memory) {
      setTotal(systemStats.total_memory / (1024 ** 3)); // Convert bytes to GB
      setUsed(systemStats.used_memory / (1024 ** 3)); // Convert bytes to GB
    }
  }, [systemStats]);

  // Calculate the color based on memory usage percentage
  const getMemoryColor = () => {
    const percentage = (used / total) * 100;
    if (percentage >= 90) return "rgb(239 68 68)"; // red
    if (percentage >= 70) return "rgb(234 179 8)"; // yellow
    return "rgb(34 197 94)"; // green
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Memory Usage</CardTitle>
        <div className="relative">
          <Memory className="h-4 w-4 text-muted-foreground" />
          <span
            className="absolute -top-1 -right-1 flex h-2 w-2"
            style={{ display: used / total > 0.7 ? "flex" : "none" }}
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
              <p className="text-2xl font-bold">
                {used.toFixed(1)}GB / {total.toFixed(1)}GB
              </p>
              <p className="text-sm text-muted-foreground">
                {((used / total) * 100).toFixed(1)}% Used
              </p>
            </div>
            <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full transition-all duration-500"
                style={{
                  width: `${(used / total) * 100}%`,
                  backgroundColor: getMemoryColor(),
                }}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Available</p>
              <p className="font-medium animate-pulse">
                {(total - used).toFixed(1)}GB
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">Used</p>
              <p className="font-medium animate-pulse">{used.toFixed(1)}GB</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
