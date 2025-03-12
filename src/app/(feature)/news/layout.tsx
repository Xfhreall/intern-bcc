import { Metadata } from "next";

import "@/styles/globals.css";
import { Footer } from "@/components/footer";



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
        <div className="relative w-screen min-h-screen">
            {children}
            <Footer />
        </div>

    );
}
