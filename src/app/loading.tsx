"use client"

import { useEffect, useState } from "react"
import { Loader2 } from "lucide-react"

export default function Loading() {
    const [loadingText, setLoadingText] = useState("Loading")

    useEffect(() => {
        const interval = setInterval(() => {
            setLoadingText((prev) => {
                if (prev === "Loading...") return "Loading"

                return prev + "."
            })
        }, 500)

        return () => clearInterval(interval)
    }, [])

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
            <div className="flex flex-col items-center w-full max-w-lg p-6 mx-4 space-y-4 border rounded-lg shadow-lg bg-card">
                <div className="relative">
                    <Loader2 className="w-16 h-16 animate-spin text-primary" />
                </div>

                <h2 className="text-xl font-semibold text-foreground">{loadingText}</h2>
                <p className="text-sm text-center text-muted-foreground">
                    We&apos;re preparing everything for you. This won&apos;t take long.
                </p>
            </div>
        </div>
    )
}

