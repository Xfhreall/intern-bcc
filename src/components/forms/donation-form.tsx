"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { donationAmounts } from "@/types/donationType"
import { useDonation } from "@/hooks/useDonation"

export default function DonationForm() {
    const { step, handleNextStep, handleDonation, handleSelectAmount, error, setPhone, phone, donationMutation, selectedAmount, calculateTotalWithFee } = useDonation()

    return (
        <Card className="sticky w-full top-10">
            <CardHeader>
                {step === "phone" ? (
                    <>
                        <CardTitle className="text-xl">Donate to Care for the Ocean</CardTitle>
                        <CardDescription>Your donation helps protect our oceans</CardDescription>
                    </>
                ) : (
                    <>
                        <CardTitle className="text-xl">Make a Difference Today!</CardTitle>
                        <CardDescription>Your donation helps protect our oceans.</CardDescription>
                    </>
                )}
            </CardHeader>
            <CardContent>
                {step === "phone" ? (
                    <div className="space-y-4">
                        <div>
                            <label className="block mb-1 text-sm font-medium" htmlFor="phone">
                                Phone Number
                            </label>
                            <Input
                                className="w-full"
                                id="phone"
                                placeholder="+62 8914058202"
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
                        </div>
                        <Button className="w-full" disabled={donationMutation.isPending} onClick={handleNextStep}>
                            Next
                        </Button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-2">
                            {donationAmounts.slice(0, 8).map((amount) => (
                                <Button
                                    key={amount.value}
                                    className={`h-12 border bg-transparent border-black hover:bg-btnhover hover:text-black ${selectedAmount === amount.value
                                        ? "border-primary text-primary hover:border-primary hover:text-primary"
                                        : "text-black hover:border-black"
                                        }`}
                                    disabled={donationMutation.isPending}
                                    onClick={() => handleSelectAmount(amount.value)}
                                >
                                    {amount.label}
                                </Button>
                            ))}
                        </div>
                        <Button
                            className={`w-full h-12 border bg-transparent border-black hover:bg-btnhover hover:text-black ${selectedAmount === donationAmounts[8].value
                                ? "border-primary text-primary hover:border-primary hover:text-primary"
                                : "text-black hover:border-black"
                                }`}
                            disabled={donationMutation.isPending}
                            onClick={() => handleSelectAmount(donationAmounts[8].value)}
                        >
                            {donationAmounts[8].label}
                        </Button>
                        <div className="pt-6 space-y-4">
                            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
                            {donationMutation.isPending && <p className="text-sm text-primary">Processing your donation...</p>}
                            <Button
                                className="w-full py-6 text-white border bg-primary hover:bg-btnhover hover:border-black hover:text-black"
                                disabled={donationMutation.isPending}
                                onClick={handleDonation}
                            >
                                Donate {(selectedAmount !== null ? (calculateTotalWithFee(selectedAmount) / 1000).toFixed(1) : "0.0")}K
                            </Button>
                            <p className="text-sm text-gray-400">
                                An additional <span className="font-semibold text-red-500">1%</span> will be added to your donation, for our service
                                fees.
                            </p>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

