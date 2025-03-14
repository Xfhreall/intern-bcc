"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import { ChevronLeft, CirclePlus } from "lucide-react"

import { HeaderDashboard } from "@/components/ui/header-dashboard"
import { Button } from "@/components/ui/button"

const SeaReportForm = dynamic(() => import("@/components/forms/sea-report-form"), {
    ssr: false,
})
const SeaStatus = dynamic(() => import("@/components/forms/sea-status-form"), {
    ssr: false,
})

export default function SeaReportPage() {
    const [showForm, setShowForm] = useState(false)

    const handleAddReport = () => {
        setShowForm(true)
    }

    const handleBackToStatus = () => {
        setShowForm(false)
    }

    return (
        <div className="w-full h-full pb-4">
            <HeaderDashboard />
            <div className="px-8 pt-8">
                <div className="flex flex-wrap items-center justify-between w-full h-full">
                    <div className="flex items-center">
                        {showForm ? (
                            <Button className="mr-2" size="icon" variant="ghost" onClick={handleBackToStatus}>
                                <ChevronLeft />
                            </Button>
                        ) : (
                            null
                        )}
                        <h1 className="text-xl font-semibold md:text-3xl">SeaReport</h1>
                    </div>
                    {!showForm && (
                        <Button className="items-center p-4 md:p-6" onClick={handleAddReport}>
                            <CirclePlus className="mr-0 md:mr-2" />
                            Add Report
                        </Button>
                    )}
                    {showForm && <div className="w-[146px]" />}
                </div>

                {showForm ? <SeaReportForm /> : <SeaStatus />}
            </div>
        </div>
    )
}

