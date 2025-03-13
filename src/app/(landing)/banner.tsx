import Link from "next/link";

export const Banner = () => {
  return (
    <div className="grid w-full">
      <div className="px-4 py-8 text-white bg-gradient-to-r from-primary to-secondary md:py-12 md:px-8 lg:px-16">
        <div className="flex flex-col items-start justify-between gap-6 mx-auto max-w-7xl md:flex-row md:items-center">
          <div className="max-w-2xl py-6 space-y-4">
            <h1 className="text-2xl font-semibold sm:font-bold md:text-3xl">
              Join Us as a Community Partner!
            </h1>
            <p className="text-xs font-light md:text-base">
              Feel free to reach out to us on Instagram for any inquiries or
              collaborations!
            </p>
          </div>
          <div className="flex items-center w-full gap-3 md:w-auto">
            <Link
              className="w-full px-10 py-3 font-semibold text-center transition-colors bg-white rounded-md text-primary md:w-auto hover:bg-opacity-90"
              href="#contact"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
