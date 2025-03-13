"use client"

import { useState } from "react"
import dynamic from 'next/dynamic'

import { HeaderDashboard } from "@/components/ui/header-dashboard"

const SeaReportForm = dynamic(() => import("@/components/forms/seaReport-form"), {
    ssr: false
})
const SeaStatus = dynamic(() => import("@/components/forms/seaStatus"), {
    ssr: false
})

export default function SeaReportPage() {
    const [activeTab, setActiveTab] = useState("SeaReport")

    return (
        <div className="w-full h-full py-4">
            <HeaderDashboard activeTab={activeTab} setActiveTab={setActiveTab} />
            <div className="px-8">
                {activeTab === "SeaReport" ? <SeaReportForm /> : <SeaStatus />}
            </div>
        </div>
    )
}