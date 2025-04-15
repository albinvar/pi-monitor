"use client";

import { useEffect, useState } from "react";
import { Camera, CircleDot } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function LiveCCTV() {
  const [snapshotUrl, setSnapshotUrl] = useState("");

  useEffect(() => {
    const updateSnapshot = () => {
      setSnapshotUrl(
        `https://cctv-snap.albinvar.in/snapshot.jpg?ts=${Date.now()}`
      );
    };

    updateSnapshot(); // initial load
    const interval = setInterval(updateSnapshot, 10000); // update every 10 seconds

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

      <CardContent>
        <div className="relative aspect-video rounded-lg overflow-hidden shadow-inner border bg-black">
          <img
            src={snapshotUrl}
            alt="Live Feed"
            className="object-cover w-full h-full transition-opacity duration-300"
          />
          <div className="absolute top-0 left-0 p-2">
            <span className="px-2 py-0.5 bg-red-600 text-white text-xs rounded shadow">
              LIVE
            </span>
          </div>
          <div className="absolute bottom-2 right-2">
            <a
              href="https://cctv.albinvar.in/streams"
              target="_blank"
              rel="noopener noreferrer"
              className="px-2 py-1 text-lg bg-white/20 text-white rounded backdrop-blur hover:bg-white/30 transition"
            >
              Watch Live
            </a>
          </div>

          <div className="absolute bottom-0 left-0 w-full px-3 py-3 flex justify-between items-center text-white bg-gradient-to-t from-black/70 via-black/30 to-transparent text-xs">
            <span>Snapshot | Auto-refresh 5s</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
