import Link from "next/link";
import { Send } from "lucide-react";

export const Banner = () => {
  return (
    <div className="grid w-full">
      <div className="px-4 py-8 text-white bg-primary md:py-12 md:px-8 lg:px-16">
        <div className="flex flex-col items-start justify-between gap-6 mx-auto max-w-7xl md:flex-row md:items-center">
          <div className="max-w-2xl space-y-6">
            <h1 className="text-2xl font-bold md:text-3xl lg:text-4xl">
              It&apos;s Time to Take Action for Our Oceans!
            </h1>
            <p className="text-sm md:text-base">
              Together, we can preserve the sea with real action. Report
              pollution, support conservation, and be part of the change.
            </p>
          </div>
          <div className="flex items-center w-full gap-3 md:w-auto">
            <Link
              className="w-full px-6 py-3 font-medium text-center transition-colors bg-white rounded-md text-primary md:w-auto hover:bg-opacity-90"
              href="#register"
            >
              Register Now
            </Link>
          </div>
        </div>
      </div>

      <div className="grid items-end justify-center w-full pt-6 mx-auto font-medium">
        <div className="flex flex-col items-center justify-center gap-2 text-sm max-w-7xl md:flex-row md:justify-start md:text-base">
          <Send className="w-5 h-5 shrink-0" />
          <p>
            Communities looking to partner? DM us at{" "}
            <Link
              className="font-medium text-primary hover:underline"
              href="https://instagram.com/aquaverse.id"
            >
              @nautikara.id
            </Link>{" "}
            for more information!
          </p>
        </div>
      </div>
    </div>
  );
};
