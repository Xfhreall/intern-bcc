import React, { useState } from 'react'
import { XCircle } from "lucide-react"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { AlbumIcon } from "@/public/icon/assetsIcon"
import { useSeaReport } from '@/hooks/useSeaReport'


export const SeaReportForm = () => {
    const [file, setFile] = useState<File | null>(null)
    const { isSubmitting, onSubmit, form } = useSeaReport()

    // Function to handle file removal
    const handleRemoveFile = () => {
        setFile(null);
        // Reset the file input value
        const fileInput = document.getElementById('file-upload') as HTMLInputElement;

        if (fileInput) {
            fileInput.value = '';
        }
    }

    return (
        <div className="w-full p-8 m-4 bg-white rounded-lg shadow">
            <h1 className="mb-6 text-2xl font-semibold">1. Report Information</h1>

            <Form {...form}>
                <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="space-y-4 ">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Report Title <span className="text-red-600">*</span></FormLabel>
                                    <FormControl >
                                        <Input className="border-2 border-gray-300" placeholder="Enter report title" {...field} />
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
                                    <FormLabel>Report Description <span className="text-red-600">*</span></FormLabel>
                                    <FormControl>
                                        <Textarea className="h-32 border-2 border-gray-300" placeholder="Describe the issue in detail..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="space-y-4">
                        <h2 className="text-2xl font-semibold">2. Address</h2>
                        <div className="grid grid-cols-3 gap-4">
                            <FormField
                                control={form.control}
                                name="location"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Street Number & Name <span className="text-red-600">*</span></FormLabel>
                                        <FormControl>
                                            <Input className="border-2 border-gray-300" placeholder="10 Sunset Road" {...field} />
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
                                        <FormLabel>State/Province <span className="text-red-600">*</span></FormLabel>
                                        <Select defaultValue={field.value} onValueChange={field.onChange}>
                                            <FormControl>
                                                <SelectTrigger className='border-2 border-gray-300'>
                                                    <SelectValue placeholder="Select province" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="Bali">Bali</SelectItem>
                                                <SelectItem value="Jawa Timur">Jawa Timur</SelectItem>
                                                <SelectItem value="Jawa Barat">Jawa Barat</SelectItem>
                                                <SelectItem value="Jawa Tengah">Jawa Tengah</SelectItem>
                                                <SelectItem value="Banten">Banten</SelectItem>
                                                <SelectItem value="DKI Jakarta">DKI Jakarta</SelectItem>
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
                                        <FormLabel>Country <span className="text-red-600">*</span></FormLabel>
                                        <FormControl>
                                            <Input className="border-2 border-gray-300" placeholder="Indonesia" {...field} />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-2xl font-semibold">3. Supporting Evidence</h2>
                        <div className="space-y-2 ">
                            <h2>Upload Photo/Videos <span className="text-red-600">*</span></h2>
                            <div className="py-16 border-2 border-gray-300 border-dashed rounded-lg">
                                <div className="flex flex-col items-center justify-center gap-2">
                                    {file ? (
                                        <div className="flex flex-col items-center gap-3">
                                            <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg">
                                                <AlbumIcon className="text-gray-600 size-5" />
                                                <span className="text-sm text-gray-700">{file.name}</span>
                                                <button
                                                    aria-label="Remove file"
                                                    className="p-1 text-red-500 transition-colors rounded-full hover:bg-red-50"
                                                    type="button"
                                                    onClick={handleRemoveFile}
                                                >
                                                    <XCircle className="size-5" />
                                                </button>
                                            </div>
                                            <Button
                                                className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
                                                size="sm"
                                                type="button"
                                                variant="outline"
                                                onClick={handleRemoveFile}
                                            >
                                                Remove File
                                            </Button>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="flex items-center gap-1">
                                                <AlbumIcon className="text-gray-400 size-8" />
                                                <label className="text-sm font-semibold cursor-pointer" htmlFor="file-upload">
                                                    Upload
                                                </label>
                                                <input
                                                    accept="image/*,video/*"
                                                    className="hidden"
                                                    id="file-upload"
                                                    type="file"
                                                    onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                                                />
                                                <p className="text-sm text-gray-500">photos/videos related to the reported issue</p>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <Button className="w-full bg-[#0077b6] hover:bg-[#006da8] py-6 text-base" disabled={isSubmitting} type="submit">
                        {isSubmitting ? "Sending..." : "Send Report"}
                    </Button>
                </form>
            </Form>
        </div>
    )
}

export default SeaReportForm;
