"use client"

import { useState } from "react"

import SeaReportForm from "@/components/forms/seaReport-form"
import SeaStatus from "@/components/forms/seaStatus"
import { HeaderDashboard } from "@/components/ui/header-dashboard"

export default function SeaReportPage() {
    const [activeTab, setActiveTab] = useState("SeaReport")

    return (
        <div className="w-full h-full px-8 py-4">
            <HeaderDashboard activeTab={activeTab} setActiveTab={setActiveTab} />
            {activeTab === "SeaReport" ? <SeaReportForm /> : <SeaStatus />}
        </div >
    )
}

