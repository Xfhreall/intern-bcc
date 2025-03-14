"use client"

import React, { useState } from 'react'
import { Calendar, Link, User2Icon } from 'lucide-react'
import Image from 'next/image'
import { addToast } from '@heroui/toast'

import { useUserEvents } from '@/hooks/useEvents'
import { HeaderDashboard } from '@/components/ui/header-dashboard'
import { Button } from '@/components/ui/button'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'

const Event = () => {
    const { data: events, isLoading, error } = useUserEvents()
    const [selectedEvent, setSelectedEvent] = useState<number | null>(null)

    const handleEvents = (index: number) => {
        setSelectedEvent(index)
        document
            .getElementById("desc-section")
            ?.scrollIntoView({ behavior: "smooth" });
    };

    const handleCopy = () => {
        addToast({
            title: 'Link copied!',
            description: 'The event link has been copied to your clipboard.',
            color: 'success'
        })
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)

        return {
            day: date.getDate(),
            month: date.toLocaleString('default', { month: 'short' })
        }
    }

    if (isLoading) {
        return (
            <div className="w-full p-6 bg-white rounded-lg shadow">
                <div className="animate-pulse">Loading...</div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="w-full p-6 bg-white rounded-lg shadow">
                <Alert variant="destructive">
                    <AlertTitle>{`Session Expired :(`}</AlertTitle>
                    <AlertDescription>Please relog to get event list</AlertDescription>
                </Alert>
            </div>
        )
    }


    return (
        <div className='relative flex flex-col w-full min-h-screen'>
            <HeaderDashboard />
            <div className='p-8'>
                <h1 className='text-3xl font-semibold pb-7'>Events</h1>

                <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
                    <div className='space-y-4'>
                        {events?.map((event, index) => {
                            const date = formatDate(event.date)
                            const isSelected = selectedEvent === index

                            return (
                                <div key={index} className='flex items-center gap-8'
                                >
                                    <div className='w-1/12 text-center'>
                                        <div className={`text-3xl font-bold leading-none  ${isSelected ? "text-black" : "text-gray-400"}`}>
                                            {date.day}
                                        </div>
                                        <div className={`text-sm mt-2 font-medium leading-none  ${isSelected ? "text-black" : "text-gray-400"}`}>
                                            {date.month}
                                        </div>
                                    </div>
                                    <div className='w-11/12'>
                                        <button
                                            className={`w-full text-left p-6 rounded-lg transition-all ${isSelected
                                                ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg'
                                                : 'bg-white hover:bg-gray-50'
                                                }`}
                                            onClick={() => handleEvents(index)}
                                        >
                                            <div className='flex gap-4'>
                                                <div className='flex-1 space-y-2'>
                                                    <div className='flex items-center gap-2'>
                                                        <div className='inline-flex gap-2'>
                                                            <Calendar className='size-4' />
                                                            <p className='text-xs'>
                                                                {event.date}
                                                            </p>
                                                        </div>
                                                        <div className='inline-flex gap-1'>
                                                            <User2Icon className='size-4' />
                                                            <p className='text-xs'>
                                                                Environmental Teams
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <h3 className='font-semibold'>{event.title}</h3>
                                                    <p className={`text-sm hidden md:block ${isSelected ? 'text-white/90' : 'text-gray-500'
                                                        }`}>
                                                        {event.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    {selectedEvent !== null && selectedEvent !== undefined && events?.[selectedEvent] && (
                        <div className='sticky flex flex-col p-6 bg-white rounded-lg shadow-sm max-h-[800px] top-32' id="desc-section">
                            <div className='flex justify-start mb-6'>
                                <Button className='gap-2' size="sm" onClick={handleCopy}>
                                    <Link className='w-4 h-4' />
                                    Share Link
                                </Button>
                            </div>

                            {events[selectedEvent].image && (
                                <div className='relative w-full h-full mb-6 overflow-hidden bg-gray-100 rounded-lg max-h-64 aspect-video'>
                                    <Image
                                        fill
                                        alt={events[selectedEvent].title}
                                        className='object-cover'
                                        src={events[selectedEvent].image}

                                    />
                                </div>
                            )}

                            <div className='flex flex-col h-full gap-4'>
                                <div className='flex items-center gap-2'>
                                    <div className='inline-flex gap-2'>
                                        <Calendar className='size-4' />
                                        <p className='text-xs'>
                                            {events[selectedEvent].date}
                                        </p>
                                    </div>
                                    <div className='inline-flex gap-1'>
                                        <User2Icon className='size-4' />
                                        <p className='text-xs'>
                                            Environmental Teams
                                        </p>
                                    </div>
                                </div>
                                <h2 className='text-xl font-semibold'>
                                    {events[selectedEvent].title}
                                </h2>
                                <p className='text-gray-500'>
                                    {events[selectedEvent].description}
                                </p>
                                <div className='mt-auto'>
                                    <Button className='w-full py-6' onClick={() => {
                                        addToast({
                                            title: 'Succefully join!',
                                            description: `You have succefully join the event "${events[selectedEvent].title}".`,
                                            color: 'success'
                                        })
                                    }}>Join Event</Button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Event
