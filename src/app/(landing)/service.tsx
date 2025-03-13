import { stats } from "@/lib/serviceDatas";

export const Services = () => {
  return (
    <section
      className="w-full h-full px-4 py-6 text-white shadow-md bg-gradient-to-r from-primary to-secondary sm:py-16 md:px-6 lg:px-8"
      id="services"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-4 text-center sm:mb-12">
          <h2 className="mb-4 text-sm font-medium sm:text-lg">Services</h2>
          <h3 className="text-2xl font-semibold tracking-wide sm:text-4xl">
            What Nautikara Do?
          </h3>
        </div>

        <div className="grid grid-cols-1 gap-0 text-center sm:gap-8 md:grid-cols-3">
          {stats.map((stat, index) => (
            <div key={index} className="p-6 ">
              <div className="mb-4 text-2xl font-bold sm:text-4xl md:text-5xl">
                {stat.value}
              </div>
              <p className="mx-auto text-xs font-extralight sm:text-sm max-w-72 md:text-base">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
