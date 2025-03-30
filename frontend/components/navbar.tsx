"use client"

import { CircuitBoard } from "lucide-react"
import { ModeToggle } from "./mode-toggle"
import Link from "next/link"

export default function Navbar() {
  return (
    <nav className="border-b">
      <div className="flex h-16 items-center px-4">
        <Link href="/" className="flex items-center space-x-2">
          <CircuitBoard className="h-6 w-6 text-red-500" />
          <span className="font-bold">Pi Monitor</span>
        </Link>
        <div className="ml-auto flex items-center space-x-4">
          <Link href="/system" className="text-sm font-medium transition-colors hover:text-primary">
            System
          </Link>
          <Link href="/network" className="text-sm font-medium transition-colors hover:text-primary">
            Network
          </Link>
          <Link href="/storage" className="text-sm font-medium transition-colors hover:text-primary">
            Storage
          </Link>
          <Link href="/processes" className="text-sm font-medium transition-colors hover:text-primary">
            Processes
          </Link>
          <ModeToggle />
        </div>
      </div>
    </nav>
  )
}