"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"

interface PaginationProps {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    return (
        <div className="flex items-center justify-center gap-2 mt-8">
            <Button className="border border-gray-400 size-8 md:size-12" disabled={currentPage <= 1} size="icon" variant="outline" onClick={() => onPageChange(currentPage - 1)}>
                <ChevronLeft className="w-4 h-4" />
            </Button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                    key={page}
                    className="border border-gray-400 size-8 md:size-12"
                    variant={currentPage === page ? "default" : "outline"}
                    onClick={() => onPageChange(page)}
                >
                    {page}
                </Button>
            ))}

            <Button
                className="border border-gray-400 size-8 md:size-12"
                disabled={currentPage >= totalPages}
                size="icon"
                variant="outline"
                onClick={() => onPageChange(currentPage + 1)}
            >
                <ChevronRight className="size-4" />
            </Button>
        </div>
    )
}

