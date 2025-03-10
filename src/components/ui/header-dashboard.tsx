"use client"
import { Bell } from "lucide-react"
import { useSession } from "next-auth/react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function HeaderDashboard({
    activeTab,
    setActiveTab,
}: {
    activeTab: string
    setActiveTab: (tab: string) => void
}) {
    const { data: session } = useSession()

    const navItems = [
        { id: "SeaReport", name: "SeaReport" },
        { id: "StatusReport", name: "Status Report" },
    ]

    const handleTabClick = (tabId: string) => {
        setActiveTab(tabId)
    }

    return (
        <nav >
            <div className="flex items-center justify-between h-16 px-4 ">
                <div className="flex items-center space-x-8">
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            className={`cursor-pointer font-medium transition-colors duration-200 px-2 py-1  ${activeTab === item.id
                                ? "text-primary border-b-3 border-primary text-lg font-semibold"
                                : "text-gray-600 hover:text-primary/70 text-sm"
                                }`}
                            onClick={() => handleTabClick(item.id)}
                        >
                            {item.name}
                        </button>
                    ))}
                </div>

                <div className="flex items-center space-x-4">
                    <button className="p-2 text-gray-600 rounded-full hover:bg-gray-100">
                        <Bell className="w-5 h-5" />
                    </button>
                    <div className="flex items-center space-x-4">
                        <div className="text-sm">
                            <p className="font-semibold text-gray-900">{session?.user?.name}</p>
                            <p className="text-xs text-gray-500 text-end">Volunteer</p>
                        </div>
                        <Avatar className="w-8 h-8">
                            <AvatarImage src={session?.user.picture} />
                            <AvatarFallback className="text-white bg-primary">
                                {session?.user?.email?.[0]?.toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                    </div>
                </div>
            </div>
        </nav>
    )
}

