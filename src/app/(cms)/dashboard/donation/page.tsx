import React from 'react'
import Image from 'next/image'

import DonationForm from '@/components/forms/donation-form'
import banner from "@/public/assets/donation/banner.svg"
import { Logo } from '@/public/icon/logo'

const Donation = () => {
    return (
        <main className="w-full min-h-screen py-8">
            <div className="container px-6 mx-auto lg:px-10">
                <h1 className="mb-6 text-3xl font-bold">Donation</h1>
                <div className="flex flex-col gap-8 lg:gap-6 lg:flex-row">
                    <div className='relative rounded-lg overflow-hidden w-full lg:w-7/12 h-[558px] lg:h-[737px]'>
                        <Image
                            fill
                            priority
                            alt="Ocean background"
                            className="object-cover pointer-events-none"
                            src={banner}
                        />
                        <div className="absolute inset-0 bg-black/30" />
                        <div className="absolute bottom-0 left-0 right-0 p-6 mx-3 mb-3 space-y-4 bg-white rounded-lg lg:mx-8 lg:mb-8">
                            <div className="flex items-center">
                                <div className="p-2 mr-3">
                                    <Logo className='lg:size-20 size-14' />
                                </div>
                            </div>
                            <h2 className="text-base font-semibold lg:text-lg">What do we do with your donation?</h2>
                            <p className="text-xs font-light leading-relaxed text-gray-500 lg:text-sm">
                                Your donation helps clean beaches, restore coral reefs, and educate coastal communities, promoting ocean
                                conservation. 5% of total monthly donations support platform operations, while the rest directly helps
                                partner communities, ensuring a healthier and more sustainable marine environment.
                            </p>
                            <p className="text-xs font-semibold lg:text-sm">
                                - By donating you have helped and contributed to marine life and saved many people and marine life.
                            </p>
                        </div>
                    </div>
                    <div className='w-full lg:w-5/12'>
                        <DonationForm />
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Donation
