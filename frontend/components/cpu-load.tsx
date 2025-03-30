"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Fan } from "lucide-react";

export function CPULoad() {
  const [load, setLoad] = useState(4);
  const [temp, setTemp] = useState(48);
  const [fanSpeed, setFanSpeed] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoad((prev) => {
        const newLoad = prev + (Math.random() * 10 - 5);
        return Math.min(Math.max(newLoad, 0), 100);
      });
      setTemp((prev) => {
        const delta = Math.random() * 2 - 1; // ±1°C
        const newTemp = prev + delta;
        return Math.min(Math.max(newTemp, 48), 71);
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let speed = 0;
    if (temp >= 75) speed = 100;
    else if (temp >= 67.5) speed = 70;
    else if (temp >= 60) speed = 50;
    else if (temp >= 45) speed = 30;
    setFanSpeed(speed);
  }, [temp]);

  const getFanRotationDuration = () => {
    if (fanSpeed === 0) return "0s";
    const maxSpeed = 0.3;
    const minSpeed = 2;
    const duration = minSpeed - (fanSpeed / 100) * (minSpeed - maxSpeed);
    return `${duration}s`;
  };

  const getTemperatureColor = () => {
    if (temp >= 75) return "rgb(239 68 68)";
    if (temp >= 60) return "rgb(234 179 8)";
    return "rgb(34 197 94)";
  };

  return (
    <Card>
      <CardHeader className="flex items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">
          CPU Load, Temperature & Fan
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Fan Icon */}
        <div className="flex flex-col items-center space-y-2">
          <Fan
            className="h-24 w-24 text-muted-foreground"
            style={{
              animation:
                fanSpeed > 0
                  ? `spin ${getFanRotationDuration()} linear infinite`
                  : "none",
              opacity: fanSpeed > 0 ? 1 : 0.3,
            }}
          />
          <p className="text-sm text-muted-foreground">
            {fanSpeed}% • {(fanSpeed * 80).toFixed(0)} RPM
          </p>
        </div>

        {/* Metrics */}
        <div className="flex-1 space-y-6 w-full">
          {/* CPU Load */}
          <div>
            <div className="flex justify-between mb-1">
              <p className="text-2xl font-bold">{load.toFixed(1)}%</p>
              <p className="text-sm text-muted-foreground">CPU Load</p>
            </div>
            <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-500"
                style={{ width: `${load}%` }}
              />
            </div>
          </div>

          {/* Temperature */}
          <div>
            <div className="flex justify-between mb-1">
              <p className="text-2xl font-bold">{temp.toFixed(1)}°C</p>
              <p className="text-sm text-muted-foreground">Temperature</p>
            </div>
            <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full transition-all duration-500"
                style={{
                  width: `${((temp - 30) / (85 - 30)) * 100}%`,
                  backgroundColor: getTemperatureColor(),
                }}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
