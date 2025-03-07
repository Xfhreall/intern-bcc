import { Skeleton } from "@/components/ui/skeleton-custom";

export function HeroSkeleton() {
  return (
    <div className="w-full min-h-[70vh] flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="w-full mx-auto max-w-7xl">
        <Skeleton className="w-3/4 h-16 mb-4" />
        <Skeleton className="w-1/2 h-8 mb-8" />
        <Skeleton className="w-40 h-12" />
      </div>
    </div>
  );
}

export function AboutSkeleton() {
  return (
    <section className="w-full py-16 bg-gray-50">
      <div className="w-full px-4 mx-auto max-w-7xl sm:px-6 md:px-8">
        <div className="flex flex-col gap-8 md:flex-row">
          <div className="w-full md:w-1/2">
            <Skeleton className="w-1/3 h-10 mb-4" />
            <Skeleton className="w-full h-6 mb-2" />
            <Skeleton className="w-full h-6 mb-2" />
            <Skeleton className="w-3/4 h-6 mb-6" />
            <Skeleton className="w-32 h-10" />
          </div>
          <div className="w-full md:w-1/2 h-[300px]">
            <Skeleton className="w-full h-full rounded-lg" />
          </div>
        </div>
      </div>
    </section>
  );
}

export function ServicesSkeleton() {
  return (
    <section className="w-full py-16">
      <div className="w-full px-4 mx-auto max-w-7xl sm:px-6 md:px-8">
        <Skeleton className="w-1/3 h-10 mx-auto mb-4" />
        <Skeleton className="w-2/3 h-6 mx-auto mb-12" />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="p-6 border rounded-lg">
              <Skeleton className="w-12 h-12 mb-4 rounded-full" />
              <Skeleton className="w-3/4 h-6 mb-3" />
              <Skeleton className="w-full h-4 mb-2" />
              <Skeleton className="w-full h-4 mb-2" />
              <Skeleton className="w-2/3 h-4" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TestimoniSkeleton() {
  return (
    <section className="w-full py-16 bg-gray-50">
      <div className="w-full px-4 mx-auto max-w-7xl sm:px-6 md:px-8">
        <Skeleton className="w-1/3 h-10 mx-auto mb-4" />
        <Skeleton className="w-2/3 h-6 mx-auto mb-12" />

        <div className="flex gap-6 overflow-hidden">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="min-w-[300px] p-6 border rounded-lg bg-white"
            >
              <div className="flex items-center gap-4 mb-4">
                <Skeleton className="w-12 h-12 rounded-full" />
                <div>
                  <Skeleton className="w-32 h-5 mb-2" />
                  <Skeleton className="w-24 h-4" />
                </div>
              </div>
              <Skeleton className="w-full h-4 mb-2" />
              <Skeleton className="w-full h-4 mb-2" />
              <Skeleton className="w-3/4 h-4" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function BannerSkeleton() {
  return (
    <section className="w-full py-16 bg-primary">
      <div className="w-full px-4 mx-auto max-w-7xl sm:px-6 md:px-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="w-full md:w-2/3">
            <Skeleton className="w-3/4 h-10 mb-4 bg-white/20" />
            <Skeleton className="w-full h-6 mb-2 bg-white/20" />
            <Skeleton className="w-3/4 h-6 bg-white/20" />
          </div>
          <Skeleton className="w-40 h-12 bg-white/20" />
        </div>
      </div>
    </section>
  );
}

export function NewsSkeleton() {
  return (
    <section className="w-full py-16">
      <div className="w-full px-4 mx-auto max-w-7xl sm:px-6 md:px-8">
        <Skeleton className="w-1/3 h-10 mx-auto mb-4" />
        <Skeleton className="w-2/3 h-6 mx-auto mb-12" />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="overflow-hidden border rounded-lg">
              <Skeleton className="w-full h-48" />
              <div className="p-4">
                <Skeleton className="w-1/3 h-5 mb-2" />
                <Skeleton className="w-full h-6 mb-3" />
                <Skeleton className="w-full h-4 mb-2" />
                <Skeleton className="w-3/4 h-4 mb-4" />
                <Skeleton className="w-32 h-8" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
