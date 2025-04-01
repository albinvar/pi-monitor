'use client';

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Fan } from "lucide-react";
import { useSystemStats } from "../context/SystemStatsContext"; // Import the context

export function CPULoad() {
  const systemStats = useSystemStats(); // Get system stats from context
  const [currentRpm, setCurrentRpm] = useState<number>(0); // Ensure RPM is treated as a number
  const [previousRpm, setPreviousRpm] = useState<number>(0); // Store the previous RPM to smooth out changes

  const MAX_RPM = 9500; // Max RPM value (for calculation purposes)
  const MAX_TEMP = 85; // Max temperature for the Raspberry Pi

  // Only set fan speed based on fan_speed from response when systemStats is available
  useEffect(() => {
    if (systemStats && systemStats.fan_speed) {
      setPreviousRpm(currentRpm); // Smooth the transition
      setCurrentRpm(Number(systemStats.fan_speed)); // Ensure fan_speed is treated as a number
    }
  }, [systemStats]); // Recalculate RPM when systemStats changes

  // Smooth fan rotation duration based on RPM
  const getFanRotationDuration = () => {
    if (currentRpm === 0) return "4s"; // Slow transition when fan RPM is 0 (very slow spin to stop)
    const maxSpeed = 0.4; // Fastest spin speed (rotation speed)
    const minSpeed = 6; // Slowest speed in seconds
    const duration = (minSpeed - (currentRpm / MAX_RPM) * (minSpeed - maxSpeed)).toFixed(2);
    return `${duration}s`; // Duration in seconds, shorter duration = faster spin
  };

  // Calculate RPM change percentage for smooth animation effect
  const rpmTransition = Math.abs(currentRpm - previousRpm) > 0 ? 0.5 : 0.2; // Adjust for smoother transition

  // Check if systemStats data is available
  const isDataAvailable = systemStats !== null;

  // Get the CPU load from the API response directly (no multiplication)
  const cpuLoad = isDataAvailable ? systemStats.cpu_load : 0;

  // Get the current temperature from the system stats
  const temperature = isDataAvailable ? parseFloat(systemStats.temperature) : 0;

  // Get the color based on temperature (green, orange, red)
  const getTemperatureColor = () => {
    if (temperature >= 66) return "rgb(239 68 68)"; // red
    if (temperature >= 52) return "rgb(234 179 8)"; // orange
    return "rgb(34 197 94)"; // green
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
              animation: currentRpm > 0 ? `spin ${getFanRotationDuration()} linear infinite` : "none", // Trigger rotation based on RPM
              opacity: currentRpm > 0 ? 1 : 0.3, // Show fan if RPM > 0
              transition: `transform ${rpmTransition}s ease-in-out, opacity ${rpmTransition}s ease-in-out`, // Smooth transition for fan animation
            }}
          />
          <p className="text-sm text-muted-foreground">
            {isDataAvailable ? `${(currentRpm / MAX_RPM * 100).toFixed(0)}% • ${currentRpm.toFixed(0)} RPM` : "-"}
          </p>
        </div>

        {/* Metrics */}
        <div className="flex-1 space-y-6 w-full">
          {/* CPU Load */}
          <div>
            <div className="flex justify-between mb-1">
              <p className="text-2xl font-bold">{cpuLoad.toFixed(1)}%</p> {/* Show exact cpu_load value */}
              <p className="text-sm text-muted-foreground">CPU Load</p>
            </div>
            <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-500"
                style={{ width: `${cpuLoad}%` }} // Show progress bar based on the real cpu_load value
              />
            </div>
          </div>

          {/* Temperature */}
          <div>
            <div className="flex justify-between mb-1">
              <p className="text-2xl font-bold">{isDataAvailable ? temperature.toFixed(1) : "0"}°C</p>
              <p className="text-sm text-muted-foreground">Temperature</p>
            </div>
            <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full transition-all duration-500"
                style={{
                  width: `${isDataAvailable ? ((temperature / MAX_TEMP) * 100) : 0}%`, // Progress bar from 0 to 100 based on temperature
                  backgroundColor: getTemperatureColor(), // Dynamic color based on temperature
                }}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
