"use client"

import { useSearchParams } from "next/navigation"

export default function AuthError() {
    const searchParams = useSearchParams()
    const error = searchParams.get("error")

    const errorMessages: Record<string, string> = {
        no_code: "No authorization code was provided by Google.",
        token_exchange: "Failed to exchange the authorization code for tokens.",
        user_info: "Failed to retrieve user information.",
        server_error: "An unexpected server error occurred.",
    }

    const errorMessage = error ? errorMessages[error] || "An unknown error occurred." : "An unknown error occurred."

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <div className="w-full max-w-md p-6 bg-white border border-gray-200 rounded-lg shadow-md">
                <h1 className="mb-4 text-2xl font-bold text-red-600">Authentication Error</h1>
                <p className="text-gray-700">{errorMessage}</p>
                <p className="mt-4 text-gray-600">Please try again or contact support if the problem persists.</p>
            </div>
        </div>
    )
}

