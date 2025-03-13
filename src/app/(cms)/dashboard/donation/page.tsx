import React from 'react'

import DonationForm from '@/components/forms/donation-form'

const Donation = () => {
    return (
        <section className='pl-[76px] py-12 flex relative gap-4'>
            <div className='h-[800px] w-[566px] bg-gray-600'>p</div>
            <div className='h-[405px] w-[480px] bg-white shadow-lg p-10'><DonationForm /></div>
        </section>
    )
}

export default Donation
