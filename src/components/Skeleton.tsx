interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = "" }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse bg-linear-to-r from-(--card-border) via-(--card-bg) to-(--card-border) bg-size-[200%_100%] animate-shimmer rounded ${className}`}
      style={{
        animation: "shimmer 1.5s ease-in-out infinite",
      }}
    />
  );
}

export function ItemCardSkeleton() {
  return (
    <div className="bg-(--card-bg) border border-(--card-border) rounded-xl p-4">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-4 w-4 rounded" />
      </div>

      {/* Price Inputs */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div>
          <Skeleton className="h-3 w-16 mb-1" />
          <Skeleton className="h-9 w-full rounded-lg" />
        </div>
        <div>
          <Skeleton className="h-3 w-20 mb-1" />
          <Skeleton className="h-9 w-full rounded-lg" />
        </div>
      </div>

      {/* Analysis */}
      <div className="pt-3 border-t border-(--card-border)/50">
        <Skeleton className="h-4 w-40 mx-auto" />
      </div>
    </div>
  );
}

export function KamaRatesSkeleton() {
  return (
    <section className="mb-8">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-(--card-bg) h-[132px] border border-(--card-border) rounded-xl p-4">
          <div className="flex items-center gap-2 mb-7">
            <Skeleton className="w-3 h-3 rounded-full" />
            <Skeleton className="h-[28px] w-24" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-10 flex-1 rounded-lg" />
          </div>
        </div>
        <div className="bg-(--card-bg) h-[132px] border border-(--card-border) rounded-xl p-4">
          <div className="flex items-center gap-2 mb-7">
            <Skeleton className="w-3 h-3 rounded-full" />
            <Skeleton className="h-[28px] w-28" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-10 flex-1 rounded-lg" />
          </div>
        </div>
      </div>
      <div className="mt-4 bg-(--card-bg) border border-(--card-border) rounded-xl p-4">
        <Skeleton className="h-6 w-40" />
      </div>
    </section>
  );
}

export function ItemsGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <Skeleton className="h-7 w-40" />
        <Skeleton className="h-4 w-28" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: count }).map((_, i) => (
          <ItemCardSkeleton key={i} />
        ))}
      </div>
    </section>
  );
}
