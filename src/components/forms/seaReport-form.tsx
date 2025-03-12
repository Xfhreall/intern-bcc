"use client"
import React from 'react'
import Image from 'next/image'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useSeaReport } from '@/hooks/useSeaReport'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'

export default function SeaReportForm() {
    const { onSubmit, form, handleFileChange, isLoading, preview, fileType } = useSeaReport()

    return (
        <Card className="w-full my-6">
            <CardContent className='py-8'>
                <Form {...form}>
                    <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                        <div className='space-y-4 '>
                            <h1 className='text-xl font-semibold'>1. Report Information</h1>
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Report Title <span className='text-red-600'>*</span></FormLabel>
                                        <FormControl>
                                            <Input className='py-3 border-gray-400' placeholder="Plastic Waste Threats to Bali's Coastal and Marine Life" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Report Description <span className='text-red-600'>*</span></FormLabel>
                                        <FormControl>
                                            <Textarea
                                                className="min-h-[120px] border-gray-400 p-3"
                                                placeholder="Describe the issue in detail...."
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className='space-y-2'>
                            <h1 className='text-xl font-semibold'>2. Address</h1>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                <FormField
                                    control={form.control}
                                    name="street"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Street Number & Name <span className='text-red-600'>*</span></FormLabel>
                                            <FormControl>
                                                <Input className='py-3 border-gray-400' placeholder="Jalan Ahmad Yani" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="province"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Province <span className='text-red-600'>*</span></FormLabel>
                                            <Select value={field.value} onValueChange={field.onChange}>
                                                <FormControl>
                                                    <SelectTrigger className='py-3 border-gray-400'>
                                                        <SelectValue placeholder="Select Province" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="Banten">Banten</SelectItem>
                                                    <SelectItem value="DKI Jakarta">DKI Jakarta</SelectItem>
                                                    <SelectItem value="West Java">West Java</SelectItem>
                                                    <SelectItem value="Central Java">Central Java</SelectItem>
                                                    <SelectItem value="DI Yogyakarta">DI Yogyakarta</SelectItem>
                                                    <SelectItem value="East Java">East Java</SelectItem>
                                                    <SelectItem value="Bali">Bali</SelectItem>
                                                    <SelectItem value="Lampung">Lampung</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="country"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Country <span className='text-red-600'>*</span></FormLabel>
                                            <FormControl>
                                                <Input className='py-3 border-gray-400' placeholder="Indonesia" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <div className='space-y-2'>
                            <h1 className='text-xl font-semibold'>3. Supporting Evidence</h1>
                            <FormField
                                control={form.control}
                                name="file"
                                render={({ field: { onChange, ...rest } }) => (
                                    <FormItem>
                                        <FormLabel>Upload Photo/Videos <span className='text-red-600'>*</span></FormLabel>
                                        <FormControl>
                                            <div className="space-y-4">
                                                <Input
                                                    accept="image/*,video/*"
                                                    className='w-full h-12 p-3 border border-gray-400'
                                                    type="file"
                                                    onChange={(e) => {
                                                        onChange(e.target.files)
                                                        handleFileChange(e.target.files)
                                                    }}
                                                    {...rest}
                                                    value={undefined}
                                                />
                                                {preview && (
                                                    <div className="mt-2">
                                                        <p className="mb-2 text-sm text-muted-foreground">Preview:</p>
                                                        <div className='relative w-full h-64'>
                                                            {fileType === "image" ? (
                                                                <Image
                                                                    fill
                                                                    alt="Preview"
                                                                    className="max-w-full object-left object-contain h-auto max-h-[200px]"
                                                                    src={preview || "/placeholder.svg"}
                                                                />
                                                            ) : (
                                                                <video
                                                                    controls
                                                                    className="w-full h-full max-h-[200px]"
                                                                >
                                                                    <source src={preview} type="video/mp4" />
                                                                    <track kind="captions" />
                                                                    Your browser does not support the video tag.
                                                                </video>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="pt-2">
                            <Button className="w-full py-6 text-base font-semibold" disabled={isLoading} type="submit">
                                {isLoading ? "Sending..." : "Send Report"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}
