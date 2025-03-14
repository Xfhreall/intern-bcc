"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { signIn } from "next-auth/react"

import { useAuthStore } from "@/store/authStore"

export default function SuccessPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [error, setError] = useState<string | null>(null)

    const setTokens = useAuthStore((state) => state.setTokens);
    const setRegistrationData = useAuthStore(
        (state) => state.setRegistrationData
    );

    useEffect(() => {
        async function handleTokens() {
            try {
                const accessToken = searchParams.get("accessToken")
                const refreshToken = searchParams.get("refreshToken")

                if (!accessToken || !refreshToken) {
                    throw new Error("Missing tokens in URL")
                }

                const { extractUserInfo } = await import("@/utils/jwt-utils")

                const userInfo = extractUserInfo(accessToken)

                if (!userInfo.id) {
                    console.warn("Could not extract user ID from token")
                }
                const result = await signIn("credentials", {
                    redirect: false,
                    email: userInfo.email,
                    password: "token-based-auth",
                    accessToken,
                    refreshToken,
                    userId: userInfo.id,
                    userName: userInfo.name,
                })

                setRegistrationData({
                    email: userInfo.email || "Google user",
                });
                if (accessToken && refreshToken) {
                    setTokens({
                        accessToken: accessToken,
                        refreshToken: refreshToken,
                    });
                }

                if (result?.error) {
                    throw new Error(result.error)
                }

                router.push("/dashboard")
            } catch (err) {
                setError(err instanceof Error ? err.message : "Failed to authenticate")
            }
        }

        handleTokens()
    }, [searchParams, router])

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen p-4">
                <div className="w-full max-w-md p-6 border border-red-200 rounded-lg bg-red-50">
                    <h1 className="mb-2 text-xl font-semibold text-red-700">Authentication Error</h1>
                    <p className="text-red-600">{error}</p>
                    <button
                        className="px-4 py-2 mt-4 text-white rounded-md bg-primary hover:bg-primary/90"
                        onClick={() => router.push("/login")}
                    >
                        Return to Login
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <div className="w-full max-w-md p-6 text-center bg-white border border-gray-200 rounded-lg">
                <h1 className="mb-4 text-xl font-semibold">Authenticating...</h1>
                <div className="flex justify-center">
                    <div className="w-10 h-10 border-b-2 rounded-full animate-spin border-primary" />
                </div>
            </div>
        </div>
    )
}

