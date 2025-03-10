"use client"

import { useState } from "react"
import dynamic from 'next/dynamic'

import { HeaderDashboard } from "@/components/ui/header-dashboard"

// Dynamically import components with no SSR
const SeaReportForm = dynamic(() => import("@/components/forms/seaReport-form"), {
    ssr: false
})
const SeaStatus = dynamic(() => import("@/components/forms/seaStatus"), {
    ssr: false
})

export default function SeaReportPage() {
    const [activeTab, setActiveTab] = useState("SeaReport")

    return (
        <div className="w-full h-full px-8 py-4">
            <HeaderDashboard activeTab={activeTab} setActiveTab={setActiveTab} />
            {activeTab === "SeaReport" ? <SeaReportForm /> : <SeaStatus />}
        </div>
    )
}