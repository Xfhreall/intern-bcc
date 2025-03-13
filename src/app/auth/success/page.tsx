"use client"

import { useSearchParams } from "next/navigation"

export default function AuthSuccess() {
    const searchParams = useSearchParams()
    const email = searchParams.get("email")

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <div className="w-full max-w-md p-6 bg-white border border-gray-200 rounded-lg shadow-md">
                <h1 className="mb-4 text-2xl font-bold text-green-600">Login Successful!</h1>
                {email && (
                    <p className="text-gray-700">
                        You are logged in as: <span className="font-medium">{email}</span>
                    </p>
                )}
                <p className="mt-4 text-gray-600">You can now access your account and use the application.</p>
            </div>
        </div>
    )
}

