"use client"
import { Bell, Menu, X } from "lucide-react"
import { useSession } from "next-auth/react"
import NextLink from "next/link"

import { LogoutButton } from "./logout-button"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useNavbar } from "@/hooks/useNavbar"
import { Logo } from "@/public/icon/logo"
import { links } from "@/lib/linkItems"


export function HeaderDashboard() {
    const { data: session } = useSession()
    const { toggleSidebar, closeSidebar, isOpen } = useNavbar()

    return (
        <header className="sticky top-0 z-50 flex items-center justify-between p-4 bg-white shadow-lg md:p-6">
            <div className="block md:hidden">
                <button aria-label="Toggle menu" className="p-2 text-black focus:outline-none" onClick={toggleSidebar}>
                    <Menu size={24} />
                </button>
            </div>
            <div className="flex items-center ml-auto space-x-1 md:space-x-4">
                <button className="p-2 text-gray-600 rounded-full hover:bg-gray-100">
                    <Bell className="w-5 h-5 fill-black" />
                </button>
                <div className="flex items-center space-x-0 md:space-x-4">
                    <div className="hidden space-y-1 text-sm md:block">
                        <p className="font-semibold text-gray-900">{session?.user?.name}</p>
                        <p className="text-xs text-gray-500 text-end">Volunteer</p>
                    </div>
                    <Avatar className="size-10">
                        <AvatarImage src={session?.user.picture} />
                        <AvatarFallback className="text-white bg-primary">
                            {session?.user?.email?.[0]?.toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                </div>
            </div>
            <span
                className={`fixed inset-0 z-[60] bg-black bg-opacity-50 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
                role="button"
                tabIndex={0}
                onClick={toggleSidebar}
                onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                        toggleSidebar()
                    }
                }}
            />

            <div
                className={`fixed top-0 left-0 z-[70] h-screen w-64 bg-white transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div className="flex items-center justify-between p-4 border-b border-black/20">
                    <NextLink className="flex items-center gap-2" href="/" onClick={closeSidebar}>
                        <Logo className="w-8 h-8" />
                        <span className="text-xl font-bold ">Nautikara</span>
                    </NextLink>
                    <button aria-label="Close menu" className="p-2 focus:outline-none" onClick={toggleSidebar}>
                        <X size={24} />
                    </button>
                </div>

                <nav className="px-4 py-6">
                    <ul className="flex flex-col space-y-4">
                        {links.map((item) => (
                            <li key={item.href}>
                                <NextLink
                                    className="block py-2 transition-all duration-300 hover:font-bold"
                                    href={item.href}
                                    onClick={closeSidebar}
                                >
                                    {item.label}
                                </NextLink>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="absolute w-full p-4 border-t bottom-2 border-black/20">
                    <LogoutButton />
                </div>
            </div>
        </header>
    )
}

