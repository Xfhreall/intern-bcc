"use client"

import type { Reports } from "@/types/reportTypes"

import { format } from "date-fns"
import { MapPin, Calendar, User, AlertCircle, Clock, ImageIcon, RefreshCw } from "lucide-react"
import { addToast } from "@heroui/toast"

import { useUserReports } from "@/hooks/useSeaStatus"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Status badge component with appropriate colors
const StatusBadge = ({ status }: { status: string }) => {
    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case "pending":
                return "bg-yellow-100 text-yellow-800 border-yellow-200"
            case "in-progress":
            case "in progress":
                return "bg-blue-100 text-blue-800 border-blue-200"
            case "verified":
                return "bg-green-100 text-green-800 border-green-200"
            case "rejected":
                return "bg-red-100 text-red-800 border-red-200"
            default:
                return "bg-gray-100 text-gray-800 border-gray-200"
        }
    }

    return (
        <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${getStatusColor(status)}`}>
            {status.replace(/-/g, " ")}
        </span>
    )
}

const UserReports = () => {
    const { data: reports, isLoading, error, refetch } = useUserReports()

    if (isLoading) {
        return (
            <div className="w-full p-6 bg-white rounded-lg shadow">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800">User Reports</h2>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="w-full p-6 bg-white rounded-lg shadow">
                <Alert className="mb-4" variant="destructive">
                    <AlertCircle className="w-4 h-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error.message}</AlertDescription>
                </Alert>
                <Button className="flex items-center gap-2" variant="outline" onClick={() => refetch()}>
                    <RefreshCw className="w-4 h-4" />
                    Try Again
                </Button>
            </div>
        )
    }

    return (
        <div className="w-full p-8 m-4 bg-white rounded-lg shadow">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">User Reports</h2>
                <Button className="flex items-center gap-2" size="sm" variant="outline" onClick={() => {
                    refetch()
                    addToast({
                        color: 'success',
                        title: "Reports refreshed",
                        shouldShowTimeoutProgress: true,
                        description: "Your reports have been successfully refreshed",
                        timeout: 5000,
                    })
                }}>
                    <RefreshCw className="w-4 h-4" />
                    Refresh
                </Button>
            </div>

            {reports && reports.length > 0 ? (
                <div className="space-y-6">
                    {reports.map((report: Reports) => (
                        <div key={report.id} className="p-5 transition-all border rounded-lg hover:shadow-md">
                            <div className="flex items-start justify-between mb-3">
                                <h3 className="text-lg font-medium text-gray-800">{report.title}</h3>
                                <StatusBadge status={report.status} />
                            </div>

                            <p className="mb-4 text-gray-600">{report.description}</p>

                            {report.media && (
                                <div className="mb-4">
                                    <a
                                        className="inline-flex items-center gap-1 text-sm text-blue-600 hover:underline"
                                        href={report.media}
                                        rel="noopener noreferrer"
                                        target="_blank"
                                    >
                                        <ImageIcon className="w-4 h-4" />
                                        View Attachment
                                    </a>
                                </div>
                            )}

                            <div className="grid grid-cols-1 gap-2 pt-3 mt-3 text-xs text-gray-500 border-t sm:grid-cols-2">
                                <div className="flex items-center gap-1">
                                    <MapPin className="w-3.5 h-3.5" />
                                    <span>{report.location}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Calendar className="w-3.5 h-3.5" />
                                    <span>Created: {format(new Date(report.createdAt), "MMM d, yyyy")}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <User className="w-3.5 h-3.5" />
                                    <span>ID: {report.userId}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Clock className="w-3.5 h-3.5" />
                                    <span>Updated: {format(new Date(report.updatedAt), "MMM d, yyyy")}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="p-8 text-center text-gray-500 border-2 border-dashed rounded-lg">
                    <p>No reports found. Create a new report to get started.</p>
                </div>
            )}
        </div>
    )
}

export default UserReports

