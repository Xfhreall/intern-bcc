import { Metadata } from "next";

import "@/styles/globals.css";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";



export const metadata: Metadata = {
    title: {
        default: "News - Nautikara",
        template: `%s - News`,
    },
    description: "Nautikara News",
    icons: {
        icon: "/favicon.ico",
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="relative w-full min-h-screen">
            <Navbar />
            {children}
            <Footer />
        </div>

    );
}
