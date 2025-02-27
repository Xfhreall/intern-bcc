export const Services = () => {
  const stats = [
    {
      value: "500+",
      description: "Marine pollution reports have been followed up",
    },
    {
      value: "50+",
      description: "active community in marine conservation",
    },
    {
      value: "IDR 1M+",
      description: "donations have been channeled to environmental projects",
    },
  ];

  return (
    <section className="px-4 py-16 md:px-6 lg:px-8" id="services">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="mb-2 text-lg font-medium">Services</h2>
          <h3 className="text-4xl font-semibold tracking-wide text-gray-900">
            What We Do?
          </h3>
        </div>

        <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-3">
          {stats.map((stat, index) => (
            <div key={index} className="p-6 ">
              <div className="mb-4 text-4xl font-bold text-primary md:text-5xl">
                {stat.value}
              </div>
              <p className="text-sm text-gray-600 md:text-base">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
