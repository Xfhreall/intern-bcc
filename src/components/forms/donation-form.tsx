"use client";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useDonation } from "@/hooks/useDonation";

const DonationForm = () => {
    const { form, onSubmit, PhoneCheck, isLoading } = useDonation();

    { PhoneCheck }

    return (
        <div className="flex flex-col justify-center w-full h-full gap-10">
            <div className="space-y-2 ">
                <h1 className="text-3xl font-semibold">Donate to Care for the Ocean</h1>
                <p className="text-sm font-light">Your donation helps protect our oceans.</p>
            </div>
            <div className="w-full">
                <Form {...form}>
                    <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone Number</FormLabel>
                                    <FormControl>
                                        <Input
                                            className="h-10 border-gray-400"
                                            placeholder="08123456789"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button
                            className="w-full h-12 bg-primary hover:bg-primary/90"
                            type="submit"
                        >
                            {isLoading ? "Loading..." : "Next"}
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default DonationForm;
